import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 text-center text-xs text-muted-foreground">
        <span>© 2026 MY HUB. All rights reserved.</span>
        <span aria-hidden="true">|</span>
        <Link to="/contact" className="transition-colors hover:text-[#70eeff]">
          Contact Us
        </Link>
        <span aria-hidden="true">|</span>
        <Link to="/terms-of-service" className="transition-colors hover:text-[#70eeff]">
          Terms of Service
        </Link>
        <span aria-hidden="true">|</span>
        <Link to="/privacy-policy" className="transition-colors hover:text-[#70eeff]">
          Privacy Policy
        </Link>
        <span aria-hidden="true">|</span>
        <span>
          Built by{' '}
          <a
            href="https://chetanmahajan.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#70eeff]"
          >
            Chetan
          </a>{' '}
          <Heart aria-label="love" className="inline h-3 w-3 fill-yellow-400 text-yellow-400" />
        </span>
      </div>
    </footer>
  );
}
