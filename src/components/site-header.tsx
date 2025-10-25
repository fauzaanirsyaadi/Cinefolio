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
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary font-headline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 131 63" width="80" className="h-8"><path fill="currentColor" d="M130.695 50.504h-12.958c1.745-.996 2.243-3.322 2.243-4.817v-23.01h-10.716v23.01c0 1.495.665 3.82 2.326 4.817H98.549c1.744-.913 2.492-3.405 2.492-4.817V12.21c0-5.981 1.827-7.892 4.652-10.051L103.948 0h21.348l-1.827 2.16c2.824 2.16 4.735 5.15 4.735 9.802v33.725c0 1.495.747 3.82 2.491 4.817ZM119.98 15.95v-4.07c0-3.406-1.744-5.732-5.399-5.732-3.904 0-5.4 2.907-5.4 5.732v4.07h10.799ZM97.936 50.504H83.981L73.93 11.131v34.556c0 1.578.581 3.82 2.326 4.817H65.125c1.661-.747 2.326-3.572 2.326-4.817V4.817c0-1.494-.665-3.82-2.326-4.817h14.37l9.553 37.961V4.818c0-1.495-.581-3.987-2.326-4.818H98.02c-1.661.83-2.492 3.323-2.492 4.818v40.869c0 1.495.582 3.82 2.41 4.817ZM61.993 50.504H40.147c1.66-.996 2.408-3.322 2.408-4.817V4.817c0-1.494-.747-3.986-2.408-4.817H62.99l-2.326 7.559c-.665-.498-1.828-1.329-3.821-1.329h-6.064v9.802h11.63l-2.659 7.974c-.25-.249-1.578-1.329-3.987-1.329h-4.984v20.767h8.722c1.08 0 3.323-.083 4.569-1.08l-2.077 8.14ZM38.417 50.504H25.46c1.661-.996 2.326-3.322 2.326-4.817V4.817c0-1.494-.665-3.986-2.326-4.817h12.958c-1.661.83-2.325 3.323-2.325 4.818v40.869c0 1.495.664 3.82 2.325 4.817ZM21.327 50.504H1.889l1.495-2.16L.81 40.288c4.07 3.157 13.125 4.984 13.79-4.32.332-3.239-1.33-6.063-4.486-8.721C5.627 23.425-1.101 18.773.477 9.386c.665-4.07 2.492-5.399 4.236-7.226L3.053 0h17.941l-1.578 2.16 1.994 7.974c-3.157-3.738-12.045-5.898-12.543 1.08-.25 2.824 1.246 4.402 3.322 6.064 5.4 4.236 11.962 8.971 11.38 18.773-.166 4.735-2.575 7.393-3.987 10.383-1.08 1.91 0 4.07 1.745 4.07Z"></path></svg>
            <span className="sr-only">Cinefolio</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-primary transition-colors">
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
                    <Link key={link.href} href={link.href} className="text-xl text-foreground hover:text-primary transition-colors">
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
