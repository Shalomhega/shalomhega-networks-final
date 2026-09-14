export default async (request) => {
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed",
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const {
      name,
      project_type,
      review,
      rating,
    } = await request.json();

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    // Check if Discord webhook is configured
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not configured.");

      return new Response(
        JSON.stringify({
          error: "Discord webhook is not configured.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Create star rating
    const stars =
      "⭐".repeat(Number(rating || 0)) +
      "☆".repeat(5 - Number(rating || 0));

    // Send notification to Discord
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "SHALOMHEGA NETWORKS",
        embeds: [
          {
            title: "🌟 NEW REVIEW SUBMITTED",
            description:
              "A new review has been submitted on your website and is waiting for approval.",

            fields: [
              {
                name: "👤 Name",
                value: name || "Not provided",
                inline: true,
              },
              {
                name: "📁 Project Type",
                value: project_type || "Not provided",
                inline: true,
              },
              {
                name: "⭐ Rating",
                value: `${stars} (${rating || 0}/5)`,
                inline: false,
              },
              {
                name: "💬 Review",
                value: review || "No review provided",
                inline: false,
              },
            ],

            footer: {
              text: "SHALOMHEGA NETWORKS • Review Approval Required",
            },

            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();

      console.error(
        "Discord webhook error:",
        errorText
      );

      throw new Error("Failed to send Discord notification.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Discord notification sent successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Review notification error:",
      error
    );

    return new Response(
      JSON.stringify({
        error: "Failed to send notification.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
