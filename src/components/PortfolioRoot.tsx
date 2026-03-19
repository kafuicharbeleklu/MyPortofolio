import React, { Suspense } from 'react';
import LanguageToggle from './LanguageToggle';
import usePortfolioModel from '../hooks/usePortfolioModel';

const ChatbotButton = React.lazy(() => import('./ChatbotButton'));

function PortfolioRoot() {
  const { content, lang, setLang } = usePortfolioModel();

  return (
    <>
      {content}
      <LanguageToggle lang={lang} onToggle={setLang} />
      <Suspense fallback={null}>
        <ChatbotButton />
      </Suspense>
    </>
  );
}

export default PortfolioRoot;
