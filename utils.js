import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __filename and __dirname aren't available by default in ES modules, so we need to create them
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
