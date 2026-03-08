/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "./components/ui/table";
import {
  Button
} from "./components/ui/button";
import {
  Checkbox
} from "./components/ui/checkbox";
import { BasicTable } from "./components/BasicTable";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet"

export const SUGeneralBasicTable = (props) => {
  return (
    <BasicTable {...props} coms={{
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
      Button,
      Checkbox,
      TableCaption,
      Sheet,
      SheetClose,
      SheetContent,
      SheetDescription,
      SheetFooter,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
    }}></BasicTable>
  )
};
