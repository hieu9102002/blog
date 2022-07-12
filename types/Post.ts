import { Timestamp } from "firebase/firestore";

export default interface Post {
    content?: string;
    createdAt: number|Timestamp;
    heartCount: number;
    published: false;
    slug: string;
    title: string;
    uid: string;
    updatedAt?: number|Timestamp;
    username: string;
}