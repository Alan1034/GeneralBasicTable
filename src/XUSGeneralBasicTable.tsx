/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@xgent/ui-shadcn";
import { BasicTable } from "./components/BasicTable";


export const XUSGeneralBasicTable = (props) => {
  return (
    <BasicTable {...props} coms={{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow }}></BasicTable>
  )
};
