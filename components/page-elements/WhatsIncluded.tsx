const WhatsIncluded = () => {
  return (
    <div className="bg-neutral-200 w-full py-6 pt-16 pb-10">
      <div className="container text-center  mx-auto text-black">
        {/* Wrap only the text elements */}

        <h1 className="text-5xl md:text-8xl tracking-tight leading-11 font-semibold md:pt-4 mb-8">
          Whats in the box?
        </h1>

        <div className="text-2xl font-medium leading-11 text-neutral-500 flex gap-10 w-full justify-center ">
          <div className="h-48 w-48 bg-white rounded-2xl"></div>
          <div className="h-48 w-48 bg-white rounded-2xl"></div>
          <div className="h-48 w-48 bg-white rounded-2xl"></div>
          <div className="h-48 w-48 bg-white rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatsIncluded;
