import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: any , { params }: any) {
  const endpoint = params.kindeAuth;
  return handleAuth(request, endpoint);
}
