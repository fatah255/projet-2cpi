import { generateLiveKitToken } from "@/lib/livekit/generateLivekitToken";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/liveblocks.config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = await currentUser();
  const userId = searchParams.get("userId");

  const userName = searchParams.get("userName");
  const roomName = searchParams.get("roomName");

  if (!userId || !userName || !roomName) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const token = await generateLiveKitToken({ userId, userName, roomName });
  return NextResponse.json({ token });
}
