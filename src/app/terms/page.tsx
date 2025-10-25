import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms | Cinefolio',
  description: 'Terms of Service for Cinefolio.',
};

export default function TermsPage() {
  return (
    <main className="py-32 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="prose prose-invert max-w-3xl mx-auto">
          <h1>Terms of Service</h1>
          <p>This is the Terms of Service page. You can add your terms and conditions here.</p>
        </div>
      </div>
    </main>
  );
}
