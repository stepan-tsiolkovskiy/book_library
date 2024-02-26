import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../../../images');

export const serveImage = (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(imagesDir, filename));
};
