import { TransactionInfo } from '@/types'
import React from 'react'
import { useInView } from 'react-intersection-observer';

function TransactionDetails({
    transaction
}: {
    transaction: TransactionInfo
}) {

    const [ref, inView] = useInView();

    if (Object.keys(transaction).length === 0) return false;

    return (
        <div ref={ref} className={`w-full flex flex-col gap-2 px-14 font-semibold ${inView ? ' opacity-100' : '-translate-x-20 opacity-0'} duration-500`}>
            <h4 className='text-lg underline'>
                Latest Transaction
            </h4>
            <p>
                Amount: ${transaction.amount}
            </p>
            <p>
                Date: {transaction.date}
            </p>
            <p>
                Name: {transaction.name}
            </p>
        </div>
    )
}

export default TransactionDetails