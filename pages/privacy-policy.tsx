import Link from "next/link";
import Navbar from "../components/ui/Navbar";
import Footer from "./components/page-elements/Footer";
import { Separator } from "../components/ui/separator";
import Image from "next/image";
import NavbarLight from "../components/ui/NavbarLight";

const Privacy = () => {
  return (
    <>
      <NavbarLight />
      <div className="bg-black h-full w-full">
        <Image
          src="/images/.png"
          className="absolute z-0 opacity-10 pt-56"
          width={1500}
          height={900}
          alt="Descriptive Alt Text"
          layout="responsive"
        />
        <div className="pb-20 bg-neutral-100 text-neutral-400 pt-20 ">
          <div className="relative content-container mx-auto pt-24 max-w-[295px] md:max-w-[600px] text-lg ">
            <h1 className="text-5xl md:text-8xl tracking-tighter leading-11 font-semibold text-black md:py-5">
              Privacy Policy
            </h1>
            <p className="pt-4 md:pt-0 md:pb-6 md:text-2xl">
              Welcome to Cinesuit. We respect your privacy and are committed to
              protecting your personal data. This policy explains how we
              collect, use and safeguard your information when you visit our
              site or use our service.
            </p>

            <section className="policy-updates">
              <h5 className="section-title">
                1. Changes to This Privacy Policy
              </h5>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of significant changes and indicate the date of the
                most recent revision.
              </p>
            </section>

            <section className="collection-use">
              <h5 className="section-title">
                2. Information Collection and Use
              </h5>
              <p>
                To provide and improve our services, process orders, and enhance
                your experience, we collect the following personal information:
              </p>
              <ul className="ulpolicy lipolicy">
                <li>
                  Basic Contact Details: Name, email address, phone number.
                </li>
                <li>Order Information: Billing and shipping addresses.</li>
                <li>Account Information: Your username and order history.</li>
                <li>
                  Interaction Data: Information on how you use our Site,
                  including your IP address, preferences, and feedback.
                </li>
              </ul>
              <p>
                We collect this data to fulfill your orders, communicate with
                you, and improve our services. We will not use this information
                for purposes other than those for which it was collected without
                your consent.
              </p>
            </section>

            <section className="third-party">
              <h5 className="section-title">
                3. Third-Party Service Providers
              </h5>
              <p>
                We work with Shopify for e-commerce transactions and
                NextSmartShip for fulfillment. We share necessary information
                with these partners to complete and deliver your orders. Both
                Shopify and NextSmartShip are committed to data protection.
              </p>
            </section>

            <section className="cookies-tracking">
              <h5 className="section-title">
                4. Cookies and Tracking Technologies
              </h5>
              <p>
                Our Site uses cookies to enhance functionality and gather basic
                analytics. You can control cookie settings through your browser.
              </p>
            </section>

            <section className="disclosure">
              <h5 className="section-title">
                5. How We Disclose Personal Information
              </h5>
              <p>We may share your information with:</p>
              <ul>
                <li>
                  Manufacturing and Fulfillment Partners: To process and deliver
                  your orders.
                </li>
                <li>Service Providers: Such as payment processors.</li>
                <li>
                  Legal Requirements: If required by law or to protect our
                  rights.
                </li>
              </ul>
            </section>

            <section className="data-security">
              <h5 className="section-title">6. Data Security</h5>
              <p>
                We implement reasonable measures to protect your data but cannot
                guarantee absolute security. Protect your account credentials
                and personal information.
              </p>
            </section>

            <section className="your-rights">
              <h5 className="section-title">7. Your Rights</h5>
              <p>
                You have the right to access, correct, or delete your personal
                data, and to withdraw consent for data processing. Contact us to
                exercise these rights.
              </p>
            </section>

            <section className="international-users ">
              <h5 className="section-title">8. International Users</h5>
              <p>
                Your information may be processed outside your country of
                residence. We ensure adequate data protection in these
                transfers.
              </p>
            </section>

            <section className="contact-us">
              <h5 className="section-title">9. Contact Us</h5>
              <p>
                For questions about this Privacy Policy or our practices,
                contact post@cinesuit.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
