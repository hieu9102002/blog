import Link from 'next/link'
import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { useContext } from 'react'
import { UserContext } from '../lib/context'

interface PropsWithFallback extends PropsWithChildren{
    fallback?:ReactNode
}

const AuthCheck = (props:PropsWithFallback) => {
    const {username} = useContext(UserContext);


  return (
    <main>
        {
            username ?
                props.children : props.fallback || <Link href="/enter">You must be signed in</Link>
        }
    </main>
  )
}

export default AuthCheck