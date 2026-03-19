import usePortfolioModel from '../hooks/usePortfolioModel';

function PortfolioRoot() {
  const { content } = usePortfolioModel();

  return content;
}

export default PortfolioRoot;
