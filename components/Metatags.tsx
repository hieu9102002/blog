import Head from 'next/head'

import React, { FC } from 'react'

const Metatags:FC<{title?:string, description?:string, image?:string}> = ({
    title = 'Next.js + React.js blog',
    description = 'a Next/React/Firebase blog created by Hieu',
    image = 'https://fireship.io/courses/react-next-firebase/img/featured.png'
}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@pigsensei" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
    </Head>
  )
}

export default Metatags