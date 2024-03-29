/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from "@/interface/component";
import CheckBox from "../Checkbox";
import { useEffect, useMemo, useState } from "react";

import { RootReducer } from "@/service/store";
import { setRowSelect } from "@/service/store/slice/table.slice";
import {
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import SortingIndicator from "./parts/SortingIndicator";
import Panel from "./Panel";

const Table = <T,>({ columns, ...props }: TableProps<T>) => {
  const [payload, setPayload] = useState<Array<T>>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnsFilter] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  console.log(payload);

  const dispatch = useDispatch();
  const selection = useSelector((state: RootReducer) => state.table[props.id]);

  const memoizedData: Array<T> = useMemo(() => payload, [payload]);
  const _columns: ColumnDef<T, any>[] = useMemo(() => columns, [columns]);

  useEffect(() => {
    if (rowSelection) {
      const rowID = Object.keys(rowSelection).map((id) => {
        const row = table.getRow(id) as any;
        return row ? row.original?._id : null;
      });

      dispatch(setRowSelect({ id: props.id, data: rowID }));
    }
  }, [rowSelection]);

  const table = useReactTable<T>({
    data: memoizedData,
    columns: _columns,
    pageCount: 10,

    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },

    enableRowSelection: true,
    manualPagination: false,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnsFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (selection?.payload) {
      setPayload(selection?.payload);
    }

    if (selection?.globalFilter) {
      setGlobalFilter(selection?.globalFilter);
    }

    if (selection?.columnFilters) {
      setColumnsFilter(selection?.columnFilters);
    }

    // clean up when the component unmout
    return () => {
      setGlobalFilter("");
      setColumnsFilter([]);
    };
  }, [selection?.payload, selection?.columnFilters, selection?.globalFilter]);

  return (
    <>
      <div
        className="overflow-x-auto  bg-white"
        style={{ height: "calc(100vh - 230px)" }}>
        {memoizedData && (
          <>
            {memoizedData?.length > 0 ? (
              <table className="table table-md  rounded-[5px] bg-white">
                <thead>
                  {table.getHeaderGroups().map((row) => (
                    <tr
                      key={row.id}
                      className="rounded-t-[10px] border-b overflow-hidden">
                      {row.headers.map((header, index) => (
                        <th
                          key={header.id}
                          className=" text-gray-400 font-semibold">
                          {header.isPlaceholder ? null : (
                            <div
                              className={`flex items-center ${
                                row.headers.length - 1 === index
                                  ? "justify-center"
                                  : ""
                              }`}>
                              {index === 0 && (
                                <CheckBox
                                  {...{
                                    checked: table.getIsAllRowsSelected(),
                                    indeterminate:
                                      table.getIsSomeRowsSelected(),
                                    onChange:
                                      table.getToggleAllRowsSelectedHandler(),
                                  }}
                                  className="mr-4 border-white"
                                />
                              )}

                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none flex"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}

                                {/* // Sorting Indicator */}
                                <SortingIndicator
                                  ascIcon="Asc"
                                  descIcon="Desc"
                                  isSorted={
                                    header.column.getIsSorted() as string
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((rows) => (
                    <tr key={rows.id}>
                      {rows.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center items-center h-full flex-col gap-2">
                <div className="text-2xl font-semibold">No data found</div>
                <div className="text-gray-400 text-center">
                  Try reload the page or check your connection
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex gap-4 justify-end py-4">
        <button
          className="btn"
          onClick={() => table.getCanPreviousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <button className="w-[48px] h-[48px] rounded-[5px] bg-primary text-white">
          0
        </button>
        <button
          className="btn bg-primary text-white"
          onClick={() => table.getCanNextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </>
  );
};

Table.Panel = Panel;

export default Table;
