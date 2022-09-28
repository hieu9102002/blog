import Link from 'next/link';
import React, { FC } from 'react'
import Post from '../types/Post'
import UserBlog from '../types/User'

const PostItem:FC<{post: Post, admin?:boolean}> = ({post, admin}) => {

    const wordCount = post.content?.trim().split(/\s+/g).length ?? 0;
    const minutesToRead = (wordCount/100+1).toFixed(0);
  return (
    <div className='card'>
        <Link href={`/${post.username}`}>
            <a>
                <strong>By @{post.username}</strong>
            </a>
        </Link>

        {admin? 
             <Link href={`/admin/${post.slug}`}>
                <h2>
                    <a>{post.title}</a>
                </h2>
            </Link>

            :
            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <a>{post.title}</a>
                </h2>
            </Link>
        }
       
        <footer>
            <span>
                {wordCount} words. {minutesToRead} min read
            </span>
            <span className='push-left'>
                {post.heartCount} Hearts
            </span>
        </footer>
    </div>
  )
}

export default PostItem