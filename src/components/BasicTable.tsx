/** @format */

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useState } from "react";
export const BasicTable = (props) => {
  const {
    tableList = [],
    tableColumn = [],
    tableTableRows = [tableColumn],
    children,
    // total = 0,
    // size = "",
    // pageNumKey = "page",
    // pageSizeKey = "pageSize",
    // parametersType = "url",
    // DBPrimaryKey = "false",
    // paginationAttrs = {},
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
            tableTableRows.map((row = tableColumn, rowIndex) => {
              return (
                <TableRow key={JSON.stringify(scope) + rowIndex}>
                  {row.map((column) => {
                    const columnProps = { ...column };
                    delete columnProps.key;
                    delete columnProps.label;
                    delete columnProps.prop;
                    delete columnProps.render;
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
              )
            }


            ));
        })}
        {children}
      </TableBody>
    </Table>
  );
};
