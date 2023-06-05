import { useState, useEffect, useCallback } from 'react';

import './styles.css';


import {loadPosts} from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const handleLoadPosts = useCallback (async (page, postsPerPage) => {
    const postsAndPhoto = await loadPosts();
    setPosts(postsAndPhoto.slice(page, postsPerPage));
    setAllPosts(postsAndPhoto)
  }, []);

  useEffect(() => {
    console.log('oi');
    handleLoadPosts(page, postsPerPage);
  }, [handleLoadPosts, page, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPage(nextPage);
    setPosts(posts);
  }

  const handleChange = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());

  })
  : posts;


  return (
    <section className='container'>

      <div className="search-container">
        {!!searchValue && (
          <h1>Search Value: {searchValue} Foram encontrado:{filteredPosts.length} Posts.</h1>

        )}
        
        <TextInput searchValue={searchValue} handleChange={handleChange}/>
      </div>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}
      
      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}
      

      <div className="button-container" >
      {!searchValue && (
        <Button 
        text="Load more posts"
        click={loadMorePosts}
        disabled={noMorePosts}
        />
      )}

      </div>
    </section>
  );
}
// export class Home2 extends Component {
//   state = {
//       posts:[],
//       allPosts:[],
//       page: 0,
//       postsPerPage: 5,
//       searchValue: '',
//   };

//   async 
//     const {page, postsPerPage} = this.state;
//     const postsAndPhoto = await loadPosts();
//     this.setState({
//       posts: postsAndPhoto.slice(page, postsPerPage),
//       allPosts: postsAndPhoto,
//     });
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postsPerPage
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({posts, page: nextPage})
//   }

//   handleChange = (e) => {
//     const {value} = e.target;
//     this.setState({searchValue: value});
//   }

//   render(){
//   const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
//   const noMorePosts = page + postsPerPage >= allPosts.length 
  


//     return(

//     );
//   }
// }


