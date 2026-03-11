const fs = require("fs");

const systemPrompt = fs.readFileSync("prompts/system_prompt.txt","utf8");
const design = fs.readFileSync("prompts/design_system.txt","utf8");
const layout = fs.readFileSync("planner/site_layout.json","utf8");

const finalPrompt = `
${systemPrompt}

${design}

LAYOUT JSON:

${layout}

Generate index.html using this layout.
Each section should be clearly separated.
`;

fs.writeFileSync("prompts/final_prompt.txt", finalPrompt);