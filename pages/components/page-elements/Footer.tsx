import Link from "next/link";

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const contactEmail = "support@cinesuit.com";

  return (
    <footer
      className={`${className} bg-neutral-100 w-full text-neutral-500 border-t border-neutral-200 p-8`}
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        <div className="flex justify-center items-center">
          <div>
            <div className="text-center mb-4 text-sm">
              <p>
                <span className="font-semibold">Questions?</span> Send an email
                to{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline hover:cursor-pointer hover:text-black transition-colors"
                >
                  support@cinesuit.com
                </a>
              </p>
            </div>

            <div>
              <ul className="py-2 flex gap-4 justify-between items-center text-center flex-col md:flex-row">
                <li>
                  <Link
                    href="/shipping-policy"
                    className="hover:text-black transition-colors"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return-refund-policy"
                    className="hover:text-black transition-colors"
                  >
                    Return & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="hover:text-black transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
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
        <div className="text-center text-sm font-light">
          © {new Date().getFullYear()} Cinesuit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
