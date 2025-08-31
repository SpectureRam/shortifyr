import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          At <span className="font-semibold">Shortifyr</span>, your privacy is
          extremely important to us. This Privacy Policy explains how we collect,
          use, and protect your personal data when you use our services.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          1. Information We Collect
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          We only collect the URLs you shorten and basic usage analytics (such
          as click counts). We do not collect personal information like your
          name, email, or browsing history.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          2. How We Use Your Data
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Collected data is used to provide statistics, improve our services,
          and ensure link functionality. We do not sell or share your data with
          third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          3. Cookies & Tracking
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          We may use cookies to enhance your browsing experience. These cookies
          do not track personal details, and you can disable them in your browser
          at any time.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          4. Data Security
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          All data is stored securely in our database. While no system is
          completely immune to threats, we apply industry-standard measures to
          safeguard your information.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          5. Third-Party Links
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Shortened links may redirect to third-party websites. We are not
          responsible for the content or privacy practices of external sites.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">
          Changes to This Policy
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          We may update this Privacy Policy from time to time. Updates will be
          posted here with the “Last Updated” date.
        </p>
        <p className="mt-6 text-gray-500 italic">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <p className="mt-6 text-gray-500 italic">– The Shortifyr Team</p>
      </div>
      <Footer />
    </>
  );
}