import { User } from "firebase/auth";

export default interface UserBlog extends User {
    username?:string;
}