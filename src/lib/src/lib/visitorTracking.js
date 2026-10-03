const VISITOR_SESSION_KEY = "shalomhega-visitor-alert-sent";

function getDeviceType() {
  if (typeof window === "undefined") {
    return "Unknown";
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (/tablet|ipad|playbook|silk/.test(userAgent)) {
    return "Tablet";
  }

  if (
    /mobile|iphone|ipod|android|blackberry|opera mini|iemobile/.test(
      userAgent
    )
  ) {
    return "Mobile";
  }

  return "Desktop";
}

export async function trackWebsiteVisitor() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const alreadySent = sessionStorage.getItem(VISITOR_SESSION_KEY);

    if (alreadySent) {
      return;
    }

    const response = await fetch("/.netlify/functions/visitor-alert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: window.location.pathname || "/",
        device: getDeviceType(),
      }),
    });

    if (!response.ok) {
      return;
    }

    sessionStorage.setItem(VISITOR_SESSION_KEY, "true");
  } catch (error) {
    console.error("Visitor tracking error:", error);
  }
}
