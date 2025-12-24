import { Schemas, HandleTable } from "general-basic-indexdb"
import { HandleParamsData, ObjectStoreInUrl } from "network-spanner"
const { getData } = HandleTable
const { formSchema } = Schemas
import { useState, useEffect } from 'react';
const defProps = {
  total: 0,
  currentPageKey: "page",
  pageSizeKey: "pageSize",
  parametersType: "url",
  defCurrentPage: 1,
  DBPrimaryKey: null,
  defPageSize: 10,
  breakLength: 7,
  autoScroll: true,
  getList: () => { },
  paginationAttrs: {},
  hideOnSinglePage: false,
  coms: {
    Pagination: [],
    PaginationContent: [],
    PaginationEllipsis: [],
    PaginationItem: [],
    PaginationLink: [],
    PaginationNext: [],
    PaginationPrevious: [],
    PaginationWidget: []
  }
}
export const BasicPagination = (prop) => {
  const props = { ...defProps, ...prop };
  const {
    // tableList = [],
    // tableColumn = [],
    total = 0,
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
    hideOnSinglePage = false,
    coms: { Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
      PaginationWidget },
  } = props;
  const initCurrentPage = () => {
    let initDefCurrentPage = defCurrentPage
    if (parametersType === "url") {
      initDefCurrentPage = Number(ObjectStoreInUrl.getURLParameter({ decode: true })?.[currentPageKey]) || defCurrentPage
    }
    if (parametersType === "indexDB") {
      getData(
        {
          tableName: "formParams",
          propertiesKey: window.location.pathname || "defQueryParams",
          primaryKey: DBPrimaryKey || "default",
          mapDB: formSchema
        }, (DBParams) => {
          const currentPage = DBParams?.[currentPageKey]
          if (currentPage) {
            setCurrentPage(currentPage);
          }
        }
      )

    }
    return initDefCurrentPage
  }
  const initPageSize = () => {
    let initDefPageSize = defPageSize
    if (parametersType === "url") {
      initDefPageSize = Number(ObjectStoreInUrl.getURLParameter({ decode: true })?.[pageSizeKey]) || defPageSize
    }
    if (parametersType === "indexDB") {
      getData(
        {
          tableName: "formParams",
          propertiesKey: window.location.pathname || "defQueryParams",
          primaryKey: DBPrimaryKey || "default",
          mapDB: formSchema
        }, (DBParams) => {
          const pageSize = DBParams?.[pageSizeKey]
          if (pageSize) {
            setPageSize(pageSize)
          }
        }
      )
    }
    return initDefPageSize
  }
  const [currentPage, setCurrentPage] = useState(initCurrentPage());
  const [pageSize, setPageSize] = useState(initPageSize());
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
    const action = await HandleParamsData.saveParamsByType(searchParams, props)
    return { searchParams, action }
  }
  const handleSearch = async (params = { [currentPageKey]: currentPage, [pageSizeKey]: pageSize }) => {
    const { searchParams, action } = await handleParams({
      ...params,
    });
    if (action === "link") {
      return;
    }
    getList({ ...searchParams });
  }
  const handleCurrentChange = (val) => {
    if (val < 1) {
      return
    }
    if (val > Math.ceil(total / pageSize)) {
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
    hideOnSinglePage && (total / pageSize) < 1 ? [] :
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