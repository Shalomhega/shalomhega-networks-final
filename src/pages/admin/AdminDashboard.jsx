import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  supabase,
  isSupabaseConfigured,
} from "../../lib/supabase.js";
import Button from "../../components/ui/Button.jsx";

const reviewStatuses = ["pending", "approved", "rejected"];

const inquiryStatuses = [
  "new",
  "contacted",
  "in_discussion",
  "confirmed",
  "closed",
];

const portfolioSlots = [
  {
    id: "welcome",
    title: "Welcome System",
    displayOrder: 1,
  },
  {
    id: "community-structure",
    title: "Community Structure",
    displayOrder: 2,
  },
  {
    id: "rules",
    title: "Rules System",
    displayOrder: 3,
  },
  {
    id: "role-selection",
    title: "Role Selection",
    displayOrder: 4,
  },
  {
    id: "faq",
    title: "FAQ System",
    displayOrder: 5,
  },
  {
    id: "verification",
    title: "Verification System",
    displayOrder: 6,
  },
];

const label = (value = "") =>
  value.replaceAll("_", " ").toUpperCase();

function AdminDashboard() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("overview");

  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  const [filter, setFilter] = useState("new");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const nav = useNavigate();

  async function load() {
    if (!supabase) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data: admin } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(user);

    const [reviewsResult, inquiriesResult, portfolioResult] =
      await Promise.all([
        supabase
          .from("reviews
