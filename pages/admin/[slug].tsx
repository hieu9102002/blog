import { collection, doc, DocumentData, DocumentReference, serverTimestamp, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import AuthCheck from '../../components/AuthCheck';
import { auth, firestore } from '../../lib/firebase';
import Post from '../../types/Post';
import styles from '../../styles/Admin.module.css'

const AdminPostEdit = () => {
  return (
   <AuthCheck>
      <PostManager/>
   </AuthCheck>
  )
}

const PostManager = () => {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const {slug} = router.query;

  const postRef = doc(collection(doc(collection(firestore,'users'),auth.currentUser!.uid),'posts'),slug as string);
  const [post] = useDocumentData(postRef);

  return (
    <main className='container'>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm postRef={postRef} defaultValues={post as Post} preview={preview}/>
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={()=>setPreview(!preview)}>{preview?'Edit':'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className='btn-blue'>Live view</button>
            </Link>
          </aside>
        </>
      )
      }
    </main>
  );
}

const PostForm:FC<{postRef:DocumentReference<DocumentData>, defaultValues:Post, preview:boolean}> = ({postRef, defaultValues, preview}) => {
  const {register, handleSubmit, reset, watch} = useForm ({defaultValues, mode: 'onChange'});

  const updatePost:SubmitHandler<DocumentData> = async ({content, published}) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp()
    });

    reset({content, published});

    toast.success('Post updated succesfully!')
  }

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {
        preview && (
          <div className='card'>
            <ReactMarkdown>{watch('content')??""}</ReactMarkdown>
          </div>
        )
      }
      <div className={preview?styles.hidden:styles.controls}>
        <textarea {...register("content")}></textarea>

        <fieldset>
          <input className='checkbox' {...register("published")} type="checkbox"/>
          <label>Publish</label>
        </fieldset>

        <button type="submit" className='btn-green'>
          Save changes
        </button>
      </div>
    </form>
  )
}

export default AdminPostEdit;