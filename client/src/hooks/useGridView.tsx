import { ChangeEvent, useState } from "react";

const useGridView = () => {
  const [isTable, setIsTable] = useState(false);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleIsTable = () => setIsTable((prev) => !prev);

  const handleCategoryFilter = (event: ChangeEvent<HTMLSelectElement>) =>
    setCategoryFilter(event.currentTarget.value);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) =>
    setFilter(event.currentTarget.value);

  return {
    isTable,
    filter,
    categoryFilter,
    handleIsTable,
    handleCategoryFilter,
    handleFilter,
  };
};

export default useGridView;
