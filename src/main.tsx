import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { isSupabaseConfigured } from './integrations/supabase/config'

const root = createRoot(document.getElementById('root')!);

if (isSupabaseConfigured) {
  import('./App.tsx').then(({ default: App }) => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
} else {
  root.render(
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <section role="alert" className="w-full max-w-lg rounded-[14px] border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm font-semibold text-primary">Setup required</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">Connect Supabase to preview the hub</h1>
        <p className="mt-3 text-muted-foreground">
          Add your project URL and anon or publishable key to <code>.env.local</code>, then restart the Vite server.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-md border border-border bg-bg p-4 text-xs text-foreground"><code>{'VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key'}</code></pre>
        <p className="mt-4 text-sm text-muted-foreground">
          Find these values in your Supabase project settings under API. Never use a service-role key in the browser.
        </p>
      </section>
    </main>,
  );
}
