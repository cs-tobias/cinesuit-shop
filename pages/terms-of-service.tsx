import Link from "next/link";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/page-elements/Footer";
import { Separator } from "../components/ui/separator";
import Image from "next/image";
import NavbarLight from "../components/ui/NavbarLight";

const Privacy = () => {
  return (
    <>
      <NavbarLight />
      <div className="bg-neutral-100 h-full w-full">
        <div className="pb-20 text-neutral-400 pt-20 ">
          <div className="relative content-container mx-auto pt-24 max-w-[295px] md:max-w-[600px] text-lg ">
            <h1 className="text-5xl md:text-8xl tracking-tighter leading-11 font-semibold text-black md:py-5">
              Terms <br /> Of Service
            </h1>
            <p className="pt-4 md:pt-0 md:pb-6 md:text-2xl">
              Our mission is to offer innovative filmmaking solutions. By using
              our site and purchasing our products, you agree to the following
              terms:
            </p>

            <section className="product-use-safety">
              <h5 className="section-title">1. Product Use and Safety</h5>
              <p>
                Intended Use: Cinesuit products are designed for filmmakers.
                Please use them as intended and follow our installation
                guidelines.
              </p>
              <p>
                Care and Handling: Handle products with care during installation
                to avoid damage to your lens or the Cinesuit product.
              </p>
            </section>

            <section className="intellectual-property-rights">
              <h5 className="section-title">2. Intellectual Property Rights</h5>
              <p>
                Original Design: Our designs and content are protected under
                intellectual property laws. Unauthorized use or reproduction is
                prohibited.
              </p>
            </section>

            <section className="purchasing-payments">
              <h5 className="section-title">3. Purchasing and Payments</h5>
              <p>
                Payment Methods: We accept various secure payment methods via
                Shopify&apos;s platform.
              </p>
              <p>
                Pricing: $129 for a single focus ring and $189 for a set,
                excluding taxes and additional fees.
              </p>
            </section>

            <section className="independent-operation">
              <h5 className="section-title">
                4. Independent Operation and Non-Affiliation
              </h5>
              <p>
                No Sigma Affiliation: Cinesuit is not affiliated with, endorsed
                by, or in cooperation with Sigma. References to Sigma lenses are
                purely descriptive.
              </p>
              <p>
                Use at Own Risk: Using Cinesuit products may affect Sigma&apos;s
                warranty terms. Customers should use our products understanding
                these implications.
              </p>
            </section>

            <section className="limitation-liability">
              <h5 className="section-title">5. Limitation of Liability</h5>
              <p>
                Damages: We are not liable for any indirect or consequential
                damages arising from the use or inability to use our products.
              </p>
            </section>

            <section className="disclaimer-warranties">
              <h5 className="section-title">6. Disclaimer of Warranties</h5>
              <p>
                As Is: Products are provided &quot;as is&quot; without
                warranties of any kind, either express or implied.
              </p>
            </section>

            <section className="indemnification">
              <h5 className="section-title">7. Indemnification</h5>
              <p>
                Defense and Indemnification: You agree to defend and indemnify
                Cinesuit AS against claims, damages, or expenses arising from
                your use of our products.
              </p>
            </section>

            <section className="amendments-terms">
              <h5 className="section-title">8. Amendments to Terms</h5>
              <p>
                Changes to Terms: We reserve the right to modify these terms.
                Continued use after changes implies acceptance.
              </p>
            </section>

            <section className="governing-law">
              <h5 className="section-title">
                9. Governing Law and Jurisdiction
              </h5>
              <p>
                Norwegian Law: These terms are governed by the laws of Norway.
              </p>
            </section>

            <section className="contact-us">
              <h5 className="section-title">10. Contact Us</h5>
              <p>Inquiries: For questions, please email post@cinesuit.com.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
