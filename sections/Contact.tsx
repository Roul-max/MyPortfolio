import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { socials } from '../data/portfolioData';
import { SocialIcon } from '../components/icons';
import { ToastVariant } from '../hooks/useToast';

interface ContactProps {
  showToast?: (message: string, variant?: ToastVariant) => void;
}

const Field: React.FC<{
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  rows?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}> = ({ id, label, value, error, type = 'text', rows, onChange, onBlur }) => {
  const shared = `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-600 ${error ? 'border-red-400 dark:border-red-400/70' : 'border-zinc-200 dark:border-white/[0.08]'}`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
        {label}
      </label>
      {rows ? (
        <textarea id={id} required rows={rows} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} placeholder={label} value={value} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)} onBlur={onBlur} className={`${shared} min-h-[120px] resize-none`} />
      ) : (
        <input id={id} required type={type} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} placeholder={label} value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} onBlur={onBlur} className={shared} />
      )}
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
};

const ContactIcon: React.FC<{ name: 'mail' | 'map' | 'calendar' | 'clock' | 'copy' | 'send' }> = ({ name }) => {
  const paths = {
    mail: <><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></>,
    map: <><path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    calendar: <><path d="M5 5h14v15H5z" /><path d="M8 3v4M16 3v4M5 10h14" /></>,
    clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></>,
    copy: <><path d="M8 8h10v12H8z" /><path d="M6 16H4V4h12v2" /></>,
    send: <><path d="m21 3-6.5 18-3.7-7.8L3 9.5 21 3Z" /><path d="m10.8 13.2 4.7-4.7" /></>,
  } satisfies Record<string, React.ReactNode>;

  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string; action?: React.ReactNode }> = ({ icon, label, value, action }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">{icon}</div>
    <div className="min-w-0">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-[#52525B]">{label}</p>
      <p className="break-words text-[16px] font-semibold text-zinc-800 dark:text-white">{value}</p>
    </div>
    {action}
  </div>
);

const Contact: React.FC<ContactProps> = ({ showToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const didToast = useRef(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const errors = {
    name: touched.name && formData.name.trim().length < 2 ? 'Enter at least 2 characters.' : '',
    email: touched.email && !emailValid ? 'Enter a valid email address.' : '',
    message: touched.message && formData.message.trim().length < 10 ? 'Message should be at least 10 characters.' : '',
  };
  const canSubmit = formData.name.trim().length >= 2 && emailValid && formData.message.trim().length >= 10;

  useEffect(() => {
    if (status === 'success' && !didToast.current) {
      showToast?.("Sent! I'll reply soon.", 'success');
      didToast.current = true;
    }
    if (status === 'idle') didToast.current = false;
  }, [showToast, status]);

  const copyEmail = (): void => {
    void navigator.clipboard.writeText('rohitkumarrrx@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!canSubmit) {
      showToast?.('Please complete the contact form first.', 'error');
      return;
    }
    setStatus('loading');

    try {
      const formBody = new URLSearchParams(formData);
      await fetch('https://script.google.com/macros/s/AKfycbz1gbs1S9V2b1And0XDAY3Fo_MT4O3Tm_vi3nuBe5EYBHr0EaUnHTf0fU376RDbEkrgjA/exec', {
        method: 'POST',
        body: formBody,
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      window.setTimeout(() => setStatus('idle'), 3000);
    } catch {
      showToast?.('Could not send right now. Please email me directly.', 'error');
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="scroll-mt-navbar theme-section relative overflow-hidden px-4 py-20 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute right-8 top-8 hidden select-none font-display text-[180px] font-black text-zinc-900 opacity-[0.025] dark:text-white md:block">08</div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_80%_90%,rgba(168,85,247,0.10),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="border-gradient-top theme-card relative overflow-hidden rounded-2xl p-5 md:p-10">
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[clamp(34px,8vw,64px)] font-black leading-[0.98] tracking-[-0.02em] text-zinc-900 dark:text-white">
                Let's make<br /><span className="text-gradient">something iconic.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-zinc-500 dark:text-[#71717A]">Open to full-time roles, freelance, and interesting collaborations.</p>

              <div className="mt-10 space-y-6">
                <InfoItem
                  icon={<ContactIcon name="mail" />}
                  label="Direct Mail"
                  value="rohitkumarrrx@gmail.com"
                  action={
                    <div className="relative ml-auto shrink-0">
                      <button type="button" onClick={copyEmail} aria-label="Copy email address" data-cursor="hover" className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:text-[#A1A1AA] dark:hover:bg-white/[0.06] dark:hover:text-white"><ContactIcon name="copy" /></button>
                      <span className={`absolute -right-3 -top-8 rounded bg-white px-2 py-1 text-xs text-black shadow-lg transition-opacity dark:bg-zinc-900 dark:text-white ${copied ? 'opacity-100' : 'opacity-0'}`}>Copied!</span>
                    </div>
                  }
                />
                <InfoItem icon={<ContactIcon name="map" />} label="Location" value="Noida, India - Remote-first" />
                <InfoItem icon={<ContactIcon name="calendar" />} label="Availability" value="Available from August 2025" />
                <InfoItem icon={<ContactIcon name="clock" />} label="Response Time" value="Responds within 24h" />
              </div>

              <div className="mt-10 flex gap-3">
                {socials.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} data-cursor="hover" className="grid h-11 w-11 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors hover:border-violet-500/30 hover:bg-violet-50 hover:text-[#A855F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-white dark:hover:bg-[rgba(124,58,237,0.1)]">
                    <SocialIcon name={social.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} className="glass-card rounded-2xl p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8">
              <div className="space-y-5">
                <Field id="name" label="Your Name" value={formData.name} error={errors.name} onChange={(name) => setFormData({ ...formData, name })} onBlur={() => handleBlur('name')} />
                <Field id="email" type="email" label="Email Address" value={formData.email} error={errors.email} onChange={(email) => setFormData({ ...formData, email })} onBlur={() => handleBlur('email')} />
                <Field id="message" label="Your Message" rows={5} value={formData.message} error={errors.message} onChange={(message) => setFormData({ ...formData, message })} onBlur={() => handleBlur('message')} />
                <button type="submit" disabled={status === 'loading'} data-cursor="hover" className={`flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_14px_34px_rgba(16,185,129,0.26)] transition-all hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-70 ${status === 'success' ? 'bg-[#16A34A]' : ''}`}>
                  {status === 'loading' ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : status === 'success' ? "Sent! I'll reply soon" : <><span>Send Message</span><ContactIcon name="send" /></>}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
