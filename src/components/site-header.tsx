import Link from 'next/link';
import { Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const SiteHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-accent font-headline">
            <Camera className="h-6 w-6" />
            <span>Cinefolio</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-accent transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-6 mt-12">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-xl text-foreground hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
