import { PostCard } from '../PostCard';
import './styles.css';
import P from 'prop-types'

export const Posts = ({posts = []}) => (
    <div className="posts">
    {posts.map(post => (
      <PostCard
        key={post.id}
        post={post}
      />
    ))}
  </div>
);

Posts.defaultProps = {
  posts: [],
}

Posts.propTypes = {
  posts: P.arrayOf(P.shape({
    title: P.string,
    cover: P.string,
    body: P.string,
    id: P.number,
  })),
}
