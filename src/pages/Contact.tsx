import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/layout/GlassCard';
import {
  Mail,
  User,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  Shield,
  Tag,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Server,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const RECIPIENT_EMAIL = 'myhub@combined.top';

const SUBJECT_PRESETS = [
  'General Inquiry',
  'Support & Bug Report',
  'VTC / Community Partnership',
  'Feature Suggestion',
  'Account & Link Issue',
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RECIPIENT_EMAIL);
      setCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Failed to copy email');
    }
  };

  const validate = () => {
    if (!name.trim()) {
      setError('Please provide your name or operator call sign.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address so we can communicate back.');
      return false;
    }
    if (!subject.trim()) {
      setError('Please specify a subject for your transmission.');
      return false;
    }
    if (!message.trim() || message.trim().length < 5) {
      setError('Please provide your main context / message (at least 5 characters).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          discordId: discordId.trim() || undefined,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        toast.success('Transmission successfully delivered to support!');
      } else {
        const errorMsg =
          data.error ||
          'Failed to send transmission. Please check SMTP settings or use the direct email link.';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setError(
        err.message ||
        'Unable to reach server. You can write directly to myhub@combined.top .'
      );
      toast.error('Transmission failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setDiscordId('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
    setError(null);
  };

  const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
    subject ? `[MY HUB] ${subject}` : 'Inquiry for MY HUB'
  )}&body=${encodeURIComponent(
    `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nDiscord ID: ${discordId || 'Not provided'
    }\n\nMain Context:\n${message || ''}`
  )}`;

  return (
    <div className="relative min-h-[calc(100vh-14rem)] py-4">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-12 right-0 h-96 w-96 rounded-full bg-[#70eeff]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-10 left-0 h-80 w-80 rounded-full bg-[#a855f7]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="group mb-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#70eeff]/70 transition-colors hover:text-[#70eeff]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div>
            <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
              Contact Us
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Connect with our team for support, partnerships, or telemetry inquiries.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard className="relative overflow-hidden border border-white/5 p-6 shadow-2xl md:p-8">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#70eeff] to-transparent opacity-60" />

              {submitted ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 text-center"
                >
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#5fff9a]/30 bg-[#5fff9a]/10 text-[#5fff9a]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-foreground">
                    Transmission Dispatched!
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Your message has been securely delivered to{' '}
                    <strong className="text-foreground">{RECIPIENT_EMAIL}</strong>. We will review
                    your request and reply back to{' '}
                    <span className="text-primary font-semibold">{email}</span>
                    {discordId ? ` or on Discord (${discordId})` : ''}.
                  </p>

                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-white/10"
                    >
                      Send Another Transmission
                    </button>
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
                    >
                      Return to Hub
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                      Transmission Parameters
                    </h2>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-[#e83553]/30 bg-[#e83553]/10 p-4 text-xs font-bold text-[#e83553]"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <p>{error}</p>
                          <div className="pt-1">
                            <a
                              href={mailtoUrl}
                              className="inline-flex items-center gap-1.5 underline hover:text-white"
                            >
                              Launch in email app (pre-filled)
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                    >
                      Your Name / Call Sign <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Chetan Mahajan or ApexDriver"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 font-heading text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 transition-all focus:border-[#70eeff]/50 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                      <label
                        htmlFor="contact-email"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <span className="text-[10px] text-primary/80 font-medium">
                        Used to communicate back
                      </span>
                    </div>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 font-heading text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 transition-all focus:border-[#70eeff]/50 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Discord ID (Optional) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                      <label
                        htmlFor="contact-discord"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Discord ID <span className="text-muted-foreground/60">(Optional)</span>
                      </label>
                      <span className="inline-flex items-center gap-1 rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-300">
                        <Sparkles size={10} />
                        For faster reply
                      </span>
                    </div>
                    <div className="relative">
                      <MessageCircle
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        id="contact-discord"
                        type="text"
                        value={discordId}
                        onChange={(e) => setDiscordId(e.target.value)}
                        placeholder="e.g. chetan#1234 or chetanm"
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 font-heading text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 transition-all focus:border-purple-400/50 focus:outline-none focus:ring-1 focus:ring-purple-400/50 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Subject field & Presets */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-subject"
                      className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                    >
                      Subject / Topic <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Tag
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. VTC Partnership or Feature suggestion"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 font-heading text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 transition-all focus:border-[#70eeff]/50 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 disabled:opacity-50"
                      />
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {SUBJECT_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSubject(preset)}
                          className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${subject === preset
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-white/5 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground'
                            }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main context / message field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                      <label
                        htmlFor="contact-message"
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                      >
                        Main Context / Message <span className="text-primary">*</span>
                      </label>
                      <span className="text-[10px] text-muted-foreground">
                        {message.length} characters
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Provide full context, telemetry inquiries, or questions..."
                        required
                        disabled={loading}
                        className="w-full resize-y rounded-xl border border-white/10 bg-black/40 p-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/30 transition-all focus:border-[#70eeff]/50 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary py-3.5 px-6 font-heading text-xs font-black uppercase tracking-widest text-black shadow-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                          <span>Transmitting via Mail...</span>
                        </>
                      ) : (
                        <>
                          <Send
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                          <span>Send Transmission</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>

          {/* Sidebar Cards (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Direct Support Gateway Card */}
            <GlassCard className="relative overflow-hidden border border-white/5 p-6 shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                    Support Gateway
                  </h3>
                  <p className="text-[10px] text-muted-foreground">Direct manual transmission</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-3">
                <a
                  href={`mailto:${RECIPIENT_EMAIL}`}
                  className="truncate font-mono text-xs font-semibold text-primary hover:underline"
                >
                  {RECIPIENT_EMAIL}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="ml-2 rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  {copied ? <Check size={14} className="text-[#5fff9a]" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="mt-3">
                <a
                  href={mailtoUrl}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-white/10"
                >
                  <ExternalLink size={14} />
                  Open in Mail Client (Pre-filled)
                </a>
              </div>
            </GlassCard>

            {/* Fast Reply with Discord */}
            <GlassCard className="relative overflow-hidden border border-white/5 p-6 shadow-xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                    Faster Response Option
                  </h3>
                  <p className="text-[10px] text-purple-300">Direct Discord messaging</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Providing your <strong className="text-foreground">Discord ID</strong> enables our operators to connect with you directly on Discord for quicker turnarounds, live debugging, and quick coordination.
              </p>
            </GlassCard>

            {/* Turnaround Expectations */}
            <GlassCard className="relative overflow-hidden border border-white/5 p-6 shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ok/20 bg-ok/10 text-ok">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                    Response Window
                  </h3>
                  <p className="text-[10px] text-muted-foreground">Estimated turnarounds</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span>General inquiries</span>
                  <span className="font-mono font-bold text-foreground">4-8 hours</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span>Bug & telemetry issues</span>
                  <span className="font-mono font-bold text-foreground">2-4 hours</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>With Discord ID</span>
                  <span className="font-mono font-bold text-purple-400">&lt; 4 hours</span>
                </li>
              </ul>
            </GlassCard>

            {/* Privacy Card */}
            <GlassCard className="relative overflow-hidden border border-white/5 p-6 shadow-xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-chart-2/20 bg-chart-2/10 text-chart-2">
                  <Shield size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                    Operator Privacy
                  </h3>
                  <p className="text-[10px] text-muted-foreground">Data Confidentiality</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Your contact details are processed solely to answer your inquiry. We never share your email or Discord ID. Review our{' '}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{' '}
                for full details.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
