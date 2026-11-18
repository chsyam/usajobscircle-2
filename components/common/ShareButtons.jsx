"use client";

import { Link2, Mail } from "lucide-react";
import { SocialIcon } from "./SocialIcons";
import { SITE } from "@/lib/constants";
import { toast } from "./Toast";

export default function ShareButtons({ path, title }) {
  const url = `${SITE.url}${path}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied to clipboard.");
    } catch {
      toast("Could not copy the link.");
    }
  };

  return (
    <div className="share" aria-label="Share">
      <a className="share__btn share__btn--facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <SocialIcon name="Facebook" size={15} />
      </a>
      <a className="share__btn share__btn--x" href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <SocialIcon name="X" size={14} />
      </a>
      <a className="share__btn share__btn--linkedin" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <SocialIcon name="LinkedIn" size={14} />
      </a>
      <a className="share__btn share__btn--email" href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email">
        <Mail size={15} />
      </a>
      <button type="button" className="share__btn share__btn--copy" onClick={copy} aria-label="Copy link">
        <Link2 size={15} />
      </button>
    </div>
  );
}
