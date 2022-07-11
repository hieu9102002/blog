import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    const user = null;
    const username:string|null = null;
  return (
    <nav className='navbar'>
        <ul>
            <li>
                <Link href="/"><button className='btn-logo'>FEED</button></Link>
            </li>

            {username && (
                <>
                    <li className='push-left'>
                        <Link href="/admin"><button className='btn-blue'>Write Posts</button></Link>
                    </li>
                    <li>
                        <Link href={`/${username}`}><img src={"user?.photoURL"}></img></Link>
                    </li>
                </>
            )}

            {!username && (
                <>
                    <Link href="/enter"><button className='btn-blue'>Log in</button></Link>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar