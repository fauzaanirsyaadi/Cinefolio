import { Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Cinefolio. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-accent transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
