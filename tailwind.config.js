/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: "var(--surface)",
        elev: "var(--elev)",
        ok: "var(--ok)",
        bad: "var(--bad)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
        },
        cyan: "var(--accent-color)",
        green: "var(--ok)",
        amber: "var(--chart-2)",
        purple: "var(--chart-2)",
        hub: {
          navy: "var(--text)",
          cyan: "var(--accent-color)",
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
        'gradient-amber-rose': 'linear-gradient(135deg, var(--accent-color) 0%, var(--chart-2) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
