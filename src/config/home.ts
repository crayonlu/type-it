// 首页配置项

// 这里我直接使用github的url了
export const avatar = 'https://avatars.githubusercontent.com/u/180070272?v=4';

export const nickname = 'crayon';

export async function getIntroduction(locale: string) {
  try {
    if (locale === 'zh') {
      const { default: introduction } = await import('./markdown/Home/introduction.zh.md');
      return introduction;
    } else {
      const { default: introduction } = await import('./markdown/Home/introduction.en.md');
      return introduction;
    }
  } catch (error) {
    const { default: introduction } = await import('./markdown/Home/introduction.en.md');
    return introduction;
  }
}

import introduction from './markdown/Home/introduction.en.md';
export { introduction };