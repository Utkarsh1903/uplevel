import { useState } from 'react';
import { RESOURCE_CATEGORIES, RESOURCE_TYPES, FEATURED_VIDEOS, TRACKS } from '../lib/resources';
import { ExternalLink, Star, Play, X, Youtube } from 'lucide-react';

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

  return (
    <div className="glass rounded-2xl overflow-hidden group">
      <div className="relative aspect-video bg-black overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <>
            <img
              src={thumb}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ background: 'rgba(99,102,241,0.9)', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
              >
                <Play size={22} className="text-white ml-1" fill="white" />
              </button>
            </div>
            {video.duration && (
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-mono px-1.5 py-0.5 rounded">
                {video.duration}
              </span>
            )}
          </>
        )}
        {playing && (
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors z-10"
          >
            <X size={14} className="text-white" />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge" style={{ background: 'rgba(236,72,153,0.12)', color: '#f472b6', border: '1px solid rgba(236,72,153,0.25)' }}>
            <Youtube size={9} /> YouTube
          </span>
          {video.mustKnow && (
            <span className="badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}>
              <Star size={9} fill="currentColor" /> Must Watch
            </span>
          )}
        </div>
        <h3 className="text-white font-semibold text-sm mb-1 leading-tight line-clamp-2">{video.title}</h3>
        <p className="text-slate-400 text-xs mb-1">{video.channel}</p>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{video.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {video.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded-md">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [onlyMust, setOnlyMust]           = useState(false);
  const [mainTab, setMainTab]             = useState('resources'); // 'resources' | 'videos'

  const displayed = RESOURCE_CATEGORIES
    .filter(cat => selectedTrack === 'all' || cat.tracks?.includes(selectedTrack))
    .map(cat => ({
      ...cat,
      resources: cat.resources.filter(r =>
        (!onlyMust || r.mustKnow) &&
        (selectedTrack === 'all' || r.tracks?.includes(selectedTrack))
      ),
    }))
    .filter(cat => cat.resources.length > 0);

  const displayedVideos = FEATURED_VIDEOS.filter(v =>
    (selectedTrack === 'all' || v.track === selectedTrack) &&
    (!onlyMust || v.mustKnow)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Free Resources</h1>
        <p className="text-slate-400 text-sm mt-1">Curated, 100% free resources and video tutorials — filtered by your track.</p>
      </div>

      {/* Track selector */}
      <div className="flex gap-2 flex-wrap">
        {TRACKS.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTrack(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
              selectedTrack === t.id
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tabs + toggle */}
      <div className="flex gap-2 items-center">
        {[
          { id: 'resources', label: '📚 Resources' },
          { id: 'videos',    label: '▶️ Videos' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setMainTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              mainTab === t.id
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                : 'border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-400 hover:text-white ml-auto">
          <input
            type="checkbox"
            className="checkbox"
            checked={onlyMust}
            onChange={e => setOnlyMust(e.target.checked)}
          />
          Must-Know only
        </label>
      </div>

      {/* ── Resources Tab ── */}
      {mainTab === 'resources' && (
        <div className="space-y-8">
          {displayed.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No resources found for this filter.</div>
          ) : (
            displayed.map(cat => (
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
                        <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-indigo-300 transition-colors">{resource.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">{resource.description}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {resource.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded-md">#{tag}</span>
                          ))}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Videos Tab ── */}
      {mainTab === 'videos' && (
        <div>
          <p className="text-slate-400 text-sm mb-4 font-mono">
            // {displayedVideos.length} curated tutorials · click ▶ to watch in-app
          </p>
          {displayedVideos.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No videos found for this filter.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVideos.map(video => <VideoCard key={video.id} video={video} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
