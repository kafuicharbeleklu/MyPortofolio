import React, { Suspense } from 'react';

const PortfolioRoot = React.lazy(() => import('./components/PortfolioRoot'));

function App() {
  return (
    <Suspense fallback={null}>
      <PortfolioRoot />
    </Suspense>
  );
}

export default App;
