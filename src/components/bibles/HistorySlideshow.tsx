"use client";

import { BibleAudioPlayer } from "./BibleAudioPlayer";
import { SlideshowModal } from "./SlideshowModal";

export function HistorySlideshow() {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <h3 className="font-serif text-2xl font-bold text-neutral-80">
          The History of the Bible — A Deep Dive
        </h3>
        <p className="text-neutral-60 leading-relaxed">
          This 50 minute audio journey walks through the full history of the biblical text — from
          the earliest Hebrew manuscripts and the Septuagint, through the formation of the New
          Testament canon, the age of the Church Fathers, the great codices, the Reformation-era
          translations, and the men and women who gave their lives so that Scripture could be
          preserved and proclaimed. Whether you are new to biblical history or a seasoned student,
          this recording offers an accessible, authoritative, and deeply moving account of how we
          came to hold the Word of God in our hands.
        </p>
      </div>

      {/* Audio player */}
      <div className="max-w-2xl mx-auto w-full">
        <BibleAudioPlayer
          src="/history-of-bible.mp3"
          title="History of the Bible · Canon · Martyrs"
        />
      </div>

      {/* Visual slideshow link */}
      <SlideshowModal />
    </div>
  );
}
