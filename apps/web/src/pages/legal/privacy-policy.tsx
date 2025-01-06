import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} p-6 max-w-4xl mx-auto`}
    >
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Last Updated: <span className="font-semibold">06/01/2025</span>
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <p className="mb-2">
          <strong>1.1 Personal Data:</strong> We collect information voluntarily
          provided by you, such as:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number (for SMS or WhatsApp messages)</li>
        </ul>
        <p className="mb-2">
          <strong>1.2 Usage Data:</strong>
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>
            Activity logs, such as the types of alerts configured and monitoring
            intervals.
          </li>
          <li>Information related to your interaction with the App.</li>
        </ul>
        <p className="mb-2">
          <strong>1.3 Third-Party Data:</strong> Cryptocurrency prices are
          provided by third-party services. We do not control or guarantee the
          accuracy of this information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          2. How We Use Your Information
        </h2>
        <p className="mb-2">
          <strong>2.1 Usage Purposes:</strong>
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>
            Monitor cryptocurrency prices according to your configurations.
          </li>
          <li>
            Send personalized alerts via email, SMS, or WhatsApp based on the
            price limits you set.
          </li>
          <li>Improve user experience and app performance.</li>
        </ul>
        <p className="mb-2">
          <strong>2.2 No Influence on Investment Decisions:</strong> The App
          does not recommend, suggest, or influence decisions to buy or sell
          cryptocurrencies. The information provided is purely informational.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
        <p className="mb-2">
          <strong>3.1 With Third Parties:</strong> We do not share your personal
          information with third parties for marketing purposes.
        </p>
        <p className="mb-2">
          <strong>3.2 With Service Providers:</strong> We send messages through
          third-party providers (e.g., email, SMS, or WhatsApp services).
        </p>
        <p className="mb-2">
          <strong>3.3 Legal Compliance:</strong> We may disclose your
          information to comply with legal obligations or respond to requests
          from competent authorities.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          4. Data Storage and Protection
        </h2>
        <p className="mb-2">
          <strong>4.1 Security:</strong> We use technical and organizational
          measures to protect your information against unauthorized access,
          loss, or misuse.
        </p>
        <p className="mb-2">
          <strong>4.2 Data Retention:</strong> We retain your personal data only
          for as long as necessary to fulfill the purposes described in this
          Policy or as required by law.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
        <p className="mb-2">
          You have the following rights regarding your information:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Access, correct, or delete your personal data.</li>
          <li>Withdraw consent for the use of your information.</li>
          <li>Request the export of your data in an accessible format.</li>
        </ul>
        <p className="mb-2">
          To exercise these rights, contact us at{" "}
          <a
            href="mailto:viblaziusgoulart@gmail.com"
            className="text-blue-500 underline"
          >
            viblaziusgoulart@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          6. Changes to This Policy
        </h2>
        <p className="mb-2">
          We may update this Privacy Policy periodically. We will notify you of
          material changes through the App or other appropriate means.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Contact</h2>
        <p className="mb-2">
          If you have questions or concerns about this Policy, contact us at{" "}
          <a
            href="mailto:viblaziusgoulart@gmail.com"
            className="text-blue-500 underline"
          >
            viblaziusgoulart@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Consent</h2>
        <p className="mb-2">
          By using our App, you agree to the terms of this Privacy Policy.
        </p>
      </section>
    </div>
  );
}
