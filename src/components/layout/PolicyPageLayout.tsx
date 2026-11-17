import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type PolicyPageLayoutProps = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  children: ReactNode;
};

export function PolicyPageLayout({
  title,
  effectiveDate,
  lastUpdated,
  children,
}: PolicyPageLayoutProps) {
  return (
    <article className="container mx-auto max-w-4xl px-4 py-16">
      <Link to="/" className="mb-8 inline-flex items-center text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-surface p-8 md:p-12">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-transparent" />
        <header className="mb-8">
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mb-2 font-semibold text-primary">Effective Date: {effectiveDate}</p>
          <p className="font-semibold text-primary">Last Updated: {lastUpdated}</p>
        </header>
        <div className="policy-content space-y-8 leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </article>
  );
}
