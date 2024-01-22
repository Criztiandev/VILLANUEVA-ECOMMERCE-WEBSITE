const CategoryCard = () => {
  return (
    <div className=" rounded-[25px] border bg-[#d7d1d3] p-4 flex-col justify-between mr-4 select-none ">
      <img className="w-full h-[150px]" />
      <span className="p-4">
        <h3 className="text-[18px]">The Best Plan Ever</h3>
        <span className="text-[24px] font-semibold">P 500</span>
      </span>
    </div>
  );
};

export default CategoryCard;
