import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Predictions from "./pages/Predictions";
import Analytics from "./pages/Analytics";
import TeamPage from './components/Footer_pages/about/team';
import CareersPage from './components/Footer_pages/about/careers';
import SupportPage from './components/Footer_pages/contact/support';
import MediaPage from './components/Footer_pages/contact/media';
import EventsPage from './components/Footer_pages/follow/events';
import WebinarsPage from './components/Footer_pages/follow/webinars';
import PrivacyPolicyPage from './components/Footer_pages/other/privacy-policy';
import FaqPage from './components/Footer_pages/other/faq';
import TermsOfServicePage from './components/Footer_pages/other/terms-of-service';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/predictions" element={<Predictions />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/about/team" element={<TeamPage />} />
                    <Route path="/about/careers" element={<CareersPage />} />
                    <Route path="/contact/support" element={<SupportPage />} />
                    <Route path="/contact/media" element={<MediaPage />} />
                    <Route path="/follow/events" element={<EventsPage />} />
                    <Route path="/follow/webinars" element={<WebinarsPage />} />
                    <Route path="/other/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/other/terms-of-service" element={<TermsOfServicePage />} />
                    <Route path="/other/faq" element={<FaqPage />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;

