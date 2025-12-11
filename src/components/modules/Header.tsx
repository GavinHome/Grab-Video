'use client';

import { useState, useEffect } from 'react';
import { getSession, isRequiredAuthentication, signOutWithForm } from '@/server/actions/auth';
import Link from 'next/link';
import Image from 'next/image';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { StorageStat } from '@/components/StorageStat';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { HiOutlineBarsArrowDown, HiOutlineBarsArrowUp } from 'react-icons/hi2';
import { useSiteSettingStore } from '@/store/siteSetting';
import { PageLayoutMode } from '@/store/siteSetting';

export function Header() {
  const [session, setSession] = useState<any>(null);
  const [isRequiredAuth, setIsRequiredAuth] = useState(false);
  const { layoutMode, setLayoutMode } = useSiteSettingStore();

  useEffect(() => {
    async function fetchData() {
      const [sessionData, isRequiredAuthData] = await Promise.all([getSession(), isRequiredAuthentication()]);
      setSession(sessionData);
      setIsRequiredAuth(isRequiredAuthData);
    }
    fetchData();
  }, []);

  return (
    <div className='flex gap-x-1 sm:gap-x-2 items-center justify-between'>
      <Link href='/' className='grow shrink-0 inline-flex items-center gap-2 sm:text-lg whitespace-nowrap'>
        <Image src='/logo.png' alt={process.env.NEXT_PUBLIC_APP_NAME || 'Grab Video'} width={64} height={64} className='h-8 sm:h-10 w-auto' />
        <span className='font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>Grab Video</span>
      </Link>
      {/* <div className='flex-auto max-w-[--site-min-width] ml-auto text-right'>
        <StorageStat />
      </div> */}
      <ThemeToggle />
      <Button 
        variant='ghost' 
        size='icon' 
        className='text-lg rounded-full hidden sm:flex' 
        onClick={() => setLayoutMode(layoutMode === 'horizontal' ? 'vertical' : 'horizontal')}
        title={layoutMode === 'horizontal' ? 'Switch to vertical layout' : 'Switch to horizontal layout'}
      >
        {layoutMode === 'horizontal' ? <HiOutlineBarsArrowUp /> : <HiOutlineBarsArrowDown />}
      </Button>
      {isRequiredAuth && (
        <>
          <Separator className='h-4' orientation='vertical' />
          {session?.user ? (
            <form action={signOutWithForm}>
              <Button type='submit' variant='ghost' size='icon' className='text-lg rounded-full'>
                <LuLogOut />
              </Button>
            </form>
          ) : (
            <Button variant='ghost' size='icon' className='text-lg rounded-full' asChild>
              <Link href='/signin'>
                <LuLogIn />
              </Link>
            </Button>
          )}
        </>
      )}
    </div>
  );
}
