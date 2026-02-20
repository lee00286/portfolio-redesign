'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useTransition } from 'react';
import { switchLang } from '@/lib/actions/lang';

const languages = [
  { code: 'en', label: 'English', icon: 'A' },
  { code: 'ko', label: '한국어', icon: '한' }
];

/**
 * macOS-style keyboard input language switcher for the menu bar.
 * Displays current language icon; opens a dropdown to select language.
 */
function LangSwitcher({ lang = 'en' }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  const handleSelect = (code) => {
    if (code === lang) {
      setIsOpen(false);
      return;
    }
    startTransition(async () => {
      await switchLang(code);
      router.refresh();
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${currentLang.label}`}
        className={`
          flex items-center justify-center cursor-pointer border-none rounded px-2 py-1 hover:bg-white/10 ${
            isOpen ? 'bg-white/10' : 'bg-transparent'
          }
        `}
        style={{
          transition: 'background-color 0.15s ease',
          opacity: isPending ? 0.5 : 1
        }}
      >
        <span className="flex justify-center items-center rounded-sm border border-white/80 w-6 h-4">
          <span className="!font-semibold !text-white/80 !text-[11px] leading-[1] text-center">
            {currentLang.icon}
          </span>
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-1 mb-0 mx-0 min-w-[160px] rounded-md p-1 shadow-lg list-none"
          style={{
            backgroundColor: 'rgba(40, 44, 52, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          {languages.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                onClick={() => handleSelect(l.code)}
                className="flex items-center gap-2 rounded-md border-none p-1.5 w-full bg-transparent hover:bg-white/20 text-left cursor-pointer"
                style={{ transition: 'background-color 0.1s ease' }}
              >
                <span className="w-[9px] !opacity-80">
                  {l.code === lang ? (
                    <img
                      src="/img/icons/checkmark-icon.svg"
                      alt="Checkmark icon"
                      width={9}
                      height={9}
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    ''
                  )}
                </span>
                <span className="flex justify-center items-center rounded-sm w-5 h-4 bg-white/90">
                  <span className="mt-[1px] !font-semibold !text-[rgba(40,44,52,0.8)] !text-[10px] leading-[1] text-center">
                    {l.icon}
                  </span>
                </span>
                <span className="!text-white/90 !text-[12px] leading-[1]">
                  {l.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LangSwitcher;
