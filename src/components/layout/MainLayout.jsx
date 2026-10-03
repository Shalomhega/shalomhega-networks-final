import { Outlet } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import CommunityPopup from "../ui/CommunityPopup.jsx";
import GoogleAnalytics from "../analytics/GoogleAnalytics.jsx";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-field">
      <GoogleAnalytics />

      <AnnouncementBar />

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <CommunityPopup />
    </div>
  );
}

export default MainLayout;
