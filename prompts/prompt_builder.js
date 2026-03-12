const fs = require("fs");

const systemPrompt = fs.readFileSync("prompts/system_prompt.txt","utf8");
const design = fs.readFileSync("prompts/design_system.txt","utf8");
const layoutRaw = fs.readFileSync("planner/site_layout.json","utf8");
const layout = JSON.parse(layoutRaw);

let existingSiteBlock = "";

if (layout.mode === "edit" && fs.existsSync("index.html")) {
  const currentSite = fs.readFileSync("index.html", "utf8");
  existingSiteBlock = `

CURRENT INDEX.HTML:

\`\`\`html
${currentSite}
\`\`\`
`;
}

const finalPrompt = `
${systemPrompt}

${design}

LAYOUT JSON:

${layoutRaw}

OPERATING MODE:

${layout.mode}
${existingSiteBlock}

${layout.mode === "edit"
  ? "Analyze the current site first, then apply only the requested changes to index.html. Preserve working structure and content unless the request requires changing them."
  : "Generate a new index.html using this layout. Each section should be clearly separated."
}
`;

fs.writeFileSync("prompts/final_prompt.txt", finalPrompt);
