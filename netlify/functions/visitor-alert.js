export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  const webhookUrl = process.env.DISCORD_VISITOR_WEBHOOK;

  if (!webhookUrl) {
    return new Response("Discord webhook is not configured.", {
      status: 500,
    });
  }

  const geo = context.geo || {};

  const country = geo.country?.name || "Unknown";
  const countryCode = geo.country?.code || "";
  const region = geo.subdivision?.name || "Unknown";
  const city = geo.city || "Unknown";
  const timezone = geo.timezone || "Unknown";

  let page = "Unknown";
  let device = "Unknown";

  try {
    const body = await req.json();

    page = body.page || "Unknown";
    device = body.device || "Unknown";
  } catch {
    // Continue with default values if no JSON body is provided.
  }

  const now = new Date();

  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone || "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone || "UTC",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  const flag = countryCode
    ? countryCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(127397 + char.charCodeAt(0))
        )
    : "🌍";

  const discordMessage = {
    username: "SHALOMHEGA Website",
    embeds: [
      {
        title: "🌐 New Website Visitor",
        description: "Someone just visited SHALOMHEGA NETWORKS.",
        fields: [
          {
            name: "📍 Location",
            value: `${flag} ${country}\n${region}\n${city}`,
            inline: true,
          },
          {
            name: "🕒 Date & Time",
            value: `${date}\n${time}`,
            inline: true,
          },
          {
            name: "📄 Page",
            value: page,
            inline: true,
          },
          {
            name: "📱 Device",
            value: device,
            inline: true,
          },
          {
            name: "🌎 Timezone",
            value: timezone,
            inline: true,
          },
        ],
        footer: {
          text: "SHALOMHEGA NETWORKS • Live Visitor Alert",
        },
        timestamp: now.toISOString(),
      },
    ],
  };

  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discordMessage),
  });

  if (!discordResponse.ok) {
    return new Response("Failed to send Discord notification.", {
      status: 502,
    });
  }

  return Response.json({
    success: true,
  });
};
