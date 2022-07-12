import React, { FC } from 'react'
import Post from '../types/Post'
import UserBlog from '../types/User'
import PostItem from './PostItem'

const PostFeed:FC<{posts: Post[], admin: UserBlog|false}> = ({posts, admin=false}) => {
  return posts ? (<div>{posts.map((post) => <PostItem post={post} key={post.slug} admin={admin}/>)}</div>): null;
}

export default PostFeed