/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--border-strong)",
        ring: "var(--accent-text)",
        background: "var(--bg)",
        foreground: "var(--text)",
        primary: {
          DEFAULT: "var(--accent-text)",
          foreground: "var(--on-accent)",
        },
        secondary: {
          DEFAULT: "var(--elev)",
          foreground: "var(--text)",
        },
        muted: {
          DEFAULT: "var(--elev)",
          foreground: "var(--muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--on-accent)",
        },
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text)",
        },
        surface: "var(--surface)",
        elev: "var(--elev)",
        ok: "var(--ok)",
        bad: "var(--bad)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
        },
        cyan: "var(--accent-text)",
        green: "var(--ok)",
        amber: "var(--chart-2)",
        purple: "var(--chart-2)",
        hub: {
          navy: "var(--text)",
          cyan: "var(--accent-text)",
          green: "var(--ok)",
          purple: "var(--chart-2)",
          amber: "var(--chart-2)",
          rose: "var(--bad)",
          glass: "var(--surface)",
        }
      },
      fontFamily: {
        heading: ["Barlow Condensed", "sans-serif"],
        sans: ["Barlow", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius-card)",
        md: "var(--radius-ctl)",
        sm: "var(--radius-sm)",
      },
      maxWidth: {
        "7xl": "1080px",
      },
      backgroundImage: {
        'gradient-cyan-green': 'linear-gradient(135deg, var(--elev) 0%, var(--surface) 100%)',
        'gradient-amber-rose': 'linear-gradient(135deg, var(--accent-text) 0%, var(--chart-2) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
