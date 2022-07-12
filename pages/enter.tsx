import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../lib/context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce'

const EnterPage = () => {
    const { user, username } = useContext(UserContext);
    return (
        <main>
            {
                user ?
                    !username ? <UsernameForm /> : <SignOutButton />
                    : <SignInButton />
            }
        </main>
    )
}

export default EnterPage

const SignInButton = () => {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider);
    };
    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            <img src={'/google.png'} />Sign in with Google
        </button>
    )
}

const SignOutButton = () => {
    return (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    )
}

const UsernameForm = () => {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userDoc = doc(firestore, `users/${user!.uid}`)
        const usernameDoc = doc(firestore, `usernames/${formValue}`)

        const batch = writeBatch(firestore);
        batch.set(userDoc, {username: formValue, photoURL: user?.photoURL, displayName:user?.displayName });
        batch.set(usernameDoc, {uid:user!.uid});

        await batch.commit();
    }

    useEffect(() => {
        checkUserName(formValue);
    }, [formValue])

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length < 3) {
            setFormValue(val);
            setIsLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setIsLoading(true);
            setIsValid(false);
        }
    };

    const checkUserName = useCallback(
        debounce(async (username: string) => {
            if (username.length >= 3) {
                const ref = doc(firestore, `usernames/${username}`);
                const docSnap = await getDoc(ref);
                console.log("Firestore read executed!");
                setIsValid(!docSnap.exists());
                setIsLoading(false);
            }
        }, 500),
        []
    )

    return (
        <section>
            <h3>Choose Username</h3>
            <form onSubmit={onSubmit}>
                <input name="username" placeholder='username' value={formValue} onChange={onChange} />

                <button type="submit" className="btn-green" disabled={!isValid}>
                    Choose
                </button>

                <UsernameMessage username={formValue} isValid={isValid} loading={isLoading}/>
            </form>
        </section>
    )
}

const UsernameMessage:FC<{username:string, isValid: boolean, loading: boolean}> = ({ username, isValid, loading }) => {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }