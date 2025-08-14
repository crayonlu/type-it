import Info from '@/components/home/info';
import { getIntroduction } from '@/lib/home/get-introduction';
import { getLocale } from 'next-intl/server';

export default async function Home() {
  const locale = await getLocale();
  const introduction = await getIntroduction(locale);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Info introduction={introduction} />
    </div>
  );
}
