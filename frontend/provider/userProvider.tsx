"use client"
import { UserContextProps } from '@/types';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {

    if (username.length === 0) return router.push("/");
  }, [username]);

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