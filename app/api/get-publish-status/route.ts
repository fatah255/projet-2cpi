import { RoomServiceClient } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { roomId, identity } = await req.json();

  const service = new RoomServiceClient(
    process.env.NEXT_PUBLIC_LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
  );

  try {
    const participant = await service.getParticipant(roomId, identity);

    const canPublish = participant.permission?.canPublish;

    return NextResponse.json({ canPublish });
  } catch (error) {
    console.error("Error getting participant:", error);
    return NextResponse.json(
      { error: "Failed to get participant" },
      { status: 500 }
    );
  }
}
