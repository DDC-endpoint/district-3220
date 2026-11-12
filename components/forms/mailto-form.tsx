'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/site';

/**
 * Sends a form by opening the visitor's email app with the message already
 * written, addressed to the district (DECISIONS.md §8: there is no back-end
 * yet). Swapping in a real back-end later means replacing `send` below and
 * nothing else; the fields, validation and success state stay.
 *
 * Validation is the browser's own constraint API, shown in our own error
 * slots (fields.tsx) instead of the native bubbles, which cannot be styled and
 * vanish before a phone user has read them.
 */
export function MailtoForm({
  subject,
  subjectField,
  submitLabel,
  children,
}: {
  /** Email subject, e.g. "Website enquiry". */
  subject: string;
  /** Name of a field whose value is appended to the subject, e.g. the sender's name. */
  subjectField?: string;
  submitLabel: string;
  children: ReactNode;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sent, setSent] = useState<{ body: string; href: string } | null>(null);
  /** Clipboard outcome for the confirmation's Copy button. */
  const [copy, setCopy] = useState<'idle' | 'copied' | 'failed'>('idle');
  const doneHeading = useRef<HTMLHeadingElement | null>(null);
  const wasSent = useRef(false);

  // The submit button disappears on send and the form returns on edit; in
  // both cases focus would fall to <body>. Take it to the confirmation's
  // heading, and back to the first field on edit.
  useEffect(() => {
    if (sent) doneHeading.current?.focus();
    else if (wasSent.current) formRef.current?.querySelector<HTMLElement>('input, select, textarea')?.focus();
    wasSent.current = Boolean(sent);
  }, [sent]);

  // Date fields marked minToday refuse past dates. Set here, after hydration,
  // from the visitor's own clock: rendering it would freeze the build date
  // into a static page.
  useEffect(() => {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    for (const input of Array.from(formRef.current?.querySelectorAll<HTMLInputElement>('input[data-min-today]') ?? [])) {
      input.min = today;
    }
  }, []);

  const setError = (name: string, message: string) => {
    const slot = document.getElementById(`${name}-error`);
    if (slot) slot.textContent = message;
    const control = formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`);
    if (control && control.getAttribute('type') !== 'checkbox') {
      control.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
  };

  const validate = (form: HTMLFormElement) => {
    let first: HTMLElement | null = null;
    for (const el of Array.from(form.elements)) {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) continue;
      if (!el.name || el.type === 'checkbox') continue;
      const message = el.validity.valid ? '' : messageFor(el);
      setError(el.name, message);
      if (message && !first) first = el;
    }
    // Chip groups: "choose at least one" is not something the browser can
    // express for a set of checkboxes, so it is checked here.
    for (const group of Array.from(form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-required]'))) {
      const name = group.dataset.chips!;
      const any = group.querySelector('input:checked');
      setError(name, any ? '' : 'Choose at least one.');
      // The group's state on its inputs too, so each chip announces it.
      for (const input of Array.from(group.querySelectorAll('input'))) {
        input.setAttribute('aria-invalid', any ? 'false' : 'true');
      }
      if (!any && !first) first = group.querySelector('input');
    }
    first?.focus();
    return !first;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    const values = new FormData(form);
    const body = bodyFrom(form, values);
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subjectLine(subject, subjectField, values))}&body=${encodeURIComponent(body)}`;
    send(href);
    setSent({ body, href });
  };

  const confirmation = sent ? (
    // rise-in-load: the confirmation arrives with the inner-page fade-up rather
    // than popping in (approved 2026-10-06; a plain fade under reduced motion).
    <div className="rise-in-load rounded-panel border border-hairline bg-surface p-6 md:p-8">
      <p className="label-micro text-accent-text">Almost done</p>
      <h2 ref={doneHeading} tabIndex={-1} className="mt-3 text-[1.5rem] leading-tight tracking-[-0.015em]">
        Your email app should have opened with the message ready to send.
      </h2>
      <p className="mt-3 max-w-[56ch] text-content-muted">
        Press send there and it reaches the council. If nothing opened, copy the message and email it to{' '}
        <a href={`mailto:${SITE.email}`} className="text-accent-text underline underline-offset-3">
          {SITE.email}
        </a>
        .
      </p>
      <pre className="mt-6 max-h-64 overflow-auto rounded-media bg-sunk p-4 font-sans text-sm whitespace-pre-wrap text-content-muted">
        {sent.body}
      </pre>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          tone="primary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(sent.body);
              setCopy('copied');
            } catch {
              setCopy('failed');
            }
          }}
        >
          {/* Both labels share one grid cell, so the pill keeps the wider
              label's width and the swap is a 150ms cross-fade, not a jump. */}
          <span className="grid">
            <span
              aria-hidden={copy === 'copied'}
              className={`[grid-area:1/1] transition-opacity duration-150 ease-out ${copy === 'copied' ? 'opacity-0' : ''}`}
            >
              Copy message
            </span>
            <span
              aria-hidden={copy !== 'copied'}
              className={`[grid-area:1/1] transition-opacity duration-150 ease-out ${copy === 'copied' ? '' : 'opacity-0'}`}
            >
              Copied
            </span>
          </span>
        </Button>
        <a
          href={sent.href}
          data-morph
          className="press rounded-control border border-control-border px-6 py-3 text-sm font-semibold hover:border-content"
        >
          Open email again
        </a>
        <button
          type="button"
          data-morph
          onClick={() => {
            setSent(null);
            setCopy('idle');
          }}
          className="press rounded-control px-6 py-3 text-sm font-semibold text-content-muted hover:text-content"
        >
          Edit the form
        </button>
      </div>
      {/* Always mounted so the announcement fires. Success is screen-reader
          only (the button already says Copied); a failure is shown as well,
          because the visitor has to act on it. */}
      <p role="status" className={copy === 'failed' ? 'mt-4 text-[13px] text-danger' : 'sr-only'}>
        {copy === 'copied'
          ? 'Message copied.'
          : copy === 'failed'
            ? 'Couldn’t copy. Select the text above and copy it.'
            : ''}
      </p>
    </div>
  ) : null;

  // The form stays mounted (hidden) while the confirmation shows, so "Edit
  // the form" brings back everything the visitor typed instead of a blank form.
  return (
    <>
      {confirmation}
      <form
        hidden={Boolean(sent)}
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        // Clear a field's error as soon as it becomes valid, not on the next submit.
        onInput={(e) => {
          const t = e.target as HTMLInputElement;
          if (!t.name) return;
          if (t.type === 'checkbox') {
            if (t.checked) {
              setError(t.name, '');
              for (const input of Array.from(
                t.form?.querySelectorAll(`input[name="${CSS.escape(t.name)}"]`) ?? [],
              )) {
                input.setAttribute('aria-invalid', 'false');
              }
            }
          } else if (t.validity.valid) {
            setError(t.name, '');
          }
        }}
        className="flex flex-col gap-6"
      >
        {children}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button type="submit" tone="primary">
            {submitLabel}
          </Button>
          <p className="text-[13px] text-content-soft">This opens your email app with the message ready to send.</p>
        </div>
      </form>
    </>
  );
}

function subjectLine(subject: string, field: string | undefined, values: FormData) {
  const extra = field ? String(values.get(field) ?? '').trim() : '';
  return `[Website] ${subject}${extra ? ` — ${extra}` : ''}`;
}

/** The hand-off. The only line a real back-end needs to replace. */
function send(href: string) {
  window.location.href = href;
}

function messageFor(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const v = el.validity;
  if (v.valueMissing) return 'This one is needed.';
  if (v.typeMismatch && el.type === 'email') return 'That doesn’t look like an email address.';
  if (v.patternMismatch) return el.title || 'Check the format.';
  if (v.tooShort) return 'A little longer, please.';
  if (v.rangeUnderflow && el.type === 'date') return 'Choose today or a later date.';
  return el.validationMessage;
}

/** "Label: value" lines in the order the fields appear on the page. */
function bodyFrom(form: HTMLFormElement, values: FormData) {
  const lines: string[] = [];
  const seen = new Set<string>();
  for (const el of Array.from(form.querySelectorAll<HTMLElement>('[data-label]'))) {
    const label = el.dataset.label!;
    if (el instanceof HTMLFieldSetElement) {
      const name = el.dataset.chips!;
      if (seen.has(name)) continue;
      seen.add(name);
      const chosen = values.getAll(name).map(String);
      lines.push(`${label}: ${chosen.length ? chosen.join(', ') : '—'}`);
      continue;
    }
    const name = el.getAttribute('name');
    if (!name || seen.has(name)) continue;
    seen.add(name);
    const value = String(values.get(name) ?? '').trim();
    // Long answers get their own paragraph so the email stays readable.
    lines.push(value.includes('\n') || value.length > 80 ? `${label}:\n${value}\n` : `${label}: ${value || '—'}`);
  }
  return `${lines.join('\n').trimEnd()}\n\n— Sent from the ${SITE.name} website`;
}
