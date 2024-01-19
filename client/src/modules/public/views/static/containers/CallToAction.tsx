const CallToAction = () => {
  return (
    <section className="mt-[200px] px-[120px] bg-slate-900 h-[500px] flex justify-center items-center">
      <div className=" flex justify-center items-center">
        <div className="text-center">
          <span className="  px-4 py-2 bg-[#ffe0b0] my-2">Join us</span>
          <h1 className="font-serif text-white text-[48px] font-bold my-8 capitalize">
            What at are you waiting for ?
          </h1>

          <div className="join">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[350px] input input-bordered join-item"
            />
            <button className="text-base join-item btn">Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
