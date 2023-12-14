import React, { use, useCallback, useContext, useState } from 'react'
import AccountDetails from './AccountDetails'
import axios from 'axios';
import { TransactionInfo } from '@/types';
import TransactionDetails from './TransactionDetails';
import { UserContext } from '@/provider/userProvider';

function AccountCard({
  open,
  ready,
  publicToken,
}: {
  open: Function,
  ready: boolean,
  publicToken: string
}) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [transaction, setTransaction] = useState<TransactionInfo>({} as TransactionInfo);
  const { userId } = useContext(UserContext);
  
  const getTransactions = useCallback(async () => {
    if (accessToken.length === 0) return;
    try {
      const URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
      const res = await axios.post(`${URL}/get_transactions`, { access_token: accessToken, userId });
      const data = await res.data.transaction as TransactionInfo;
      setTransaction(data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken]);


  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
      }}
      className='lg:w-[550px] md:w-[500px] sm:w-[400px] w-[360px] h-[70%] rounded-lg border-white border-2 flex justify-center items-center flex-col gap-8'>
      <div className="flex flex-row gap-4 w-full justify-center items-center px-3">
        <button
          onClick={() => open()}
          disabled={!ready}
          className='bg-green-800 w-full text-white rounded-lg px-5 py-3 border-2 border-white hover:bg-green-600 hover:border-green-600 hover:text-white'
        >
          Connect your bank account
        </button>
        <button 
          className='bg-green-800 w-full text-white rounded-lg px-5 py-3 border-2 border-white hover:bg-green-600 hover:border-green-600 hover:text-white'
        onClick={() => getTransactions()}>
          Get latest transaction
        </button>
      </div>
      <AccountDetails setAccessToken={setAccessToken} publicToken={publicToken} />
      <TransactionDetails transaction={transaction} />
    </div>
  )
}

export default AccountCard