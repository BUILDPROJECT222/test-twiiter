import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh]">
      {/* Privacy Policy Section */}
      <section className="px-6 border-b pb-4 pt-8">
        <header className="text-2xl font-bold mb-4">Privacy Policy</header>
        <p className="mb-6">
          At SOLX, one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by SOLX and how we use it.
        </p>
        <p className="mb-6">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
