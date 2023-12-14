import React, { useCallback, useContext } from 'react';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Red_Hat_Display } from 'next/font/google';
import axios from 'axios';
import { UserContext } from '@/provider/userProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const red_hat_display = Red_Hat_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
});

function SignUpForm({
    setState,
}: {
    setState: React.Dispatch<React.SetStateAction<'signup' | 'login' | 'loading'>>
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { setEmail, setUsername, setUserId, } = useContext(UserContext);
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setState('loading');
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, data);
            const { email, username, userId } = res.data;
            setEmail(email);
            setUsername(username);
            setUserId(userId);
            setTimeout(() => {
                router.push(`/dashboard`);
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error("Failed to sign up");
            setState('signup');
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 md:px-14 px-6 w-full'>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="username" className={`font-bold ${red_hat_display.className}`}>Username</label>
                <input
                    type="name"
                    className='border-2 rounded-3xl border-gray-500 py-3 px-2'
                    {...register("username", { required: true })}
                />
                {errors.username && <span>This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="email" className={`font-bold ${red_hat_display.className}`}>Email</label>
                <input
                    type="email"
                    className='border-2 rounded-3xl border-gray-500 py-3 px-2'
                    {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="password" className={`font-bold ${red_hat_display.className}`}>Password</label>
                <input
                    type="password"
                    className='border-2 rounded-3xl border-gray-500 py-3 px-2'
                    {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
            </div>
            <div className="flex items-center mt-4 md:flex-row flex-col gap-4">
                <button type='submit' className={`${red_hat_display.className} px-7 py-3 rounded-3xl border-2 border-purple-900 text-purple-900 font-bold hover:bg-purple-900 hover:text-white duration-200 text-lg`}>
                    Sign up
                </button>
                <p>
                    Already have an account?
                    <span
                        className='cursor-pointer text-purple-900 font-bold hover:text-purple-700 duration-200'
                        onClick={() => setState('login')}
                    >
                        {' '}
                        Log in
                    </span>
                </p>
            </div>
        </form>
    )
}

export default SignUpForm;