import { profile } from "@/lib/content";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer site-width">
      <Link href="/">
        Sujal Jethva<span>Applied AI / LLM Engineer</span>
      </Link>
      <p>{profile.location} · Built with intent.</p>
      <a href="#main-content">Back to top ↑</a>
    </footer>
  );
}
