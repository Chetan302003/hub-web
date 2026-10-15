import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemePreference, useTheme } from '@/hooks/useTheme';

const options: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { preference, setPreference } = useTheme();

  return (
    <div role="group" aria-label="Color theme" className={cn('inline-flex items-center gap-0.5 rounded-md border border-border bg-bg p-1', className)}>
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          title={`${label} theme`}
          aria-label={`${label} theme`}
          aria-pressed={preference === value}
          onClick={() => setPreference(value)}
          className={cn(
            'inline-flex h-8 items-center justify-center gap-1.5 rounded px-2 text-muted-foreground transition-colors hover:bg-elev hover:text-foreground',
            preference === value && 'bg-elev text-primary'
          )}
        >
          <Icon size={15} aria-hidden="true" />
          <span className="hidden md:inline text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
