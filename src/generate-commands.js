import * as translations from './translations.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandFile = path.join(__dirname, 'commands.js');

if (fs.existsSync(commandFile)) fs.unlinkSync(commandFile);

fs.writeFileSync(commandFile, 'export const data = {\n');

Object.keys(translations.ServiceModes).forEach((modes) => {
    const subModes = translations.ServiceModes[modes];
    Object.keys(subModes).forEach((subMode) => {
        Object.keys(subModes[subMode]).forEach((pid) => {
            const Description = subModes[subMode][pid].Description;
            const mode = `${modes}${pid}`;
            if (Description) {
                const newDescription = Description.toLowerCase().replace(/'/g, "\\'");
                fs.appendFileSync(commandFile, `    '${newDescription}': '${mode}',\n`);
            }
        });
    });
});

fs.appendFileSync(commandFile, '};\n');