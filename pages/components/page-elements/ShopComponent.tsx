// ShopComponent.js
import { Product } from "@/types/Types";
import { client } from "@/utils/shopifyClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";

const ShopComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    client.product
      .fetchAll()
      .then((fetchedProducts) => {
        const sortedProducts = fetchedProducts
          .filter((product) => !product.productType.includes("bundle"))
          .sort((a, b) =>
            a.availableForSale === b.availableForSale
              ? 0
              : a.availableForSale
              ? -1
              : 1
          );
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-neutral-50 text-black flex flex-col p-6 rounded-xl"
          >
            <Skeleton className="h-[300px] w-full rounded-xl" /> {/* Image */}
            <Skeleton className="h-8 mt-4 w-3/4" /> {/* Title */}
            <Skeleton className="h-6 w-1/4 mt-2" /> {/* Price */}
            <Skeleton className="h-6 w-full mt-2" /> {/* Description Line 1 */}
            <Skeleton className="h-6 w-5/6 mt-2" /> {/* Description Line 2 */}
            <Skeleton className="h-10 mt-4 w-full" /> {/* Button */}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="bg-neutral-50 text-black flex flex-col pb-20">
        <div className="text-center text-5xl md:text-6xl tracking-tighter leading-11 font-semibold pb-10"></div>
        <div className="container max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-200 text-black flex flex-col p-6 rounded-xl"
            >
              {/* Conditional rendering of image link based on productType */}
              <Link
                href={
                  product.productType === "unreleased"
                    ? `/shop/unreleased/${product.handle}`
                    : `/shop/${product.handle}`
                }
                className="cursor-pointer hover:opacity-95 transition-opacity duration-300 justify-center"
              >
                {product.images && product.images.length > 0 && (
                  <Image
                    key={product.images[0].id}
                    src={product.images[0].src}
                    alt="Product Image"
                    width={400}
                    height={300}
                    loading="lazy"
                    className={`w-full ${
                      product.productType === "unreleased" ? "opacity-75" : ""
                    }`}
                  />
                )}
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
                <p className="text-[22px] font-semibold md:font-medium">
                  ${product.variants[0].priceV2.amount.slice(0, -2)}
                </p>
              </div>

              <div className="mt-2">
                <p className="text-sm leading-5 text-neutral-700">
                  {product.description}
                </p>
                {/* Conditional rendering of buttons based on productType */}
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
                  <p className="text-sm leading-5 text-neutral-700">
                    {product.availableForSale ? (
                      <>
                        In Stock <br /> Free Shipping
                      </>
                    ) : (
                      <>
                        Coming Soon <br />{" "}
                        <Link
                          className="hover:underline hover:cursor-pointer"
                          href={"/"}
                        >
                          Submit your requests
                        </Link>
                      </>
                    )}
                  </p>
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
