'use client';

import { useCallback, useState } from 'react';
import {
  NosanaClaimFormState as FormState,
  nosanaClaimSchema as schema,
  validateNosanaClaimField as validateField,
} from '@/lib/validations';

const initial: FormState = {
  projectName: '',
  proposal: '',
  github: '',
  workload: '',
  deploy: '',
  team: '',
  socials: '',
  email: '',
  phone: '',
  country: '',
  agree: false,
};

function FormSection({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#ffffff]/14 bg-[#040c19]/78 backdrop-blur-[20px] shadow-[0_16px_70px_rgba(0,0,0,0.45),0_0_36px_rgba(0,255,136,0.08)]">
      <div className="relative px-5 py-4 bg-[#00ff88]/4">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8810_0%,transparent_70%)]" aria-hidden />
        <div className="relative flex items-center gap-3">
          <span className="w-7 h-7 rounded-full border border-[#00ff88] bg-[#00ff88]/14 shadow-[0_0_10px_rgba(0,255,136,0.42)] flex items-center justify-center font-mono text-xs font-bold text-[#00ff88] shrink-0">
            {String(step).padStart(2, '00')}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#00ff88]">{title}</span>
        </div>
      </div>
      <div className="px-6 md:px-8 py-6 space-y-5">{children}</div>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <p
      className={`font-mono text-xs mt-1.5 min-h-[1.25rem] tracking-[0.06em] ${
        msg ? 'text-red-300/80' : 'invisible'
      }`}
      aria-hidden={!msg}
    >
      {msg || '\u00a0'}
    </p>
  );
}

function FormField({
  name,
  error,
  className = '',
  onBlur,
  children,
}: {
  name: string;
  error?: string;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div data-field={name} className={className} onBlur={onBlur}>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-2">
      {children}
    </label>
  );
}

function CharCount({ current, max }: { current: number; max: number }) {
  return (
    <span
      className={`font-mono text-xs tabular-nums tracking-[0.06em] shrink-0 ${
        current >= max * 0.9 ? 'text-[#00ff88]/70' : 'text-neutral-600'
      }`}
      aria-live="polite"
    >
      {current}/{max}
    </span>
  );
}

function FieldLabelRow({
  htmlFor,
  count,
  children,
}: {
  htmlFor: string;
  count: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-2">
      <label htmlFor={htmlFor} className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400">
        {children}
      </label>
      {count}
    </div>
  );
}

function inputCls(invalid: boolean) {
  return [
    'w-full px-4 py-3 bg-transparent rounded-xl text-neutral-100 placeholder-neutral-600 text-sm',
    'focus:outline-none focus:ring-1 transition-colors duration-200 disabled:cursor-not-allowed border',
    invalid
      ? 'border-red-400/35 focus:border-red-400/50 focus:ring-red-400/10'
      : 'border-[#ffffff]/14 focus:border-[#00ff88]/50 focus:ring-[#00ff88]/20',
  ].join(' ');
}

function textareaCls(invalid: boolean) {
  return [
    'w-full px-4 py-3 bg-transparent rounded-xl text-neutral-100 placeholder-neutral-600 text-sm',
    'focus:outline-none focus:ring-1 transition-colors duration-200 resize-none leading-relaxed border',
    invalid
      ? 'border-red-400/35 focus:border-red-400/50 focus:ring-red-400/10'
      : 'border-[#ffffff]/14 focus:border-[#00ff88]/50 focus:ring-[#00ff88]/20',
  ].join(' ');
}

export default function NosanaClaimForm() {
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = useCallback(<K extends keyof FormState>(k: K, v: FormState[K]) => {
    setData((prev) => {
      const next = { ...prev, [k]: v };
      setErrors((errs) =>
        errs[k] ? { ...errs, [k]: validateField(k, next) ?? '' } : errs,
      );
      return next;
    });
  }, []);

  const touch = useCallback((key: keyof FormState, currentData: FormState) => {
    const msg = validateField(key, currentData) ?? '';
    if (msg) setErrors((e) => ({ ...e, [key]: msg }));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/claim/nosana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error('submission failed');
      setSuccess(true);
      setData(initial);
      setErrors({});
    } catch {
      setErrors((e) => ({ ...e, form: 'Something went wrong. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const inv = (k: keyof FormState) => Boolean(errors[k]);

  if (success) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-[#ffffff]/14 bg-[#040c19]/78 backdrop-blur-[20px]">
          <div className="px-6 sm:px-10 md:px-14 py-12 sm:py-14 text-center">
            <div className="w-14 h-14 rounded-full border border-[#00ff88]/40 bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-6">
              <i className="hn hn-check-solid text-2xl text-[#00ff88] inline-flex items-center justify-center leading-none" aria-hidden />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3 text-[#00ff88]/60">Submission received</p>
            <h3 className="text-2xl md:text-3xl text-white mb-4 leading-snug">Claim Submitted</h3>
            <p className="font-mono text-sm text-neutral-400 leading-relaxed">
              Our team will review your submission and email next steps for accessing your $70 in Nosana compute credits.
            </p>

            {/* Primary next step — make your $70 stretch */}
            <a
              href="#efficient-usage"
              onClick={() => setSuccess(false)}
              className="group mt-10 rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/[0.06] hover:bg-[#00ff88]/[0.1] hover:border-[#00ff88]/50 transition-all duration-300 px-5 py-4 flex items-center justify-between gap-4 text-left hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,255,136,0.12)]"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00ff88]/20 transition-colors">
                  <i className="hn hn-bolt-solid text-base text-[#00ff88] inline-block" aria-hidden />
                </div>
                <div className="min-w-0 text-left">
                  <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#00ff88] mb-0.5">Next up</p>
                  <p className="text-sm md:text-base text-white leading-snug group-hover:text-[#00ff88] transition-colors">
                    Read the usage guidelines to make your $70 stretch
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#00ff88] shrink-0 inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-1">
                <span className="hidden sm:inline">View guide</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            {/* Secondary — Nosana docs */}
            <div className="mt-4 rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/[0.02] px-5 py-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <p className="font-mono text-sm text-neutral-400">
                While you wait, get familiar with the network.
              </p>
              <a
                href="https://learn.nosana.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#00ff88] hover:text-white transition-colors duration-200"
              >
                Read the Nosana docs
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 hover:text-neutral-200 border-b border-neutral-700 hover:border-neutral-400 pb-px transition-all duration-200 cursor-pointer"
            >
              Submit another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>

        <FormSection step={1} title="Project Information">
          <FormField name="projectName" error={errors.projectName}>
            <FieldLabel htmlFor="projectName">Project Name</FieldLabel>
            <input
              id="projectName"
              className={inputCls(inv('projectName'))}
              value={data.projectName}
              onChange={(e) => set('projectName', e.target.value)}
              onBlur={() => touch('projectName', data)}
              maxLength={120}
              placeholder="My AI Project"
            />
          </FormField>

          <FormField name="proposal" error={errors.proposal}>
            <FieldLabelRow htmlFor="proposal" count={<CharCount current={data.proposal.length} max={5000} />}>
              Proposal Description
            </FieldLabelRow>
            <textarea
              id="proposal"
              rows={6}
              className={textareaCls(inv('proposal'))}
              value={data.proposal}
              onChange={(e) => set('proposal', e.target.value)}
              onBlur={() => touch('proposal', data)}
              maxLength={5000}
              placeholder="Describe your project, the problem it solves, and how you plan to build it."
            />
          </FormField>

          <FormField name="github" error={errors.github}>
            <FieldLabel htmlFor="github">GitHub Repository URL</FieldLabel>
            <input
              id="github"
              type="url"
              className={inputCls(inv('github'))}
              value={data.github}
              onChange={(e) => set('github', e.target.value)}
              onBlur={() => touch('github', data)}
              maxLength={300}
              placeholder="https://github.com/your-org/project"
            />
          </FormField>

          <FormField name="workload" error={errors.workload}>
            <FieldLabelRow htmlFor="workload" count={<CharCount current={data.workload.length} max={2000} />}>
              Model / Workload Details
            </FieldLabelRow>
            <textarea
              id="workload"
              rows={4}
              className={textareaCls(inv('workload'))}
              value={data.workload}
              onChange={(e) => set('workload', e.target.value)}
              onBlur={() => touch('workload', data)}
              maxLength={2000}
              placeholder="Model name, hardware requirements, runtime — e.g. Llama 3.1 8B fine-tune, ~40 GB VRAM, 6 h"
            />
          </FormField>
        </FormSection>

        <FormSection step={2} title="Nosana Deployment Commitment">
          <FormField
            name="deploy"
            error={errors.deploy}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) touch('deploy', data);
            }}
          >
            <FieldLabel htmlFor="deploy-yes">Do you plan to deploy or test your project on Nosana?</FieldLabel>
            <div className="flex gap-3">
              {(['yes', 'no'] as const).map((v) => (
                <label key={v} className="flex-1 cursor-pointer">
                  <div
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
                      data.deploy === v
                        ? 'border-[#00ff88]/50 bg-[#00ff88]/8 shadow-[0_0_12px_rgba(0,255,136,0.15)]'
                        : inv('deploy')
                          ? 'border-red-400/35 bg-[#ffffff]/3'
                          : 'border-[#ffffff]/14 bg-[#ffffff]/3 hover:border-[#00ff88]/25'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        data.deploy === v ? 'border-[#00ff88]' : 'border-[#ffffff]/30'
                      }`}
                    >
                      {data.deploy === v && <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />}
                    </span>
                    <input
                      type="radio"
                      name="deploy"
                      value={v}
                      id={`deploy-${v}`}
                      checked={data.deploy === v}
                      onChange={() => { set('deploy', v); }}
                      className="sr-only"
                    />
                    <span className="capitalize text-sm text-neutral-200 font-medium">{v}</span>
                  </div>
                </label>
              ))}
            </div>
          </FormField>
        </FormSection>

        <FormSection step={3} title="Team Information">
          <FormField name="team" error={errors.team}>
            <FieldLabel htmlFor="team">Team Members</FieldLabel>
            <input
              id="team"
              className={inputCls(inv('team'))}
              value={data.team}
              onChange={(e) => set('team', e.target.value)}
              onBlur={() => touch('team', data)}
              maxLength={500}
              placeholder="GitHub handles of all team members, separated by commas — @alice, @bob, @charlie"
            />
          </FormField>

          <FormField name="socials" error={errors.socials}>
            <FieldLabel htmlFor="socials">
              Social Links <span className="normal-case text-neutral-600">(optional)</span>
            </FieldLabel>
            <input
              id="socials"
              className={inputCls(inv('socials'))}
              value={data.socials}
              onChange={(e) => set('socials', e.target.value)}
              onBlur={() => touch('socials', data)}
              maxLength={500}
              placeholder="x.com/you, discord.gg/server, linkedin.com/in/you"
            />
          </FormField>
        </FormSection>

        <FormSection step={4} title="Contact Information">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField name="email" error={errors.email}>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={inputCls(inv('email'))}
                value={data.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => touch('email', data)}
                maxLength={255}
                placeholder="you@team.com"
              />
            </FormField>

            <FormField name="phone" error={errors.phone}>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={inputCls(inv('phone'))}
                value={data.phone}
                onChange={(e) => set('phone', e.target.value)}
                onBlur={() => touch('phone', data)}
                maxLength={40}
                placeholder="+1 555 000 0000"
              />
            </FormField>

            <FormField name="country" error={errors.country} className="sm:col-span-2">
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <input
                id="country"
                className={inputCls(inv('country'))}
                value={data.country}
                onChange={(e) => set('country', e.target.value)}
                onBlur={() => touch('country', data)}
                maxLength={80}
                placeholder="United States"
              />
            </FormField>
          </div>
        </FormSection>

        <FormSection step={5} title="Agreement">
          <FormField
            name="agree"
            error={errors.agree}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) touch('agree', data);
            }}
          >
            <div className="flex items-start gap-4">
              <button
                type="button"
                role="checkbox"
                aria-checked={data.agree}
                onClick={() => setData((d) => ({ ...d, agree: !d.agree }))}
                className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  data.agree
                    ? 'border-[#00ff88] bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.4)]'
                    : inv('agree')
                      ? 'border-red-400/50 bg-transparent'
                      : 'border-[#ffffff]/30 bg-transparent hover:border-[#00ff88]/50'
                }`}
              >
                {data.agree && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#020812" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-neutral-400 leading-relaxed">
                I confirm this submission is from one representative per team and that all information provided is accurate.
              </span>
            </div>
          </FormField>
        </FormSection>

        {errors.form && (
          <p className="font-mono text-xs text-red-300/80 text-center tracking-[0.06em]">{errors.form}</p>
        )}

        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] px-10 py-3.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] ${
              loading
                ? 'bg-[#ffffff]/12 text-neutral-500 cursor-not-allowed'
                : 'bg-[#00ff88] text-[#020812] font-bold shadow-[0_0_16px_rgba(0,255,136,0.4)] hover:shadow-[0_0_28px_rgba(0,255,136,0.65)] hover:scale-[1.02] cursor-pointer'
            }`}
          >
            {loading ? (
              <>
                <span className="w-3 h-3 rounded-full border border-t-transparent border-current animate-spin" />
                Submitting…
              </>
            ) : (
              <>Submit Claim</>
            )}
          </button>
          <p className="font-mono text-xs text-neutral-500 tracking-[0.08em]">
            Approved participants receive credit access instructions by email after review.
          </p>
        </div>

      </form>
    </div>
  );
}
