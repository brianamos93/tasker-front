import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import url from '@/app/utils/utils'

const secretKey = "secret"; //change
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user
  const res = await fetch(`${url}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: formData.get("username"), password: formData.get("password") })
  })
  if (res.status == 200) {
    const body = await res.json()
    const token = body.token
    const expires = new Date(Date.now() + 60 * 60 * 1000)
    const session = await encrypt({ token, expires });
    (await
      // Save the session in a cookie
      cookies()).set("session", session, { expires, httpOnly: true });
  } else {
    return JSON.stringify({"Message": "Error"})
  }

  }

export async function logout() {
  // Destroy the session
  (await
    // Destroy the session
    cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function signup(formData:FormData) {
  const res = await fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: formData.get("username"), email: formData.get("email"), password: formData.get("password")})
  })
  return res.json()
}