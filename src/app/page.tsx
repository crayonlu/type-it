import Info from '@/components/home/Info';
import { getIntroduction } from '@/lib/home/get-introduction';
import { getLocale } from 'next-intl/server';

export default async function Home() {
  const locale = await getLocale();
  const introduction = await getIntroduction(locale);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
      <Info introduction={introduction} />
      <div className="mt-auto pb-6">
        <a 
          href="https://beian.miit.gov.cn/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          冀ICP备2025108834号-1
        </a>
      </div>
    </div>
  );
}
