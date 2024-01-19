/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryKey } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { HTMLAttributes, InputHTMLAttributes } from "react";

export interface BaseProps extends HTMLAttributes<HTMLElement> {}

// Fields
export interface Fields extends InputHTMLAttributes<HTMLInputElement> {}

// table props
export interface TableProps<T> {
  id: string;
  columns: ColumnDef<T, any>[];
  className?: string;
}

export interface TableStructProps<T> {
  base: string;
  name: string;
  columns: ColumnDef<T, any>[];
}

export interface ActionProps<T> {
  id: string | number;
  payload: CellContext<T, any>;
  invalidateKey: QueryKey;
  configFn: any;
  isView?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
}

export interface ColumnOption<T> {
  id?: string;
  name: keyof T;
  header: string;
  path?: string;
  isBadge?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isDate?: boolean;

  isView?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  isToggle?: boolean;
  hasImage?: boolean;
}

export interface BreadCrumbsItems {
  title: string;
  icon?: JSX.Element;
  path: string;
}

export interface LinkProps {
  path: string;
  title: string;
  icon: string;
  isDropdown?: boolean;
  dropdown?: LinkProps[];
}
