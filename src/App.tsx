import { Route, Routes } from 'react-router-dom';
import {
  BuildsPage,
  HomePage,
  LegalPage,
  NewsPage,
  NotFoundPage,
  OffersPage,
  SiteLayout,
  StartPage,
} from './Site.tsx';

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
