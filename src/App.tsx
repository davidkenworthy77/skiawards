/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RankingsPage from "./pages/RankingsPage";
import ReportPage from "./pages/ReportPage";
import ResortDetailPage from "./pages/ResortDetailPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/resort/:slug" element={<ResortDetailPage />} />
      </Routes>
    </Router>
  );
}



