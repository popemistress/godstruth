// xAPI client helpers — usable in client components
// Sends to our own LRS at /api/xapi/statements

const XAPI_VERBS = {
  completed:   { id: "http://adlnet.gov/expapi/verbs/completed",  display: { "en-US": "completed" } },
  passed:      { id: "http://adlnet.gov/expapi/verbs/passed",     display: { "en-US": "passed" } },
  failed:      { id: "http://adlnet.gov/expapi/verbs/failed",     display: { "en-US": "failed" } },
  answered:    { id: "http://adlnet.gov/expapi/verbs/answered",   display: { "en-US": "answered" } },
  progressed:  { id: "http://adlnet.gov/expapi/verbs/progressed", display: { "en-US": "progressed" } },
  experienced: { id: "http://adlnet.gov/expapi/verbs/experienced",display: { "en-US": "experienced" } },
  attempted:   { id: "http://adlnet.gov/expapi/verbs/attempted",  display: { "en-US": "attempted" } },
  mastered:    { id: "https://godstruth.net/xapi/verbs/mastered", display: { "en-US": "mastered" } },
};

const XAPI_ACTIVITY_TYPES = {
  lesson:      "http://adlnet.gov/expapi/activities/lesson",
  module:      "http://adlnet.gov/expapi/activities/module",
  course:      "http://adlnet.gov/expapi/activities/course",
  quiz:        "http://adlnet.gov/expapi/activities/assessment",
  question:    "http://adlnet.gov/expapi/activities/question",
  video:       "https://w3id.org/xapi/video/activity-type/video",
  reading:     "http://id.tincanapi.com/activitytype/reading",
  memoryVerse: "https://godstruth.net/xapi/activity-types/memory-verse",
  scripture:   "https://godstruth.net/xapi/activity-types/scripture",
};

export async function sendStatement(statement: object): Promise<string[]> {
  try {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const res = await fetch(`${base}/api/xapi/statements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(statement),
    });
    if (!res.ok) return [];
    return (await res.json()) as string[];
  } catch {
    return [];
  }
}

export async function trackLessonComplete(params: {
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  courseTitle: string;
  userId: string;
  userEmail: string;
  userName: string;
  durationSeconds?: number;
}): Promise<void> {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  await sendStatement({
    actor: {
      objectType: "Agent",
      name: params.userName || "Anonymous",
      mbox: params.userEmail ? `mailto:${params.userEmail}` : `mailto:${params.userId}@godstruth.net`,
    },
    verb: XAPI_VERBS.completed,
    object: {
      objectType: "Activity",
      id: `${base}/courses/${params.courseId}/lessons/${params.lessonId}`,
      definition: {
        name: { "en-US": params.lessonTitle },
        type: XAPI_ACTIVITY_TYPES.lesson,
      },
    },
    result: {
      completion: true,
      duration: params.durationSeconds ? `PT${params.durationSeconds}S` : undefined,
    },
    context: {
      contextActivities: {
        parent: [
          {
            objectType: "Activity",
            id: `${base}/courses/${params.courseId}`,
            definition: { name: { "en-US": params.courseTitle }, type: XAPI_ACTIVITY_TYPES.course },
          },
        ],
      },
      platform: "GodsTruth Learning Platform",
    },
  });
}

export async function trackQuizAnswer(params: {
  questionId: string;
  questionText: string;
  lessonId: string;
  response: string;
  correct: boolean;
  score?: number;
}): Promise<void> {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  await sendStatement({
    actor: {
      objectType: "Agent",
      name: "Learner",
      mbox: "mailto:anonymous@godstruth.net",
    },
    verb: XAPI_VERBS.answered,
    object: {
      objectType: "Activity",
      id: `${base}/questions/${params.questionId}`,
      definition: {
        name: { "en-US": params.questionText || params.questionId },
        type: XAPI_ACTIVITY_TYPES.question,
      },
    },
    result: {
      response: params.response,
      success: params.correct,
      score: params.score !== undefined ? { scaled: params.score } : undefined,
    },
    context: {
      contextActivities: {
        parent: [
          {
            objectType: "Activity",
            id: `${base}/lessons/${params.lessonId}`,
            definition: { type: XAPI_ACTIVITY_TYPES.lesson },
          },
        ],
      },
      platform: "GodsTruth Learning Platform",
    },
  });
}

export async function trackQuizComplete(params: {
  lessonId: string;
  lessonTitle: string;
  score: number;
  maxScore: number;
  passed: boolean;
}): Promise<void> {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  const scaled = params.maxScore > 0 ? params.score / params.maxScore : 0;
  await sendStatement({
    actor: {
      objectType: "Agent",
      name: "Learner",
      mbox: "mailto:anonymous@godstruth.net",
    },
    verb: params.passed ? XAPI_VERBS.passed : XAPI_VERBS.failed,
    object: {
      objectType: "Activity",
      id: `${base}/lessons/${params.lessonId}/quiz`,
      definition: {
        name: { "en-US": `${params.lessonTitle} — Quiz` },
        type: XAPI_ACTIVITY_TYPES.quiz,
      },
    },
    result: {
      score: {
        scaled,
        raw: params.score,
        max: params.maxScore,
        min: 0,
      },
      success: params.passed,
      completion: true,
    },
    context: { platform: "GodsTruth Learning Platform" },
  });
}

export async function trackVideoProgress(params: {
  lessonId: string;
  lessonTitle: string;
  percentComplete: number;
}): Promise<void> {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  await sendStatement({
    actor: {
      objectType: "Agent",
      name: "Learner",
      mbox: "mailto:anonymous@godstruth.net",
    },
    verb: XAPI_VERBS.progressed,
    object: {
      objectType: "Activity",
      id: `${base}/lessons/${params.lessonId}/video`,
      definition: {
        name: { "en-US": params.lessonTitle },
        type: XAPI_ACTIVITY_TYPES.video,
      },
    },
    result: {
      extensions: {
        "https://w3id.org/xapi/video/extensions/progress": params.percentComplete / 100,
      },
    },
    context: { platform: "GodsTruth Learning Platform" },
  });
}

export async function trackMemoryVerseMastered(params: {
  reference: string;
  text: string;
}): Promise<void> {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  await sendStatement({
    actor: {
      objectType: "Agent",
      name: "Learner",
      mbox: "mailto:anonymous@godstruth.net",
    },
    verb: XAPI_VERBS.mastered,
    object: {
      objectType: "Activity",
      id: `${base}/memory-verses/${encodeURIComponent(params.reference)}`,
      definition: {
        name: { "en-US": params.reference },
        description: { "en-US": params.text },
        type: XAPI_ACTIVITY_TYPES.memoryVerse,
      },
    },
    result: { completion: true, success: true },
    context: { platform: "GodsTruth Learning Platform" },
  });
}

export async function trackScriptureRead(params: {
  book: string;
  chapter: string | number;
  translation: string;
}): Promise<void> {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  const ref = `${params.book} ${params.chapter}`;
  await sendStatement({
    actor: {
      objectType: "Agent",
      name: "Learner",
      mbox: "mailto:anonymous@godstruth.net",
    },
    verb: XAPI_VERBS.experienced,
    object: {
      objectType: "Activity",
      id: `${base}/bible/${encodeURIComponent(params.book)}/${params.chapter}?t=${params.translation}`,
      definition: {
        name: { "en-US": ref },
        type: XAPI_ACTIVITY_TYPES.scripture,
        extensions: {
          "https://godstruth.net/xapi/extensions/translation": params.translation,
        },
      },
    },
    context: { platform: "GodsTruth Learning Platform" },
  });
}
