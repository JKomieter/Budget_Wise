"use client";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link';
import AccountCard from './AccountCard';


export default function Connect() {
    const [linkToken, setLinkToken] = useState<string>("");
    const [publicToken, setPublicToken] = useState<string>(""); 
    
    useEffect(() => {
        const test = async () => {
            const URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
            const res = await axios.post(`${URL}/create_link_token`);
            setLinkToken(res.data.link_token)
        };

        test();
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token);
            console.log("sucess", public_token, metadata);
        },
    });

    return (
        <div 
            style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/4386379/pexels-photo-4386379.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            className="w-screen h-screen flex justify-center items-center">
            <AccountCard open={open} ready={ready} publicToken={publicToken} />
        </div>
    )
}
