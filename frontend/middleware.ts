import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CheckAuthState } from './libs/CheckAuthState'


export async function middleware(request: NextRequest) {
    // const res = await CheckAuthState();
    // if (!res) {
    //     // return NextResponse.rewrite(new URL('/', request.url))
    // }
    return NextResponse.next();
}

