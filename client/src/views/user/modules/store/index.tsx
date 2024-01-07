import { MouseEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "@/components/Button";

const StoreScreen = () => {
  const [selected, setSelected] = useState("Indoor Plants");

  const toggleSelect = (e: MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.value);
  };

  return (
    <section className="px-[32px] py-8 overflow-x-hidden">
      <div className="flex justify-center flex-col items-center mb-[64px]">
        <span className="text-center">
          <span>Category</span>
          <h1 className="text-[48px] font-medium">
            {selected === "Outdoor" || selected === "Indoor"
              ? `${selected} Plants`
              : selected}
          </h1>
        </span>
        <div className="mt-4 flex gap-4">
          <Button
            value={"Indoor"}
            title="Indoor"
            className={`btn btn-ghost ${selected === "Indoor" && "btn"}`}
            onClick={toggleSelect}
          />
          <Button
            onClick={toggleSelect}
            value={"Outdoor"}
            title="Outdoor"
            className="btn btn-ghost"
          />
          <Button
            onClick={toggleSelect}
            value={"Garden"}
            title="Garden"
            className="btn btn-ghost"
          />
          <Button
            onClick={toggleSelect}
            value={"Shrubs"}
            title="Shrubs"
            className="btn btn-ghost"
          />
          <Button
            onClick={toggleSelect}
            value={"More"}
            title="More"
            className="btn btn-ghost"
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <ProductCard
          price={"300.00"}
          thumbnail={
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          title="Product 1"
          varaint={[{ title: "S" }, { title: "M" }, { title: "L" }]}
        />

        <ProductCard
          price={300}
          thumbnail={
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          title="Product 1"
          varaint={[{ title: "S" }, { title: "M" }, { title: "L" }]}
        />

        <ProductCard
          price={200}
          thumbnail={
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          title="Product 1"
          varaint={[{ title: "S" }, { title: "M" }, { title: "L" }]}
        />

        <ProductCard
          price={100}
          thumbnail={
            "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          title="Product 1"
          varaint={[{ title: "S" }, { title: "M" }, { title: "L" }]}
        />
      </div>
    </section>
  );
};

export default StoreScreen;
