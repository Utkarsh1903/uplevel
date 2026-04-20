import { useState } from 'react';
import { RESOURCE_CATEGORIES, RESOURCE_TYPES } from '../lib/resources';
import { ExternalLink, Star } from 'lucide-react';

export default function Resources() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [onlyMust, setOnlyMust] = useState(false);

  const allResources = RESOURCE_CATEGORIES.flatMap(cat =>
    cat.resources.map(r => ({ ...r, catId: cat.id, catLabel: cat.label, catColor: cat.color }))
  );

  const displayed = RESOURCE_CATEGORIES
    .filter(cat => selectedCat === 'all' || cat.id === selectedCat)
    .map(cat => ({
      ...cat,
      resources: cat.resources.filter(r => !onlyMust || r.mustKnow),
    }))
    .filter(cat => cat.resources.length > 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Free Resources</h1>
        <p className="text-slate-400 text-sm mt-1">Curated, 100% free resources. No noise — only the ones that actually help.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2 flex-wrap flex-1">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              selectedCat === 'all'
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                : 'border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          {RESOURCE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all flex items-center gap-1.5 ${
                selectedCat === cat.id
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <span>{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-400 hover:text-white whitespace-nowrap">
          <input
            type="checkbox"
            className="checkbox"
            checked={onlyMust}
            onChange={e => setOnlyMust(e.target.checked)}
          />
          Must-Know only
        </label>
      </div>

      {/* Resource groups */}
      {displayed.map(cat => (
        <div key={cat.id}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{cat.emoji}</span>
            <h2 className="font-semibold text-white">{cat.label}</h2>
            <span className="text-slate-500 text-sm">({cat.resources.length})</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.resources.map(resource => {
              const typeInfo = RESOURCE_TYPES[resource.type] ?? { label: resource.type, color: '#94a3b8' };
              return (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover rounded-2xl p-4 block group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="badge"
                        style={{ background: typeInfo.color + '18', color: typeInfo.color, border: `1px solid ${typeInfo.color}30` }}
                      >
                        {typeInfo.label}
                      </span>
                      {resource.mustKnow && (
                        <span className="badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}>
                          <Star size={9} fill="currentColor" /> Must Know
                        </span>
                      )}
                    </div>
                    <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0 mt-0.5" />
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-indigo-300 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{resource.description}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
