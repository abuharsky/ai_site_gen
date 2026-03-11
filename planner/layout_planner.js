const fs = require("fs");

const input = process.argv.slice(2).join(" ") || "";

const layout = {
  description: input,
  sections: [
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