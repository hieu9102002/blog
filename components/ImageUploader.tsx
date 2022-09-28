import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React, { FormEvent, useState } from 'react'
import { auth, storage } from '../lib/firebase';
import Loader from './Loader';

const ImageUploader = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState<string|null>(null);

    const uploadFile = async (e: FormEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;
        if (files != null) {
            const file = Array.from(files)[0];
            const extension = file?.type.split('/')[1];

            const reference = ref(storage, `uploads/${auth.currentUser!.uid}/{Date.now()}.${extension}`);
            setUploading(true);

            const task = uploadBytesResumable(reference, file)
            task.on('state_changed', 
                (snapshot) => {
                    const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(pct);
                },
                (error)=>{
                    console.log(error);
                },
                () => {
                    getDownloadURL(reference).then(downloadURL => {
                        setDownloadURL(downloadURL);
                        setUploading(false);
                    })
                })
        }
    }
    return (
        <div className='box'>
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {!uploading && (
                <>
                    <label className='btn'>
                        📸 Upload Image
                        <input type='file' accept='image/x-png,image/gif,image/jpeg' onChange={uploadFile} />
                    </label>
                </>
            )}

            {downloadURL && <code className='upload-snippet'>{`![alt](${downloadURL})`}</code>}
        </div>
    )
}

export default ImageUploader