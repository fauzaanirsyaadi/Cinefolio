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
          <p>Last updated: October 26, 2023</p>
          <p>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
          </p>

          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>
          <h3>Definitions</h3>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li>
              <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
            </li>
            <li>
              <p><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Cinefolio.</p>
            </li>
            <li>
              <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
            </li>
            <li>
              <p><strong>Country</strong> refers to: Your Country</p>
            </li>
            <li>
              <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
            </li>
            <li>
              <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
            </li>
            <li>
              <p><strong>Service</strong> refers to the Website.</p>
            </li>
            <li>
              <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            </li>
          </ul>

          <h2>Collecting and Using Your Personal Data</h2>
          <h3>Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>
            While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, First name and last name, Usage Data.
          </p>
          <h4>Usage Data</h4>
          <p>
            Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
          </p>

          <h2>Use of Your Personal Data</h2>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul>
            <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
            <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
            <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the projects, items or services You have purchased or of any other contract with Us through the Service.</li>
            <li><strong>To contact You:</strong> To contact You by email, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, projects or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
            <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
          </ul>

          <h2>Disclosure of Your Personal Data</h2>
          <h3>Business Transactions</h3>
          <p>
            If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
          </p>
          <h3>Law enforcement</h3>
          <p>
            Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
          </p>

          <h2>Security of Your Personal Data</h2>
          <p>
            The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
          </p>

          <h2>Changes to this Privacy Policy</h2>
          <p>
            We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, You can contact us:</p>
          <ul>
            <li>By email: info@cinefolio.com</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
