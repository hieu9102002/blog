import toast from 'react-hot-toast'
import { GetServerSideProps } from 'next'
import { collectionGroup, getDocs, limit, orderBy, query as firestoreQuery, where,Timestamp, startAfter } from 'firebase/firestore'
import { firestore, postToJSON } from '../lib/firebase'
import { FC, useState } from 'react'
import Post from '../types/Post'
import PostFeed from '../components/PostFeed'
import Loader from '../components/Loader'
import PrimeCounter from '../components/Button'

const LIMIT = 2;

export const getServerSideProps:GetServerSideProps =async ({query}) => {
  const postQuery = collectionGroup(firestore, 'posts');
  const q = firestoreQuery(postQuery, where('published', '==', true), orderBy('createdAt', 'desc'), limit(LIMIT));

  const posts = (await getDocs(q)).docs.map(postToJSON);

  return {
    props: {posts},
  }
}

const Home:FC<{posts:Post[]}> = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts =async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;
    const q = firestoreQuery(collectionGroup(firestore, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'), startAfter(cursor), limit(LIMIT));

    const newDocs = (await getDocs(q)).docs.map(postToJSON);

    setPosts(posts.concat(newDocs));
    setLoading(false);

    if (newDocs.length<LIMIT){
      setPostsEnd(true);
    }
  }

  return (
    <main>
      <PostFeed posts={posts} admin={false}/>
      {!loading && !postsEnd && <button onClick={getMorePosts}> Load more</button>}

      <Loader show={loading}/>

      {postsEnd && 'You have reached the end!'}
    </main>
  )
}

export default Home;