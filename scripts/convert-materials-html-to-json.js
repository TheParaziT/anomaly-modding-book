// Simple converter: parse two-column HTML tables into JSON with string values
// Targets:
// - docs/references/materials/assets/data/dynamic/*.html
// - docs/references/materials/assets/data/static/*.html
// Writes adjacent .json files preserving exact strings.

const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  path.join('docs', 'references', 'shaders', 'assets', 'data', 'compiler-shaders'),
];

/**
 * Extract text content inside the first level of a tag, without decoding entities.
 * Keeps original whitespace inside cells trimmed.
 */
const extractCellText = (html) => {
  if (typeof html !== 'string') return '';
  // Remove nested tags but keep inner text
  const noTags = html.replace(/<[^>]*>/g, '');
  return noTags.trim();
};

/**
 * Parse an HTML table where rows are <tr><td>Key</td><td>Value</td></tr>
 * Returns an object with insertion order matching the document.
 */
const parseTwoColumnTable = (html) => {
  const result = {};
  if (!html || typeof html !== 'string') return result;

  // Normalize newlines to simplify regex
  const normalized = html.replace(/\r\n?/g, '\n');

  // Match each <tr>...</tr>
  const rowRegex = /<tr[\s\S]*?>[\s\S]*?<\/tr>/gi;
  const rows = normalized.match(rowRegex) || [];

  for (const row of rows) {
    // Find two <td> cells in the row
    const cellRegex = /<td[\s\S]*?>[\s\S]*?<\/td>/gi;
    const cells = row.match(cellRegex) || [];
    if (cells.length < 2) continue;

    const key = extractCellText(cells[0]);
    const value = extractCellText(cells[1]);
    if (!key) continue;

    // Preserve exact string values (do not coerce types)
    result[key] = value;
  }

  return result;
};

const findHtmlFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.html'))
    .map((d) => path.join(dir, d.name));
};

const writeJsonBeside = (htmlFile, data) => {
  const jsonPath = htmlFile.replace(/\.html$/i, '.json');
  const json = JSON.stringify(data, null, 2) + '\n';
  fs.writeFileSync(jsonPath, json, 'utf8');
  return jsonPath;
};

const main = () => {
  let convertedCount = 0;
  for (const dir of TARGET_DIRS) {
    const files = findHtmlFiles(dir);
    for (const file of files) {
      const html = fs.readFileSync(file, 'utf8');
      const obj = parseTwoColumnTable(html);
      const jsonPath = writeJsonBeside(file, obj);
      convertedCount += 1;
      console.log(`Converted: ${path.relative(process.cwd(), file)} -> ${path.relative(process.cwd(), jsonPath)}`);
    }
  }
  console.log(`Done. Converted ${convertedCount} files.`);
};

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('Conversion failed:', error);
    process.exit(1);
  }
}


