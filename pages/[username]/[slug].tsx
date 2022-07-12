import { collection, collectionGroup, doc, getDoc, getDocs } from 'firebase/firestore';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import Post from '../../types/Post';
import {useDocumentData} from 'react-firebase-hooks/firestore'
import PostContent from '../../components/PostContent';

interface iParams extends ParsedUrlQuery{
  username: string;
  slug: string;
}

export const getStaticProps : GetStaticProps = async ({params}) =>{
  const {username, slug} = params as iParams;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc){
    const postRef = doc(collection(userDoc.ref,'posts'),slug);
    const postSnap = await getDoc(postRef);

    post = postToJSON(postSnap);

    path = postRef.path;

    userDoc.ref;
  }

  return {
    props: {post,path},
    revalidate: 5000,
  };
}

export const getStaticPaths:GetStaticPaths = async () => {
  const snapshot = await getDocs(collectionGroup(firestore, 'posts'));

  const paths = snapshot.docs.map((doc) => {
    const {slug, username} = doc.data() as Post;
    return {
      params: {username, slug},
    }
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

const PostPage = (props:{path:string, post:Post}) => {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost as Post|| props.post;

  return (
    <main className='container'>
      <section>
        <PostContent post={post}/>
      </section>

      <aside className='card'>
        <p>
          <strong>{post.heartCount || 0} Hearts</strong>
        </p>
      </aside>
    </main>
  )
}

export default PostPage;