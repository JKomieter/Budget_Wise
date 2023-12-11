import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserContext } from '@/provider/userProvider';
import { AccountInfo } from '@/types';
import { useInView } from 'react-intersection-observer';

function AccountDetails({
    publicToken,
}: {
    publicToken: string
}) {
    const { userId } = useContext(UserContext);
    const [account, setAccount] = useState<AccountInfo>({} as AccountInfo);
    const [ref, inView, entry] = useInView();

    useEffect(() => {
        const URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
        const test = async () => {
            if (publicToken.length === 0) return;
            const accessToken = await axios.post(`${URL}/exchange_public_token`, { public_token: publicToken, user_id: userId });
            console.log("accessToken" , accessToken.data);
            const auth = await axios.post(`${URL}/auth`, { access_token: accessToken.data.access_token, userId });
            const data = await auth.data;
            console.log("auth", data);
            setAccount(data);
        }

        test()
    }, [publicToken]);

    if (Object.keys(account).length === 0) return false;

    return (
        <div ref={ref} className={`w-full flex flex-col gap-3 px-14 font-semibold ${inView ? ' opacity-100' : 'translate-x-20 opacity-0'} duration-500`}>
                <span className=''>
                    Account Name: {account.accountName}
                </span>
                <span className=''>
                    Account Number: {account.accountType}
                </span>
                <span className=''>
                    Availble: {account.availble}
                </span>
                <span className=''>
                    Currency: {account.currency}
                </span>
        </div>
    )
}

export default AccountDetails