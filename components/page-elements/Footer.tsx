import Link from "next/link";

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const contactEmail = "support@cinesuit.com";

  return (
    <>
      <div className="border-t border-neutral-200 bg-neutral-100 w-full ">
        <div className="max-w-5xl mx-auto">
          <ul className="px-6 lg:px-6 text-center lg:text-left text-xs text-neutral-500 justify-center items-center  my-8 space-y-2">
            <li className="text-neutral-800 font-semibold">Legal Disclaimer</li>
            <li>
              1. Cinesuit is an independent brand and is not affiliated with,
              endorsed by, or sponsored by any of the lens manufacturers
              mentioned on this site, including but not limited to Sigma
              Corporation.
            </li>
            <li>
              2. All trademarks, logos, and brand names are the property of
              their respective owners.
            </li>
            <li>
              3. Any mention of these trademarks, logos, or brand names on this
              website is for descriptive purposes only, to inform customers of
              the compatibility of our products with specific lenses.
            </li>
            <li>
              4. Cinesuit products are third-party accessories designed to
              enhance the functionality of compatible lenses and are not
              official products of the mentioned brands.
            </li>
            <li>
              5. The use of any trademark, logo, or brand name on this website
              does not imply any relationship, sponsorship, or endorsement
              between Cinesuit and the respective owners of these trademarks.
            </li>
          </ul>
          <div className="border-t border-neutral-300 w-full"></div>
        </div>
      </div>

      <footer
        className={`${className} bg-neutral-100 w-full text-neutral-500 border-neutral-200 px-8 py-8`}
      >
        <div className="max-w-5xl mx-auto flex flex-col">
          <div className="flex justify-center items-center">
            <div>
              <div className="text-center mb-4 text-sm">
                <p>
                  Were just an email away! Reach us at{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="underline hover:cursor-pointer hover:text-black transition-colors"
                  >
                    support@cinesuit.com
                  </a>{" "}
                  <span>for personalized assistance.</span>
                </p>
              </div>

              <div>
                <ul className="py-2 flex gap-4 md:gap-10 justify-between items-center text-center flex-col md:flex-row font-normal text-sm">
                  <li>
                    <Link
                      href="/shipping-policy"
                      className="hover:text-black transition-colors"
                    >
                      Shipping Policy
                    </Link>
                  </li>
                  <div className="hidden md:block h-[12px] w-[1px] bg-neutral-500"></div>
                  <li>
                    <Link
                      href="/return-refund-policy"
                      className="hover:text-black transition-colors"
                    >
                      Return & Refunds
                    </Link>
                  </li>
                  <div className="hidden md:block h-[12px] w-[1px] bg-neutral-500"></div>
                  <li>
                    <Link
                      href="/terms-of-service"
                      className="hover:text-black transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <div className="hidden md:block h-[12px] w-[1px] bg-neutral-500"></div>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="hover:text-black transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center text-xs font-light mt-4">
            © {new Date().getFullYear()} Cinesuit. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
