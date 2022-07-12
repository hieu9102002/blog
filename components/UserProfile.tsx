import UserBlog from '../types/User'
import React, { FC } from 'react'

const UserProfile:FC<{user:UserBlog}> = ({user}) => {
  return (
    <div className='box-center'>
        <img src={user.photoURL??undefined} className="card-img-center"/>
        <p>
            <i>@{user.username}</i>
        </p>
        <h1>{user.displayName}</h1>
    </div>
  )
}

export default UserProfile