/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellContext } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Container from "@/components/Container";

interface CellProps<T> {
  folder?: string;
  data: CellContext<T, any>;
}

const FirstCell = <T,>(props: CellProps<T>) => {
  const navigate = useNavigate();

  const { getValue, row } = props.data;
  const payload = row.original as any;

  return (
    <Container
      onDoubleClick={() => navigate(`${payload._id}`)}
      className="first-cell cursor-pointer flex items-center gap-4">
      <span className="capitalize">{getValue() || ""}</span>
    </Container>
  );
};

export default FirstCell;
