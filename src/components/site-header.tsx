import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Menu, X, Instagram, Facebook, Linkedin, LogOut, LogIn } from 'lucide-react';
import { Separator } from './ui/separator';
import { getUser } from '@/lib/auth';
import SiteHeaderClient from './site-header-client';

export default async function SiteHeader() {
  const user = await getUser();
  return <SiteHeaderClient user={user} />;
}
