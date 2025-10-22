import { Schemas, HandleTable } from "general-basic-indexdb"
import { HandleParamsData } from "network-spanner"
const { getData } = HandleTable
const { formSchema } = Schemas
import { useState, useEffect } from 'react';
export const BasicPagination = (props) => {
  const {
    // tableList = [],
    // tableColumn = [],
    total = 180,
    // size = "",
    currentPageKey = "page",
    pageSizeKey = "pageSize",
    parametersType = "url",
    DBPrimaryKey,
    defCurrentPage = 1,
    defPageSize = 10,
    breakLength = 7,
    autoScroll = true,
    getList = () => { },
    paginationAttrs = {},
    coms: { Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
      PaginationWidget },
  } = props;
  const [currentPage, setCurrentPage] = useState(defCurrentPage);
  const [pageSize, setPageSize] = useState(defPageSize);
  const [paginationList, setPaginationList] = useState([]);
  useEffect(() => {
    let rawlist = Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i + 1)
    // -1代表省略号
    if (rawlist.length > breakLength) {
      let midList = []
      if (currentPage - 2 <= 1) {
        midList = [2, 3, 4, 5, 6]
      } else if (currentPage + 2 >= rawlist.at(-1)) {
        midList = [rawlist.at(-6), rawlist.at(-5), rawlist.at(-4), rawlist.at(-3), rawlist.at(-2)]
      } else {
        midList = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
      }

      rawlist = [1, ...midList, Math.ceil(total / pageSize)]

      if (currentPage > Math.ceil(breakLength / 2)) {



        if (rawlist[0] + 1 !== rawlist[1]) {
          rawlist.splice(1, 0, -1)

        }

      }


      if (currentPage < (rawlist.at(-1) - Math.floor(breakLength / 2))) {

        if (rawlist.at(-2) + 1 !== rawlist.at(-1)) {
          rawlist.splice(rawlist.length - 1, 0, -1)

        }
      }

    }

    setPaginationList(rawlist)
  }, [total, pageSize, currentPage])
  const handleParams = async (params) => {
    const searchParams = await HandleParamsData.makeParamsByType(params, props)

    await HandleParamsData.saveParamsByType(searchParams, props)
    return searchParams
  }
  const handleSearch = async (params = { [currentPageKey]: currentPage, [pageSizeKey]: pageSize }) => {
    let searchParams = {
      ...params,
    };

    searchParams = await handleParams(searchParams);
    getList({ ...searchParams });
  }
  const handleCurrentChange = (val) => {
    if (val < 1) {
      return
    }
    if (val > Math.round((total / pageSize) * 100) / 100) {
      return
    }
    setCurrentPage(val);
    handleSearch({ [currentPageKey]: val, [pageSizeKey]: pageSize })
    if (autoScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    PaginationWidget ?
      <PaginationWidget page={currentPage} totalPages={total} onChange={(page) => handleCurrentChange(page)}{...paginationAttrs} ></PaginationWidget> :
      (<Pagination {...paginationAttrs}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handleCurrentChange(currentPage - 1)} />
          </PaginationItem>
          {paginationList.map((item, index) => {
 
            return (
              (item === -1) ? (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>) : (
                <PaginationItem key={index}>
                  <PaginationLink isActive={item === currentPage} onClick={() => handleCurrentChange(item)}>{item}</PaginationLink>
                </PaginationItem>
              )
            )
          })}
          <PaginationItem>
            <PaginationNext onClick={() => handleCurrentChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>)
  )
}