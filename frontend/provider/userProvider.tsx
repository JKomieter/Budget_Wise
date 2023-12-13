"use client"
import { UserContextProps } from '@/types';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
        const res = await axios.get(`${URL}/check_auth_state`);
        const data = await res.data;
  
        if (!data.isAuthenticated) return router.push("/");
      } catch (error) {
        console.log(error);
        return router.push("/");
      }
      
    };

    checkAuth();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{
        username,
        setUsername,
        email,
        setEmail,
        userId,
        setUserId,
      }}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserProvider;