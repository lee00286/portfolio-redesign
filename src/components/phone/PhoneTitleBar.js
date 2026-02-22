'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LangSwitcher from '@/components/LangSwitcher';
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LANG_COOKIE_NAME
} from '@/constants/language';

function getClientLang() {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LANG_COOKIE_NAME}=([^;]*)`)
  );
  const val = match ? decodeURIComponent(match[1]) : null;
  return SUPPORTED_LANGS.includes(val) ? val : DEFAULT_LANG;
}

/**
 * Mobile URL bar
 */
function PhoneTitleBar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    setLang(getClientLang());
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="mbl-only flex items-center gap-3 border-b border-primary-200 pt-2 pb-4 px-4 sm:px-6 w-full bg-primary-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-0 rounded-full border border-primary-200/50 py-0 pl-0.5 w-full bg-white">
          <LangSwitcher lang={lang} />

          <p className="flex-1 py-2 !font-mono !text-gray-500 truncate !text-[13px] !leading-normal text-center">
            yenalee.dev{pathname}
            {hash || ''}
          </p>

          {/* Spacer to balance the lang switcher width */}
          <div className="shrink-0 w-[34px]" />
        </div>
      </div>
    </div>
  );
}

export default PhoneTitleBar;
