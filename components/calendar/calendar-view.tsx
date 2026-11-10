'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CalendarEvent } from '@/lib/ics';
import { colomboDayKey, fromDayKey as fromKey, shiftDayKey } from '@/lib/colombo';
import { scrollIntoViewSmooth } from '@/components/motion/smooth-scroll';

/**
 * The district calendar in the house style: an agenda list (default, because
 * it reads best on a phone) and a month grid. Every date is shown in Sri Lanka
 * time whatever the visitor's own zone, since every event is in the district.
 */
const TZ = 'Asia/Colombo';
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Agenda rows shown before "Show all": a daily series can expand to hundreds. */
const AGENDA_LIMIT = 30;
/** Longest span an event is drawn across in the month grid. */
const MAX_SPAN_DAYS = 31;

/** YYYY-MM-DD of an event's start, in Sri Lanka time. */
function dayKey(e: Pick<CalendarEvent, 'start' | 'allDay'>) {
  if (e.allDay) return e.start.slice(0, 10);
  return colomboDayKey(new Date(e.start));
}

/** YYYY-MM-DD of an event's LAST day. An all-day DTEND is exclusive. */
function endKey(e: CalendarEvent) {
  if (!e.end) return dayKey(e);
  if (e.allDay) return shiftDayKey(e.end.slice(0, 10), -1);
  // A timed event ending exactly at midnight belongs to the day before.
  return colomboDayKey(new Date(new Date(e.end).getTime() - 1));
}

/**
 * Formatters are cached by their options. Building an Intl.DateTimeFormat is
 * expensive, and the month grid and agenda call this 40+ times per render.
 */
const formatters = new Map<string, Intl.DateTimeFormat>();
const fmt = (opts: Intl.DateTimeFormatOptions) => {
  const key = JSON.stringify(opts);
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, ...opts });
    formatters.set(key, f);
  }
  return f;
};

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const DAY_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

function timeLabel(e: CalendarEvent) {
  if (e.timeUnknown) return null;
  const last = endKey(e);
  if (e.allDay) {
    if (last === dayKey(e)) return 'All day';
    return `Until ${fmt({ day: 'numeric', month: 'long' }).format(fromKey(last))}`;
  }
  const t = fmt({ hour: 'numeric', minute: '2-digit', hour12: true });
  if (!e.end) return t.format(new Date(e.start));
  // Across days, the end needs its date, or Fri 9am – Sun 5pm reads as one day.
  const end =
    last === dayKey(e)
      ? t.format(new Date(e.end))
      : `${fmt({ weekday: 'short', day: 'numeric', month: 'short' }).format(fromKey(last))}, ${t.format(new Date(e.end))}`;
  return `${t.format(new Date(e.start))} – ${end}`;
}

export function CalendarView({ events, today }: { events: CalendarEvent[]; today: string }) {
  const [view, setView] = useState<'list' | 'month'>('list');
  const [month, setMonth] = useState(today.slice(0, 7));
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  // "Today" is the server's render date until the browser confirms its own.
  const [now, setNow] = useState(today);
  useEffect(() => setNow(colomboDayKey(new Date())), []);
  /** Set once the URL has been read, so the first write can't wipe it. */
  const [restored, setRestored] = useState(false);

  const byDay = useMemo(() => {
    const m = new Map<string, CalendarEvent[]>();
    // A multi-day event appears on every day it covers, not only its first.
    for (const e of events) {
      const last = endKey(e);
      for (let k = dayKey(e), n = 0; k <= last && n < MAX_SPAN_DAYS; k = shiftDayKey(k, 1), n++) {
        m.set(k, [...(m.get(k) ?? []), e]);
      }
    }
    return m;
  }, [events]);

  /**
   * View, month and chosen day live in the query string
   * (?view=month&month=2026-03&day=2026-03-14) so a month can be linked and
   * Back returns to it. Read after mount rather than through useSearchParams,
   * which would need a Suspense boundary and drop the events from the static
   * HTML. Written with history.replaceState, which Next's router observes: no
   * history entry per click, and no refetch.
   */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('view') === 'month') {
      setView('month');
      const day = q.get('day');
      const qMonth = q.get('month');
      if (day && DAY_RE.test(day) && byDay.has(day)) {
        setMonth(day.slice(0, 7));
        setSelected(day);
      } else if (qMonth && MONTH_RE.test(qMonth)) {
        setMonth(qMonth);
      }
    }
    setRestored(true);
    // Mount only: later changes flow the other way, state → URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!restored) return;
    const url = new URL(window.location.href);
    for (const k of ['view', 'month', 'day']) url.searchParams.delete(k);
    if (view === 'month') {
      url.searchParams.set('view', 'month');
      url.searchParams.set('month', month);
      if (selected) url.searchParams.set('day', selected);
    }
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  }, [restored, view, month, selected]);

  // An event under way (started yesterday, ends tomorrow) is still coming up.
  const upcoming = events.filter((e) => endKey(e) >= now);
  const past = events.filter((e) => endKey(e) < now).reverse();
  const shown = showAll ? upcoming : upcoming.slice(0, AGENDA_LIMIT);

  const shiftMonth = (delta: number) => {
    const [y, m] = month.split('-').map(Number);
    const d = new Date(Date.UTC(y, m - 1 + delta, 1));
    setDirection(delta > 0 ? 'next' : 'prev');
    setMonth(d.toISOString().slice(0, 7));
    setSelected(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Calendar view" className="inline-flex rounded-control border border-control-border p-1">
          {(['list', 'month'] as const).map((v) => (
            <button
              key={v}
              type="button"
              data-morph
              aria-pressed={view === v}
              onClick={() => setView(v)}
              // Focus ring drawn INSIDE the segment. The global 3px offset put
              // it over the neighbouring segment's Signal fill (1.09:1). Inside,
              // it is Signal on chalk for the idle segment and chalk on the
              // Signal fill for the active one (both well over 3:1).
              className={`press rounded-control px-4 py-2 text-sm font-semibold focus-visible:outline-offset-[-4px] ${
                view === v ? 'bg-accent-fill text-accent-on focus-visible:outline-bg' : 'text-content-muted hover:text-content'
              }`}
            >
              {v === 'list' ? 'Agenda' : 'Month'}
            </button>
          ))}
        </div>
        <p className="label-micro text-content-soft">All times Sri Lanka time</p>
      </div>

      {view === 'list' ? (
        <div className="mt-10">
          <h2 className="text-[1.45rem] leading-tight tracking-[-0.015em] md:text-[1.7rem]">Coming up</h2>
          {upcoming.length ? (
            <>
              <EventList events={shown} />
              {upcoming.length > shown.length && (
                <button
                  type="button"
                  data-morph
                  onClick={() => setShowAll(true)}
                  className="press mt-6 rounded-control border border-control-border px-5 py-2.5 text-sm font-semibold hover:border-content"
                >
                  Show all {upcoming.length} upcoming events
                </button>
              )}
            </>
          ) : (
            <p className="mt-4 border-t border-hairline pt-5 text-content-muted">
              No upcoming events are listed. Clubs planning one can{' '}
              <Link href="/calendar/request-a-date" className="text-accent-text underline underline-offset-3">
                request a date
              </Link>
              .
            </p>
          )}
          {past.length > 0 && (
            <>
              <h2 className="mt-16 text-[1.45rem] leading-tight tracking-[-0.015em] md:text-[1.7rem]">Recently</h2>
              <EventList events={past.slice(0, 8)} muted />
            </>
          )}
        </div>
      ) : (
        <MonthGrid
          month={month}
          now={now}
          byDay={byDay}
          direction={direction}
          selected={selected}
          onSelect={setSelected}
          onShift={shiftMonth}
          onToday={() => {
            setDirection(now.slice(0, 7) > month ? 'next' : 'prev');
            setMonth(now.slice(0, 7));
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}

function EventList({ events, muted = false }: { events: CalendarEvent[]; muted?: boolean }) {
  return (
    <ol className="mt-4 border-t border-hairline">
      {events.map((e) => {
        const d = fromKey(dayKey(e));
        return (
          // Phones stack the date above the event as one baseline row: a
          // 72px date column left titles and venues ~260px and broke labels
          // mid-phrase. From sm up the date gets its own column again.
          <li key={e.id} className="grid gap-3 border-b border-hairline py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-5 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-8">
            <p className={`flex items-baseline gap-2.5 sm:block ${muted ? 'text-content-soft' : ''}`}>
              <span className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] tabular-nums sm:block md:text-[2.4rem]">
                {fmt({ day: 'numeric' }).format(d)}
              </span>
              <span className="label-micro text-content-soft sm:mt-2 sm:block">{fmt({ month: 'short', year: 'numeric' }).format(d)}</span>
            </p>
            <div className="min-w-0">
              {/* Feed text is unbounded; long words and bare URLs must wrap. */}
              <h3 className={`text-[1.2rem] leading-snug tracking-[-0.01em] [overflow-wrap:anywhere] ${muted ? 'text-content-muted' : ''}`}>{e.title}</h3>
              <p className="label-micro mt-2 text-content-soft">
                {[fmt({ weekday: 'long' }).format(d), timeLabel(e), e.location].filter(Boolean).join(' · ')}
              </p>
              {e.description && (
                <p className="mt-2.5 line-clamp-3 max-w-[64ch] whitespace-pre-line text-content-muted [overflow-wrap:anywhere]">{e.description}</p>
              )}
              {e.links.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {e.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center text-sm font-medium text-accent-text underline-offset-3 hover:underline">
                      {l.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function MonthGrid({
  month,
  now,
  byDay,
  direction,
  selected,
  onSelect,
  onShift,
  onToday,
}: {
  month: string;
  now: string;
  byDay: Map<string, CalendarEvent[]>;
  direction: 'next' | 'prev' | null;
  selected: string | null;
  onSelect: (key: string | null) => void;
  onShift: (delta: number) => void;
  onToday: () => void;
}) {
  const [y, m] = month.split('-').map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const lead = (first.getUTCDay() + 6) % 7; // Monday-first
  const cells: (string | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`),
  ];
  while (cells.length % 7) cells.push(null);
  const selectedEvents = selected ? byDay.get(selected) ?? [] : [];
  const monthCount = cells.reduce((n, k) => n + (k ? byDay.get(k)?.length ?? 0 : 0), 0);

  // A chosen day's events render under a six-row grid, below the fold on a
  // phone, so picking a day looked like nothing happened. Bring the panel
  // into view (focus stays on the day, so keyboard users keep their place),
  // and the live region below announces it.
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastSelected = useRef(selected);
  useEffect(() => {
    if (selected === lastSelected.current) return;
    lastSelected.current = selected;
    const panel = panelRef.current;
    if (!selected || !panel) return;
    if (panel.getBoundingClientRect().bottom <= window.innerHeight) return;
    // Through Lenis on desktop: a native smooth scroll fought its wheel ease.
    scrollIntoViewSmooth(panel);
  }, [selected]);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 aria-live="polite" className="text-title">
          {fmt({ month: 'long', year: 'numeric' }).format(fromKey(`${month}-15`))}
        </h2>
        <div className="flex gap-2">
          <button type="button" data-morph onClick={onToday} className="press rounded-control border border-control-border px-4 text-sm font-semibold hover:border-content">
            Today
          </button>
          <MonthArrow label="Previous month" d="M12.5 4l-6 6 6 6" onClick={() => onShift(-1)} />
          <MonthArrow label="Next month" d="M7.5 4l6 6-6 6" onClick={() => onShift(1)} />
        </div>
      </div>

      <div
        key={month}
        className={`mt-6 overflow-hidden rounded-panel border border-hairline bg-surface ${
          direction === 'next' ? 'clip-in-next' : direction === 'prev' ? 'clip-in-prev' : ''
        }`}
      >
        <div className="grid grid-cols-7 border-b border-hairline">
          {WEEKDAYS.map((w) => (
            <p key={w} className="label-micro px-2 py-3 text-center text-content-soft md:px-3 md:text-left">
              {w}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((key, i) => {
            const evs = key ? byDay.get(key) ?? [] : [];
            const isToday = key === now;
            const isSelected = key === selected;
            const day = key ? Number(key.slice(8)) : null;
            const border = `${i % 7 !== 6 ? 'border-r' : ''} ${i < cells.length - 7 ? 'border-b' : ''} border-hairline`;
            if (!key) return <div key={`blank-${i}`} className={`min-h-16 bg-sunk/50 md:min-h-28 ${border}`} />;
            return (
              <button
                key={key}
                type="button"
                disabled={!evs.length}
                onClick={() => onSelect(isSelected ? null : key)}
                aria-pressed={evs.length ? isSelected : undefined}
                aria-label={`${fmt({ weekday: 'long', day: 'numeric', month: 'long' }).format(fromKey(key))}${
                  evs.length ? `, ${evs.length} event${evs.length > 1 ? 's' : ''}` : ''
                }`}
                className={`flex min-h-16 flex-col items-start gap-1.5 p-1.5 text-left transition-colors duration-200 md:min-h-28 md:p-2.5 ${border} ${
                  isSelected ? 'bg-accent-soft' : evs.length ? 'hover:bg-bg' : ''
                }`}
              >
                <span
                  className={`inline-flex size-7 items-center justify-center rounded-full text-sm tabular-nums ${
                    isToday ? 'bg-accent-fill font-semibold text-accent-on' : evs.length ? 'font-semibold' : 'text-content-soft'
                  }`}
                >
                  {day}
                </span>
                {/* Titles from md up; a dot per event on phones. */}
                <span className="hidden w-full flex-col gap-1 md:flex">
                  {evs.slice(0, 2).map((e) => (
                    <span key={e.id} className="truncate rounded-control bg-accent-soft px-2 py-0.5 text-[12px] font-medium text-accent-text">
                      {e.title}
                    </span>
                  ))}
                  {evs.length > 2 && <span className="px-2 text-[12px] text-content-soft">+{evs.length - 2} more</span>}
                </span>
                {evs.length > 0 && (
                  <span aria-hidden="true" className="flex gap-1 md:hidden">
                    {evs.slice(0, 3).map((e) => (
                      <span key={e.id} className="size-1.5 rounded-full bg-accent" />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Always mounted, so a new day's events are announced. scroll-mt
          clears the sticky header when scrolled into view. */}
      <div ref={panelRef} aria-live="polite" className="scroll-mt-24 scroll-mb-6">
        {selected ? (
          <div className="mt-8">
            <h3 className="label-micro text-content-soft">{fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(fromKey(selected))}</h3>
            <EventList events={selectedEvents} />
          </div>
        ) : (
          <p className="mt-6 text-sm text-content-soft">
            {monthCount ? 'Choose a highlighted day to see its events.' : 'No events published for this month.'}
          </p>
        )}
      </div>
    </div>
  );
}

function MonthArrow({ label, d, onClick }: { label: string; d: string; onClick: () => void }) {
  return (
    <button
      type="button"
      data-morph
      onClick={onClick}
      aria-label={label}
      className="press inline-flex h-10 w-11 items-center justify-center rounded-control border border-control-border hover:border-content"
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
