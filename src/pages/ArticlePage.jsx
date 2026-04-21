import { useParams, Link, useLocation } from 'react-router-dom';
import { ARTICLES } from '../lib/articles';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

const components = {
  h1: ({ children }) => <h1 className="text-2xl font-extrabold text-white mt-8 mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-8 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-semibold text-indigo-300 mt-6 mb-2">{children}</h3>,
  p:  ({ children }) => <p className="text-slate-300 text-sm leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-outside ml-5 mb-4 space-y-1.5 text-slate-300 text-sm">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-1.5 text-slate-300 text-sm">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  em: ({ children }) => <em className="text-slate-300 italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 text-slate-400 italic text-sm">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-white/10 my-6" />,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/[0.06]">{children}</thead>,
  th: ({ children }) => <th className="px-3 py-2 text-left text-white font-semibold text-xs border border-white/10">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-slate-300 text-xs border border-white/[0.06]">{children}</td>,
  tr: ({ children }) => <tr className="even:bg-white/[0.02]">{children}</tr>,
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 rounded text-xs font-mono text-indigo-300" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
          {children}
        </code>
      );
    }
    return (
      <div className="relative mb-4">
        {className && (
          <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono">
            {className.replace('language-', '')}
          </div>
        )}
        <pre className="rounded-xl p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <code>{children}</code>
        </pre>
      </div>
    );
  },
};

export default function ArticlePage() {
  const { slug } = useParams();
  const location = useLocation();
  const backState = location.state ?? {};
  const article = ARTICLES.find(a => a.slug === slug);

  usePageTitle(article?.title ?? 'Article');

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 fade-in">
        <Link to="/roadmaps" state={backState} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <ArrowLeft size={14} /> Back to Roadmaps
        </Link>
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-slate-400">Article not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 fade-in">
      {/* Back */}
      <Link
        to="/roadmaps"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft size={14} /> Back to Roadmaps
      </Link>

      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="badge" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}>
            <BookOpen size={9} /> UpLevel Article
          </span>
          {article.readingTime && (
            <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
              <Clock size={10} /> {article.readingTime} min read
            </span>
          )}
        </div>
        <h1 className="text-2xl font-extrabold text-white leading-tight">{article.title}</h1>
        {article.tags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.map(t => (
              <span key={t} className="text-xs text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded-md">#{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="glass rounded-2xl p-6 md:p-8">
        <ReactMarkdown components={components}>
          {article.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <div className="glass rounded-2xl p-5 text-center">
        <p className="text-slate-500 text-xs font-mono">// written by UpLevel · no external redirects needed</p>
        <Link
          to="/roadmaps"
          state={backState}
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm mt-2 transition-colors"
        >
          <ArrowLeft size={13} /> Back to your roadmap
        </Link>
      </div>
    </div>
  );
}
