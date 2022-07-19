import { collection, doc, orderBy, query, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useContext, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import AuthCheck from '../../components/AuthCheck'
import PostFeed from '../../components/PostFeed'
import { UserContext } from '../../lib/context'
import { auth, firestore, serverTimestamp } from '../../lib/firebase'
import Post from '../../types/Post'
import kebabCase from 'lodash.kebabcase'
import toast from 'react-hot-toast'

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <CreateNewPosts/>
        <PostList/>
      </AuthCheck>
    </main>
  )
}

const PostList = () => {
  const ref = collection(doc(collection(firestore,'users'),auth.currentUser!.uid),'posts')
  const q = query(ref, orderBy('createdAt'));

  const [querySnapshot] = useCollection(q);

  const posts = querySnapshot?.docs.map((doc) => doc.data() as Post);

  return (
    <>
      <h1>Manage your posts</h1>
      <PostFeed posts={posts} admin/>
    </>
  )
}

const CreateNewPosts = () => {
  const router = useRouter();
  const {username} = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost:FormEventHandler = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser!.uid;
    const ref = doc(collection(doc(collection(firestore,'users'),auth.currentUser!.uid),'posts'), slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published:false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0
    }

    await setDoc(ref, data);

    toast.success('Post created!');

    router.push(`/admin/${slug}`);
  }

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={e=>setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className='input'
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button
        type="submit"
        disabled={!isValid}
        className="btn-green"
      >
        Create New Post
      </button>
    </form>
  )
}

export default AdminPostsPage