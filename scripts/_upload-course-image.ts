import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const utapi = new UTApi();
const db = new PrismaClient();

async function main() {
  const filePath = path.resolve(process.cwd(), "Gods-plan-for-creation-course.png");

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }

  console.log("Uploading to UploadThing:", filePath);

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: "image/png" });
  const file = new File([blob], "gods-plan-for-creation-course.png", { type: "image/png" });

  const response = await utapi.uploadFiles(file);

  if (response.error) {
    console.error("Upload failed:", response.error);
    process.exit(1);
  }

  const url = response.data.url;
  console.log("✅ Uploaded:", url);

  const updated = await db.content.update({
    where: { slug: "gods-universal-plan-for-creation" },
    data: { thumbnail: url },
    select: { title: true, thumbnail: true },
  });

  console.log("✅ DB updated:", updated.title);
  console.log("   Thumbnail:", updated.thumbnail);

  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
