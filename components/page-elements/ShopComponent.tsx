// ShopComponent.js
import { Product } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";

// Accept products as props
const ShopComponent = ({ products }: { products: Product[] }) => {
  return (
    <>
      <div className="bg-neutral-50 text-black flex flex-col pt-6 pb-20">
        <div className="container max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-200 text-black flex flex-col p-6 rounded-xl"
            >
              <Link
                href={
                  product.productType === "unreleased"
                    ? `/shop/unreleased/${product.handle}`
                    : `/shop/${product.handle}`
                }
                className="cursor-pointer hover:opacity-95 transition-opacity duration-300 justify-center"
              >
                <Image
                  src={`/images/${product.handle}/sm/image0.png`}
                  alt="Product Image"
                  width={400}
                  height={300}
                  className={`${
                    product.productType === "unreleased" ? "opacity-95" : ""
                  } mx-auto`}
                  priority
                />
              </Link>

              {/* Product label based on productType */}
              {product.productType === "new" && (
                <div className="text-red-700 px-1 text-xl mt-5 -mb-2">New</div>
              )}
              {product.productType === "unreleased" && (
                <div className="text-neutral-500 font-medium px-1 text-xl mt-2 -mb-2">
                  Coming Soon
                </div>
              )}

              <div className="text-4xl font-medium my-2 tracking-tighter leading-9 py-2">
                {product.title
                  .split(" ")
                  .slice(0, 4)
                  .map((word, index) => (
                    <span key={index}>
                      {word} {index < 3 ? " " : <br />}
                    </span>
                  ))}
              </div>

              <div>
                <p className="text-[22px] font-medium">
                  ${product.variants[0].price.amount.toString().slice(0, -2)}
                </p>
              </div>

              <div className="mt-2">
                <p className="text-sm leading-5 text-neutral-700">
                  {product.description}
                </p>
                {product.productType === "unreleased" ? (
                  <div className="py-4">
                    <Link
                      href={`/shop/unreleased/${product.handle}`}
                      className="w-full flex justify-center bg-neutral-200 border-neutral-300 border-2 hover:border-neutral-400 transition-colors duration-300 text-black py-1.5 rounded-lg"
                    >
                      Learn more
                    </Link>
                  </div>
                ) : (
                  <div className="py-4">
                    <Link
                      href={`/shop/${product.handle}`}
                      className="w-full flex justify-center bg-neutral-800 hover:bg-black transition-colors duration-300 text-white py-1.5 rounded-lg"
                    >
                      Select
                    </Link>
                  </div>
                )}
                <div className="font-semibold">
                  <div className="text-sm leading-5 text-neutral-600">
                    {product.productType === "unreleased" ? (
                      <p className="text-neutral-500 font-medium px-1 mt-2 -mb-2">
                        Coming Soon
                      </p>
                    ) : (
                      <p className="text-neutral-800 font-medium px-1 mt-2 -mb-2">
                        In Stock
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopComponent;
