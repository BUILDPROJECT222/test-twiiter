import Link from "next/link";
import React from "react";

const InfoPage: React.FC = () => {
  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh]">
      {/* SolX Section */}
      <section className="px-6 border-b pb-4 pt-8">
        <header className="text-2xl font-bold mb-4">What is SolX?</header>
        <p className="mb-6">
          SolX is a social platform powered by Solana, offering users the
          ability to engage in decentralized social interactions directly on the
          Solana blockchain. It serves as a one-stop destination for individuals
          seeking to connect and share content in a{" "}
          <span className="text-purple-500">decentralized</span> manner.
        </p>
      </section>

      {/* How to Buy Section */}
      <section className="px-6 border-b pb-4 pt-8">
        <header className="text-2xl font-bold mb-4">
          How to Acquire SOLX Tokens?
        </header>
        <p className="mb-6">
          To acquire SOLX tokens, users can visit supported cryptocurrency
          exchanges where SOLX is listed for trading.
        </p>
      </section>

      {/* How to Use Section */}
      <section className="px-6 border-b pb-4 pt-8">
        <header className="text-2xl font-bold mb-4">How to Use SolX?</header>
        <p className="mb-6">
          Utilizing SolX is straightforward. Users can access the platform using
          their Solana wallet, enabling them to post, like, and interact with
          content seamlessly on the Solana blockchain. Users are required to
          hold{" "}
          <span className="text-purple-500">at least 1,000 SOLX tokens</span> to
          be eligible to tweet and build up their ranking on SolX.
        </p>
      </section>

      {/* Tweet Markdown Section */}
      <section className="px-6 border-b pb-8 pt-8">
        <header className="text-2xl font-bold mb-4">
          Tweet Markdown Syntax
        </header>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Supported SOLX Syntax:</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">
              <span className="font-bold">**Bold text**</span>: Use double
              asterisks or underscores to{" "}
              <span className="italic">bold text</span>. Renders as{" "}
              <strong>Bold text</strong>.
            </li>
            <li className="mb-2">
              <span className="italic">*Italic text*</span>: Use single
              asterisks or underscores to italicize text. Renders as{" "}
              <em>Italic text</em>.
            </li>
            <li className="mb-2">
              <span className="underline">
                [solx-dev](https://solx-dev.vercel.app/)
              </span>
              : Create links using square brackets and parentheses. Renders as{" "}
              <a
                className="underline text-purple-500"
                href="https://solx-dev.vercel.app/"
              >
                solx-dev
              </a>
              .
            </li>
            <li className="mb-2">
              <span className="font-bold">
                {'<img link="https://solx-dev.vercel.app/logo.png" />'}
              </span>
              : Use this syntax to indicate an image in your tweet. Renders as{" "}
              <img src="/logo.png" alt="logo" className="w-8 h-8" />.
            </li>
          </ul>
        </div>
      </section>

      {/* Terms and Policy Section */}
      <section className="px-6 py-4 border-t">
        <p className="text-center">
          By using our platform, you agree to all{" "}
          <Link
            href="/terms-of-service"
            className="text-purple-500 underline hover:text-purple-600"
          >
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link
            href="/privacy-policy"
            className="text-purple-500 underline hover:text-purple-600"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default InfoPage;