import { MouseEvent, useState } from "react";
import ProductCard from "./screen/ProductCard";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const categoryList = [
  { title: "All" },
  { title: "Indoor Plants" },
  { title: "Outdoor Plants" },
  { title: "Accessories Plants" },
  { title: "Sessonal Plants" },
  { title: "Gift Plants" },
];

const StoreScreen = () => {
  const [selected, setSelected] = useState("All");
  const navigate = useNavigate();
  const toggleSelect = (e: MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.value);
  };

  return (
    <section className="px-[32px] py-8 overflow-x-hidden">
      <div className="flex justify-center flex-col items-center mb-[64px]">
        <span className="text-center">
          <span>Plant Category</span>
          <h1 className="text-[48px] font-medium">
            {selected === "All" ? "All Categories" : selected}
          </h1>
        </span>
        <div className="mt-4 flex gap-4">
          {categoryList.map(({ title }) => (
            <Button
              title={title.split(" ")[0]}
              value={title}
              className={`btn btn-ghost ${
                selected === title ? "btn btn-outline" : ""
              }`}
              onClick={toggleSelect}
            />
          ))}
        </div>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <ProductCard
          price={"300.00"}
          title="Smooth Image Totle "
          status="New"
          onClick={() => navigate("/product/123123123")}
        />
      </div>
    </section>
  );
};

export default StoreScreen;
