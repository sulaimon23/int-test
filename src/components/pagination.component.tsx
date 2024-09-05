import { UsePaginationType } from '../types'

const PaginationComponent = ({
  currentPage = 0,
  totalPages = 0,
  setNextPage,
  setPreviousPage,
  nextEnabled,
  previousEnabled,
  setPage,
}: Partial<UsePaginationType>) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index)

  return (
    <div className="flex items-center justify-center">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          onClick={setPreviousPage}
          disabled={!previousEnabled}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`relative z-10 inline-flex items-center ${
              pageNumber === currentPage
                ? 'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            } px-4 py-2 text-sm font-semibold`}
            onClick={() => setPage && setPage(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber + 1}
          </button>
        ))}

        <button
          onClick={setNextPage}
          disabled={!nextEnabled}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default PaginationComponent
