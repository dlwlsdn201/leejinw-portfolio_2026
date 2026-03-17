import { useEffect, useState } from "react";

const sections = [
  { id: "intro", label: "Intro", icon: "✦" },
  { id: "career", label: "Career", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🗃️" },
  { id: "album", label: "Album", icon: "📷" },
  { id: "contact", label: "Contact", icon: "📞" },
];

const navigate = (id: string) => {
  // Fire custom event for JS full-page scroll handler (desktop)
  const event = new CustomEvent("navigateSection", { detail: { id } });
  window.dispatchEvent(event);

  // Also scroll natively for mobile
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function DotNavigator() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    // 스크롤 시 뷰포트에 들어온 섹션 감지 (데스크톱 wheel + 모바일 스크롤)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.4 },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Dot 클릭 시 즉시 activeSection 동기화 (navigateSection 이벤트)
    const handleNavigate = (e: CustomEvent<{ id: string }>) => {
      if (e.detail?.id) setActiveSection(e.detail.id);
    };
    window.addEventListener("navigateSection", handleNavigate as EventListener);

    return () => {
      observer.disconnect();
      window.removeEventListener("navigateSection", handleNavigate as EventListener);
    };
  }, []);

  return (
    <>
      {/* ─── Desktop: vertical right-side dot navigator ─── */}
      <div className='hidden laptop:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 flex-col gap-5 z-50'>
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            aria-label={`Go to ${label} section`}
            title={label}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === id
                ? "bg-blue-400 scale-125 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                : "bg-gray-600 hover:bg-gray-400 hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* ─── Mobile: bottom pill navigation ─── */}
      <nav
        className='laptop:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50
                   flex items-center gap-1 px-4 py-2 rounded-full
                   bg-white/5 backdrop-blur-xl border border-white/10
                   shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
        aria-label='Section navigation'>
        {sections.map(({ id, label, icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              aria-label={`Go to ${label}`}
              className={`
                relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold
                transition-all duration-300 ease-out select-none
                ${
                  isActive
                    ? "bg-blue-500/20 text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.4)]"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }
              `}>
              <span className='text-base leading-none'>{icon}</span>
              <span
                className={`overflow-hidden transition-all duration-300 ease-out whitespace-nowrap
                  ${isActive ? "max-w-16 opacity-100" : "max-w-0 opacity-0"}`}>
                {label}
              </span>
              {isActive && (
                <span className='absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400' />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
