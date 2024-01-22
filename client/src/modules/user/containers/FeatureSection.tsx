const FeatureSection = () => {
  return (
    <section className="w-full my-[200px]">
      <div className="text-center">
        <span className="px-4 py-2 bg-[#ffe0b0] my-4">Features</span>
        <h1 className=" font-serif  text-[#244d4d] text-[48px] font-semibold my-8 capitalize">
          Speacial For You
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 px-[120px] gap-4">
          <div className="w-[350px] h-[350px]  text-center p-4 flex flex-col justify-center items-center gap-4 hover:bg-[#244d4d] hover:text-white cursor-pointer rounded-[5px]">
            <div className="w-[100px] h-[100px] rounded-full bg-[#ffe0b0]"></div>
            <h2 className="font-semibold text-[24px]">Best Quality</h2>
            <p>
              Our products made with real wood and high quality materials. woth
              high quality process and professional worker
            </p>
          </div>

          <div className="w-[350px] h-[350px]  text-center p-4 flex flex-col justify-center items-center gap-4 hover:bg-[#244d4d] hover:text-white cursor-pointer rounded-[5px]">
            <div className="w-[100px] h-[100px]  rounded-full bg-[#ffe0b0]"></div>
            <h2 className="font-semibold text-[24px]">5 Years Guarantee</h2>
            <p>
              Our products made with real wood and high quality materials. woth
              high quality process and professional worker
            </p>
          </div>

          <div className="w-[350px] h-[350px]  text-center p-4 flex flex-col justify-center items-center gap-4 hover:bg-[#244d4d] hover:text-white cursor-pointer rounded-[5px]">
            <div className="w-[100px] h-[100px]  rounded-full bg-[#ffe0b0]"></div>
            <h2 className="font-semibold text-[24px]">Find us anywhere</h2>
            <p>
              Our products made with real wood and high quality materials. woth
              high quality process and professional worker
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
