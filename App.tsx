import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangLayout } from './layouts/LangLayout';
import { HubPage } from './pages/HubPage';
import { CountryPage } from './pages/CountryPage';
import { ServiceLandingPage } from './pages/ServiceLandingPage';
import { ApplyRoutePage } from './pages/ApplyRoutePage';
import { RootRedirect, LegacyApplyRedirect } from './pages/redirects';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/apply" element={<LegacyApplyRedirect />} />
        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<HubPage />} />
          <Route path=":country" element={<CountryPage />} />
          <Route path=":country/:service" element={<ServiceLandingPage />} />
          <Route path=":country/:service/apply" element={<ApplyRoutePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
