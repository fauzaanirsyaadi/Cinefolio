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
          <h1>Terms</h1>
          <h3>BUSINESS INFORMATION</h3>
          <p><strong>Registered name:</strong> Siena Film Foundation</p>
          <p><strong>Registered office:</strong> 12 Cinematic Lane, Tel Aviv 6688123, Israel</p>
          <p><strong>Phone:</strong> +972 3 555 1234</p>
          <p><strong>Email:</strong> <a href="mailto:info@siena.film">info@siena.film</a></p>
          <h3>1. SCOPE</h3>
          <p>Siena Film Foundation (“we,” “our,” or “us”) is a boutique production house headquartered in Tel Aviv, Israel, dedicated to crafting groundbreaking narratives that push the boundaries of cinematic storytelling. We specialize in independent films, documentaries, and experimental projects that challenge conventional narratives. These terms govern your access to and use of our website, <a href="https://siena.film">https://siena.film</a>, as well as any services, content, or collaborations facilitated through it. By engaging with our platform, you agree to comply with these terms, all applicable laws, and industry standards.</p>
          <h3>2. INTELLECTUAL PROPERTY</h3>
          <p><strong>Ownership:</strong> All content on this website, including but not limited to scripts, storyboards, film excerpts, logos, graphics, and promotional materials, is the exclusive property of Siena Film Foundation or its licensors. This content is protected under Israeli copyright law (Copyright Act, 2007), international treaties, and trademark regulations.</p>
          <p><strong>Restrictions:</strong> Unauthorized use, reproduction, distribution, or adaptation of our intellectual property is strictly prohibited. This includes:</p>
          <ul>
            <li>Public screenings of our films without licensing agreements.</li>
            <li>Use of logos or branding for commercial purposes.</li>
            <li>Derivative works based on our scripts or creative concepts.</li>
          </ul>
          <p><strong>Enforcement:</strong> Violations may result in legal action, including injunctions, damages, and reimbursement of legal fees. For licensing inquiries, contact <a href="mailto:licensing@siena.film">licensing@siena.film</a>.</p>
          <h3>3. SERVICE AGREEMENTS</h3>
          <p><strong>Collaborations:</strong> Engaging with Siena Film Foundation for production, funding, or creative services requires a formal written agreement. Key terms include:</p>
          <ul>
            <li><strong>Project Scope:</strong> Detailed deliverables, timelines, and creative objectives.</li>
            <li><strong>Compensation:</strong> Payment schedules, profit-sharing models, or grant stipulations.</li>
            <li><strong>Confidentiality:</strong> Non-disclosure clauses to protect proprietary ideas and unreleased content.</li>
            <li><strong>Termination:</strong> Conditions under which either party may terminate the agreement, including breach of terms or force majeure events.</li>
          </ul>
          <p><strong>Third-Party Partnerships:</strong> Collaborations with writers, directors, or distributors may involve additional third-party contracts, which will be disclosed to you prior to engagement.</p>
          <h3>4. LIMITATION OF LIABILITY</h3>
          <p><strong>Exclusions:</strong> Siena Film Foundation shall not be liable for:</p>
          <ul>
            <li>Indirect, incidental, or consequential damages (e.g., lost revenue, missed opportunities, data corruption).</li>
            <li>Third-party actions, including piracy, unauthorized distribution, or defamatory use of our content.</li>
            <li>Technical disruptions, such as website downtime, server failures, or cyberattacks.</li>
          </ul>
          <p><strong>Cap on Liability:</strong> Where permitted by Israeli law, our total liability for direct damages shall not exceed the fees paid to us under the relevant service agreement.</p>
          <h3>5. DISPUTE RESOLUTION</h3>
          <p><strong>Governing Law:</strong> These terms are governed by the laws of the State of Israel, including the Israeli Contracts Law (1973) and the Consumer Protection Law (1981).</p>
          <p><strong>Jurisdiction:</strong> Any disputes arising from these terms shall be resolved exclusively in the courts of Tel Aviv, Israel.</p>
          <p><strong>Process:</strong> Parties agree to first attempt mediation through a certified Tel Aviv mediator. If unresolved within 60 days, the matter will proceed to litigation.</p>
          <h3>6. UPDATES</h3>
          <p><strong>Notification:</strong> Changes to these terms will be communicated via email to registered users and posted prominently on our website. Continued use of our services 30 days after updates constitutes acceptance.</p>
          <p><strong>Archive:</strong> Previous versions of these terms are available upon request at <a href="mailto:legal@siena.film">legal@siena.film</a>.</p>
          <h3>7. CONTACT</h3>
          <p><strong>General Inquiries:</strong></p>
          <p><strong>Email:</strong> <a href="mailto:info@siena.film">info@siena.film</a></p>
          <p><strong>Phone:</strong> +972 3 555 1234 (Mon-Fri, 9:00 AM – 5:00 PM IST)</p>
          <p><strong>Legal &amp; Licensing:</strong></p>
          <p><strong>Address:</strong> Siena Film Foundation, 12 Cinematic Lane, Tel Aviv 6688123, Israel</p>
          <p><strong>Email:</strong> <a href="mailto:legal@siena.film">legal@siena.film</a></p>
        </div>
      </div>
    </main>
  );
}
