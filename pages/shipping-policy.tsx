import Footer from "./components/page-elements/Footer";
import Navbar from "./components/ui/Navbar";
import NavbarLight from "./components/ui/NavbarLight";

const Privacy = () => {
  return (
    <>
      <NavbarLight />
      <div className="bg-neutral-100 h-full w-full">
        <div className="pb-20 text-neutral-500 pt-20 ">
          <div className="relative content-container mx-auto pt-24 max-w-[295px] md:max-w-[600px] text-lg ">
            <h1 className="text-5xl md:text-8xl tracking-tighter leading-11 font-semibold text-black md:py-5">
              Shipping Policy
            </h1>
            <p className="pt-4 md:pt-0 md:pb-6 md:text-2xl">
              Thank you for choosing Cinesuit. Here we detail our shipping
              procedures to ensure you have a clear understanding of how we
              deliver our products to you.
            </p>

            <section className="product-use-safety">
              <h5 className="section-title">1. Shipping Scope and Delivery</h5>
              <ul className="ulpolicy lipolicy">
                <li>
                  Global Shipping: Cinesuit ships products internationally,
                  allowing filmmakers around the world to finally aquire their
                  cinema lenses.
                </li>
                <li>
                  Delivery Times: The estimated delivery time varies based on
                  your location. We aim to dispatch orders promptly, and the
                  typical delivery window will be communicated during the order
                  process.
                </li>
              </ul>
            </section>

            <section className="intellectual-property-rights">
              <h5 className="section-title">2. Shipping Costs and Handling</h5>
              <ul>
                <li>
                  Costs Included: The prices of our products include the cost of
                  standard shipping. Expedited shipping options, if available,
                  may incur additional charges.
                </li>
                <li>
                  Handling: Every order is handled with utmost care, ensuring
                  your product reaches you in perfect condition.
                </li>
              </ul>
            </section>

            <section className="purchasing-payments">
              <h5 className="section-title">3. Customs, Duties, and Taxes</h5>
              <ul>
                <li>
                  Responsibility: Customers are responsible for any customs
                  duties and taxes levied by their respective countries. These
                  charges are not included in the purchase price.
                </li>
                <li>
                  Compliance: We adhere to all applicable shipping and customs
                  regulations, and we strive to minimize any delays related to
                  customs clearance.
                </li>
              </ul>
            </section>

            <section className="independent-operation">
              <h5 className="section-title">4. Tracking Your Order</h5>
              <ul>
                <li>
                  Tracking Information: Once your order is shipped, we will
                  provide you with a tracking number via email.
                </li>
                <li>
                  Order Status: You can track the progress of your shipment
                  through our website or the carriers tracking system.
                </li>
              </ul>
            </section>

            <section className="limitation-liability">
              <h5 className="section-title">
                5. Shipping Policies and Adjustments
              </h5>
              <ul>
                <li>
                  Policy Updates: Our shipping policies are subject to change
                  based on carrier policies and international shipping
                  regulations.
                </li>
                <li>
                  Notification of Changes: Any significant changes to our
                  shipping policy will be communicated via our website or email.
                </li>
              </ul>
            </section>

            <section className="disclaimer-warranties">
              <h5 className="section-title">Contact Us</h5>
              <p>
                For any shipping-related inquiries or assistance, please contact
                us at post@cinesuit.com.
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
