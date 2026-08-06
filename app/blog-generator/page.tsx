'use client';

// ── DEV TOGGLE ───────────────────────────────────────────────────────────────
// Set to true to skip the email/OTP verification step while testing locally.
const SKIP_EMAIL_STEP = false;
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import TopicSelector from '../components/TopicSelector';
import AIModelSelector from '../components/AIModelSelector';
import OTPInput from '../components/OTPInput';
import { sendVerificationCode, verifyCode } from '@/lib/verificationApi';
import { createDraft } from '@/lib/decentralizeApi';
import { useVoiceDictation } from '../hooks/useVoiceDictation';

interface BlogData {
  topic: string;
  customTopic: string;
  email: string;
  problem: string;
  uniquePerspective: string;
  practicalApproach: string;
  readerRelevance: string;
  futureVision: string;
  model: string;
}

const MIN_CHARS = 20;
const MOBILE_MAX_WIDTH_QUERY = '(max-width: 767px)';

const STEP_GROUPS = SKIP_EMAIL_STEP
  ? [
      { id: 'topic', label: 'TOPIC', start: 1, end: 1 },
      { id: 'context', label: 'CONTEXT', start: 3, end: 4 },
      { id: 'strategy', label: 'STRATEGY', start: 5, end: 7 },
      { id: 'model', label: 'MODEL', start: 8, end: 8 },
    ]
  : [
      { id: 'topic', label: 'TOPIC', start: 1, end: 1 },
      { id: 'contact', label: 'EMAIL', start: 2, end: 2 },
      { id: 'context', label: 'CONTEXT', start: 3, end: 4 },
      { id: 'strategy', label: 'STRATEGY', start: 5, end: 7 },
      { id: 'model', label: 'MODEL', start: 8, end: 8 },
    ];

const STEP_META: Record<number, { heading: string; subtext: string; placeholder?: string }> = {
  1: {
    heading: 'What\'s your angle on decentralized AI?',
    subtext: 'Choose a topic or bring your own — we\'ll scaffold a full HackerNoon draft.',
  },
  2: {
    heading: 'Where should we send your draft?',
    subtext: 'We\'ll deliver the generated blog post straight to your inbox.',
    placeholder: 'you@example.com',
  },
  3: {
    heading: 'What\'s broken?',
    subtext: 'Where is centralized AI failing people? Name the companies, patterns, real costs.',
    placeholder: 'Where is centralized AI failing people? Be specific — name the companies, the patterns, the real costs...',
  },
  4: {
    heading: 'What do you see that others miss?',
    subtext: 'Your contrarian take — the angle nobody\'s talking about.',
    placeholder: 'Your contrarian take, the angle nobody\'s talking about, the thing that seems obvious to you but isn\'t...',
  },
  5: {
    heading: 'How do we actually do this?',
    subtext: 'Protocols, tools, projects that could actually work.',
    placeholder: 'Protocols, tools, projects, approaches that could actually work — be concrete, not theoretical...',
  },
  6: {
    heading: 'Why should they care?',
    subtext: 'What does decentralized AI mean for their work, data, future?',
    placeholder: 'Make it real for the reader — what does this mean for their work, their data, their future?',
  },
  7: {
    heading: 'Where do you see this by 2030?',
    subtext: 'Paint the picture of a decentralized AI future.',
    placeholder: 'Paint the picture — what does a decentralized AI future actually look like if we get this right?',
  },
  8: {
    heading: 'Pick your AI engine:',
    subtext: 'Choose the open-source model that will write your blog draft.',
  },
};

type EmailVerifyState = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'error';
type GenState = 'idle' | 'generating' | 'done' | 'error';

export default function BlogGeneratorPage() {
  const [step, setStep] = useState(1);

  const [blogData, setBlogData] = useState<BlogData>({
    topic: '',
    customTopic: '',
    email: '',
    problem: '',
    uniquePerspective: '',
    practicalApproach: '',
    readerRelevance: '',
    futureVision: '',
    model: 'gpt-oss-120b',
  });

  // ── Email verification state (step 2) ──
  const [otp, setOtp] = useState('');
  const [emailOtpActive, setEmailOtpActive] = useState(false);
  const [emailVerifyState, setEmailVerifyState] = useState<EmailVerifyState>('idle');
  const [emailVerifyError, setEmailVerifyError] = useState<string | null>(null);

  // ── Draft generation state (step 8) ──
  const [genState, setGenState] = useState<GenState>('idle');
  const [genError, setGenError] = useState<string | null>(null);
  const [draftUrl, setDraftUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MAX_WIDTH_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // ── Voice dictation (steps 3–7) ──
  const fieldKeyForStep = (s: number): keyof BlogData | null => {
    if (s === 3) return 'problem';
    if (s === 4) return 'uniquePerspective';
    if (s === 5) return 'practicalApproach';
    if (s === 6) return 'readerRelevance';
    if (s === 7) return 'futureVision';
    return null;
  };

  const fieldKey = fieldKeyForStep(step);

  const {
    isListening,
    speechSupported,
    speechError,
    stopListening,
    toggleListening,
    updateBaseText,
  } = useVoiceDictation({
    onTranscriptChange: (text) => {
      if (fieldKey) {
        setBlogData((prev) => ({ ...prev, [fieldKey]: text }));
      }
    },
  });
  const [preDictationText, setPreDictationText] = useState<string>('');

  const startDictationFlow = (initialText: string) => {
    setPreDictationText(initialText);
    toggleListening(initialText);
  };

  const confirmDictation = () => {
    stopListening();
  };

  const cancelDictation = () => {
    if (fieldKey) {
      setBlogData((prev) => ({ ...prev, [fieldKey]: preDictationText }));
    }
    stopListening();
  };
  // Stop dictation when changing steps
  useEffect(() => {
    if (isListening) stopListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleSendCode = () => {
    setEmailOtpActive(true);
    setEmailVerifyState('sending');
    setEmailVerifyError(null);
    sendVerificationCode(blogData.email)
      .then((res) => {
        if (res.ok) setEmailVerifyState('sent');
        else { setEmailVerifyState('error'); setEmailVerifyError(res.msg ?? 'Failed to send code.'); }
      })
      .catch(() => { setEmailVerifyState('error'); setEmailVerifyError('Network error. Please try again.'); });
  };

  const handleResend = () => {
    setOtp('');
    setEmailVerifyState('sending');
    setEmailVerifyError(null);
    sendVerificationCode(blogData.email)
      .then((res) => {
        if (res.ok) setEmailVerifyState('sent');
        else { setEmailVerifyState('error'); setEmailVerifyError(res.msg ?? 'Failed to send code.'); }
      })
      .catch(() => { setEmailVerifyState('error'); setEmailVerifyError('Network error. Please try again.'); });
  };

  const handleEmailVerify = async () => {
    if (otp.length < 6 || emailVerifyState === 'verifying') return;
    setEmailVerifyState('verifying');
    setEmailVerifyError(null);
    try {
      const res = await verifyCode(blogData.email, otp);
      if (res.ok) {
        setEmailVerifyState('verified');
      } else {
        setEmailVerifyState('sent');
        setEmailVerifyError(res.msg ?? 'Invalid code. Please try again.');
      }
    } catch {
      setEmailVerifyState('sent');
      setEmailVerifyError('Network error. Please try again.');
    }
  };

  const runDraftGeneration = async () => {
    setGenState('generating');
    setGenError(null);
    try {
      const draftRes = await createDraft({
        email: blogData.email,
        verificationCode: otp,
        topic: blogData.topic,
        customTopic: blogData.customTopic,
        problem: blogData.problem,
        uniquePerspective: blogData.uniquePerspective,
        practicalApproach: blogData.practicalApproach,
        readerRelevance: blogData.readerRelevance,
        futureVision: blogData.futureVision,
        model: blogData.model,
      });

      if (draftRes.ok && draftRes.draftId) {
        // Prefer whatever URLs your own backend returns. As a fallback, build
        // one from NEXT_PUBLIC_PUBLISHING_PLATFORM_URL (see .env.example) —
        // set this to your own blogging/publishing platform's base URL.
        const platformUrl = process.env.NEXT_PUBLIC_PUBLISHING_PLATFORM_URL?.replace(/\/$/, '');
        const directUrl =
          draftRes.draftUrl ?? (platformUrl ? `${platformUrl}/articles/${draftRes.draftId}` : null);
        const openUrl = draftRes.loginUrl ?? directUrl;

        setDraftUrl(directUrl);
        setGenState('done');
        if (openUrl) {
          window.open(openUrl, '_blank', 'noopener,noreferrer');
        }
      } else {
        setGenState('error');
        setGenError(draftRes.msg ?? 'Draft creation failed.');
      }
    } catch {
      setGenState('error');
      setGenError('Network error during draft generation.');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return blogData.topic || blogData.customTopic.trim();
      case 2: return SKIP_EMAIL_STEP || emailVerifyState === 'verified';
      case 3: return blogData.problem.trim().length > MIN_CHARS;
      case 4: return blogData.uniquePerspective.trim().length > MIN_CHARS;
      case 5: return blogData.practicalApproach.trim().length > MIN_CHARS;
      case 6: return blogData.readerRelevance.trim().length > MIN_CHARS;
      case 7: return blogData.futureVision.trim().length > MIN_CHARS;
      case 8: return !!blogData.model;
      default: return false;
    }
  };

  const goNext = () => {
    if (!canProceed() || step >= 8) return;
    // Skip step 2 (email) when SKIP_EMAIL_STEP is enabled
    const nextStep = SKIP_EMAIL_STEP && step === 1 ? 3 : step + 1;
    setStep(nextStep);
  };

  const goBack = () => {
    if (step === 2 && emailOtpActive) {
      setEmailOtpActive(false);
      setOtp('');
      setEmailVerifyState('idle');
      setEmailVerifyError(null);
    } else if (step > 1) {
      // Skip step 2 (email) when SKIP_EMAIL_STEP is enabled
      const prevStep = SKIP_EMAIL_STEP && step === 3 ? 1 : step - 1;
      setStep(prevStep);
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const target = e.target as HTMLElement;
        const isTextarea = target?.tagName === 'TEXTAREA';
        const isInput = target?.tagName === 'INPUT';
        const isMobileViewport = window.matchMedia(MOBILE_MAX_WIDTH_QUERY).matches;

        if (isMobileViewport) {
          // On mobile, Enter should not advance steps — allow native textarea newlines
          return;
        }

        if (isTextarea) {
          if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            if (canProceed()) {
              goNext();
            }
          }
          return;
        }

        if (isInput) {
          // Allow input element's own onKeyDown logic to run (e.g. email and OTP verification)
          return;
        }

        if (target?.tagName === 'BUTTON') {
          // Allow button's default or custom onKeyDown logic to run
          return;
        }

        // For all other focus contexts (including body or unmounted elements)
        if (canProceed()) {
          e.preventDefault();
          if (step < 8) {
            goNext();
          } else if (step === 8) {
            if (genState === 'idle') {
              runDraftGeneration();
            } else if (genState === 'error') {
              runDraftGeneration();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [step, emailVerifyState, genState, blogData, otp]);

  const meta = STEP_META[step];
  const ready = !!canProceed();
  const activeGroupIndex = STEP_GROUPS.findIndex((group) => step >= group.start && step <= group.end);

  const currentTextareaValue = () => {
    if (step === 3) return blogData.problem;
    if (step === 4) return blogData.uniquePerspective;
    if (step === 5) return blogData.practicalApproach;
    if (step === 6) return blogData.readerRelevance;
    return blogData.futureVision;
  };

  const charCounter = (value: string) => {
    const len = value.trim().length;
    const isReady = len > MIN_CHARS;
    return (
      <div className="flex items-center justify-between px-1 mt-1.5">
        <span className={`font-mono text-[10px] transition-colors duration-200 ${isReady ? 'text-[#00ff88]/80' : 'text-neutral-400'}`}>
          {isReady ? '✓ looks good' : `${Math.max(0, MIN_CHARS - len)} more characters to unlock`}
        </span>
        <span className="font-mono text-[10px] text-neutral-500 tabular-nums">{len}</span>
      </div>
    );
  };

  const pageHeading = step === 2 && emailOtpActive ? 'Check your inbox.' : meta.heading;

  // ── Form screen ───────────────────────────────────────────────────────────
  return (
    <section 
      className="relative min-h-screen pt-32 pb-12 md:pt-40 md:pb-16 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* layered background */}
      <div className="absolute inset-0 pointer-events-none z-0 blog-generator-bg opacity-95" aria-hidden />
      <div className="absolute inset-0 pointer-events-none z-0 blog-generator-vignette" aria-hidden />

      {/* ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[360px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(0,255,136,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
        aria-hidden
      />

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6">

        {/* Question heading — above the card */}
        <div className="text-center mb-8 sm:mb-10 px-2 max-w-7xl mx-auto">
          <div key={`heading-${step}-${emailOtpActive}`} className="question-reveal">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
              {pageHeading}
            </h2>
          </div>
        </div>

        {/* The card */}
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[#ffffff]/14 bg-[#040c19]/78 backdrop-blur-[20px] shadow-[0_16px_70px_rgba(0,0,0,0.45),0_0_36px_rgba(0,255,136,0.08)]">

          {/* Step tab row */}
          <div className="relative w-full px-5 py-5 rounded-t-2xl rounded-b-none border-b border-[#00ff88]/12 bg-[#00ff88]/4 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8810_0%,transparent_70%)]" aria-hidden />
            <div className="relative flex items-center justify-center gap-0 overflow-x-auto scrollbar-none">
              {STEP_GROUPS.map((group, i) => {
                const isActive = step >= group.start && step <= group.end;
                const isDone = group.end < step;
                return (
                  <div key={group.id} className="flex items-center shrink-0">
                    <button
                      onClick={() => { if (isDone) setStep(group.start); }}
                      disabled={!isDone && !isActive}
                      className={`flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] transition-all duration-200 cursor-default focus-visible:outline-none ${isActive
                          ? 'text-[#00ff88]'
                          : isDone
                            ? 'text-[#99ffd2] hover:text-[#c6ffe8] cursor-pointer'
                            : 'text-neutral-400'
                        }`}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${isActive
                          ? 'border-[#00ff88] bg-[#00ff88]/14 shadow-[0_0_10px_rgba(0,255,136,0.42)]'
                          : isDone
                            ? 'border-[#4affad]/60 bg-[#00ff88]/10'
                            : 'border-[#ffffff]/20 bg-[#ffffff]/4'
                        }`}>
                        {isDone ? (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0">
                            <path d="M1.5 4L3.2 5.7L6.5 2.5" stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                        ) : null}
                      </span>
                      <span className="hidden sm:inline">{group.label}</span>
                    </button>
                    {i < STEP_GROUPS.length - 1 && (
                      <div className={`mx-1.5 sm:mx-2 h-px w-4 sm:w-6 transition-colors duration-300 shrink-0 ${i < activeGroupIndex ? 'bg-[#00ff88]/45' : 'bg-[#ffffff]/16'
                        }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Input area */}
          <div className="p-5 pt-7">
            <div>
              {/* Step 1: Topic */}
              {step === 1 && (
                <TopicSelector
                  selectedTopic={blogData.topic}
                  customTopic={blogData.customTopic}
                  onSelectTopic={(topic) => setBlogData({ ...blogData, topic, customTopic: '' })}
                  onCustomTopicChange={(value) => setBlogData({ ...blogData, customTopic: value, topic: '' })}
                  onEnter={isMobile ? undefined : goNext}
                />
              )}

              {/* Step 2: Email input phase */}
              {step === 2 && !emailOtpActive && (
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                      <i className="hn hn-envelope-solid text-base text-neutral-400 inline-block" aria-hidden />
                    </div>
                    <input
                      type="email"
                      value={blogData.email}
                      onChange={(e) => setBlogData({ ...blogData, email: e.target.value })}
                      placeholder={meta.placeholder}
                      onKeyDown={(e) => { if (e.key === 'Enter' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(blogData.email)) handleSendCode(); }}
                      className="w-full pl-11 pr-5 py-4 text-neutral-100 placeholder-neutral-500 focus:outline-none bg-transparent border-b border-[#ffffff]/18 focus:border-[#00ff88]/55 transition-colors duration-200 text-base"
                      autoFocus
                    />
                  </div>

                  {blogData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(blogData.email) && (
                    <p className="font-mono text-[10px] text-red-300/90 tracking-widest">
                      Enter a valid email address
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: OTP verification phase */}
              {step === 2 && emailOtpActive && (
                <div className="flex flex-col items-center gap-6 py-4">
                  {emailVerifyState === 'sending' && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-[#00ff88]/30 border-t-[#00ff88] animate-spin" />
                      <p className="font-mono text-xs text-neutral-400 tracking-widest">
                        Sending code to <span className="text-[#00ff88]">{blogData.email}</span>…
                      </p>
                    </div>
                  )}

                  {(emailVerifyState === 'sent' || emailVerifyState === 'verifying' || emailVerifyState === 'error') && (
                    <>
                      <p className="font-mono text-[11px] text-neutral-400 tracking-widest text-center">
                        Code sent to <span className="text-[#00ff88]">{blogData.email}</span>
                      </p>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        disabled={emailVerifyState === 'verifying'}
                        hasError={!!emailVerifyError}
                        onEnter={handleEmailVerify}
                      />
                      {emailVerifyError && (
                        <p className="font-mono text-[10px] text-red-300/90 tracking-widest text-center">{emailVerifyError}</p>
                      )}
                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={handleEmailVerify}
                          disabled={otp.length < 6 || emailVerifyState === 'verifying'}
                          className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none ${
                            otp.length === 6 && emailVerifyState !== 'verifying'
                              ? 'bg-[#00ff88] text-[#020812] shadow-[0_0_16px_rgba(0,255,136,0.4)] hover:shadow-[0_0_24px_rgba(0,255,136,0.6)] hover:scale-105 cursor-pointer font-semibold'
                              : 'bg-[#ffffff]/10 border border-[#ffffff]/16 text-neutral-400 cursor-not-allowed'
                          }`}
                        >
                          {emailVerifyState === 'verifying' ? 'Verifying…' : 'Verify →'}
                        </button>
                        <button
                          onClick={handleResend}
                          disabled={emailVerifyState === 'verifying'}
                          className="font-mono text-[10px] text-neutral-500 hover:text-[#00ff88] transition-colors cursor-pointer underline underline-offset-4 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Resend code
                        </button>
                      </div>
                    </>
                  )}

                  {emailVerifyState === 'verified' && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00ff88]/12 border border-[#00ff88]/30 flex items-center justify-center shadow-[0_0_18px_rgba(0,255,136,0.2)]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="font-mono text-[11px] text-[#00ff88] tracking-widest">Email verified — hit next to continue</p>
                    </div>
                  )}
                </div>
              )}

              {/* Steps 3–7: Textarea */}
              {step >= 3 && step <= 7 && (
                <div>
                  <div className="relative">
                    <textarea
                      onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') goNext(); }}
                      value={currentTextareaValue()}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (isListening) updateBaseText(v);
                        setBlogData({
                          ...blogData,
                          ...(step === 3 ? { problem: v } :
                            step === 4 ? { uniquePerspective: v } :
                              step === 5 ? { practicalApproach: v } :
                                step === 6 ? { readerRelevance: v } :
                                  { futureVision: v }),
                        });
                      }}
                      placeholder={meta.placeholder}
                      rows={6}
                      className={`w-full px-1 py-2 pb-14 text-neutral-100 placeholder-neutral-500 focus:outline-none resize-none bg-transparent text-sm leading-relaxed border-b border-[#ffffff]/14 focus:border-[#00ff88]/50 transition-colors duration-200 ${
                        isListening ? 'italic text-neutral-300/90' : ''
                      }`}
                      autoFocus
                    />

                    {/* Top right status indicator dot */}
                    {isListening && (
                      <div className="absolute top-2 right-2 flex items-center justify-center pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.8)] animate-pulse" />
                      </div>
                    )}

                    {/* Absolute mic control overlay at the bottom of the textarea */}
                    <div className="absolute bottom-4 left-2 right-2 flex items-center justify-between min-h-[36px] pointer-events-auto">
                      {isListening ? (
                        // Active Listening Waveform + Cancel & Confirm Buttons
                        <div className="flex items-center justify-between w-full gap-4">
                          {/* Live Horizontal wave frequency visualizer */}
                          <div className="flex-1 flex items-center justify-center h-7 overflow-hidden relative px-2">
                            <div className="audio-waves-horizontal">
                              {Array.from({ length: 45 }).map((_, i) => (
                                <span key={i} className="audio-wave-horizontal-bar" />
                              ))}
                            </div>
                          </div>
                          
                          {/* Cancel & Done buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={cancelDictation}
                              title="Cancel dictation"
                              aria-label="Cancel dictation"
                              className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#ffffff]/6 hover:bg-[#ffffff]/12 border border-[#ffffff]/10 text-neutral-300 hover:text-white hover:scale-105 transition-all cursor-pointer"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={confirmDictation}
                              title="Confirm dictation"
                              aria-label="Confirm dictation"
                              className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#0099ff] hover:bg-[#0088ee] text-white hover:scale-105 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,153,255,0.4)]"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Inactive status: Microphone triggers + tiny microphone visualizer placed bottom right
                        <div className="flex items-center justify-end w-full gap-3">
                          {speechSupported && (
                            <div className="flex items-center gap-2.5 bg-neutral-900/60 rounded-full px-3 py-1.5 border border-[#ffffff]/8 hover:border-[#00ff88]/25 hover:bg-[#ffffff]/6 transition-all duration-200">
                              {/* Small static sound waves graphic next to microphone */}
                              <div className="flex items-center gap-[2.5px] h-3 opacity-55">
                                <span className="w-[1.8px] h-2 bg-neutral-400 rounded-full" />
                                <span className="w-[1.8px] h-3.5 bg-neutral-400 rounded-full" />
                                <span className="w-[1.8px] h-1.5 bg-neutral-400 rounded-full" />
                                <span className="w-[1.8px] h-2.5 bg-neutral-400 rounded-full" />
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => startDictationFlow(currentTextareaValue())}
                                title="Start voice dictation"
                                aria-label="Start voice dictation"
                                className="text-neutral-400 hover:text-[#00ff88] transition-colors focus-visible:outline-none cursor-pointer flex items-center justify-center"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M19 11a7 7 0 01-14 0M12 18v3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {charCounter(currentTextareaValue())}

                  {speechError && (
                    <p className="font-mono text-[10px] text-amber-300/90 tracking-[0.12em] mt-3 px-1 border-l-2 border-amber-400/40 pl-2">
                      ⚠ {speechError}
                    </p>
                  )}
                </div>
              )}

              {/* Step 8: Model selector */}
              {step === 8 && genState === 'idle' && (
                <AIModelSelector
                  selectedModel={blogData.model}
                  onSelectModel={(model) => setBlogData({ ...blogData, model })}
                  onEnter={isMobile ? undefined : runDraftGeneration}
                />
              )}

              {/* Step 8: Generating spinner */}
              {step === 8 && genState === 'generating' && (
                <div className="flex flex-col items-center gap-3 py-8">
                  <div className="w-8 h-8 rounded-full border-2 border-[#00ff88]/30 border-t-[#00ff88] animate-spin" />
                  <p className="font-mono text-xs text-neutral-400 tracking-[0.1em] uppercase">Generating your draft…</p>
                  <p className="text-xs text-neutral-600 max-w-xs text-center">AI is generating your blog post. This takes ~15 seconds.</p>
                </div>
              )}

              {/* Step 8: Generation error */}
              {step === 8 && genState === 'error' && (
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-mono text-[11px] text-red-300/90 tracking-widest text-center">{genError}</p>
                  <button
                    onClick={runDraftGeneration}
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl bg-[#00ff88] text-[#020812] shadow-[0_0_16px_rgba(0,255,136,0.4)] hover:shadow-[0_0_24px_rgba(0,255,136,0.6)] hover:scale-105 cursor-pointer font-semibold transition-all duration-200"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Step 8: Done */}
              {step === 8 && genState === 'done' && (
                <div className="flex flex-col items-center gap-5 py-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#00ff88]/12 border border-[#00ff88]/30 flex items-center justify-center shadow-[0_0_24px_rgba(0,255,136,0.25)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#00ff88] font-funnel-display text-xl font-bold mb-1">Draft Created!</p>
                    {draftUrl ? (
                      <>
                        <div className="mt-3 mb-2">
                          <p className="font-mono text-[10px] text-neutral-400 tracking-[0.08em] mb-2">Your draft URL:</p>
                          <a
                            href={draftUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] text-[#00ff88] underline underline-offset-2 break-all hover:text-[#66ffb0] transition-colors"
                          >
                            {draftUrl.split('?')[0]}
                          </a>
                        </div>
                        <p className="font-mono text-xs text-neutral-400 tracking-[0.08em] mt-2">
                          Editor opened in a new tab ↗
                        </p>
                        <div className="mt-6 max-w-md mx-auto p-4 rounded-xl border border-[#00ff88]/15 bg-[#00ff88]/4 text-left">
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            💡 <strong>What&apos;s next?</strong> Review your draft on your publishing platform, then submit it for editorial review or publish it directly.
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="mt-6 max-w-md mx-auto p-4 rounded-xl border border-[#00ff88]/15 bg-[#00ff88]/4 text-left">
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          💡 <strong>Almost there!</strong> Your draft was generated, but no publishing URL was configured. Set{' '}
                          <code className="text-[#00ff88]">NEXT_PUBLIC_PUBLISHING_PLATFORM_URL</code> in your environment (or have your backend return a <code className="text-[#00ff88]">draftUrl</code>/<code className="text-[#00ff88]">loginUrl</code>) so participants land straight on their draft.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card footer: back + next/verify/generate */}
          <div className="flex items-center justify-between px-5 pb-5 pt-2">
            {/* Back */}
            {step > 1 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400 hover:text-neutral-200 transition-colors duration-200 cursor-pointer focus-visible:outline-none"
              >
                <i className="hn hn-arrow-left text-sm inline-block" aria-hidden />
                Back
              </button>
            ) : (
              <div />
            )}

            {/* Send verification code — step 2 email entry (replaces next arrow) */}
            {step === 2 && !emailOtpActive && (
              <button
                onClick={handleSendCode}
                disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(blogData.email)}
                className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] ${
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(blogData.email)
                    ? 'bg-[#00ff88] text-[#020812] shadow-[0_0_16px_rgba(0,255,136,0.4)] hover:shadow-[0_0_24px_rgba(0,255,136,0.6)] hover:scale-105 cursor-pointer font-semibold'
                    : 'bg-[#ffffff]/12 text-neutral-500 cursor-not-allowed'
                }`}
              >
                Send Verification Code
              </button>
            )}

            {/* Arrow next — steps 1–7; disabled on step 2 until email is verified */}
            {(step < 8 && !(step === 2 && !emailOtpActive) && (
              <button
                onClick={goNext}
                disabled={!ready}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] ${
                  ready
                    ? 'bg-[#00ff88] text-[#020812] shadow-[0_0_16px_rgba(0,255,136,0.4)] hover:shadow-[0_0_24px_rgba(0,255,136,0.6)] hover:scale-105 cursor-pointer'
                    : 'bg-[#ffffff]/12 text-neutral-500 cursor-not-allowed'
                }`}
                aria-label="Next step"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}

            {/* Generate Blog button — step 8 */}
            {step === 8 && genState === 'idle' && (
              <button
                onClick={runDraftGeneration}
                disabled={!ready}
                className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] ${
                  ready
                    ? 'bg-[#00ff88] text-[#03170f] shadow-[0_0_18px_rgba(0,255,136,0.45)] hover:shadow-[0_0_28px_rgba(0,255,136,0.65)] hover:scale-[1.03] cursor-pointer font-bold'
                    : 'bg-[#ffffff]/10 border border-[#ffffff]/16 text-neutral-400 cursor-not-allowed'
                }`}
              >
                Generate Blog
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>

        </div>

        {/* Keyboard hints */}
        <div className="hidden md:block text-center mt-4">
          {step === 1 && canProceed() && (
            <p className="font-mono text-[10px] text-[#00ff88]/90 tracking-[0.12em] animate-pulse">
              press <kbd className="px-1.5 py-0.5 rounded bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">↵ enter</kbd> to continue
            </p>
          )}

          {step === 2 && !emailOtpActive && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(blogData.email) && (
            <p className="font-mono text-[10px] text-[#00ff88]/90 tracking-[0.12em]">
              press <kbd className="px-1.5 py-0.5 rounded bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">↵ enter</kbd> to send code
            </p>
          )}

          {step === 2 && emailOtpActive && emailVerifyState !== 'verified' && otp.length === 6 && (
            <p className="font-mono text-[10px] text-[#00ff88]/90 tracking-[0.12em]">
              press <kbd className="px-1.5 py-0.5 rounded bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">↵ enter</kbd> to verify code
            </p>
          )}

          {step === 2 && emailVerifyState === 'verified' && (
            <p className="font-mono text-[10px] text-[#00ff88]/90 tracking-[0.12em]">
              press <kbd className="px-1.5 py-0.5 rounded bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">↵ enter</kbd> to continue
            </p>
          )}

          {step >= 3 && step <= 7 && (
            <p className="font-mono text-[10px] text-neutral-500 tracking-[0.12em]">
              {canProceed() ? (
                <>
                  press <kbd className="px-1.5 py-0.5 rounded bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">↵ enter</kbd> to continue
                  <span className="text-neutral-600 ml-1.5">(shift + enter for newline)</span>
                </>
              ) : (
                <>
                  type <span className="text-neutral-400">{Math.max(0, MIN_CHARS - currentTextareaValue().trim().length)}</span> more characters to unlock
                </>
              )}
            </p>
          )}

          {step === 8 && genState === 'idle' && canProceed() && (
            <p className="font-mono text-[10px] text-[#00ff88]/90 tracking-[0.12em]">
              press <kbd className="px-1.5 py-0.5 rounded bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">↵ enter</kbd> to generate blog
            </p>
          )}

          {step === 8 && genState === 'error' && (
            <p className="font-mono text-[10px] text-red-400/90 tracking-[0.12em]">
              press <kbd className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400">↵ enter</kbd> to try again
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
