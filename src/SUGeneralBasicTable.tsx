/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { BasicTable } from "./components/BasicTable";


export const SUGeneralBasicTable = (props) => {
  return (
    <BasicTable {...props} coms={{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow }}></BasicTable>
  )
};
