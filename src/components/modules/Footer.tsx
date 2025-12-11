import { YtDlpVersion } from '@/components/YtDlpVersion';

export function Footer() {
  return (
    <div className='text-center text-xs text-muted-foreground/70 space-y-2 pb-6'>
      <p>
        <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>Powered By</span> {' '}
        <a
          className='hover:underline'
          href='https://github.com/gavinhome/yt-dlp-web'
          rel='noopener noreferrer'
          target='_blank'
        >
          <span className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </a>
      </p>
      {/* <YtDlpVersion /> */}
    </div>
  );
}
