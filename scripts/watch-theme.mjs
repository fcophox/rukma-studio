import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const DESIGN_FILE = path.resolve('DESIGN.md');
const CSS_FILE = path.resolve('src/app/globals.css');

const INJECT_START = '/* --- THEME INJECT START --- */';
const INJECT_END = '/* --- THEME INJECT END --- */';

function updateTheme() {
  try {
    const markdown = fs.readFileSync(DESIGN_FILE, 'utf-8');
    // Extract JSON block
    const jsonMatch = markdown.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      console.error('No JSON block found in DESIGN.md');
      return;
    }

    const themeData = JSON.parse(jsonMatch[1]);
    const colors = themeData.theme.colors;

    let rootVars = '';
    let themeVars = '';

    for (const [key, value] of Object.entries(colors)) {
      rootVars += `  --color-${key}: ${value};\n`;
      themeVars += `  --color-${key}: var(--color-${key});\n`;
    }

    const cssContent = fs.readFileSync(CSS_FILE, 'utf-8');

    const injectedCss = `
:root {
${rootVars}}

@theme inline {
${themeVars}}
`.trim();

    const startIndex = cssContent.indexOf(INJECT_START);
    const endIndex = cssContent.indexOf(INJECT_END);

    if (startIndex !== -1 && endIndex !== -1) {
      const newCssContent = cssContent.substring(0, startIndex + INJECT_START.length) +
        '\n' + injectedCss + '\n' +
        cssContent.substring(endIndex);

    if (newCssContent !== cssContent) {
        fs.writeFileSync(CSS_FILE, newCssContent, 'utf-8');
        console.log('Theme updated from DESIGN.md');
      }
    } else {
      console.error('Injection markers not found in globals.css');
    }
  } catch (err) {
    console.error('Failed to update theme:', err.message);
  }
}

// Initial run
updateTheme();

// Watch for changes
chokidar.watch(DESIGN_FILE).on('change', () => {
  console.log('DESIGN.md changed, updating theme...');
  updateTheme();
});

console.log('Watching DESIGN.md for theme changes...');
