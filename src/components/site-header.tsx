import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Menu, X, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Separator } from './ui/separator';

const navLinks = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const secondaryLinks = [
    { href: '#', label: 'Cookie' },
    { href: '#', label: 'Terms' },
    { href: '#', label: 'Privacy' },
]

const SiteHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary font-headline">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 131 63" width="80" className="h-8"><path fill="currentColor" d="M130.695 50.504h-12.958c1.745-.996 2.243-3.322 2.243-4.817v-23.01h-10.716v23.01c0 1.495.665 3.82 2.326 4.817H98.549c1.744-.913 2.492-3.405 2.492-4.817V12.21c0-5.981 1.827-7.892 4.652-10.051L103.948 0h21.348l-1.827 2.16c2.824 2.16 4.735 5.15 4.735 9.802v33.725c0 1.495.747 3.82 2.491 4.817ZM119.98 15.95v-4.07c0-3.406-1.744-5.732-5.399-5.732-3.904 0-5.4 2.907-5.4 5.732v4.07h10.799ZM97.936 50.504H83.981L73.93 11.131v34.556c0 1.578.581 3.82 2.326 4.817H65.125c1.661-.747 2.326-3.572 2.326-4.817V4.817c0-1.494-.665-3.82-2.326-4.817h14.37l9.553 37.961V4.818c0-1.495-.581-3.987-2.326-4.818H98.02c-1.661.83-2.492 3.323-2.492 4.818v40.869c0 1.495.582 3.82 2.41 4.817ZM61.993 50.504H40.147c1.66-.996 2.408-3.322 2.408-4.817V4.817c0-1.494-.747-3.986-2.408-4.817H62.99l-2.326 7.559c-.665-.498-1.828-1.329-3.821-1.329h-6.064v9.802h11.63l-2.659 7.974c-.25-.249-1.578-1.329-3.987-1.329h-4.984v20.767h8.722c1.08 0 3.323-.083 4.569-1.08l-2.077 8.14ZM38.417 50.504H25.46c1.661-.996 2.326-3.322 2.326-4.817V4.817c0-1.494-.665-3.986-2.326-4.817h12.958c-1.661.83-2.325 3.323-2.325 4.818v40.869c0 1.495.664 3.82 2.325 4.817ZM21.327 50.504H1.889l1.495-2.16L.81 40.288c4.07 3.157 13.125 4.984 13.79-4.32.332-3.239-1.33-6.063-4.486-8.721C5.627 23.425-1.101 18.773.477 9.386c.665-4.07 2.492-5.399 4.236-7.226L3.053 0h17.941l-1.578 2.16 1.994 7.974c-3.157-3.738-12.045-5.898-12.543 1.08-.25 2.824 1.246 4.402 3.322 6.064 5.4 4.236 11.962 8.971 11.38 18.773-.166 4.735-2.575 7.393-3.987 10.383-1.08 1.91 0 4.07 1.745 4.07ZM.352 61.82v-4.468h2.872v.638H1.628a.62.62 0 0 0-.453.192.609.609 0 0 0-.185.447.63.63 0 0 0 .638.638h1.596v.638H1.628a.62.62 0 0 0-.453.192.609.609 0 0 0-.185.447v1.276H.352Zm9.857 0H9.57v-4.468h.638v4.468Zm6.448 0v-4.468h.639v3.192a.63.63 0 0 0 .638.638h1.596v.638h-2.873Zm9.1 0v-4.468h.799l1.008 2.975a.326.326 0 0 0 .122.166.346.346 0 0 0 .185.05c.064 0 .123-.018.179-.057a.328.328 0 0 0 .12-.16l1.016-2.974h.798v4.468h-.639v-1.002a.288.288 0 0 0-.095-.23.317.317 0 0 0-.224-.09.305.305 0 0 0-.3.217l-.376 1.105h-.958l-.377-1.104a.293.293 0 0 0-.12-.16.317.317 0 0 0-.402.032.288.288 0 0 0-.097.23v1.002h-.638Zm17.597 0v-4.468h2.873v.638H44.63a.62.62 0 0 0-.453.192.609.609 0 0 0-.185.447.63.63 0 0 0 .638.638h1.596v.638H44.63a.62.62 0 0 0-.453.192.609.609 0 0 0-.185.447v1.276h-.639Zm10.97.064c-.354 0-.675-.083-.964-.249a1.817 1.817 0 0 1-.696-.772c-.17-.345-.256-.77-.256-1.277 0-.506.086-.932.256-1.277.174-.344.406-.6.696-.766.29-.17.61-.255.964-.255.353 0 .674.085.964.255.289.166.519.422.689.766.174.345.262.77.262 1.277 0 .507-.088.932-.262 1.277-.17.345-.4.602-.69.772-.289.166-.61.25-.963.25Zm0-.606c.246 0 .464-.068.65-.205.192-.136.339-.331.441-.587.102-.255.153-.555.153-.9s-.05-.645-.153-.9a1.282 1.282 0 0 0-.44-.587 1.078 1.078 0 0 0-.651-.204c-.247 0-.466.067-.658.204a1.3 1.3 0 0 0-.434.587 2.417 2.417 0 0 0-.153.9c0 .345.05.645.153.9.102.256.247.451.434.587.192.137.41.205.658.205Zm9.85.606c-.486 0-.88-.145-1.182-.434-.297-.29-.446-.72-.446-1.29v-2.808h.638v2.809c0 .349.085.623.255.823.17.196.415.294.734.294.32 0 .564-.098.734-.294.17-.2.256-.474.256-.823v-2.81h.638v2.81c0 .57-.15 1-.453 1.29-.298.288-.69.433-1.175.433Zm8.04-.064v-4.468h.734l1.443 2.4c.06.102.149.153.268.153.09 0 .166-.03.23-.09a.3.3 0 0 0 .096-.229v-2.234h.638v4.468h-.734l-1.443-2.4a.291.291 0 0 0-.268-.153c-.09 0-.166.03-.23.09a.3.3 0 0 0-.095.23v2.233h-.639Zm11.291-4.468c.353 0 .675.08.964.242.29.162.52.411.69.747.174.337.261.751.261 1.245 0 .494-.087.909-.261 1.245-.17.336-.4.585-.69.747a1.94 1.94 0 0 1-.964.242H82.07v-4.468h1.436Zm0 3.83c.247 0 .464-.064.651-.192.192-.132.339-.317.44-.555.103-.242.154-.526.154-.849 0-.323-.051-.604-.153-.843a1.209 1.209 0 0 0-.44-.555 1.102 1.102 0 0 0-.652-.198h-.16a.62.62 0 0 0-.453.192.609.609 0 0 0-.185.447v1.915a.63.63 0 0 0 .639.638h.16Zm7.727.638 1.52-4.468h.957l1.52 4.468h-.684l-.23-.676a.294.294 0 0 0-.115-.154.296.296 0 0 0-.185-.063h-1.57a.296.296 0 0 0-.185.063.294.294 0 0 0-.115.154l-.23.676h-.683Zm1.998-1.436a.609.609 0 0 0 .447-.185.62.62 0 0 0 .191-.453.599.599 0 0 0-.191-.447.6.6 0 0 0-.447-.192.62.62 0 0 0-.453.192.609.609 0 0 0-.185.447.63.63 0 0 0 .638.638Zm8.625-1.755a.597.597 0 0 0-.191-.447.598.598 0 0 0-.447-.192h-.734v-.638h3.383v.638h-.734a.62.62 0 0 0-.453.192.61.61 0 0 0-.185.447v3.191h-.639V58.63Zm8.877 3.191h-.638v-4.468h.638v4.468Zm8.255.064c-.353 0-.675-.083-.964-.249a1.824 1.824 0 0 1-.696-.772c-.17-.345-.255-.77-.255-1.277 0-.506.085-.932.255-1.277.175-.344.407-.6.696-.766.289-.17.611-.255.964-.255s.675.085.964.255c.289.166.519.422.689.766.175.345.262.77.262 1.277 0 .507-.087.932-.262 1.277-.17.345-.4.602-.689.772a1.902 1.902 0 0 1-.964.25Zm0-.606c.247 0 .464-.068.651-.205.192-.136.338-.331.441-.587.102-.255.153-.555.153-.9s-.051-.645-.153-.9a1.285 1.285 0 0 0-.441-.587 1.076 1.076 0 0 0-.651-.204c-.247 0-.466.067-.658.204a1.308 1.308 0 0 0-.434.587 2.419 2.419 0 0 0-.153.9c0 .345.051.645.153.9.103.256.247.451.434.587.192.137.411.205.658.205Zm8.254.542v-4.468h.734l1.443 2.4a.29.29 0 0 0 .268.153c.089 0 .166-.03.23-.09a.303.303 0 0 0 .095-.229v-2.234h.639v4.468h-.734l-1.443-2.4a.291.291 0 0 0-.268-.153.326.326 0 0 0-.23.09.3.3 0 0 0-.096.23v2.233h-.638Z"></path></svg>
            <span className="sr-only">Cinefolio</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link, index) => (
              <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-primary transition-colors font-headline tracking-widest text-xs">
                {`0${index + 1}`}<span className="ml-2">{link.label.toUpperCase()}</span>
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
              <SheetContent side="right" className="bg-primary text-primary-foreground p-0">
                 <div className="flex flex-col h-full">
                    <div className="p-6 flex justify-end">
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </SheetClose>
                    </div>
                    <nav className="flex flex-col space-y-2 p-6 flex-grow">
                        {navLinks.map((link, index) => (
                          <SheetClose asChild key={link.href}>
                            <Link href={link.href} className="flex items-baseline gap-4 text-3xl font-bold font-headline group">
                                <span className="text-xs font-light text-primary-foreground/50 group-hover:text-primary-foreground transition-colors">0{index+1}</span>
                                <span className="group-hover:translate-x-2 transition-transform">{link.label.toUpperCase()}</span>
                            </Link>
                          </SheetClose>
                        ))}
                    </nav>
                     <div className="p-6 space-y-4">
                        <Separator className="bg-primary-foreground/20" style={{borderStyle: 'dashed'}}/>
                        <div className="flex justify-center space-x-6">
                            {secondaryLinks.map(link => (
                                <Link key={link.href} href={link.href} className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                                    {link.label.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                        <Separator className="bg-primary-foreground/20" style={{borderStyle: 'dashed'}}/>
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
                        <Separator className="bg-primary-foreground/20" style={{borderStyle: 'dashed'}}/>
                         <p className="text-center text-xs text-primary-foreground/50">&copy; {new Date().getFullYear()} Siena Film Foundation.</p>
                     </div>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
