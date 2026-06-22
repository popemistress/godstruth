import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import JSZip from "jszip";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9-_]/g, "-");
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await params;

  const course = await db.content.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { published: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const allLessons = course.chapters.flatMap((ch) =>
    ch.lessons.map((l) => ({ ...l, chapterTitle: ch.title }))
  );

  // Build SCORM 1.2 manifest items and resources
  const itemsXml = allLessons
    .map(
      (l) => `      <item identifier="item-${sanitizeId(l.id)}" identifierref="res-${sanitizeId(l.id)}" isvisible="true">
        <title>${escapeXml(l.title)}</title>
      </item>`
    )
    .join("\n");

  const resourcesXml = allLessons
    .map(
      (l) => `    <resource identifier="res-${sanitizeId(l.id)}" type="webcontent" adlcp:scormtype="sco" href="lessons/${sanitizeId(l.id)}.html">
      <file href="lessons/${sanitizeId(l.id)}.html"/>
      <dependency identifierref="res-scorm-api"/>
    </resource>`
    )
    .join("\n");

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="godstruth-${sanitizeId(course.id)}" version="1"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="org-${sanitizeId(course.id)}">
    <organization identifier="org-${sanitizeId(course.id)}">
      <title>${escapeXml(course.title)}</title>
${itemsXml}
    </organization>
  </organizations>
  <resources>
${resourcesXml}
    <resource identifier="res-scorm-api" type="webcontent" href="scorm_api_bridge.js">
      <file href="scorm_api_bridge.js"/>
    </resource>
  </resources>
</manifest>`;

  const scormApiBridge = `// SCORM 1.2 API Bridge — shims SCORM API calls to xAPI
(function() {
  var _data = {};
  var _startTime = Date.now();

  window.API = {
    LMSInitialize: function(s) {
      _startTime = Date.now();
      return "true";
    },
    LMSFinish: function(s) {
      var duration = Math.round((Date.now() - _startTime) / 1000);
      if (window.xapiEndpoint) {
        var stmt = {
          actor: { objectType: "Agent", name: "Learner", mbox: "mailto:scorm-learner@godstruth.net" },
          verb: { id: "http://adlnet.gov/expapi/verbs/completed", display: { "en-US": "completed" } },
          object: {
            objectType: "Activity",
            id: window.xapiActivityId || window.location.href,
            definition: { name: { "en-US": window.xapiActivityTitle || document.title }, type: "http://adlnet.gov/expapi/activities/lesson" }
          },
          result: { completion: true, duration: "PT" + duration + "S" }
        };
        fetch(window.xapiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stmt)
        }).catch(function(){});
      }
      return "true";
    },
    LMSGetValue: function(e) { return _data[e] || ""; },
    LMSSetValue: function(e, v) { _data[e] = v; return "true"; },
    LMSCommit: function(s) { return "true"; },
    LMSGetLastError: function() { return "0"; },
    LMSGetErrorString: function(c) { return "No Error"; },
    LMSGetDiagnostic: function(c) { return ""; }
  };
})();
`;

  const zip = new JSZip();
  zip.file("imsmanifest.xml", manifest);
  zip.file("scorm_api_bridge.js", scormApiBridge);

  const lessonsFolder = zip.folder("lessons")!;
  for (const lesson of allLessons) {
    const rawContent = lesson.content ?? "";
    // Use content as-is if it looks like HTML, otherwise treat as text
    const bodyContent = rawContent.includes("<") ? rawContent : `<p>${rawContent.replace(/\n/g, "</p><p>")}</p>`;
    const safeTitle = escapeXml(lesson.title);
    const safeChapter = escapeXml(lesson.chapterTitle);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${safeTitle}</title>
  <script src="../scorm_api_bridge.js"></script>
  <script>
    window.xapiEndpoint = window.parent && window.parent.location ? window.parent.location.origin + "/api/xapi/statements" : "/api/xapi/statements";
    window.xapiActivityId = window.location.origin + "/lessons/${lesson.id}";
    window.xapiActivityTitle = "${lesson.title.replace(/"/g, '\\"')}";
  </script>
  <style>
    body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 2rem; background: #fafaf9; color: #1c1917; line-height: 1.7; }
    h1 { font-size: 1.75rem; color: #14532d; border-bottom: 2px solid #d1fae5; padding-bottom: 0.5rem; }
    .chapter { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1rem; }
    .content { margin-top: 1.5rem; }
    .complete-btn { margin-top: 2rem; background: #16a34a; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; font-size: 1rem; cursor: pointer; }
    .complete-btn:hover { background: #15803d; }
  </style>
</head>
<body>
  <div class="chapter">${safeChapter}</div>
  <h1>${safeTitle}</h1>
  <div class="content">${bodyContent}</div>
  <button class="complete-btn" onclick="completeSCO()">Mark Complete</button>
  <script>
    // Auto-initialize
    if (window.API) window.API.LMSInitialize("");

    function completeSCO() {
      if (window.API) {
        window.API.LMSSetValue("cmi.core.lesson_status", "completed");
        window.API.LMSCommit("");
        window.API.LMSFinish("");
      }
      this.textContent = "Completed!";
      this.disabled = true;
    }
  </script>
</body>
</html>`;

    lessonsFolder.file(`${sanitizeId(lesson.id)}.html`, html);
  }

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  const slug = course.slug ?? course.id;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="scorm-${slug}.zip"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
