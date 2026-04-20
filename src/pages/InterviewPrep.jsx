import { useAuth } from '../context/AuthContext';
import PremiumGate from '../components/PremiumGate';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Static premium content ────────────────────────────────────────────────────

const STAR_TEMPLATES = [
  {
    question: 'Tell me about a time you handled a conflict with a teammate.',
    situation: 'In my previous role at [company], our team had a disagreement on whether to use microservices or a monolith for a new feature.',
    task: 'As the tech lead, I needed to resolve the conflict and align the team on a decision within the sprint.',
    action: 'I organized a 30-minute whiteboarding session where each side presented pros/cons. I then proposed a middle path: start with a modular monolith with clear service boundaries. I documented the decision in Confluence with the trade-offs we considered.',
    result: 'The team aligned within a day. We shipped the feature 2 weeks later with zero deployment issues. The modular approach let us extract one service 4 months later when traffic demanded it.',
  },
  {
    question: 'Tell me about a time you improved system performance.',
    situation: 'Our user dashboard was taking 6–8 seconds to load, causing 30% drop-off on the settings page.',
    task: 'I was asked to investigate and fix the performance issue within 2 weeks.',
    action: 'I used Chrome DevTools and Datadog to identify 3 N+1 query issues and a missing database index. I added the index, rewrote the queries with joins, and added Redis caching for user profile data. Also deferred loading non-critical widgets.',
    result: 'Load time dropped from 7s to 1.2s — an 83% improvement. Page drop-off reduced by 22%. This was highlighted in the next sprint review by the PM.',
  },
  {
    question: 'Tell me about a time you had to learn something quickly.',
    situation: 'Our team suddenly needed to integrate Kafka for event-driven architecture, which no one on the team had worked with.',
    task: 'I volunteered to own the Kafka integration, with a go-live in 3 weeks.',
    action: 'I spent 3 days going through the Kafka documentation and Confluent tutorials. I set up a local Kafka cluster using Docker Compose, built a proof-of-concept producer/consumer in 2 days, and wrote an internal wiki page to onboard the rest of the team.',
    result: 'The integration went live on time. I became the team\'s go-to person for Kafka. 2 months later, we expanded it to 4 more services.',
  },
];

const HLD_CHEATSHEETS = [
  {
    title: 'URL Shortener Design',
    color: '#10b981',
    points: [
      'Core API: POST /shorten → returns short code | GET /{code} → 301/302 redirect',
      'DB: KV store (Redis) for code→URL mapping. SQL for analytics.',
      'Encoding: Base62 (a-z, A-Z, 0-9) on auto-increment ID. 6 chars = 56 billion URLs.',
      'Scale: Read-heavy. Cache hot URLs in Redis. CDN at edge for redirect.',
      'Analytics: Async queue (Kafka) → analytics DB. Never block redirect path.',
      'Custom slugs: Check collision → store with user_id. Rate-limit per user.',
    ],
  },
  {
    title: 'Rate Limiter Design',
    color: '#6366f1',
    points: [
      'Algorithms: Token Bucket (smooth bursts) | Leaky Bucket (constant rate) | Sliding Window Counter.',
      'Storage: Redis with atomic INCR + EXPIRE. Use Lua script for atomic check-and-increment.',
      'Headers: Return X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset on every response.',
      'Distributed: Use Redis cluster. Consistent hashing to route requests to same node per key.',
      'Response: 429 Too Many Requests with Retry-After header.',
      'Tiers: Different limits per user plan (free: 100/hr, premium: 10k/hr).',
    ],
  },
  {
    title: 'Chat System (WhatsApp)',
    color: '#ec4899',
    points: [
      'Protocol: WebSocket for real-time. Long polling as fallback. REST for non-real-time ops.',
      'Message flow: Client → Chat Server → Message Queue → Recipient Server → Client.',
      'Storage: Cassandra for messages (write-heavy, wide column). HBase alternative.',
      'Delivery states: Sent (✓) | Delivered (✓✓) | Read (✓✓ blue) tracked via ACKs.',
      'Group chat: Fan-out on write for small groups. Fan-out on read for large groups (>1000).',
      'Media: S3 for storage. CDN for delivery. Client-side compression before upload.',
      'Presence: Redis pub/sub for online status. Heartbeat every 5s.',
    ],
  },
];

const NEGOTIATION_SCRIPTS = [
  {
    scenario: 'You got an offer below your expectation',
    script: '"Thank you for the offer — I\'m genuinely excited about the role and the team. I was expecting something closer to [X] based on my research on levels.fyi and conversations with people in similar roles. Is there any flexibility on the base? I\'m happy to discuss the full package."',
  },
  {
    scenario: 'Recruiter asks your current salary first',
    script: '"I\'d prefer not to anchor on my current compensation since it was in a service company context. I\'m looking for a market-rate offer for this role. What\'s the budgeted band for this position?"',
  },
  {
    scenario: 'You have a competing offer',
    script: '"I want to be transparent — I do have another offer at [Company] for [X]. This role is my first choice because of [specific reason], but I need to make the decision by [date]. Is there anything you can do to help me choose UpLevel?"',
  },
];

export default function InterviewPrep() {
  const { isPremium } = useAuth();

  if (!isPremium) return <PremiumGate feature="Interview Prep Vault" />;

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Interview Prep Vault</h1>
        <p className="text-slate-400 text-sm mt-1">STAR templates, HLD cheatsheets, and salary negotiation scripts. Premium-only.</p>
      </div>

      {/* STAR Templates */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">⭐ STAR Story Templates</h2>
        <div className="space-y-4">
          {STAR_TEMPLATES.map((t, i) => (
            <StarCard key={i} template={t} />
          ))}
        </div>
      </section>

      {/* HLD Cheatsheets */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">🏗️ HLD Cheatsheets</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HLD_CHEATSHEETS.map((c, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3" style={{ color: c.color }}>{c.title}</h3>
              <ul className="space-y-2">
                {c.points.map((p, j) => (
                  <li key={j} className="text-xs text-slate-400 leading-relaxed flex gap-2">
                    <span className="text-slate-600 shrink-0 mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Negotiation Scripts */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">💰 Salary Negotiation Scripts</h2>
        <div className="space-y-4">
          {NEGOTIATION_SCRIPTS.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-300 mb-3">Scenario: {s.scenario}</p>
              <div className="glass rounded-xl p-4 font-mono text-sm text-emerald-300 leading-relaxed relative group">
                <p>{s.script}</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(s.script); toast.success('Copied!'); }}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StarCard({ template }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-semibold text-slate-200">{template.question}</span>
        {open ? <ChevronUp size={16} className="text-slate-500 shrink-0 ml-3" /> : <ChevronDown size={16} className="text-slate-500 shrink-0 ml-3" />}
      </button>
      {open && (
        <div className="border-t border-white/[0.06] px-5 py-4 space-y-3 text-sm">
          {[
            { label: 'S — Situation', text: template.situation, color: '#6366f1' },
            { label: 'T — Task',      text: template.task,      color: '#10b981' },
            { label: 'A — Action',    text: template.action,    color: '#f59e0b' },
            { label: 'R — Result',    text: template.result,    color: '#ec4899' },
          ].map(({ label, text, color }) => (
            <div key={label}>
              <span className="font-semibold text-xs uppercase tracking-wider" style={{ color }}>{label}</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
