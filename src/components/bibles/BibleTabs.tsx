"use client";

import { useState } from "react";
import { BookOpen, Scroll, AlertCircle } from "lucide-react";
import { HistorySlideshow } from "./HistorySlideshow";

const TABS = ["History", "Verse Omissions"] as const;
type Tab = (typeof TABS)[number];

// ── Verse Omissions data ──────────────────────────────────────────────────────

interface OmittedVerse {
  reference: string;
  kjvText: string;
  reason: string;
  manuscriptEvidence: string;
  source: string;
  doctrineNotLost: string;
  stillTaughtIn: string;
}

const STANDARD_OMISSIONS: OmittedVerse[] = [
  {
    reference: "Matthew 17:21",
    kjvText: "Howbeit this kind goeth not out but by prayer and fasting.",
    reason:
      "This verse does not appear in the earliest and most reliable Greek manuscripts, including Codex Sinaiticus and Codex Vaticanus. Textual scholars believe it was borrowed by later scribes from a parallel passage in Mark 9:29 and inserted here to harmonize the two accounts. The principle of 'lectio brevior potior' (the shorter reading is generally preferred) supports its omission.",
    manuscriptEvidence:
      "Absent from ℵ (Sinaiticus), B (Vaticanus), and many other early witnesses. Present in the Majority Text and Byzantine tradition.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The doctrine is not lost. Matthew still teaches that the disciples failed because of little faith, and Mark 9:29 still preserves Jesus' teaching that this kind requires prayer. The combined witness still teaches dependence on God rather than self-reliant ministry.",
    stillTaughtIn: "Matthew 17:20; Mark 9:29; Luke 10:19",
  },
  {
    reference: "Matthew 18:11",
    kjvText: "For the Son of man is come to save that which was lost.",
    reason:
      "Missing from the best early manuscripts. This verse is nearly identical to Luke 19:10 and appears to be a scribal addition made to harmonize Matthew's Gospel with Luke's well-known saying. Harmonization — the tendency of scribes to fill in parallel sayings — is one of the most common sources of textual additions.",
    manuscriptEvidence:
      "Absent from ℵ, B, L, and several other significant manuscripts. Present in the Majority Text tradition.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "Nothing essential is removed. Jesus' mission to save the lost is taught clearly and repeatedly elsewhere. The omission only affects whether this exact sentence belongs in Matthew 18, not whether the truth itself is biblical.",
    stillTaughtIn: "Luke 19:10; Matthew 9:12–13; John 3:17",
  },
  {
    reference: "Matthew 23:14",
    kjvText:
      "Woe unto you, scribes and Pharisees, hypocrites! for ye devour widows' houses, and for a pretence make long prayer: therefore ye shall receive the greater damnation.",
    reason:
      "This 'woe' saying is absent from the earliest Greek manuscripts of Matthew. It appears to be borrowed from either Mark 12:40 or Luke 20:47 where similar language appears in context. Scribes familiar with the other Synoptic Gospels likely added it here to complete the series of woes in Matthew 23.",
    manuscriptEvidence:
      "Absent from ℵ, B, D, L, Z, and early versions. Found in later Byzantine manuscripts.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The warning against religious hypocrisy, exploitation, and showy prayer remains fully intact because the same rebuke stands in Mark and Luke. The issue is placement in Matthew, not whether Jesus ever said it.",
    stillTaughtIn: "Mark 12:40; Luke 20:47; Matthew 23:13, 15",
  },
  {
    reference: "Mark 7:16",
    kjvText: "If any man have ears to hear, let him hear.",
    reason:
      "This formulaic refrain — which Jesus uses repeatedly in the Gospels (Mark 4:9, 4:23) — appears to have been added here by scribes accustomed to seeing it after Jesus' teaching. Its very familiarity made it easy to insert unconsciously. The earliest manuscripts of Mark 7 do not include it.",
    manuscriptEvidence:
      "Absent from ℵ, B, L, and other major early witnesses. A classic example of scribal assimilation to a familiar formula.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "Nothing doctrinal is weakened. The call to spiritual hearing is repeatedly taught by Jesus in the Gospels. The passage still teaches the main point: defilement comes from within, not from food entering the body.",
    stillTaughtIn: "Mark 4:9; Mark 4:23; Mark 7:14–23",
  },
  {
    reference: "Mark 9:44",
    kjvText: "Where their worm dieth not, and the fire is not quenched.",
    reason:
      "This verse is an exact repetition of Mark 9:48, where Jesus quotes Isaiah 66:24 about the fires of Gehenna. In the oldest manuscripts, the phrase appears only once at verse 48. Scribes appear to have repeated it at verses 44 and 46 to create a three-part refrain for rhetorical emphasis, a practice called 'dittography.'",
    manuscriptEvidence:
      "Absent from ℵ, B, C, L, W, and other early manuscripts. Only in later Byzantine tradition.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The doctrine of judgment is not removed because verse 48 still contains the exact line. Modern translations are not denying hell or judgment; they are declining to print the same sentence three times where the earliest text likely had it once.",
    stillTaughtIn: "Mark 9:48; Isaiah 66:24; Matthew 25:46",
  },
  {
    reference: "Mark 9:46",
    kjvText: "Where their worm dieth not, and the fire is not quenched.",
    reason:
      "Identical in origin and evidence to Mark 9:44 — a scribal repetition of verse 48. The earliest manuscripts record the Isaiah 66:24 quotation only once (v. 48). The triple repetition in the Textus Receptus is a later liturgical or rhetorical expansion.",
    manuscriptEvidence:
      "Same manuscript evidence as 9:44 — absent from all major early witnesses.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "Again, the teaching is still present in verse 48. The omission does not soften Jesus' warning. It only removes what appears to be a duplicate line.",
    stillTaughtIn: "Mark 9:48; Isaiah 66:24; Revelation 14:11",
  },
  {
    reference: "Mark 11:26",
    kjvText:
      "But if ye do not forgive, neither will your Father which is in heaven forgive your trespasses.",
    reason:
      "This verse closely parallels Matthew 6:15 and appears to have been inserted here by scribes to harmonize Mark's account with Matthew's. The earliest and best Greek manuscripts of Mark end the passage at verse 25 without this addition.",
    manuscriptEvidence:
      "Absent from ℵ, B, L, W, and other significant early manuscripts. Found in later Byzantine texts.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The doctrine of forgiveness is untouched because Jesus teaches the same truth elsewhere beyond dispute. Mark 11 still emphasizes forgiving prayer, and Matthew 6 explicitly states the negative counterpart found in the KJV reading.",
    stillTaughtIn: "Mark 11:25; Matthew 6:14–15; Ephesians 4:32",
  },
  {
    reference: "Mark 15:28",
    kjvText: "And the scripture was fulfilled, which saith, And he was numbered with the transgressors.",
    reason:
      "This verse quotes Isaiah 53:12 and was likely added by scribes who wished to make the fulfillment of prophecy explicit in Mark's Passion narrative. Luke 22:37 uses the same Isaiah reference in a different context. The earliest Greek manuscripts of Mark 15 do not include it.",
    manuscriptEvidence:
      "Absent from ℵ, A, B, C, D, and many other early witnesses. A clear case of scribal theological expansion.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The fulfillment itself is not removed. Jesus being numbered with transgressors is still taught in Luke 22:37 and grounded in Isaiah 53:12. Modern translations are not denying prophecy; they are declining a likely explanatory gloss in Mark.",
    stillTaughtIn: "Isaiah 53:12; Luke 22:37; Mark 15:27",
  },
  {
    reference: "Luke 17:36",
    kjvText: "Two men shall be in the field; the one shall be taken, and the other left.",
    reason:
      "This verse is essentially identical to Matthew 24:40. It appears in only a handful of Western manuscripts of Luke and is almost universally considered a late harmonizing addition borrowed from Matthew's parallel passage. Its near-absence from the manuscript tradition of Luke is decisive.",
    manuscriptEvidence:
      "Present in only a few Western manuscripts. Absent from the vast majority of early Luke manuscripts.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The teaching about sudden separation at the coming of the Son of Man remains in the passage even without this line. Luke still gives two vivid examples, and Matthew still contains the field saying.",
    stillTaughtIn: "Luke 17:34–35; Matthew 24:40–41; Luke 17:26–30",
  },
  {
    reference: "Luke 23:17",
    kjvText: "For of necessity he must release one unto them at the feast.",
    reason:
      "This verse explaining the Passover custom of prisoner release is parallel to Matthew 27:15 and Mark 15:6. It is absent from the best early manuscripts of Luke, suggesting it was added to provide context that the other Gospels made explicit. The Western and Byzantine traditions added it in different positions, indicating independent additions.",
    manuscriptEvidence:
      "Absent from ℵ, B, and other early witnesses. Found in different locations in different manuscript families — a sure sign of scribal addition.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The historical setting is still plain from the broader passion narrative. Luke can still be understood without the explanatory sentence, and the same custom is explicitly described in Matthew and Mark.",
    stillTaughtIn: "Matthew 27:15; Mark 15:6; Luke 23:18–25",
  },
  {
    reference: "John 5:3b–4",
    kjvText:
      "…waiting for the moving of the water. For an angel went down at a certain season into the pool, and troubled the water: whosoever then first after the troubling of the water stepped in was made whole of whatsoever disease he had.",
    reason:
      "This explanatory addition is absent from the oldest and best manuscripts of John's Gospel. It appears to be a later scribal gloss inserted to explain the mysterious references to the pool and the man's statement in verse 7. Glosses — marginal notes explaining difficult passages — were sometimes accidentally or intentionally incorporated into the main text by later copyists.",
    manuscriptEvidence:
      "Absent from ℵ, B, C, D, and other major early papyri and codices. Supported only by later manuscripts and versions.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "This omission does not remove Christ's healing power or a biblical doctrine of healing. It simply means John probably did not write the explanatory note in the body of his Gospel. The man's desperation and Jesus' power to heal him remain unchanged.",
    stillTaughtIn: "John 5:5–9; John 5:7; John 9:1–7",
  },
  {
    reference: "Acts 8:37",
    kjvText:
      "And Philip said, If thou believest with all thine heart, thou mayest. And he answered and said, I believe that Jesus Christ is the Son of God.",
    reason:
      "This brief creedal exchange between Philip and the Ethiopian eunuch is absent from virtually all early Greek manuscripts of Acts. It is found in one 6th-century Latin manuscript and quoted by Irenaeus in the 2nd century. Scholars believe it was an early baptismal confession — a liturgical formula used in the early church — that a scribe inserted to fill out the narrative and provide the doctrinal basis for the eunuch's baptism.",
    manuscriptEvidence:
      "Absent from ℵ, A, B, C, and most early witnesses. Found in Codex E (Laudianus, 6th c.) and referenced by Irenaeus.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "The requirement of faith before baptism is still taught throughout Acts and the New Testament. The eunuch is already hearing the gospel and responding in faith, and confession of Christ is taught elsewhere clearly.",
    stillTaughtIn: "Acts 8:35–38; Acts 16:31–33; Romans 10:9–10",
  },
  {
    reference: "Acts 15:34",
    kjvText: "Notwithstanding it pleased Silas to abide there still.",
    reason:
      "This verse creates a tension with Acts 15:40, which says Paul chose Silas — but how could Paul choose Silas if Silas had already returned to Antioch (v. 33)? This addition appears to be a scribal attempt to solve the apparent contradiction by retaining Silas at Antioch. However, the earliest manuscripts do not have it, suggesting the tension was acceptable to the original author.",
    manuscriptEvidence:
      "Absent from ℵ, A, B, and other early witnesses. A classic scribal 'correction' of a perceived narrative problem.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "No doctrine is at stake here. This is a narrative clarification, not a teaching verse. Modern translations omit it because they judge it to be a later explanatory note rather than part of Luke's original text.",
    stillTaughtIn: "Acts 15:33; Acts 15:40; Acts 16:19",
  },
  {
    reference: "Acts 24:6b–8a (Acts 24:7)",
    kjvText:
      "…and would have judged according to our law. But the chief captain Lysias came upon us, and with great violence took him away out of our hands, commanding his accusers to come unto thee…",
    reason:
      "This expansion of Tertullus' speech before Felix elaborates on the role of Lysias in removing Paul. It is absent from the best early manuscripts and appears to be a scribal clarification that fills in details consistent with the Acts narrative elsewhere. Its addition disrupts the natural flow of verses 6–8 in the earliest text.",
    manuscriptEvidence:
      "Absent from ℵ, A, B, and most early manuscripts. A Western expansion.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "No doctrine disappears here either. The issue is simply whether Luke originally included this longer legal detail. The surrounding account still fully communicates Paul's trial before Felix.",
    stillTaughtIn: "Acts 23:26–30; Acts 24:1–9; Acts 25:1–5",
  },
  {
    reference: "Acts 28:29",
    kjvText:
      "And when he had said these words, the Jews departed, and had great reasoning among themselves.",
    reason:
      "This closing scene of Paul's encounter with Roman Jews is not found in the earliest manuscripts. It appears to be a scribal summary added to provide narrative closure to the encounter, following the stylistic pattern of other scene-endings in Acts. Its absence from early witnesses and its resemblance to similar scribal closures elsewhere make its lateness clear.",
    manuscriptEvidence:
      "Absent from ℵ, A, B, and other early and important manuscripts. Widely recognized as a late addition.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "Again, no doctrine is touched. The narrative already implies disagreement and division among Paul's hearers. The added sentence simply states explicitly what the context already suggests.",
    stillTaughtIn: "Acts 28:24–28; Acts 13:45–48",
  },
  {
    reference: "Romans 16:24",
    kjvText:
      "The grace of our Lord Jesus Christ be with you all. Amen.",
    reason:
      "This doxological benediction appears at different locations in different manuscript traditions — after 14:23, 15:33, or 16:20 — and sometimes appears twice. This instability in placement is a strong sign that it was a later liturgical addition inserted by scribes accustomed to ending Pauline letters with such a blessing. The earliest and best manuscripts of Romans do not contain it at 16:24.",
    manuscriptEvidence:
      "Text appears in various forms and positions across manuscripts; its instability confirms later scribal origin.",
    source: "Critical texts: NA28, UBS5",
    doctrineNotLost:
      "Nothing doctrinal is lost. Paul's letter still ends with grace-filled benedictions and a doxology. The omission only concerns whether this exact repeated line belongs at verse 24.",
    stillTaughtIn: "Romans 16:20; Romans 16:25–27; Galatians 6:18",
  },
  {
    reference: "1 John 5:7 (Comma Johanneum)",
    kjvText:
      "For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one.",
    reason:
      "This is the most theologically significant textual issue in the New Testament. The Trinitarian formula — the 'Comma Johanneum' — does not appear in any Greek manuscript before the 10th century. It originated as a marginal gloss in Latin manuscripts, likely composed to support Trinitarian theology against Arianism in North Africa (4th–5th century). It was gradually incorporated into the Latin Vulgate and eventually into a handful of late Greek manuscripts. Erasmus initially omitted it from his 1516 Greek NT but added it in 1522 under pressure when a Greek manuscript was produced (Codex Montfortianus, widely considered a forgery). The Textus Receptus, and thus the KJV, incorporated it. Modern critical editions unanimously omit it.",
    manuscriptEvidence:
      "Found in no Greek manuscript before the 10th century (except possibly Codex Montfortianus, a suspected 16th-century forgery). Absent from all early Latin manuscripts. The scholarly consensus is overwhelming.",
    source: "Critical texts: NA28, UBS5. See Metzger, 'A Textual Commentary on the Greek New Testament', pp. 647–649.",
    doctrineNotLost:
      "The Trinity does not stand or fall on this verse. Father, Son, and Holy Spirit are taught throughout the New Testament, but this particular wording is almost certainly not original to 1 John. A true doctrine does not need a spurious proof-text to remain true.",
    stillTaughtIn: "Matthew 28:19; John 1:1–14; 2 Corinthians 13:14",
  },
];

const DISPUTED_PASSAGES = [
  {
    reference: "Mark 16:9–20 (The Longer Ending of Mark)",
    kjvStatus: "Included in main text",
    modernStatus: "Usually bracketed, footnoted, or marked as textually disputed",
    explanation:
      "The two oldest complete manuscripts of the New Testament — Codex Sinaiticus (ℵ) and Codex Vaticanus (B), both from the 4th century — end the Gospel of Mark at 16:8 ('for they were afraid'). A number of early church fathers, including Clement of Alexandria, Origen, and Eusebius, appear unaware of any ending beyond 16:8. Jerome noted that the longer ending was absent from most Greek manuscripts known to him. Additionally, the vocabulary and style of 16:9–20 differ markedly from the rest of Mark — containing 18 words found nowhere else in Mark and several un-Markan grammatical constructions. A 'shorter ending' (a single sentence) also exists in some manuscripts, and some manuscripts contain both. The scholarly consensus is that 16:9–20 was composed by a later author to provide closure to what was perceived as an abrupt ending. Its doctrinal content — including snake-handling and speaking in tongues as signs of faith — has significant theological implications.",
  },
  {
    reference: "John 7:53–8:11 (Pericope Adulterae — The Woman Caught in Adultery)",
    kjvStatus: "Included in main text",
    modernStatus: "Usually bracketed, footnoted, or marked as textually disputed",
    explanation:
      "The story of the woman caught in adultery is one of the most beloved passages in the Gospels. However, it is absent from the earliest and best manuscripts of John's Gospel, including Papyrus 66 and Papyrus 75 (2nd–3rd century), Codex Sinaiticus, and Codex Vaticanus. No Greek commentator before the 12th century treats it as part of John's Gospel. Early church fathers commenting on John skip from 7:52 to 8:12 without mentioning it. Furthermore, the passage's vocabulary and style differ significantly from the rest of John's Gospel — scholars have noted over a dozen un-Johannine features. In some manuscripts, the story appears after John 7:36, in others after John 21:25, and in a few manuscripts it appears in Luke after 21:38. This instability of position strongly suggests it was a floating oral tradition — a well-known and beloved story about Jesus — that was eventually inserted into the manuscript tradition at different points. Most scholars believe the story reflects genuine historical tradition about Jesus but was not original to John's Gospel.",
  },
];

// ── History content ───────────────────────────────────────────────────────────

function HistoryContent() {
  return <HistorySlideshow />;
}

// ── Verse Omissions content ───────────────────────────────────────────────────

function VerseOmissionsContent() {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-900 text-sm font-semibold mb-1">Why are verses missing?</p>
          <p className="text-amber-800 text-sm leading-relaxed">
            Modern translations like the ESV, NIV, NASB, CSB, and NRSV are based on a broader set
            of manuscripts — including older, more reliable ones discovered after the KJV was
            completed in 1611. When early manuscripts consistently lack a passage, scholars conclude
            it was added later and move it to a footnote. These are not editorial decisions but
            evidence-based textual conclusions.
          </p>
        </div>
      </div>

      {/* Standard omissions table */}
      <div>
        <h3 className="font-serif text-xl font-bold text-neutral-80 mb-2">
          Verses Present in the KJV but Omitted or Footnoted in Modern Translations
        </h3>
        <p className="text-neutral-45 text-sm mb-6">
          The following verses appear in the KJV main text but are usually absent from the main text
          of ESV, NIV, NASB, CSB, and NRSV — typically moved to a footnote.
        </p>

        {/* Summary reference table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-20 mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-80 text-white">
                <th className="text-left px-4 py-3 font-semibold">Reference</th>
                <th className="text-center px-4 py-3 font-semibold">KJV</th>
                <th className="text-center px-4 py-3 font-semibold">ESV / NIV / NASB / CSB / NRSV</th>
              </tr>
            </thead>
            <tbody>
              {STANDARD_OMISSIONS.map((v, i) => (
                <tr key={v.reference} className={i % 2 === 0 ? "bg-white" : "bg-neutral-05"}>
                  <td className="px-4 py-3 font-medium text-neutral-80">{v.reference}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      In main text
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      Omitted or footnoted
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed explanations */}
        <div className="space-y-6">
          {STANDARD_OMISSIONS.map((verse) => (
            <div key={verse.reference} className="rounded-xl border border-neutral-20 overflow-hidden">
              <div className="bg-neutral-80 text-white px-5 py-3 flex items-center justify-between">
                <h4 className="font-serif font-bold">{verse.reference}</h4>
                <span className="text-white/50 text-xs">{verse.source}</span>
              </div>
              <div className="p-5 space-y-4">
                <blockquote className="border-l-4 border-amber-400 pl-4 italic text-neutral-60 text-sm leading-relaxed bg-amber-50/50 py-2 rounded-r-lg">
                  &ldquo;{verse.kjvText}&rdquo;
                  <footer className="mt-1 text-xs not-italic text-neutral-45">— KJV</footer>
                </blockquote>
                <div>
                  <h5 className="text-xs font-bold text-neutral-45 uppercase tracking-wider mb-1.5">
                    Why it is omitted
                  </h5>
                  <p className="text-neutral-60 text-sm leading-relaxed">{verse.reason}</p>
                </div>
                <div className="bg-neutral-05 border border-neutral-15 rounded-lg px-4 py-3">
                  <h5 className="text-xs font-bold text-neutral-45 uppercase tracking-wider mb-1">
                    Manuscript Evidence
                  </h5>
                  <p className="text-neutral-60 text-xs leading-relaxed">{verse.manuscriptEvidence}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <h5 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1.5">
                    Why the doctrine is not lost
                  </h5>
                  <p className="text-green-900 text-sm leading-relaxed">{verse.doctrineNotLost}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                  <h5 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1.5">
                    Still taught clearly in
                  </h5>
                  <p className="text-blue-900 text-sm font-medium">{verse.stillTaughtIn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disputed larger passages */}
      <div>
        <h3 className="font-serif text-xl font-bold text-neutral-80 mb-2">
          Larger Disputed Passages
        </h3>
        <p className="text-neutral-45 text-sm mb-6">
          These two larger passages are also in the KJV, but many modern translations bracket them,
          add extensive footnotes, or mark them as textually disputed rather than treating them the
          same as the surrounding text.
        </p>

        <div className="overflow-x-auto rounded-xl border border-neutral-20 mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-80 text-white">
                <th className="text-left px-4 py-3 font-semibold">Passage</th>
                <th className="text-center px-4 py-3 font-semibold">KJV</th>
                <th className="text-center px-4 py-3 font-semibold">ESV / NIV / NASB / CSB / NRSV</th>
              </tr>
            </thead>
            <tbody>
              {DISPUTED_PASSAGES.map((p, i) => (
                <tr key={p.reference} className={i % 2 === 0 ? "bg-white" : "bg-neutral-05"}>
                  <td className="px-4 py-3 font-medium text-neutral-80">{p.reference}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      In main text
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      Bracketed / disputed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          {DISPUTED_PASSAGES.map((passage) => (
            <div key={passage.reference} className="rounded-xl border border-neutral-20 overflow-hidden">
              <div className="bg-neutral-70 text-white px-5 py-3">
                <h4 className="font-serif font-bold">{passage.reference}</h4>
              </div>
              <div className="p-5">
                <p className="text-neutral-60 text-sm leading-relaxed">{passage.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing note */}
      <div className="bg-neutral-05 border border-neutral-20 rounded-xl p-6">
        <h4 className="font-serif font-bold text-neutral-80 mb-2">A Note on Textual Confidence</h4>
        <p className="text-neutral-60 text-sm leading-relaxed">
          The existence of these textual questions does not undermine confidence in Scripture. No
          cardinal doctrine of Christianity rests solely on any of these disputed passages — every
          major teaching is abundantly attested elsewhere in the manuscript tradition. The discipline
          of textual criticism exists precisely to protect the integrity of God&apos;s Word by carefully
          distinguishing the original text from later accretions. Regardless of translation, readers
          can be confident they hold God&apos;s Word in their hands.
        </p>
      </div>
    </div>
  );
}

// ── Main BibleTabs component ──────────────────────────────────────────────────

export function BibleTabs() {
  const [active, setActive] = useState<Tab>("History");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-neutral-20 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active === tab
                ? "border-neutral-80 text-neutral-80"
                : "border-transparent text-neutral-45 hover:text-neutral-60"
            }`}
          >
            {tab === "History" ? (
              <Scroll className="h-4 w-4" />
            ) : (
              <BookOpen className="h-4 w-4" />
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "History" ? <HistoryContent /> : <VerseOmissionsContent />}
    </div>
  );
}
