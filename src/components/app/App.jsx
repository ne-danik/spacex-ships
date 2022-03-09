import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../../pages/MainPage'));
const ShipPage = lazy(() => import('../../pages/ShipPage'));
const NotFound = lazy(() => import('../../pages/NotFound'));

const App = () => {
  return (
    <Router>
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route end path='/' element={<MainPage />} />
            <Route end path='/ship/:id' element={<ShipPage />} />
            <Route end path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}

export default App;