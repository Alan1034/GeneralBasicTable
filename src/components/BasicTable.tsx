/** @format */

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useState } from "react";
import { ArrowDownUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ColumnSetting } from './ColumnSetting';
export const BasicTable = (props) => {
  const {
    tableList = [],
    tableColumn = [],
    selectedRows: selectedRowsProp = [],
    tableTableRows,
    children,
    rowSelection,
    selectionChange,
    // total = 0,
    // size = "",
    // pageNumKey = "page",
    // pageSizeKey = "pageSize",
    // parametersType = "url",
    DBPrimaryKey,
    // paginationAttrs = {},
    coms: { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Checkbox, TableCaption },
  } = props;

  const [selectedRows, setSelectedRows] = useState<Set<number>>(
    new Set(selectedRowsProp)
  );

  const [processedColumns, setProcessedColumns] = useState(tableColumn);
  const handleColumnChange = (newColumns) => {
    const orderedColumns = newColumns.map(newCol => ({
      ...tableColumn.find(col => col.key === newCol.key),
      hidden: newCol.hidden
    }));
    setProcessedColumns(orderedColumns);
  };

  const visibleColumns = processedColumns.filter(col => !col.hidden);
  const rows = tableTableRows ?? [visibleColumns];
  const selectAll = selectedRows?.size === tableList?.length
  const handleSelectAll = (checked: boolean) => {
    let selectedIndexs = []
    if (checked) {
      selectedIndexs = tableList.map((row, index) => index)
    }
    setSelectedRows(new Set(selectedIndexs))
    if (selectionChange) {
      selectionChange({ selectedIndexs })
    }
  }
  const handleSelectRow = (index: number, checked: boolean, scope: any) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(index)
    } else {
      newSelected.delete(index)
    }
    setSelectedRows(newSelected)
    if (selectionChange) {
      selectionChange({ scope, index, selectedIndexs: [...newSelected] })
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>

          {rowSelection.type === "checkbox" &&
            <TableHead>
              <Checkbox
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={selectAll}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
          }
          {visibleColumns.map((column, index) => (
            <TableHead key={column.key}>
              <div className="flex items-center">
                {column.label}
                {column.sortable &&
                  <Button variant="ghost" size="icon" onClick={() => {
                    column.sortable(column.key, column, index);
                  }}>
                    <ArrowDownUp className="h-4 w-4 opacity-50" />
                  </Button>
                }
              </div>
            </TableHead>
          ))}
          <TableHead>
            <ColumnSetting DBPrimaryKey={DBPrimaryKey} coms={props.coms} tableColumn={tableColumn} onColumnChange={handleColumnChange} />
          </TableHead>
        </TableRow>
      </TableHeader>


      <TableBody>
        {tableList.map((scope, index) => (
          rows.map((row, rowIndex) => (
            <TableRow key={JSON.stringify(scope) + rowIndex}
              data-state={selectedRows.has(index) ? "selected" : undefined}>
              {rowSelection.type === "checkbox" && (
                <TableCell key={`row-${index}-checkbox`}>
                  <Checkbox
                    id={`row-${index}-checkbox`}
                    name={`row-${index}-checkbox`}
                    checked={selectedRows.has(index)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(index, checked === true, scope)
                    }
                  />
                </TableCell>
              )}
              {row.map((column) => {
                const columnProps = { ...column };
                delete columnProps.key;
                delete columnProps.label;
                delete columnProps.prop;
                delete columnProps.render;
                delete columnProps.sortable;
                delete columnProps.hidden;
                if (column.render) {
                  return (
                    <TableCell key={column.key} {...columnProps}>
                      {column.render(scope, column, index)}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.key} {...columnProps}>
                    {scope[column.prop]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ))}
        {children}
      </TableBody>
    </Table >
  );
};
