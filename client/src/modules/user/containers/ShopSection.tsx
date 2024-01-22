import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProductItem from "../components/ProductItem";
const ShopSection = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (carouselRef.current) {
      const { offsetWidth, scrollWidth } = carouselRef.current;

      setDragConstraints({
        left: -scrollWidth + offsetWidth,
        right: 0,
      });
    }
  }, [carouselRef]);

  return (
    <section className="lg:grid lg:grid-cols-[300px_auto] gap-4 ml-8 ">
      <aside className="w-full p-4 lg:w-[300px] lg:border">
        <h2 className="sm:text-[18px]">Catogies</h2>

        <motion.div
          ref={carouselRef}
          drag={"x"}
          dragConstraints={dragConstraints}
          className="flex gap-4 my-4 lg:hidden">
          <Button title="Category 1" />
          <Button title="Category 1" />
          <Button title="Category 1" />
          <Button title="Category 1" />
          <Button title="Category 1" />
          <Button title="Category 1" />
          <Button title="Category 1" />
        </motion.div>

        <ul className="menu">
          <li>
            <a>All</a>
          </li>
          <li>
            <a>Indoor Plants</a>
          </li>
          <li>
            <a>Outdoor Plants</a>
          </li>
          <li>
            <a>Category 4</a>
          </li>
        </ul>
      </aside>

      <div className="px-4">
        <div className=""></div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>

        <div className="join flex justify-center items-center my-4">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
