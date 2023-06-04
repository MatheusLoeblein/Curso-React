import { Component } from 'react';

import './styles.css';


import {loadPosts} from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {
      posts:[],
      allPosts:[],
      page: 0,
      postsPerPage: 5,
      searchValue: '',
  };

  async componentDidMount(){
    const {page, postsPerPage} = this.state;
    const postsAndPhoto = await loadPosts();
    this.setState({
      posts: postsAndPhoto.slice(page, postsPerPage),
      allPosts: postsAndPhoto,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage})
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value});
  }

  render(){
  const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
  const noMorePosts = page + postsPerPage >= allPosts.length 
  
  const filteredPosts = !!searchValue ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());

  })
  : 
  posts;

    return(
      <section className='container'>
        {!!searchValue && (
        <>
          <h1>Search Value: {searchValue} Foram encontrado:{filteredPosts.length} Posts.</h1><br/><br/><br/>
        </>
        )}

        <input
        onChange={this.handleChange}
        value={searchValue}
        type="search" 
        /><br/><br/><br/>

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
          click={this.loadMorePosts}
          disabled={noMorePosts}
          />
        )}

        </div>
    </section>
    );
  }
}


