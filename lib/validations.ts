import { z } from 'zod';

// ─── Nosana Claim Form ───────────────────────────────────────────────────────

export const nosanaClaimFields = {
  projectName: z
    .string()
    .trim()
    .min(2, 'Enter a valid project name')
    .max(120, 'Project name is too long'),

  proposal: z
    .string()
    .trim()
    .min(
      150,
      'Please describe your project in more detail. Proposal must be at least 150 characters.',
    )
    .max(5000, 'Proposal exceeds the 5000 character limit'),

  github: z
    .string()
    .trim()
    .min(1, 'Enter a GitHub repository URL')
    .url('Enter a valid URL')
    .refine((u) => {
      try {
        return new URL(u).hostname.toLowerCase().includes('github.com');
      } catch {
        return false;
      }
    }, 'Must be a github.com repository URL')
    .max(300),

  workload: z
    .string()
    .trim()
    .min(
      20,
      'Please describe the model or workload in more detail. Workload must be at least 20 characters.',
    )
    .max(2000, 'Workload description exceeds the 2000 character limit'),

  deploy: z.enum(['yes', 'no'], { message: 'Please select one' }),

  team: z
    .string()
    .trim()
    .min(2, 'Add at least one team member')
    .max(500),

  socials: z
    .string()
    .trim()
    .max(500, 'Too many links — keep it concise')
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address')
    .email('Enter a valid email address')
    .max(255),

  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number')
    .max(40)
    .refine(
      (s) => /^[\d\s+().\-]+$/.test(s),
      'Use digits, spaces, and common symbols (e.g. +1 555 000 0000)',
    ),

  country: z
    .string()
    .trim()
    .min(2, 'Where is your team based?')
    .max(80),

  agree: z.literal(true, { message: 'Please confirm before submitting' }),
} as const;

export const nosanaClaimSchema = z.object(nosanaClaimFields);

export type NosanaClaimValues = z.infer<typeof nosanaClaimSchema>;

export type NosanaClaimFormState = {
  projectName: string;
  proposal: string;
  github: string;
  workload: string;
  deploy: 'yes' | 'no' | '';
  team: string;
  socials: string;
  email: string;
  phone: string;
  country: string;
  agree: boolean;
};

export const NOSANA_CLAIM_FIELD_KEYS: (keyof NosanaClaimFormState)[] = [
  'projectName',
  'proposal',
  'github',
  'workload',
  'deploy',
  'team',
  'socials',
  'email',
  'phone',
  'country',
  'agree',
];

export function validateNosanaClaimField(
  key: keyof NosanaClaimFormState,
  data: NosanaClaimFormState,
): string | undefined {
  if (key === 'deploy') {
    if (data.deploy === '') return 'Please select one';
    const r = nosanaClaimFields.deploy.safeParse(data.deploy);
    return r.success ? undefined : r.error.issues[0]?.message;
  }
  if (key === 'agree') {
    const r = nosanaClaimFields.agree.safeParse(data.agree);
    return r.success ? undefined : r.error.issues[0]?.message;
  }
  const validator = nosanaClaimFields[key as keyof typeof nosanaClaimFields];
  const r = (validator as z.ZodTypeAny).safeParse(data[key]);
  return r.success ? undefined : r.error.issues[0]?.message;
}
