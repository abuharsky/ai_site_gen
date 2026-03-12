const fs = require("fs");

const input = process.argv.slice(2).join(" ") || "";

function isEditRequest(value) {
  const editPatterns = [
    /\bedit\b/i,
    /\bmodify\b/i,
    /\bupdate\b/i,
    /\brevise\b/i,
    /\brefresh\b/i,
    /\bimprove\b/i,
    /\bchange\b/i,
    /\bfix\b/i,
    /\bexisting site\b/i,
    /\bcurrent site\b/i,
    /\bcurrent landing\b/i,
    /внес[тие][^\n]{0,20}правк/i,
    /внести[^\n]{0,20}правк/i,
    /доработ/i,
    /обнови[тьл]/i,
    /измени/i,
    /исправ/i,
    /текущ[а-я]+\s+сайт/i,
    /существующ[а-я]+\s+сайт/i
  ];

  return editPatterns.some((pattern) => pattern.test(value));
}

const mode = isEditRequest(input) ? "edit" : "create";

const layout = {
  mode,
  user_request: input,
  image_policy: {
    provider: "images.pexels.com",
    style: "bright premium editorial",
    max_images: 3,
    rules: [
      "Use images sparingly and only when they strengthen hierarchy or storytelling.",
      "Prefer one dominant hero image and up to two supporting images.",
      "Avoid decorative galleries, collages, busy mosaics, and visual clutter.",
      "Choose warm, polished, premium-looking photography with natural light and clean composition."
    ]
  },
  sections: mode === "edit"
    ? []
    : [
        "hero",
        "social_proof",
        "features",
        "pricing",
        "testimonials",
        "faq",
        "cta",
        "contacts"
      ]
};

fs.writeFileSync("planner/site_layout.json", JSON.stringify(layout,null,2));
console.log("Layout created.");
