import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-10 px-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>

        <p className="text-gray-600 leading-relaxed mb-4">
          Welcome to <span className="font-semibold">Shortifyr</span>, your
          professional and reliable URL shortener. We built this platform to
          simplify how you share links, making them cleaner, shorter, and easier
          to manage.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Whether you&apos;re an individual sharing links with friends or a business
          tracking campaign URLs, our tool is designed to provide speed,
          simplicity, and reliability. Our backend is powered by{" "}
          <span className="font-semibold">Express.js</span> and{" "}
          <span className="font-semibold">Prisma + PostgreSQL</span>, ensuring
          your data remains safe and accessible at all times.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our platform is constantly improving — from analytics dashboards to
          custom short links — so you can take full control of how your content
          is shared. We aim to give you a clean, distraction-free, and
          user-friendly experience.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          We believe in transparency, user privacy, and creating tools that make
          digital life smoother. Your trust means everything to us, and we’re
          committed to keeping your data secure and your experience simple. If you&apos;d like to support this project, please consider giving it a star on GitHub.
        </p>

        <p className="mt-6 text-gray-500 italic">– The Shortifyr Team</p>
      </div>
      <Footer />
    </>
  );
}
