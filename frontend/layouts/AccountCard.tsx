import React from 'react'
import AccountDetails from './AccountDetails'

function AccountCard({
    open,
    ready,
    publicToken
}: {
    open: Function,
    ready: boolean,
    publicToken: string
}) {
  return (
    <div 
          style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)'
          }}
        className='lg:w-[550px] md:w-[500px] sm:w-[400px] w-[360px] h-[70%] rounded-lg border-white border-2 flex justify-center items-center flex-col gap-8'>
        <button
            onClick={() => open()}
            disabled={!ready}
        className='bg-green-800 text-white rounded-lg px-5 py-3 border-2 border-white hover:bg-green-600 hover:border-green-600 hover:text-white'
        >
              Connect your bank account
        </button>
        <AccountDetails publicToken={publicToken} />
    </div>
  )
}

export default AccountCard