'use client';

import { useState, useRef, useEffect, useTransition, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { switchLang } from '@/lib/actions/lang';
import { DEFAULT_LANG } from '@/constants/language';

const SHEET_ANIMATION_DURATION = 200;

const languages = [
  { code: 'en', label: 'English', icon: 'A' },
  { code: 'ko', label: '한국어', icon: '한' }
];

/**
 * Language switcher
 * Desktop: dropdown menu
 * Mobile: Slide-up action sheet
 */
function LangSwitcher({ lang = DEFAULT_LANG }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [screenEl, setScreenEl] = useState(null);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  const menuRef = useRef(null);
  const closingTimer = useRef(null);

  // Whether the mobile sheet is visible (open or animating closed)
  const sheetVisible = isOpen || isClosing;

  useEffect(() => {
    setCurrentLang(languages.find((l) => l.code === lang) || languages[0]);
  }, [lang]);

  // Get the screen element for portal rendering
  useEffect(() => {
    setScreenEl(document.getElementById('screen'));
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (closingTimer.current) clearTimeout(closingTimer.current);
    };
  }, []);

  const closeSheet = useCallback(() => {
    setIsClosing(true);
    setIsOpen(false);
    closingTimer.current = setTimeout(() => {
      setIsClosing(false);
    }, SHEET_ANIMATION_DURATION);
  }, []);

  const handleSelect = useCallback(
    (code) => {
      if (code === currentLang?.code) {
        closeSheet();
        return;
      }

      // UI language switching
      const selected = languages.find((l) => l.code === code);
      if (selected) {
        setCurrentLang(selected);
      }

      // Server and cookie-based language switching
      startTransition(async () => {
        await switchLang(code);
        router.refresh();
      });

      closeSheet();
    },
    [currentLang, router, closeSheet]
  );

  // Close on click outside (desktop)
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

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeSheet();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeSheet]);

  return (
    <div
      ref={menuRef}
      className="relative flex xmd:block justify-start items-center py-1 xmd:py-0 px-1 xmd:px-0 h-full xmd:h-auto"
    >
      <button
        onClick={() => {
          if (isOpen) {
            closeSheet();
          } else {
            setIsOpen(true);
          }
        }}
        disabled={isPending || isClosing}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${currentLang?.label}`}
        className={`
          flex items-center justify-center cursor-pointer border-none rounded-full xmd:rounded-md xmd:py-1 xmd:px-2
        hover:bg-primary-300 xmd:hover:bg-white/10
          ${isOpen ? 'bg-primary-300 xmd:bg-white/10' : 'bg-primary-200 xmd:bg-transparent'}
        `}
        style={{
          transition: 'background-color 0.15s ease',
          opacity: isPending ? 0.5 : 1
        }}
      >
        <span className="flex justify-center items-center rounded-full xmd:rounded-sm border border-primary-200 xmd:border-white/80 w-6 h-6 xmd:h-4 bg-transparent">
          <span className="!font-semibold !text-gray-800 xmd:!text-white/80 !text-[11px] leading-[1] text-center">
            {currentLang?.icon}
          </span>
        </span>
      </button>

      {/* Dropdown menu (Desktop) */}
      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="dskt-only absolute right-0 top-full mt-1 mb-0 mx-0 min-w-[160px] rounded-md p-1 shadow-lg list-none"
          style={{
            backgroundColor: 'rgba(40, 44, 52, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          {languages.map((l) => (
            <li
              key={l.code}
              role="option"
              aria-selected={l.code === currentLang?.code}
            >
              <button
                onClick={() => handleSelect(l.code)}
                className="flex items-center gap-2 rounded-md border-none p-1.5 w-full bg-transparent hover:bg-white/20 text-left cursor-pointer"
                style={{ transition: 'background-color 0.1s ease' }}
              >
                <span className="w-[9px] !opacity-80">
                  {l.code === currentLang?.code ? (
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

      {/* Slide-up action sheet (Mobile) */}
      {sheetVisible &&
        screenEl &&
        createPortal(
          <div
            role="presentation"
            className={`mbl-only lang-sheet-overlay ${isClosing ? 'lang-sheet-overlay--closing' : ''}`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={closeSheet}
          >
            <div
              className={`lang-sheet ${isClosing ? 'lang-sheet--closing' : ''}`}
              onClick={(e) => e.stopPropagation()}
              role="listbox"
              aria-label="Select language"
            >
              <div className="lang-sheet-handle" />
              <p className="mb-3 !font-medium !text-gray-700 !text-md xmd:!text-xs text-center">
                {currentLang?.code === 'ko' ? '언어 선택' : 'Select Language'}
              </p>
              <div className="flex flex-col justify-start items-stretch gap-1 w-full">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    role="option"
                    aria-selected={l.code === currentLang?.code}
                    onClick={() => handleSelect(l.code)}
                    className={`lang-sheet-option ${l.code === currentLang?.code ? 'lang-sheet-option--active' : ''}`}
                  >
                    <span className="flex justify-center items-center rounded-sm border border-primary-300 w-7 h-5 bg-white">
                      <span className="!font-semibold !text-gray-700 !text-[13px] leading-[1] text-center">
                        {l.icon}
                      </span>
                    </span>
                    <span className="flex-1 !font-medium !text-gray-700 !text-[15px]">
                      {l.label}
                    </span>
                    {l.code === currentLang?.code && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-primary-600"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <button onClick={closeSheet} className="lang-sheet-cancel">
                {currentLang?.code === 'ko' ? '취소' : 'Cancel'}
              </button>
            </div>
          </div>,
          screenEl
        )}
    </div>
  );
}

export default LangSwitcher;
