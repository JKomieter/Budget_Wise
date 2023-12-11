import { Dispatch, SetStateAction } from "react";

export interface UserContextProps {
    username: String, 
    email: String, 
    userId: String,
    setUsername: Dispatch<SetStateAction<string>>,
    setEmail: Dispatch<SetStateAction<string>>,
    setUserId: Dispatch<SetStateAction<string>>
}

export interface AccountInfo {
    availble: number,  
    currency: string,
    accountType: string,
    accountName: string,
}