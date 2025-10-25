import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies | Cinefolio',
  description: 'Cookie Policy for Cinefolio.',
};

export default function CookiesPage() {
  return (
    <main className="py-32 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="prose prose-invert max-w-3xl mx-auto">
          <h1>Cookies</h1>
          <p><strong>BUSINESS INFORMATION</strong></p>
          <p><strong>Registered name:</strong> Cinefolio</p>
          <p><strong>Registered office:</strong></p>
          <p><strong>Phone number:</strong></p>
          <p><strong>Email Address: </strong><a href="mailto:info@cinefolio.com">info@cinefolio.com</a></p>
          <h3>1. TERMS</h3>
          <p>By accessing the website at this site, you agree to be bound by these terms of service, all applicable laws, and regulations. You are responsible for compliance with any local laws. If you disagree with these terms, you are prohibited from using this site. Materials on this website are protected by applicable copyright and trademark law.</p>
          <h3>2. USE LICENSE</h3>
          <p>You may temporarily download one copy of materials (e.g., scripts, film content, or project outlines) for personal, non-commercial viewing only. Under this license, you may <strong>not</strong>:</p>
          <ul>
            <li>Modify, copy, or redistribute materials;</li>
            <li>Use materials for commercial purposes or public displays;</li>
            <li>Reverse engineer any proprietary software;</li>
            <li>Remove copyright or ownership notations;</li>
            <li>Transfer or mirror materials on other servers.</li>
          </ul>
          <p>This license terminates automatically if violated and may be revoked by Cinefolio at any time. Upon termination, destroy all downloaded materials.</p>
          <h3>3. DISCLAIMER</h3>
          <p>a) Materials are provided <strong>‘as is’</strong>. Cinefolio disclaims all warranties, including merchantability, fitness for a purpose, or non-infringement.</p>
          <p>b) Cinefolio does not guarantee accuracy, reliability, or results from using materials or linked sites.</p>
          <h3>4. LIMITATIONS</h3>
          <p>Cinefolio is not liable for damages (e.g., data loss, business interruption) arising from website use, even if notified of potential risks. Jurisdictional limitations may apply.</p>
          <h3>5. ACCURACY OF MATERIALS</h3>
          <p>Materials may contain errors. Cinefolio may update content without notice but is not obligated to do so.</p>
          <h3>6. LINKS</h3>
          <p>We are not responsible for third-party site content. Linked sites are used at your own risk.</p>
          <h3>7. MODIFICATIONS</h3>
          <p>Terms may be revised at any time. Continued use binds you to current terms.</p>
          <h3>8. GOVERNING LAW</h3>
          <p>Governed by the laws of your jurisdiction. Disputes fall under the exclusive jurisdiction of your local courts.</p>
          <h3>9. CONTACT US</h3>
          <p>For inquiries:</p>
          <p><strong>Email:</strong> <a href="mailto:info@cinefolio.com">info@cinefolio.com</a></p>
        </div>
      </div>
    </main>
  );
}
