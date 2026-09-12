import Home from "../pages/Home.jsx";
import Services from "../pages/Services.jsx";
import CommunitySystems from "../pages/CommunitySystems.jsx";
import FindYourCommunityVibe from "../pages/FindYourCommunityVibe.jsx";
import OurWork from "../pages/OurWork.jsx";
import Pricing from "../pages/Pricing.jsx";
import OurTeam from "../pages/OurTeam.jsx";
import Reviews from "../pages/Reviews.jsx";
import HowItWorks from "../pages/HowItWorks.jsx";
import StartYourProject from "../pages/StartYourProject.jsx";
import LeaveReview from "../pages/LeaveReview.jsx";

// Single source of truth for site routes. The router builds pages from
// this list, and the header builds its navigation from it, so a new page
// only has to be added here once.
export const routes = [
  { path: "/", label: "Home", Component: Home },
  { path: "/services", label: "Services", Component: Services },
  {
    path: "/community-systems",
    label: "Community Systems",
    Component: CommunitySystems,
  },
  {
    path: "/find-your-vibe",
    label: "Find Your Community Vibe",
    Component: FindYourCommunityVibe,
  },
  { path: "/our-work", label: "Our Work", Component: OurWork },
  { path: "/pricing", label: "Pricing", Component: Pricing },
  { path: "/our-team", label: "Our Team", Component: OurTeam },
  { path: "/reviews", label: "Reviews", Component: Reviews },
  { path: "/leave-a-review", label: "Leave a Review", Component: LeaveReview },
  { path: "/how-it-works", label: "How It Works", Component: HowItWorks },
  {
    path: "/start-your-project",
    label: "Start Your Project",
    Component: StartYourProject,
    isCta: true,
  },
];
