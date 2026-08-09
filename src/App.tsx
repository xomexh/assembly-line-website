import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layout/SiteLayout.tsx';
import { BuildsPage } from './pages/builds/BuildsPage.tsx';
import { HomePage } from './pages/home/HomePage.tsx';
import { LegalPage } from './pages/legal/LegalPage.tsx';
import { NewsPage } from './pages/news/NewsPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { OffersPage } from './pages/offers/OffersPage.tsx';
import { StartPage } from './pages/start/StartPage.tsx';
import './site.css';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="builds" element={<BuildsPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="start" element={<StartPage />} />
        <Route path="privacy" element={<LegalPage type="privacy" />} />
        <Route path="terms" element={<LegalPage type="terms" />} />
        <Route path="refund" element={<LegalPage type="refund" />} />
        <Route path="shipping" element={<LegalPage type="shipping" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
