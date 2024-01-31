import CoverImg from "@/assets/images/background.jpg";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="h-screen grid grid-cols-2">
      <div className="relative flex justify-center items-start flex-col gap-4 pl-[64px]">
        <h1 className="relarive w-[800px]  text-[64px] font-bold font-serif text-[#244d4d] ">
          We Give You <br /> <span>The Best Landscaping Service</span>
        </h1>
        <p className="w-[450px] text-base">
          Get inspired by our curated furniture design. interweb believes
          everyone should live in the home they love
        </p>

        <div className="mt-[24px]">
          <Link to={"/products"}>
            <button className="btn rounded-[0px] text-base w-[150px] h-[50px] bg-[#244d4d] text-white">
              Shop now
            </button>
          </Link>
        </div>
      </div>
      <div>
        <img
          src={CoverImg}
          alt="cover-img"
          className="w-full h-full object-cover rounded-bl-[80px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
