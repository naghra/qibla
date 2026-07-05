import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { LangLayout } from './layouts/LangLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HubPage } from './pages/HubPage';
import { CountryPage } from './pages/CountryPage';
import { ServiceLandingPage } from './pages/ServiceLandingPage';
import { ApplyRoutePage } from './pages/ApplyRoutePage';
import { RootRedirect, LegacyApplyRedirect } from './pages/redirects';
import { AdminGuestRoute, AdminProtectedRoute } from './components/admin/AdminRouteGuards';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminApplicationDetailPage } from './pages/admin/AdminApplicationDetailPage';
import { AdminDestinationsPage } from './pages/admin/AdminDestinationsPage';
import { LegalPageRoute } from './pages/LegalPageRoute';
import { SuccessPreviewPage } from './pages/SuccessPreviewPage';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin panel — must be before /:lang */}
          <Route path="/admin/login" element={<AdminGuestRoute />}>
            <Route index element={<AdminLoginPage />} />
          </Route>
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="applications" element={<AdminApplicationsPage />} />
              <Route path="applications/:id" element={<AdminApplicationDetailPage />} />
              <Route path="destinations" element={<AdminDestinationsPage />} />
            </Route>
          </Route>

          <Route path="/" element={<RootRedirect />} />
          <Route path="/apply" element={<LegacyApplyRedirect />} />
          <Route path="/thailand/tdac/*" element={<Navigate to="/en/thailand/tdac" replace />} />
          <Route path="/:lang/legal/:slug" element={<LegalPageRoute />} />
          <Route path="/:lang/success-preview" element={<SuccessPreviewPage />} />
          <Route path="/:lang" element={<LangLayout />}>
            <Route index element={<HubPage />} />
            <Route path=":country" element={<CountryPage />} />
            <Route path=":country/:service" element={<ServiceLandingPage />} />
            <Route path=":country/:service/apply" element={<ApplyRoutePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
};

export default App;
