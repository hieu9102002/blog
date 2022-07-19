import UserBlog from '../../types/User';
import React, { FC } from 'react'
import PostFeed from '../../components/PostFeed';
import UserProfile from '../../components/UserProfile';
import Post from '../../types/Post';
import {  getUserWithUsername, postToJSON } from '../../lib/firebase';
import { collection, getDocs, limit, orderBy, query as firestoreQuery, where } from 'firebase/firestore';
import { GetServerSideProps } from 'next';

export const getServerSideProps:GetServerSideProps= async ({query}) => { 
  const {username} = query;

  const userDoc = await getUserWithUsername(String(username??""));

  if(!userDoc){
    return {
      notFound:true,
    }
  }
  let user:UserBlog|null = null;
  let posts:Post[]|null = null;

  if(userDoc) {
    user = (userDoc.data()) as UserBlog;
    const postsRef = userDoc.ref;
    const col = collection(postsRef, 'posts')
    const q = firestoreQuery(col, where('published', '==', true), orderBy('createdAt', 'desc'), limit(5));

    posts = (await getDocs(q)).docs.map(postToJSON);
  }
  return {
    props: {user, posts},
  };
}

const UserProfilePage:FC<{user:UserBlog, posts:Post[]}> = ({user, posts}) => {
  return (
    <main>
      <UserProfile user={user}/>
      <PostFeed posts={posts} admin={false}/>
    </main>
  )
}

export default UserProfilePage;