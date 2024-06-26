import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import db from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { like, or } from "drizzle-orm";
const secret = process.env.NEXTAUTH_SECRET || "secret";


export async function GET(request: NextRequest, response: NextResponse) {

  try {
    const token = request.cookies.get("token-auth")
    const keywords = request.nextUrl.searchParams.get("keywords")

    if (!token) {
      return redirect("/auth/error")
    }

    const verify = jwt.verify(token.value, secret) as { email: string, id: string }

    if (!verify?.id) {
      return Response.json({
        code: 0,
        message: "Invalid token",
        status_code: 404,
        data: {}
      }, { status: 404 })
    }

    const results = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      name: users.name,
      profilePicture: users.profilePicture,
      bio: users.bio,
      isVerified: users.isVerified,
      isPrivate: users.isPrivate,
    }).from(users).where(
      or(
        like(users.username, `%${keywords}%`),
        like(users.name, `%${keywords}%`)
      )
    )
      .limit(20)

    return Response.json({
      code: 0,
      message: "Data fetched successfully",
      status_code: 200,
      data: results
    }, { status: 200 })
  } catch (error) {
    return Response.json({
      code: 0,
      message: "Internal server error",
      status_code: 500,
      data: {}
    }, { status: 500 })
  }
}