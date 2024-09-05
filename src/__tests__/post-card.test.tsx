///<reference types="@testing-library/jest-dom" />

import { render } from '@testing-library/react'
import PostCard from '../components/post-card.component'
import { Posts } from '../types'

describe('PostCard Component', () => {
  const samplePost: Posts = {
    title: 'Sample Title',
    userId: 1,
    id: 1,
    body: 'This is a sample body text.',
  }

  it('renders PostCard component with correct content', () => {
    const { getByText } = render(<PostCard {...samplePost} />)
    expect(getByText(samplePost.title)).toBeInTheDocument()
    expect(getByText(`Author Name ${samplePost.userId}`)).toBeInTheDocument()
    expect(getByText(samplePost.body)).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    render(<PostCard {...samplePost} />)
  })
})
