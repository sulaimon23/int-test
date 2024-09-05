///<reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import CreateArticle from '../pages/create-article.page'

jest.mock('axios')

describe('CreateArticle Component', () => {
  it('renders the CreateArticle component', () => {
    render(
      <BrowserRouter>
        <CreateArticle />
      </BrowserRouter>,
    )

    expect(screen.getByText('Create an Article')).toBeInTheDocument()
  })

  it('submits the form successfully', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: {} })

    render(
      <BrowserRouter>
        <CreateArticle />
      </BrowserRouter>,
    )

    userEvent.type(screen.getByLabelText('Title'), 'Sample Title')
    userEvent.type(screen.getByLabelText('Author Name'), 'John Doe')
    userEvent.type(
      screen.getByLabelText('Contact Information'),
      'john.doe@example.com',
    )
    userEvent.type(screen.getByLabelText('Article Snippet'), 'Lorem ipsum')
    userEvent.click(screen.getByTestId('submit'))

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: 'Sample Title',
          email: 'john.doe@example.com',
          name: 'John Doe',
          message: 'Lorem ipsum',
        },
      )
    })
  })
})
