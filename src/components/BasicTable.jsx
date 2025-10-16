/** @format */

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
import { useState } from "react";
export const BasicTable = (props) => {
  const {
    tableList = [],
    tableColumn = [],
    total = 0,
    size = "",
    pageNumKey = "page",
    pageSizeKey = "pageSize",
    parametersType = "url",
    DBPrimaryKey = "false",
    getList = () => {},
    paginationAttrs = {},
    coms: { Table, TableBody, TableCell, TableHead, TableHeader, TableRow },
  } = props;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableColumn.map((column) => {
            return <TableHead key={column.key}>{column.label}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableList.map((scope, index) => {
          return (
            <TableRow key={JSON.stringify(scope)}>
              {tableColumn.map((column) => {
                const columnProps = { ...column };
                delete columnProps.key;
                if (column.render) {
                  return (
                    <TableCell key={column.key} {...columnProps}>
                      {column.render(scope, column, index)}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={column.key} {...columnProps}>
                      {scope[column.prop]}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
