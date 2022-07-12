import {createContext} from 'react';
import UserBlog from '../types/User'

interface UserContextInterface {
    user: UserBlog|null|undefined;
    username: string|null;
}

export const UserContext = createContext<UserContextInterface>({user:null, username:null});