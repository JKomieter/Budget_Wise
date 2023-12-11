"use client";
import { Red_Hat_Display } from 'next/font/google';
import SignUpForm from './SignUpForm';
import { useState } from 'react';
import LoginForm from './LoginForm';
import { PuffLoader } from 'react-spinners';

const red_hat_display = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

function RightContent() {
  const [state, setState] = useState<'signup' | 'login' | 'loading'>('signup')

  const states = {
    signup: <SignUpForm setState={setState} />,
    login: <LoginForm setState={setState} />,
    loading: <PuffLoader color='#7C3AED' size={100} loading />,
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-14'>
      <h2 className={`${red_hat_display.className} italic text-5xl font-bold text-purple-900`}>
        Budget Wise
      </h2>
      {states[state]}
    </div>
  )
}

export default RightContent