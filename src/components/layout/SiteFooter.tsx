import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="overflow-x-auto border-t border-white/5">
      <div className="mx-auto flex w-max items-center gap-3 whitespace-nowrap px-4 py-4 text-xs text-muted-foreground">
        <span>© 2026 MY HUB. All rights reserved.</span>
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
        <span aria-hidden="true">|</span>
        <span>
          Contact us at{' '}
          <a href="mailto:myhub@chetanmahajan.site" className="transition-colors hover:text-[#70eeff]">
            myhub@chetanmahajan.site
          </a>
        </span>
      </div>
    </footer>
  );
}
