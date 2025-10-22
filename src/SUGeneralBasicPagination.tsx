import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import { BasicPagination } from "./components/BasicPagination";


export const SUGeneralBasicPagination = (props) => {
  return (
    <BasicPagination {...props} coms={{
      Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
    }}></BasicPagination>
  )
};
