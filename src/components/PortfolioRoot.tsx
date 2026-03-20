import React, { Suspense } from 'react';
import LanguageToggle from './LanguageToggle';
import usePortfolioModel from '../hooks/usePortfolioModel';

const ChatbotButton = React.lazy(() => import('./ChatbotButton'));

function PortfolioRoot() {
  const { content, lang, setLang, isLightboxOpen } = usePortfolioModel();

  return (
    <>
      {content}
      <LanguageToggle lang={lang} onToggle={setLang} />
      <Suspense fallback={null}>
        <div style={isLightboxOpen ? { display: 'none' } : undefined}>
          <ChatbotButton />
        </div>
      </Suspense>
    </>
  );
}

export default PortfolioRoot;
