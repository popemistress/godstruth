/**
 * seed-hell-course.ts
 *
 * Reads /home/pope/sites/godstruth/hell-course.md and seeds the database with the
 * complete "Hell: Biblical Truth, Compassionate Warning, and Holy Living" course.
 *
 * This script now creates the full course platform structure:
 *   - READING lessons from the source markdown
 *   - VIDEO intro lessons for every module
 *   - IMAGE / SUPPLEMENT infographics and worksheets
 *   - QUIZ lessons with Quiz + QuizQuestion rows
 *   - ASSIGNMENT lessons
 *   - CourseTrack with 30-day guided path
 *   - Tags (hell, judgment, evangelism, etc.)
 *
 * NOTE: The script deletes any existing slug="hell" course and re-creates it.
 *       Existing user progress for the course will be lost.
 * NOTE: VIDEO and IMAGE lessons are created as placeholders. Real media must be
 *       uploaded to UploadThing and the mediaUrl / videoUrl / coverUrl fields
 *       updated via the admin panel.
 *
 * Run with:
 *   pnpm tsx --env-file=.env.local scripts/seed-hell-course.ts
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const db = new PrismaClient();

const HELL_MD_PATH = resolve("/home/pope/sites/godstruth/hell-course.md");

interface ParsedLesson {
  type: "READING" | "SUPPLEMENT" | "IMAGE" | "QUIZ" | "ASSIGNMENT";
  title: string;
  order: number;
  content: string;
  duration: number;
  mediaUrl?: string;
  videoUrl?: string;
}

interface ParsedChapter {
  title: string;
  order: number;
  lessons: ParsedLesson[];
}

interface QuizSpec {
  title: string;
  questions: {
    question: string;
    type: "MULTIPLE_CHOICE" | "TRUE_FALSE";
    options: string[];
    correctAnswer: string; // index as string "0", "1", ...
  }[];
}

function parseHellMarkdown(md: string): { title: string; description: string; chapters: ParsedChapter[] } {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");

  let courseTitle = "Hell: A Study & Warning";
  let courseDescription =
    "A sober, Scripture-centered study of final judgment, eternal destiny, and how the reality of hell shapes a life of love, evangelism, and Spirit-empowered witness.";

  const chapters: ParsedChapter[] = [];
  let currentChapter: ParsedChapter | null = null;
  let currentLesson: ParsedLesson | null = null;
  let buffer: string[] = [];

  function flushLesson() {
    if (currentLesson && currentChapter) {
      currentLesson.content = buffer.join("\n").trim();
      // Adjust duration for skeleton placeholder lessons
      if (currentLesson.content.includes("[Lesson skeleton")) {
        currentLesson.duration = 300;
      }
      currentChapter.lessons.push(currentLesson);
    }
    currentLesson = null;
    buffer = [];
  }

  function flushChapter() {
    flushLesson();
    if (currentChapter) {
      chapters.push(currentChapter);
    }
    currentChapter = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Course title: # Title
    const courseTitleMatch = line.match(/^#\s+(.+)$/);
    if (courseTitleMatch && !currentChapter) {
      courseTitle = courseTitleMatch[1].trim();
      continue;
    }

    // Chapter heading: ## Part I — Title
    const chapterMatch = line.match(/^##\s+Part\s+(\S+)\s*[—\-–]\s*(.+)$/);
    if (chapterMatch) {
      flushChapter();
      currentChapter = {
        title: chapterMatch[2].trim(),
        order: chapters.length + 1,
        lessons: [],
      };
      continue;
    }

    // Lesson/Supplement/Assignment heading: ### Lesson N — Title, ### Supplement N — Title, ### Assignment N — Title
    // Also supports Course Welcome as a reading lesson.
    const lessonMatch = line.match(/^###\s+(Lesson|Supplement|Assignment)\s+(\d+)\s*[—\-–]\s*(.+)$/);
    const welcomeMatch = line.match(/^###\s+(Course\s+Welcome)\s*[—\-–]\s*(.+)$/i);
    const appendixMatch = line.match(/^###\s+(Appendix)\s*[—\-–]\s*(.+)$/i);
    if (currentChapter && (lessonMatch || welcomeMatch || appendixMatch)) {
      flushLesson();

      if (welcomeMatch) {
        const title = welcomeMatch[2].trim();
        currentLesson = {
          type: "READING",
          title: `Course Welcome — ${title}`,
          order: currentChapter.lessons.length + 1,
          content: "",
          duration: 600,
        };
      } else if (appendixMatch) {
        const title = appendixMatch[2].trim();
        currentLesson = {
          type: "READING",
          title: `Appendix — ${title}`,
          order: currentChapter.lessons.length + 1,
          content: "",
          duration: 1800,
        };
      } else if (lessonMatch) {
        const kind = lessonMatch[1].trim();
        const title = lessonMatch[3].trim();

        if (kind === "Supplement") {
          currentLesson = {
            type: "SUPPLEMENT",
            title: `${kind} ${lessonMatch[2]} — ${title}`,
            order: currentChapter.lessons.length + 1,
            content: "",
            duration: 300,
          };
        } else if (kind === "Assignment") {
          currentLesson = {
            type: "ASSIGNMENT",
            title: `${kind} ${lessonMatch[2]} — ${title}`,
            order: currentChapter.lessons.length + 1,
            content: "",
            duration: 900,
          };
        } else {
          currentLesson = {
            type: "READING",
            title: `${kind} ${lessonMatch[2]} — ${title}`,
            order: currentChapter.lessons.length + 1,
            content: "",
            duration: 1800,
          };
        }
      }
      continue;
    }

    // Section divider — do not absorb into the previous lesson's content.
    if (/^##\s+Supplements\s*$/.test(line)) {
      continue;
    }

    // Horizontal rule — skip if it is just a visual divider
    if (/^---+\s*$/.test(line)) {
      continue;
    }

    buffer.push(line);
  }

  flushChapter();

  return { title: courseTitle, description: courseDescription, chapters };
}

const moduleIntroVideos: { title: string; content: string }[] = [
  {
    title: "Introduction: Why Hell Is Hard and Why We Must Study It",
    content:
      "Welcome to Module 1. In this brief intro we set the emotional and theological stakes for the course: why hell is culturally embarrassing, why silence in the church is dangerous, and why we must submit our feelings to Scripture. (Video placeholder — upload intro video to UploadThing and set videoUrl.)",
  },
  {
    title: "Introduction: The Biblical Vocabulary of Judgment",
    content:
      "Welcome to Module 2. Before we study what Jesus said, we need the right vocabulary: Sheol, Hades, Gehenna, Tartarus, the Lake of Fire, and the Second Death. (Video placeholder.)",
  },
  {
    title: "Introduction: What Jesus Actually Said About Hell",
    content:
      "Welcome to Module 3. Jesus is the supreme authority on hell. This intro previews the major texts and why His warnings are neither metaphors nor manipulations. (Video placeholder.)",
  },
  {
    title: "Introduction: The Theological Landscape — Four Views on Hell",
    content:
      "Welcome to Module 4. We will survey traditionalism, conditionalism, universal reconciliation, and purgatorial/metaphorical proposals, evaluating each by Scripture. (Video placeholder.)",
  },
  {
    title: "Introduction: The Character of God — Love, Justice, Holiness, and Wrath",
    content:
      "Welcome to Module 5. How can a loving God judge? This intro explains that God's attributes are unified, not competing, and the cross is where wrath and mercy meet. (Video placeholder.)",
  },
  {
    title: "Introduction: The Human Condition — Sin, Choice, and the Gospel",
    content:
      "Welcome to Module 6. Hell is the just consequence of sin; the gospel is the only escape. This intro frames repentance, faith, grace, and assurance. (Video placeholder.)",
  },
  {
    title: "Introduction: Accounts in Hell",
    content:
      "Welcome to Module 7. We examine first-person accounts of hell with biblical discernment, treating Scripture as the final court of appeal. (Video placeholder.)",
  },
  {
    title: "Introduction: Hell Testimonies and Visions — Discernment and Use",
    content:
      "Welcome to Module 8. Experience is powerful but subordinate to Scripture. This intro previews how to test visionary claims and use testimonies wisely. (Video placeholder.)",
  },
  {
    title: "Introduction: Hell on Earth — Demonic Oppression, Addiction, and Present Bondage",
    content:
      "Welcome to Module 9. Hell is future, but demonic oppression, addiction, and trauma can make it feel present. This intro frames deliverance in Christ. (Video placeholder.)",
  },
  {
    title: "Introduction: The Christian Response — Evangelism, Compassion, and Spiritual Warfare",
    content:
      "Welcome to Module 10. Believing in hell should produce love, urgency, and witness. This intro previews a compassionate, non-manipulative evangelistic posture. (Video placeholder.)",
  },
  {
    title: "Introduction: Living in Light of Eternity",
    content:
      "Welcome to Module 11. How does the reality of hell change daily life? This intro previews self-examination, holiness, stewardship, and hope. (Video placeholder.)",
  },
  {
    title: "Introduction: Capstone and Integration",
    content:
      "Welcome to Module 12. The course culminates in a personal theology of hell and a 30-day mission plan for witness and holiness. (Video placeholder.)",
  },
];

const moduleImageSupplements: { title: string; content: string; duration: number }[] = [
  {
    title: "Worksheet: Course Journal Template",
    content:
      "Reflection prompts for each module. Use this journal to record emotional resistance, key Scriptures, prayers, and action steps. (Upload worksheet image to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Infographic: Biblical Vocabulary Map",
    content:
      "Visual map of Sheol, Hades, Gehenna, Tartarus, the Lake of Fire, and the Second Death — with key texts and a short definition for each term. (Upload infographic to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Infographic: Jesus' Hell Texts",
    content:
      "A chart of the major Synoptic and Johannine texts where Jesus warns of judgment, with context and central point for each passage. (Upload infographic to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Infographic: Four Views Comparison Chart",
    content:
      "Side-by-side comparison of traditionalism, conditionalism, universal reconciliation, and purgatorial/metaphorical views with key texts and critiques. (Upload infographic to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Infographic: The Cross — Where Wrath and Mercy Meet",
    content:
      "Visual explanation of how divine love, justice, holiness, and wrath converge at the cross. (Upload infographic to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Worksheet: Faith Inventory",
    content:
      "A self-examination worksheet covering confession, repentance, fruit, obedience, love, perseverance, and assurance. (Upload worksheet image to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Infographic: Hell Accounts Comparison Matrix",
    content:
      "Matrix of major first-person accounts: source, main emphasis, biblical alignment, and pastoral use. (Upload infographic to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Worksheet: Vision/Testimony Discernment Checklist",
    content:
      "Biblical, theological, ethical, and fruit-based criteria for testing contemporary hell testimonies. (Upload worksheet image to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Worksheet: Open Doors Self-Assessment",
    content:
      "Assessment for occult involvement, generational patterns, addiction, bitterness, media, and relationships that may open doors to darkness. (Upload worksheet image to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Worksheet: Gospel Presentation Outline",
    content:
      "A 3-minute, Scripture-based gospel outline for evangelistic conversations. (Upload worksheet image to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Worksheet: Personal Rule of Life Template",
    content:
      "Template for daily, weekly, monthly, and seasonal disciplines in prayer, study, witness, and holiness. (Upload worksheet image to UploadThing and set mediaUrl.)",
    duration: 300,
  },
  {
    title: "Worksheet: 30-Day Mission Plan Template",
    content:
      "Calendar template for prayer targets, evangelistic conversations, Scripture memory, and holiness commitments. (Upload worksheet image to UploadThing and set mediaUrl.)",
    duration: 300,
  },
];

const moduleQuizzes: QuizSpec[] = [
  {
    title: "Module 1 Quiz: Motives and Stakes",
    questions: [
      {
        question: "Why is silence about hell in the church dangerous?",
        type: "MULTIPLE_CHOICE",
        options: [
          "It keeps people comfortable",
          "It removes urgency from the gospel",
          "It increases church attendance",
          "It makes doctrine easier to teach",
        ],
        correctAnswer: "1",
      },
      {
        question: "Francis Chan's approach to hell emphasizes submitting our wishes to Scripture.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Brian Jones confesses that many believers secretly stop believing in hell.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "What is at stake if the church ignores hell?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Only academic debates",
          "Souls, the gospel, and God's glory",
          "Political influence",
          "Financial giving",
        ],
        correctAnswer: "1",
      },
      {
        question: "The course treats Scripture as the final authority on hell.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 2 Quiz: Biblical Vocabulary",
    questions: [
      {
        question: "Which Old Testament term refers to the realm of the dead?",
        type: "MULTIPLE_CHOICE",
        options: ["Gehenna", "Sheol", "Tartarus", "Lake of Fire"],
        correctAnswer: "1",
      },
      {
        question: "Which term is Jesus' favorite word for final punishment?",
        type: "MULTIPLE_CHOICE",
        options: ["Sheol", "Hades", "Gehenna", "Tartarus"],
        correctAnswer: "2",
      },
      {
        question: "Tartarus is associated with the destiny of fallen angels.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The 'Second Death' refers to final separation from God in Revelation.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The KJV translates Sheol as which of the following?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Only 'hell'",
          "Only 'grave'",
          "'hell,' 'grave,' and 'pit'",
          "It never translates Sheol",
        ],
        correctAnswer: "2",
      },
      {
        question: "Gehenna was only a garbage dump with no theological meaning.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "The Rich Man and Lazarus appears in which Gospel?",
        type: "MULTIPLE_CHOICE",
        options: ["Matthew", "Mark", "Luke", "John"],
        correctAnswer: "2",
      },
      {
        question: "The Lake of Fire is the final destination of the wicked in Revelation 20.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 3 Quiz: What Jesus Actually Said",
    questions: [
      {
        question: "Which text records Jesus' warning about cutting off a hand or foot to avoid hell?",
        type: "MULTIPLE_CHOICE",
        options: ["Matthew 5", "Mark 9", "Luke 16", "John 3"],
        correctAnswer: "1",
      },
      {
        question: "Jesus never warned about hell.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "The parable of the Sheep and the Goats is found in which chapter?",
        type: "MULTIPLE_CHOICE",
        options: ["Matthew 13", "Matthew 25", "Luke 12", "John 5"],
        correctAnswer: "1",
      },
      {
        question: "John 3:16 juxtaposes eternal life with perishing.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which passage says it is better to enter life maimed than be thrown into hell?",
        type: "MULTIPLE_CHOICE",
        options: ["Matthew 18:6-9", "Luke 16", "John 5:28-29", "Matthew 7:13"],
        correctAnswer: "0",
      },
      {
        question: "The course argues that Jesus held an annihilationist view.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "In the Sermon on the Mount, Jesus warns that calling someone a fool risks hell fire.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Luke 12:4-5 warns whom to fear?",
        type: "MULTIPLE_CHOICE",
        options: [
          "The Romans",
          "Religious leaders",
          "God who can cast into hell",
          "Demons",
        ],
        correctAnswer: "2",
      },
    ],
  },
  {
    title: "Module 4 Quiz: Four Views on Hell",
    questions: [
      {
        question: "Which view holds that the wicked suffer eternal conscious torment?",
        type: "MULTIPLE_CHOICE",
        options: ["Conditionalism", "Traditionalism", "Universalism", "Purgatorial"],
        correctAnswer: "1",
      },
      {
        question: "Conditionalism teaches that immortality is a gift, not inherent.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Universal reconciliation eventually saves all people.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The course's confessional position is:",
        type: "MULTIPLE_CHOICE",
        options: [
          "Conditionalism",
          "Universalism",
          "Eternal, conscious punishment",
          "Purgatory",
        ],
        correctAnswer: "2",
      },
      {
        question: "Which text says the smoke of their torment goes up forever and ever?",
        type: "MULTIPLE_CHOICE",
        options: ["Matthew 25:46", "Revelation 14:10-11", "Romans 6:23", "1 Timothy 6:16"],
        correctAnswer: "1",
      },
      {
        question: "Purgatorial views typically present hell as purification rather than final punishment.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Steve Gregg's taxonomy includes traditionalism, conditionalism, and restorationism.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The course treats disagreement on hell as an opportunity for charity and clarity.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which passage pairs 'eternal punishment' with 'eternal life'?",
        type: "MULTIPLE_CHOICE",
        options: ["Matthew 25:46", "Revelation 20:10", "2 Thessalonians 1:9", "Romans 6:23"],
        correctAnswer: "0",
      },
      {
        question: "Edward Fudge's historical work traces the traditional view through which figures?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Augustine, Aquinas, Luther, Calvin, Edwards",
          "Only the apostles",
          "Origen and Gregory of Nyssa",
          "Modern psychologists",
        ],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 5 Quiz: The Character of God",
    questions: [
      {
        question: "The course says God's love and justice are in tension.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Where do wrath and mercy meet according to the course?",
        type: "MULTIPLE_CHOICE",
        options: ["The law", "The cross", "The church", "The family"],
        correctAnswer: "1",
      },
      {
        question: "Which divine attribute demands that sin be judged?",
        type: "MULTIPLE_CHOICE",
        options: ["Love", "Holiness", "Patience", "Mercy"],
        correctAnswer: "1",
      },
      {
        question: "Gerry Beauchemin presents judgment as parental and remedial.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The course affirms that God is sovereign and humans are responsible.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Infinite punishment fits sin against an infinite God because of the worth of the One offended.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 6 Quiz: Sin, Choice, and the Gospel",
    questions: [
      {
        question: "Sin is defined as rebellion against God, not merely rule-breaking.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Salvation is by grace alone through faith alone in Christ alone.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Steve Foss warns against a 'false grace' that licenses sin.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "True saving faith produces repentance, obedience, and transformation.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The Pharisee and the tax collector illustrate which contrast?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Law and grace",
          "Pride and repentance",
          "Jew and Gentile",
          "Rich and poor",
        ],
        correctAnswer: "1",
      },
      {
        question: "Assurance is confirmed by present fruit, not only past memory.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Common deceptions include false peace, false grace, and false security.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Repentance is best defined as:",
        type: "MULTIPLE_CHOICE",
        options: [
          "Feeling sorry",
          "A turn from sin to God",
          "Confessing to a priest",
          "Memorizing verses",
        ],
        correctAnswer: "1",
      },
    ],
  },
  {
    title: "Module 7 Quiz: Accounts in Hell",
    questions: [
      {
        question: "Bill Wiese's account emphasizes prison cells, demons, and the absence of hope.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Mary K. Baxter describes a guided tour of hell with Jesus over how many nights?",
        type: "MULTIPLE_CHOICE",
        options: ["10", "20", "30", "40"],
        correctAnswer: "3",
      },
      {
        question: "Kenneth E. Hagin discovered that church membership cannot save.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Edward T. Wiggins' warning came as a drug-addicted minister.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Dale Garrett's lived parable involved a meth explosion.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Emanuel Swedenborg wrote in which century?",
        type: "MULTIPLE_CHOICE",
        options: ["16th", "17th", "18th", "19th"],
        correctAnswer: "2",
      },
      {
        question: "The final authority for testing accounts is:",
        type: "MULTIPLE_CHOICE",
        options: [
          "Church tradition",
          "Personal experience",
          "Scripture",
          "Popular opinion",
        ],
        correctAnswer: "2",
      },
      {
        question: "Stephen Biro's 'Hellucination' explores psychedelic-induced hellscapes.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which biblical figure serves as an example of a 'hell' experience?",
        type: "MULTIPLE_CHOICE",
        options: ["Daniel", "Jonah", "Elijah", "Joseph"],
        correctAnswer: "1",
      },
      {
        question: "Mike Peralta's compilation collects first-person warnings from many continents.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 8 Quiz: Testing Testimonies",
    questions: [
      {
        question: "Contemporary testimonies can be treated as new revelation equal to Scripture.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Which passage commands testing every spirit?",
        type: "MULTIPLE_CHOICE",
        options: ["Deuteronomy 13", "1 John 4:1", "Galatians 1:8", "Hebrews 1:1-2"],
        correctAnswer: "1",
      },
      {
        question: "Accounts are emotionally powerful but theologically subordinate to Scripture.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Testing testimonies includes examining biblical alignment and fruit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Using testimonies in evangelism should never manipulate people.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 9 Quiz: Hell on Earth",
    questions: [
      {
        question: "Demonic oppression is a present-day foretaste of hell.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Believers have no authority over demons.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Win Worley taught deliverance as normal New Testament ministry.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which passage records Jesus casting a legion of demons into swine?",
        type: "MULTIPLE_CHOICE",
        options: ["Mark 1", "Mark 5", "Luke 10", "Ephesians 6"],
        correctAnswer: "1",
      },
      {
        question: "Garry Laser's model emphasizes that the 'old me' must die so Christ's nature replaces it.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Addiction and trauma can be connected to the gospel of deliverance.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "James 4:7 says to do what to the devil?",
        type: "MULTIPLE_CHOICE",
        options: ["Fear", "Ignore", "Resist", "Plead with"],
        correctAnswer: "2",
      },
      {
        question: "Deliverance ministry should be practiced safely and discerningly.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 10 Quiz: Evangelism and Compassion",
    questions: [
      {
        question: "Warning about hell is always an act of cruelty.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "The course advocates warning without terror and love without silence.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Paul's sermon in Athens demonstrates which evangelistic approach?",
        type: "MULTIPLE_CHOICE",
        options: ["Ranting", "Reasoning", "Manipulation", "Silence"],
        correctAnswer: "1",
      },
      {
        question: "Prayer and fasting are part of breaking spiritual strongholds.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "When people reject the gospel, Christians should respond with:",
        type: "MULTIPLE_CHOICE",
        options: [
          "Anger and shame",
          "Boundaries, grief, and hope",
          "Silence forever",
          "Threats",
        ],
        correctAnswer: "1",
      },
    ],
  },
  {
    title: "Module 11 Quiz: Living in Light of Eternity",
    questions: [
      {
        question: "Self-examination is a daily practice in light of eternity.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Mortification of sin means putting to death what is earthly.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Matthew 6:19-21 warns against storing up treasures where?",
        type: "MULTIPLE_CHOICE",
        options: ["On earth", "In heaven", "In the church", "In family"],
        correctAnswer: "0",
      },
      {
        question: "The hope of heaven makes the New Earth brighter.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "A 'rule of life' includes disciplines in prayer, study, witness, and holiness.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 12 Final Exam: Comprehensive Assessment",
    questions: [
      {
        question: "Which term is the Old Testament word for the realm of the dead?",
        type: "MULTIPLE_CHOICE",
        options: ["Gehenna", "Sheol", "Hades", "Tartarus"],
        correctAnswer: "1",
      },
      {
        question: "Jesus is the supreme authority on hell.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Traditionalism holds that the wicked suffer eternal conscious torment.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Conditionalism says immortality is inherent to every human soul.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "The course's final position affirms eternal, conscious punishment.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which chapter pairs 'eternal punishment' with 'eternal life'?",
        type: "MULTIPLE_CHOICE",
        options: ["Matthew 13", "Matthew 25", "Luke 16", "John 3"],
        correctAnswer: "1",
      },
      {
        question: "Bill Wiese's account is titled:",
        type: "MULTIPLE_CHOICE",
        options: [
          "A Divine Revelation of Hell",
          "23 Minutes in Hell",
          "I Went to Hell",
          "Hellucination",
        ],
        correctAnswer: "1",
      },
      {
        question: "Scripture, not experience, is the final authority for testing visions.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The cross displays both divine justice and mercy.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Salvation is by grace alone through faith alone in Christ alone.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Demons have final authority over believers in Christ.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "The course teaches that warning about hell can be an act of compassion.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which spiritual discipline helps break strongholds?",
        type: "MULTIPLE_CHOICE",
        options: ["Ignoring sin", "Prayer and fasting", "Avoidance", "Isolation"],
        correctAnswer: "1",
      },
      {
        question: "The capstone project includes a 30-Day Mission Plan.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The course ends with a commissioning prayer and a call to witness.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
];

const moduleAssignments: { title: string; content: string }[] = [
  {
    title: "Assignment: Prayer Journal on Resistance to Hell",
    content:
      "Spend 20 minutes in prayer and write a 300-word reflection: 'If I could erase one doctrine, would it be hell? Why?' Then write a short prayer of surrender to whatever Scripture says about judgment and mercy.",
  },
  {
    title: "Assignment: Personal Glossary of Judgment Vocabulary",
    content:
      "Create flashcards or digital notes for Sheol, Hades, Gehenna, Tartarus, the Lake of Fire, and the Second Death. Include a one-sentence definition and one key Scripture for each term.",
  },
  {
    title: "Assignment: Summary of Jesus' Teaching on Hell",
    content:
      "Write a one-page summary of Jesus' teaching on hell in your own words. Include at least five specific texts and explain what each adds to the whole picture. Memorize Matthew 10:28.",
  },
  {
    title: "Assignment: Four Views Comparison Chart + Essay",
    content:
      "Create a comparison chart of traditionalism, conditionalism, universalism, and purgatorial/metaphorical views. Then write a 250-word essay: 'Which view do you find most biblically persuasive, and why?' Have one respectful conversation with a believer who disagrees.",
  },
  {
    title: "Assignment: Letter to a Grieving Friend",
    content:
      "Write a draft letter (300 words) to a grieving friend who asks, 'How could God let my child go to hell?' Focus on God's justice, love, and the cross. Spend one hour in adoration meditating on God as both just and merciful.",
  },
  {
    title: "Assignment: Faith Inventory and Confession Plan",
    content:
      "Complete the Faith Inventory worksheet. Identify one area of unrepentant sin, bring it to confession, and tell a trusted believer for accountability. Write a one-paragraph action step.",
  },
  {
    title: "Assignment: Hell Accounts Comparison Matrix",
    content:
      "Complete the Hell Accounts Comparison Matrix for at least five accounts. Write a 300-word reflection on how Scripture should remain the final authority when evaluating visionary material.",
  },
  {
    title: "Assignment: Evaluate a Contemporary Hell Testimony",
    content:
      "Select one contemporary hell testimony and evaluate it using the Vision/Testimony Discernment Checklist. Write a 250-word critique covering biblical alignment, theological claims, and fruit.",
  },
  {
    title: "Assignment: Open Doors Self-Assessment and Closure Plan",
    content:
      "Complete the Open Doors Self-Assessment. Write a closure plan: remove or renounce one object, habit, or relationship that opens a door to darkness. Include a prayer of renunciation.",
  },
  {
    title: "Assignment: Gospel Presentation Practice",
    content:
      "Using the Gospel Presentation Outline, practice a 3-minute gospel conversation with a partner or in the mirror. Ask for feedback and complete the peer review form (or a self-review if alone).",
  },
  {
    title: "Assignment: Personal Rule of Life",
    content:
      "Draft a personal rule of life covering daily, weekly, and monthly disciplines in prayer, study, witness, and holiness. Implement one weekly discipline and one relational change this week.",
  },
  {
    title: "Assignment: 30-Day Mission Plan",
    content:
      "Create your 30-Day Mission Plan: identify three people to pray for daily, schedule at least two evangelistic conversations, choose Scripture memory verses, and name an accountability partner. Begin immediately upon completion.",
  },
];

function injectPlatformLessons(chapters: ParsedChapter[]): ParsedChapter[] {
  return chapters.map((chapter, idx) => {
    const moduleIdx = idx; // 0-based
    const readingLessons = chapter.lessons.filter((l) => l.type === "READING");

    const videoIntro: ParsedLesson = {
      type: "VIDEO",
      title: moduleIntroVideos[moduleIdx].title,
      order: 1,
      content: moduleIntroVideos[moduleIdx].content,
      duration: 300,
    };

    // Insert an IMAGE supplement roughly halfway through the reading lessons.
    const insertIndex = Math.ceil(readingLessons.length / 2);
    const imageSupplement: ParsedLesson = {
      type: "IMAGE",
      title: moduleImageSupplements[moduleIdx].title,
      order: 0, // reassigned below
      content: moduleImageSupplements[moduleIdx].content,
      duration: moduleImageSupplements[moduleIdx].duration,
    };

    const quizLesson: ParsedLesson = {
      type: "QUIZ",
      title: moduleQuizzes[moduleIdx].title,
      order: 0,
      content: `Complete the ${moduleQuizzes[moduleIdx].title} to check your understanding of this module.`,
      duration: 600,
    };

    const assignmentLesson: ParsedLesson = {
      type: "ASSIGNMENT",
      title: moduleAssignments[moduleIdx].title,
      order: 0,
      content: moduleAssignments[moduleIdx].content,
      duration: 900,
    };

    // Build ordered lesson list.
    const ordered: ParsedLesson[] = [videoIntro];
    readingLessons.forEach((lesson, i) => {
      ordered.push(lesson);
      if (i === insertIndex - 1) {
        ordered.push(imageSupplement);
      }
    });
    ordered.push(quizLesson);
    ordered.push(assignmentLesson);

    // Reassign order numbers.
    ordered.forEach((lesson, i) => {
      lesson.order = i + 1;
    });

    return { ...chapter, lessons: ordered };
  });
}

const hellTags = [
  { name: "hell", slug: "hell" },
  { name: "judgment", slug: "judgment" },
  { name: "evangelism", slug: "evangelism" },
  { name: "spiritual warfare", slug: "spiritual-warfare" },
  { name: "eschatology", slug: "eschatology" },
  { name: "doctrine", slug: "doctrine" },
  { name: "discipleship", slug: "discipleship" },
  { name: "gospel", slug: "gospel" },
  { name: "holiness", slug: "holiness" },
  { name: "eternity", slug: "eternity" },
];

async function seedTags(courseId: string) {
  for (const t of hellTags) {
    const tag = await db.tag.upsert({
      where: { slug: t.slug },
      update: {},
      create: { name: t.name, slug: t.slug },
    });
    await db.contentTag.upsert({
      where: { contentId_tagId: { contentId: courseId, tagId: tag.id } },
      update: {},
      create: { contentId: courseId, tagId: tag.id },
    });
  }
  console.log(`  Linked ${hellTags.length} tags`);
}

async function seedTrack(courseId: string, chapterLessonMap: Map<string, { id: string; type: string; title: string }[]>) {
  // Create a single 30-day guided track.
  const track = await db.courseTrack.create({
    data: {
      courseId,
      title: "Hell Course — 30-Day Mission Intensive",
      slug: "hell-30-day-mission",
      description:
        "A guided 30-day path through the Hell course. Each day includes Scripture reading, a prayer prompt, and integration with the module lessons, culminating in the 30-Day Mission Plan.",
      published: true,
      featured: true,
      order: 1,
    },
  });

  const chapterEntries = Array.from(chapterLessonMap.entries());

  const days = [
    { dayNumber: 1, title: "Surrender and Motives", scriptureReading: "Psalm 115:3; Isaiah 55:8-9", prayerPrompt: "Ask God to give you a teachable heart and love for the lost as you begin this study.", lessonIdx: 0 },
    { dayNumber: 2, title: "Reading the Bible We Wish Were Different", scriptureReading: "2 Timothy 2:15", prayerPrompt: "Confess any places where you have quietly resisted what Scripture says.", lessonIdx: 1 },
    { dayNumber: 3, title: "What Is at Stake", scriptureReading: "1 Thessalonians 5:21", prayerPrompt: "Pray for three people you know who do not yet trust Christ.", lessonIdx: 3 },
    { dayNumber: 4, title: "Sheol and Hades", scriptureReading: "Genesis 37:35; Psalm 16:10", prayerPrompt: "Thank God that He is sovereign over life and death.", lessonIdx: 1 },
    { dayNumber: 5, title: "Gehenna", scriptureReading: "Matthew 5:22, 29-30; Matthew 10:28", prayerPrompt: "Ask Jesus to help you take His warnings seriously.", lessonIdx: 2 },
    { dayNumber: 6, title: "The Rich Man and Lazarus", scriptureReading: "Luke 16:19-31", prayerPrompt: "Pray for compassion toward those separated from God.", lessonIdx: 5 },
    { dayNumber: 7, title: "Jesus, the Loving Savior, Warns of Wrath", scriptureReading: "Matthew 7:13-23", prayerPrompt: "Praise Jesus for speaking truth even when it is hard.", lessonIdx: 1 },
    { dayNumber: 8, title: "Parables of Separation", scriptureReading: "Matthew 13:24-50; Matthew 25:31-46", prayerPrompt: "Ask God to search your heart and confirm your faith is genuine.", lessonIdx: 3 },
    { dayNumber: 9, title: "John 3:16 and Perishing", scriptureReading: "John 3:16-18, 36", prayerPrompt: "Worship God for offering eternal life through Christ.", lessonIdx: 4 },
    { dayNumber: 10, title: "Mapping the Four Views", scriptureReading: "Matthew 25:46; Romans 6:23", prayerPrompt: "Ask God for humility and clarity as you study different views.", lessonIdx: 1 },
    { dayNumber: 11, title: "Conditional Immortality and the Soul", scriptureReading: "1 Timothy 6:16; Romans 6:23", prayerPrompt: "Pray for discernment to evaluate arguments by Scripture.", lessonIdx: 3 },
    { dayNumber: 12, title: "The Course Position", scriptureReading: "Revelation 14:10-11; Revelation 20:10", prayerPrompt: "Submit your own intuitions to the authority of God's Word.", lessonIdx: 6 },
    { dayNumber: 13, title: "Why Hell Offends the Mind", scriptureReading: "Exodus 34:6-7; Psalm 5:4-6", prayerPrompt: "Ask God to show you the unity of His love and justice.", lessonIdx: 1 },
    { dayNumber: 14, title: "God's Sovereignty and Human Responsibility", scriptureReading: "Romans 9:14-24", prayerPrompt: "Trust God with the mysteries you cannot fully resolve.", lessonIdx: 3 },
    { dayNumber: 15, title: "The Cross — Wrath and Mercy Meet", scriptureReading: "Romans 3:21-26", prayerPrompt: "Thank Jesus for bearing wrath so you could receive mercy.", lessonIdx: 6 },
    { dayNumber: 16, title: "The Offense of Sin", scriptureReading: "Romans 1:18-3:20", prayerPrompt: "Confess sin as rebellion against a holy God.", lessonIdx: 1 },
    { dayNumber: 17, title: "Faith Alone in Christ Alone", scriptureReading: "Ephesians 2:1-10", prayerPrompt: "Rejoice that salvation is by grace through faith.", lessonIdx: 3 },
    { dayNumber: 18, title: "Assurance and Self-Examination", scriptureReading: "2 Corinthians 13:5; 1 John 5:13", prayerPrompt: "Examine your own faith by its present fruit.", lessonIdx: 5 },
    { dayNumber: 19, title: "The Genre of Hell Accounts", scriptureReading: "2 Corinthians 12:1-4; 1 John 4:1", prayerPrompt: "Ask God for biblical discernment toward visionary claims.", lessonIdx: 1 },
    { dayNumber: 20, title: "Bill Wiese and Mary K. Baxter", scriptureReading: "Luke 16:19-31", prayerPrompt: "Pray that dramatic testimonies would drive people to Scripture.", lessonIdx: 2 },
    { dayNumber: 21, title: "Hagin, Wiggins, and Garrett", scriptureReading: "John 3:16; Romans 6:23", prayerPrompt: "Intercede for those trapped in addiction and false security.", lessonIdx: 4 },
    { dayNumber: 22, title: "Testing Every Account by Scripture", scriptureReading: "Deuteronomy 13:1-5; Galatians 1:8", prayerPrompt: "Commit to making Scripture, not experience, your final authority.", lessonIdx: 11 },
    { dayNumber: 23, title: "The Power and Peril of Experience", scriptureReading: "Jeremiah 14:14; Hebrews 1:1-2", prayerPrompt: "Ask God to protect you from elevating experience above Scripture.", lessonIdx: 1 },
    { dayNumber: 24, title: "Using Testimonies Without Manipulation", scriptureReading: "2 Corinthians 5:11-21", prayerPrompt: "Pray for a gospel witness that is urgent and compassionate.", lessonIdx: 5 },
    { dayNumber: 25, title: "The Demonic Realm", scriptureReading: "Mark 5:1-20; Ephesians 6:10-20", prayerPrompt: "Put on the full armor of God for today's battles.", lessonIdx: 1 },
    { dayNumber: 26, title: "Deliverance in the Local Church", scriptureReading: "James 4:7; 1 John 3:8", prayerPrompt: "Thank Jesus that He came to destroy the works of the devil.", lessonIdx: 6 },
    { dayNumber: 27, title: "Warning Without Terror; Love Without Silence", scriptureReading: "1 Peter 3:15-16", prayerPrompt: "Ask for boldness and gentleness in evangelism.", lessonIdx: 1 },
    { dayNumber: 28, title: "The Gospel in Three Minutes", scriptureReading: "Romans 10:9-17", prayerPrompt: "Identify one person you can share Christ with this week.", lessonIdx: 2 },
    { dayNumber: 29, title: "Living in Light of Eternity", scriptureReading: "Psalm 90:12; Ephesians 5:15-16", prayerPrompt: "Ask God to re-order your time, money, and relationships by eternity.", lessonIdx: 1 },
    { dayNumber: 30, title: "The 30-Day Mission Plan", scriptureReading: "Revelation 22:17, 20", prayerPrompt: "Commit your 30-Day Mission Plan to the Lord and begin today.", lessonIdx: 3 },
  ];

  let createdDays = 0;
  for (const day of days) {
    const chapterIdx = Math.min(day.dayNumber - 1, chapterEntries.length - 1);
    const chapterLessons = chapterEntries[chapterIdx]?.[1] ?? [];
    const lesson = chapterLessons[day.lessonIdx] ?? chapterLessons[chapterLessons.length - 1] ?? null;

    await db.trackDay.create({
      data: {
        trackId: track.id,
        dayNumber: day.dayNumber,
        title: day.title,
        scriptureReading: day.scriptureReading,
        prayerPrompt: day.prayerPrompt,
        lessonId: lesson?.id ?? null,
        hasQuiz: false,
        hasMentorCheckin: day.dayNumber % 7 === 0,
        order: day.dayNumber,
      },
    });
    createdDays++;
  }

  console.log(`  Created course track with ${createdDays} days`);
  return track.id;
}

async function main() {
  const md = readFileSync(HELL_MD_PATH, "utf-8");
  const { title, description, chapters: rawChapters } = parseHellMarkdown(md);

  // Inject video intros, image supplements, quizzes, and assignments.
  const chapters = injectPlatformLessons(rawChapters);

  const totalLessons = chapters.reduce((a, c) => a + c.lessons.length, 0);
  console.log(`Parsed ${chapters.length} parts with ${totalLessons} lessons (platform-enhanced)`);

  // Clean up any existing hell course
  const existing = await db.content.findUnique({ where: { slug: "hell" } });
  if (existing) {
    console.log("Removing existing hell course...");
    await db.content.delete({ where: { id: existing.id } });
  }

  // Create the course Content row
  const course = await db.content.create({
    data: {
      type: "COURSE",
      title,
      slug: "hell",
      description,
      published: true,
      featured: true,
      premium: true,
      order: 450,
      thumbnail: "https://hm8qhte0o7.ufs.sh/f/hell-cover-placeholder",
    },
  });

  console.log(`Created course: ${course.title} (${course.id})`);

  const chapterLessonMap = new Map<string, { id: string; type: string; title: string }[]>();

  for (const chapter of chapters) {
    const createdChapter = await db.courseChapter.create({
      data: {
        contentId: course.id,
        title: chapter.title,
        order: chapter.order,
      },
    });

    console.log(`  Part ${chapter.order}: ${chapter.title}`);

    const createdLessons: { id: string; type: string; title: string }[] = [];

    for (const lesson of chapter.lessons) {
      const createdLesson = await db.courseLesson.create({
        data: {
          chapterId: createdChapter.id,
          title: lesson.title,
          type: lesson.type,
          order: lesson.order,
          duration: lesson.duration,
          content: lesson.content,
          published: true,
          mediaUrl: lesson.type === "IMAGE" ? lesson.mediaUrl ?? null : null,
          videoUrl: lesson.type === "VIDEO" ? lesson.videoUrl ?? null : null,
        },
      });

      createdLessons.push({ id: createdLesson.id, type: lesson.type, title: lesson.title });

      // If this is a quiz lesson, create the Quiz and QuizQuestions.
      if (lesson.type === "QUIZ") {
        const quizSpec = moduleQuizzes[chapter.order - 1];
        if (quizSpec) {
          await db.quiz.create({
            data: {
              title: quizSpec.title,
              lessonId: createdLesson.id,
              questions: {
                create: quizSpec.questions.map((q, qi) => ({
                  question: q.question,
                  type: q.type,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  order: qi,
                })),
              },
            },
          });
          console.log(`      Created quiz with ${quizSpec.questions.length} questions`);
        }
      }
    }

    chapterLessonMap.set(createdChapter.id, createdLessons);
    console.log(`    Created ${chapter.lessons.length} lessons`);
  }

  // Tags
  await seedTags(course.id);

  // CourseTrack
  await seedTrack(course.id, chapterLessonMap);

  console.log("\n✅ Hell course seeded successfully.");
  console.log(`Visit: /courses/${course.slug}`);
  console.log("NOTE: VIDEO and IMAGE lesson URLs are placeholders. Upload media via the admin panel.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
