import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePagination } from 'react-use-pagination'
import Loader from '../components/loader.component'
import PaginationComponent from '../components/pagination.component'
import PostCard from '../components/post-card.component'
import { Posts } from '../types'
//

const ResultPage = () => {
  //
  const [posts, setPosts] = useState<Posts[]>([])
  const [isFetching, setFetching] = useState<boolean>(true)
  const [inputValue, setInputValue] = useState<string>('')
  const [query, setQuery] = useState<string>('')

  const searchArticles = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    // Filter articles based on title and body
    const filteredArticles = [...posts].filter((post) => {
      const lowercasedTitle = post.title.toLowerCase()
      const lowercasedBody = post.body.toLowerCase()
      return (
        lowercasedTitle.includes(lowercaseQuery) ||
        lowercasedBody.includes(lowercaseQuery)
      )
    })
    return filteredArticles
  }

  const {
    currentPage,
    totalPages,
    setNextPage,
    setPreviousPage,
    setPage,
    nextEnabled,
    previousEnabled,
    startIndex,
    endIndex,
  } = usePagination({
    totalItems: searchArticles(query).length,
    initialPageSize: 9,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(inputValue)
  }

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setPosts(res.data)
      })
      .catch(() => {
        toast.error('Unable to fetch posts!!!')
      })
      .finally(() => {
        setFetching(false)
      })
  }, [])

  return (
    <div data-testid="result-page" className="max-w-4xl px-4 mx-auto my-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl mb-6 shadow flex items-center w-full sm:w-[90%] px-[10px] py-2 border-[1px]"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Author name, title..."
            className="bg-white text-sm cursor-default w-full placeholder:text-placeholder font-normal !outline-none border-none focus:!outline-none"
            name="search"
            id="search"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="px-6 py-2 flex items-center justify-center gap-2 rounded bg-blue-500 text-white shadow-xl hover:bg-blue-600"
          type="submit"
        >
          Search
        </button>
      </form>
      <div>
        <button
          className="px-6 py-2 flex items-center justify-center gap-2 rounded bg-blue-500 text-white shadow-xl hover:bg-blue-600"
          type="button"
        >
          <Link className="block" to={'/create'}>
            + Add post
          </Link>
        </button>
      </div>
      <section className="mt-10">
        {isFetching ? (
          <Loader />
        ) : (
          <>
            {!(searchArticles(query).length > 0) ? (
              <p className="text-xl text-center">No data found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {searchArticles(query)
                  .slice(startIndex, endIndex + 1)
                  .map((e) => (
                    <PostCard key={e.id} {...e} />
                  ))}
              </div>
            )}
          </>
        )}
      </section>

      <section className="mt-12">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
          nextEnabled={nextEnabled}
          previousEnabled={previousEnabled}
          startIndex={startIndex}
          endIndex={endIndex}
          setPage={setPage}
        />
      </section>
    </div>
  )
}

export default ResultPage
