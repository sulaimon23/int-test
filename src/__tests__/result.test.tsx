///<reference types="@testing-library/jest-dom" />

import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ResultPage from '../pages/result.page'

describe('ResultPage Component', () => {
  it('renders the ResultPage component', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ResultPage />
        </BrowserRouter>,
      )
    })

    expect(screen.getByTestId('result-page')).toBeInTheDocument()
  })

  it('renders the ResultPage component with loading state', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ResultPage />
        </BrowserRouter>,
      )
    })

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('renders search results based on input', async () => {
    render(
      <BrowserRouter>
        <ResultPage />
      </BrowserRouter>,
    )

    await screen.findByTestId('result-page')

    const searchInput = screen.getByPlaceholderText('Author name, title...')
    const searchButton = screen.getByText('Search')

    userEvent.type(searchInput, 'example')
    userEvent.click(searchButton)

    await screen.findByTestId('result-page')

    await waitFor(() => {
      expect(screen.queryByText('No data found')).toBeNull()
      expect(screen.getAllByTestId('post-card')[0]).toBeInTheDocument()
    })
  })
})
