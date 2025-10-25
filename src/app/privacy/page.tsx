import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy | Cinefolio',
  description: 'Privacy Policy for Cinefolio.',
};

export default function PrivacyPage() {
  return (
    <main className="py-32 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="prose prose-invert max-w-3xl mx-auto">
          <h1>Privacy Policy</h1>
          <p>This is the Privacy Policy page. You can add your privacy policy content here.</p>
        </div>
      </div>
    </main>
  );
}
