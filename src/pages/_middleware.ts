import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.cookies["userCookie"]) return;
    const random = Math.random().toString();
    const res = NextResponse.next()
    res.cookie("userCookie", random, { sameSite: "strict" })
    return res
}