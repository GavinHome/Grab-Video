'use client';

import { DownloadContainer } from '@/components/containers/DownloadContainer';
import { VideoList } from '@/components/containers/VideoList';
import { UrlParameterWatcher } from '@/components/UrlParameterWatcher';
import { Header } from '@/components/modules/Header';
import { Footer } from '@/components/modules/Footer';
import { useSiteSettingStore } from '@/store/siteSetting';

export default function Home() {
  const { layoutMode } = useSiteSettingStore();
  return (
    <main className='flex flex-col h-full mx-auto max-w-8xl p-4 space-y-4'>
      <UrlParameterWatcher />
      <Header />
      <div className={`flex flex-col gap-4 ${layoutMode === 'horizontal' ? 'lg:flex-row' : ''}`}>
        <div className={`${layoutMode === 'horizontal' ? 'lg:flex flex-col lg:shrink-0 lg:w-96 lg:py-4 lg:max-h-screen lg:sticky lg:top-0 lg:left-0' : 'w-full'}`}>
          <DownloadContainer />
        </div>
        <div className={`${layoutMode === 'horizontal' ? 'lg:grow lg:py-4' : 'w-full'}`}>
          <VideoList />
        </div>
      </div>
      <Footer />
    </main>
  );
}
