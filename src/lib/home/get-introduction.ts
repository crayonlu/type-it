import { promises as fs } from 'fs';
import path from 'path';

export async function getIntroduction(locale: string): Promise<string> {
  let filePath = '';
  if (locale === 'zh') {
    filePath = path.join(process.cwd(), 'src/config/docs/Home/introduction.zh.md');
  } else {
    filePath = path.join(process.cwd(), 'src/config/docs/Home/introduction.en.md');
  }
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    // fallback to en
    const fallbackPath = path.join(process.cwd(), 'src/config/docs/Home/introduction.en.md');
    return await fs.readFile(fallbackPath, 'utf8');
  }
}
