import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';

interface CareerItem {
  order: number;
  period: string;
  title: string;
  company?: string;
  description: string[];
  icon?: string;
  color?: string;
  skills?: string[];
}

interface CareerTimelineProps {
  items: CareerItem[];
}

export default function CareerTimeline({ items }: CareerTimelineProps) {
  const customizedMarker = (item: CareerItem) => {
    return (
      <span
        className="flex w-10 h-10 items-center justify-center text-white rounded-full z-10 shadow-lg"
        style={{ backgroundColor: item.color || '#3b82f6' }}
      >
        <i className={item.icon || 'pi pi-check'}></i>
      </span>
    );
  };

  const customizedContent = (item: CareerItem) => {
    return (
      <div className="flex flex-col items-center">
        <Card className="mt-6 mb-4 w-72 md:w-80 border border-gray-700/50 bg-dark-surface/50 backdrop-blur-sm shadow-xl hover:border-blue-500/50 transition-colors text-left flex-shrink-0">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-blue-400">{item.period}</span>
          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
          {item.company && (
            <h4 className="text-lg text-gray-300 font-medium">{item.company}</h4>
          )}
          <ul className="mt-4 flex flex-col gap-2 text-gray-400 list-disc list-inside">
            {item.description.map((desc, i) => (
              <li key={i} className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }}></li>
            ))}
          </ul>
          {item.skills && item.skills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {item.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
      </div>
    );
  };

  return (
    <div className="w-full hide-scrollbar overflow-x-auto md:overflow-x-visible">
      <Timeline
        value={items}
        layout="horizontal"
        align="top"
        className="customized-timeline w-full px-4"
        marker={customizedMarker}
        content={customizedContent}
      />
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .p-timeline-horizontal .p-timeline-event {
          flex: 1 1 0;
          flex-direction: column !important;
          align-items: center !important;
          min-width: 0;
        }

        .p-timeline-event-opposite {
          display: none !important;
        }

        .p-timeline-event-content {
          padding-top: 1rem !important;
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
        }

        .p-timeline-horizontal .p-timeline-event-separator {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          width: 100% !important;
          position: relative;
        }
        
        .p-timeline-horizontal .p-timeline-event-separator::before,
        .p-timeline-horizontal .p-timeline-event-separator::after {
          content: "" !important;
          flex: 1 !important;
          height: 2px !important;
          background-color: #374151 !important;
        }

        .p-timeline-horizontal .p-timeline-event-connector {
          display: none !important;
        }

        /* Hide the leading part of the first item and the trailing part of the last item */
        .p-timeline-horizontal .p-timeline-event:first-child .p-timeline-event-separator::before {
          background-color: transparent !important;
        }
        .p-timeline-horizontal .p-timeline-event:last-child .p-timeline-event-separator::after {
          background-color: transparent !important;
        }
        
        .p-timeline-event-marker {
          flex: 0 0 auto !important;
          z-index: 1;
          margin: 0 !important;
        }

        /* Mobile Responsive Overrides */
        @media (max-width: 768px) {
          .customized-timeline.p-timeline-horizontal {
            flex-direction: column !important;
          }

          .customized-timeline .p-timeline-event {
             flex: none !important;
             width: 100% !important;
             min-width: 0 !important;
             margin-bottom: 0 !important;
          }
          
          .p-timeline-horizontal .p-timeline-event-separator {
            display: none !important;
          }

          .p-timeline-event-content {
            padding-top: 0 !important;
            padding-bottom: 1rem !important;
          }
          
          .p-timeline-event-content .p-card {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
          }

          .hide-scrollbar {
            overflow-x: visible !important;
            overflow-y: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
