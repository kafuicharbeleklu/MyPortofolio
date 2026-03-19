import usePortfolioModel from './hooks/usePortfolioModel';

function App() {
  const { content } = usePortfolioModel();

  return content;
}

export default App;
