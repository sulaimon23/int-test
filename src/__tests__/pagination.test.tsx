///<reference types="@testing-library/jest-dom" />

import { fireEvent, render } from '@testing-library/react'
import PaginationComponent from '../components/pagination.component'

describe('PaginationComponent', () => {
  it('renders with the correct number of buttons and disabled state', () => {
    const totalPages = 5
    const currentPage = 2
    const setPreviousPage = jest.fn()
    const setNextPage = jest.fn()
    const setPage = jest.fn()

    const { getAllByRole } = render(
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setPreviousPage={setPreviousPage}
        setNextPage={setNextPage}
        setPage={setPage}
        previousEnabled={currentPage > 0}
        nextEnabled={currentPage < totalPages - 1}
      />,
    )

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(totalPages + 2)
  })

  it('calls the appropriate functions when buttons are clicked', async () => {
    const totalPages = 5
    const currentPage = 2
    const setPreviousPage = jest.fn()
    const setNextPage = jest.fn()
    const setPage = jest.fn()

    const { getByRole } = render(
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setPreviousPage={setPreviousPage}
        setNextPage={setNextPage}
        setPage={setPage}
        previousEnabled={currentPage > 0}
        nextEnabled={currentPage < totalPages - 1}
      />,
    )

    fireEvent.click(getByRole('button', { name: /previous/i }))
    expect(setPreviousPage).toHaveBeenCalledTimes(1)

    fireEvent.click(getByRole('button', { name: /next/i }))
    expect(setNextPage).toHaveBeenCalledTimes(1)
  })

  it('applies the correct styles to the active page button', () => {
    const totalPages = 5
    const currentPage = 2
    const setPreviousPage = jest.fn()
    const setNextPage = jest.fn()
    const setPage = jest.fn()

    const { getByText } = render(
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setPreviousPage={setPreviousPage}
        setNextPage={setNextPage}
        setPage={setPage}
        previousEnabled={currentPage > 0}
        nextEnabled={currentPage < totalPages - 1}
      />,
    )

    const activePageButton = getByText('3')
    expect(activePageButton).toHaveClass(
      'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    )
  })
})
