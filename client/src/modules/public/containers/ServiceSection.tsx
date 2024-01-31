import House1 from "@/assets/images/background.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ServiceSection = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <section className="mb-[100px] px-[120px]">
      <div className=" flex justify-between items-center">
        <div>
          <span className="px-4 py-2 bg-[#ffe0b0] my-2">Service</span>
          <h1 className="font-serif text-[#244d4d] text-[48px] font-bold my-8 capitalize">
            Popular Service
          </h1>
        </div>

        <span className="text-[#244d4d] font-semibold">All Prodcuts</span>
      </div>

      <Carousel responsive={responsive}>
        <div className="">
          <div className="grid grid-cols-[500px_auto] h-[500px] overflow-hidden">
            <div className="bg-gray-100 p-4 ">
              <h2 className=" text-[#244d4d] text-[24px] text-center p-4 ">
                Modern House Landscape
              </h2>

              <div className="px-4 flex flex-col gap-4 m-auto  mt-4">
                <div className="mb-8">
                  <h3 className="text-[18px] font-medium mb-3">Description</h3>
                  <p>
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap into electronic
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-semibold text-[24px]"></div>
                  <div className="flex gap-2">
                    <button className="btn p-4 bg-[#244d4d] text-white rounded-[0px]">
                      Contact us
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src={House1}
                alt="house"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-[500px_auto] h-[500px] overflow-hidden">
            <div className="bg-gray-100 p-4 ">
              <h2 className=" text-[#244d4d] text-[24px] text-center p-4 ">
                Modern House Landscape
              </h2>

              <div className="px-4 flex flex-col gap-4 m-auto  mt-4">
                <div className="mb-8">
                  <h3 className="text-[18px] font-medium mb-3">Description</h3>
                  <p>
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap into electronic
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-semibold text-[24px]"></div>
                  <div className="flex gap-2">
                    <button className="btn p-4 bg-[#244d4d] text-white rounded-[0px]">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src={House1}
                alt="house"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default ServiceSection;
