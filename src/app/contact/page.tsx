import { ContactForm } from '@/components/contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Cinefolio',
  description: 'Get in touch for collaborations or inquiries.',
};

export default function ContactPage() {
  return (
    <main className="py-32 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 font-headline">Let's Create Together</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Have a project in mind, a question, or just want to say hello? Drop me a line. I'm always open to discussing new creative ideas and opportunities for collaboration.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
