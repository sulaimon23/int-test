import { Posts } from '../types'

const PostCard = (props: Posts) => {
  return (
    <div
      data-testid="post-card"
      className="rounded-lg bg-card text-card-foreground border shadow-lg max-w-md mx-auto"
    >
      <div className="p-4">
        <h3 className="tracking-tight text-xl font-bold mb-2">{props.title}</h3>
        <p className="text-sm text-gray-500 mb-2">Author Name {props.userId}</p>
        <p className="text-muted-foreground text-sm mb-4">{props.body}</p>
      </div>
    </div>
  )
}

export default PostCard
