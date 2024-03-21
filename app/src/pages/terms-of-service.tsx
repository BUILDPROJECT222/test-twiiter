import React from "react";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh]">
      <section className="px-6 border-b pb-4 pt-8">
        <header className="text-2xl font-bold mb-4">Terms of Service</header>
        <p className="mb-6">
          These terms and conditions outline the rules and regulations for the
          use of SOLX&rsquo;s Website.
        </p>
        <p className="mb-6">
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use SOLX if you do not agree to take
          all of the terms and conditions stated on this page.
        </p>
        <p className="mb-6">
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements:
        </p>
        <ul className="mb-6 list-disc pl-6">
          <li>
            &rsquo;Client&rsquo;, &rsquo;You&rsquo; and &rsquo;Your&rsquo;
            refers to you, the person who logs onto this website and complies
            with the Company&rsquo;s terms and conditions.
          </li>
          <li>
            &rsquo;The Company&rsquo;, &rsquo;Ourselves&rsquo;,
            &rsquo;We&rsquo;, &rsquo;Our&rsquo; and &rsquo;Us&rsquo; refer to
            our Company.
          </li>
          <li>
            &rsquo;Party&rsquo;, &rsquo;Parties&rsquo;, or &rsquo;Us&rsquo;
            refers to both the Client and ourselves.
          </li>
          <li>
            All terms refer to the offer, acceptance, and consideration of
            payment necessary to undertake the process of our assistance to the
            Client in the most appropriate manner for the express purpose of
            meeting the Client&rsquo;s needs in respect of provision of the
            Company&rsquo;s stated services, in accordance with and subject to,
            prevailing law of Netherlands.
          </li>
          <li>
            Any use of the above terminology or other words in the singular,
            plural, capitalization and/or he/she or they, are taken as
            interchangeable and therefore as referring to the same.
          </li>
        </ul>
        <p className="mb-6">
          We employ the use of cookies. By accessing SOLX, you agree to use
          cookies in agreement with the SOLX&rsquo;s Privacy Policy.
        </p>
        <p className="mb-6">
          Most interactive websites use cookies to let us retrieve the
          user&rsquo;s details for each visit. Cookies are used by our website
          to enable the functionality of certain areas to make it easier for
          people visiting our website. Some of our affiliate/advertising
          partners may also use cookies.
        </p>
        <p className="mb-6">
          We are SOLX, a Solana on-chain social platform. All data is stored
          on-chain, and we do not own or store any user data. We solely provide
          a platform, and we are not liable for any consequences arising from
          the use of our platform.
        </p>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
