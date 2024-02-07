import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

const ProductTabs = ({
  mainProduct,
  associatedProducts,
  handleProductSelection,
  selectedProduct,
}) => {
  const onTabChange = (value) => {
    const product =
      value === "0"
        ? mainProduct
        : associatedProducts.find((p) => p.id === value);
    handleProductSelection(product);
  };

  return (
    <Tabs initialValue={mainProduct.id} onChange={onTabChange}>
      <Tab value="0" title="Main Product">
        {/* Content for Main Product */}
      </Tab>
      {associatedProducts.map((product) => (
        <Tab key={product.id} value={product.id} title={product.title}>
          {/* Content for each Associated Product */}
        </Tab>
      ))}
    </Tabs>
  );
};

export default ProductTabs;
