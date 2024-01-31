interface FeatureCard {
  title: string;
  description: string;
}

const FeatureSection = () => {
  const FeatureCard: FeatureCard[] = [
    {
      title: "Best Quality",
      description:
        "Our products made with real wood and high quality materials. woth high quality process and professional worker",
    },
    {
      title: "5 Years Guarantee",
      description:
        "Our products made with real wood and high quality materials. woth high quality process and professional worker",
    },
    {
      title: "5 Years Guarantee",
      description:
        "Our products made with real wood and high quality materials. woth high quality process and professional worker",
    },
  ];

  return (
    <section className="w-full my-[200px]">
      <div className="text-center mb-[64px] ">
        <span className="px-4 py-2 bg-[#ffe0b0] my-4">Features</span>
        <h1 className=" font-serif  text-[#244d4d] text-[48px] font-semibold my-8 capitalize">
          Speacial For You
        </h1>
      </div>
      <div className="flex justify-center items-center  gap-8">
        {FeatureCard.map((details) => (
          <div
            key={details.title}
            className="border w-[350px] h-[350px]  text-center p-4 flex flex-col justify-center items-center gap-4 hover:bg-[#244d4d] hover:text-white cursor-pointer rounded-[5px]">
            <div className="w-[100px] h-[100px] rounded-full bg-[#ffe0b0]"></div>
            <h2 className="font-semibold text-[24px]">{details.title}</h2>
            <p>{details.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
