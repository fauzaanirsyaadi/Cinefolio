'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Menu, X, Instagram, Facebook, Linkedin, LogOut, LogIn } from 'lucide-react';
import { Separator } from './ui/separator';
import { logout } from '@/app/login/actions';

type User = { email?: string } | null;

export default function SiteHeaderClient({ user }: { user: User }) {
  const navLinks = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const secondaryLinks = [
    { href: '/cookies', label: 'Cookie' },
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
  ];

  const dashboardLink = user ? { href: '/dashboard', label: 'Dashboard' } : null;
  const allNavLinks = dashboardLink ? [...navLinks, dashboardLink] : navLinks;

  // hide leading index for these labels
  const skipNumberFor = new Set(['work', 'about', 'contact', 'login']);
 
   return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary font-headline">
            {/* logo svg (kept minimal) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 131 63" width="80" className="h-8 w-auto" aria-hidden="true" />
            {/* Visible brand wordmark — larger, bolder, and with slight shadow for contrast */}
            <span className="ml-3 text-lg md:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm font-headline" aria-label="Cinefolio">
              Cinefolio
            </span>
          </Link>

          {/* Hamburger / Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary transition-colors" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-primary text-primary-foreground p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 flex justify-end">
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10" aria-label="Close menu">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col space-y-2 p-6 flex-grow">
                  {allNavLinks.map((link, index) => {
                    const lbl = (link.label || '').toLowerCase();
                    const showNumber = !skipNumberFor.has(lbl);
                    return (
                      <SheetClose asChild key={link.href}>
                        <Link href={link.href} className="flex items-baseline gap-4 text-3xl font-bold font-headline group">
                          {showNumber && (
                            <span className="text-xs font-light text-primary-foreground/50 group-hover:text-primary-foreground transition-colors">0{index+1}</span>
                          )}
                          <span className="group-hover:translate-x-2 transition-transform">{link.label.toUpperCase()}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {user ? (
                    <SheetClose asChild>
                      <form action={logout} className="w-full">
                        <Button variant="ghost" className="flex items-baseline gap-4 text-3xl font-bold font-headline group w-full justify-start p-0">
                          {/* no leading number for sign out */}
                          <span className="group-hover:translate-x-2 transition-transform">SIGN OUT</span>
                        </Button>
                      </form>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link href="/login" className="flex items-baseline gap-4 text-3xl font-bold font-headline group">
                        {/* no leading number for login */}
                        <span className="group-hover:translate-x-2 transition-transform">LOGIN</span>
                      </Link>
                    </SheetClose>
                  )}
                </nav>

                <div className="p-6 space-y-4">
                  <Separator className="bg-primary-foreground/20" style={{ borderStyle: 'dashed' }} />
                  <div className="flex justify-center space-x-6">
                    {secondaryLinks.map(link => (
                      <Link key={link.href} href={link.href} className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                        {link.label.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                  <Separator className="bg-primary-foreground/20" style={{ borderStyle: 'dashed' }} />
                  <div className="flex justify-center space-x-6">
                    <Link href="#" aria-label="Instagram" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      <Instagram className="h-5 w-5" />
                    </Link>
                    <Link href="#" aria-label="Facebook" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="#" aria-label="LinkedIn" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                  <Separator className="bg-primary-foreground/20" style={{ borderStyle: 'dashed' }} />
                  <p className="text-center text-xs text-primary-foreground/50">&copy; {new Date().getFullYear()} Cinefolio.</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}