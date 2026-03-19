import LanguageToggle from './LanguageToggle';
import usePortfolioModel from '../hooks/usePortfolioModel';

function PortfolioRoot() {
  const { content, lang, setLang } = usePortfolioModel();

  return (
    <>
      {content}
      <LanguageToggle lang={lang} onToggle={setLang} />
    </>
  );
}

export default PortfolioRoot;
