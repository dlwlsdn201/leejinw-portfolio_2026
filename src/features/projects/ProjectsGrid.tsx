import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';

export interface ProjectItem {
  id: string;
  order: number;
  title: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  bodyHtml: string;
}

export default function ProjectsGrid({ items }: { items: ProjectItem[] }) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-10">
        {items.map((item) => (
          <div key={item.id} className="cursor-pointer group h-full" onClick={() => setSelectedProject(item)}>
            <Card className="h-full bg-dark-surface/80 border border-gray-700/50 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden rounded-xl">
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                <img alt={item.title} src={item.thumbnail} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent opacity-80" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{item.summary}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700/50">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-blue-900/40 text-blue-300 rounded-md border border-blue-800/50">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Dialog
        header={selectedProject?.title}
        visible={!!selectedProject}
        style={{ width: '90vw', maxWidth: '800px' }}
        onHide={() => setSelectedProject(null)}
        className="dark-dialog"
        pt={{
          header: { className: 'bg-dark-surface text-white border-b border-gray-700 p-6 text-2xl font-bold shadow-sm' },
          content: { className: 'bg-dark-bg text-gray-200 p-0' },
          footer: { className: 'bg-dark-surface border-t border-gray-700 p-4' }
        }}
        footer={
          <div className="flex gap-4 justify-end">
             {selectedProject?.repoUrl && (
              <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-600">
                <i className="pi pi-github"></i>
                <span>Repository</span>
              </a>
            )}
            {selectedProject?.liveUrl && (
              <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                <i className="pi pi-external-link"></i>
                <span>Live Preview</span>
              </a>
            )}
          </div>
        }
      >
        {selectedProject && (
          <div className="flex flex-col">
            <img src={selectedProject.thumbnail} alt="preview" className="w-full h-64 md:h-80 object-cover" />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-800">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="text-sm px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full border border-blue-800/50 shadow-sm">{tag}</span>
                ))}
              </div>
              <div 
                className="markdown-body text-base leading-relaxed space-y-4" 
                dangerouslySetInnerHTML={{ __html: selectedProject.bodyHtml }}
              ></div>
            </div>
          </div>
        )}
      </Dialog>
      <style>{`
        .markdown-body h1 { font-size: 1.75rem; font-weight: 700; color: white; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .markdown-body h2 { font-size: 1.5rem; font-weight: 600; color: #e2e8f0; margin-top: 1.25rem; margin-bottom: 0.5rem; }
        .markdown-body h3 { font-size: 1.25rem; font-weight: 600; color: #cbd5e1; margin-top: 1rem; margin-bottom: 0.5rem; }
        .markdown-body p { margin-bottom: 1rem; color: #94a3b8; }
        .markdown-body ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #94a3b8; line-height: 1.75; }
        .markdown-body li { margin-bottom: 0.25rem; }
        .markdown-body strong { color: #f8fafc; font-weight: 600; }
        .p-dialog-mask { background-color: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); }
        .p-dialog-header-icons .p-dialog-header-icon { color: #94a3b8; }
        .p-dialog-header-icons .p-dialog-header-icon:hover { color: white; background: rgba(255,255,255,0.1); }
      `}</style>
    </>
  );
}
