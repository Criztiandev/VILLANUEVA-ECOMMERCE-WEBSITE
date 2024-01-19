import { Table } from "@tanstack/react-table";

interface Props<T> {
  table: Table<T>;
}

const TablePagination = <T,>({ table }: Props<T>) => {
  return (
    <div className="flex justify-end items-center mt-4">
      <div className="join grid grid-cols-3">
        <button
          className="join-item btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Prev
        </button>
        <button className="join-item btn">
          {table.getState().pagination.pageIndex}
        </button>
        <button
          className="join-item btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
