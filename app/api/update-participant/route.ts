import { RoomServiceClient } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { roomId, identity, canPublish } = await req.json();

  const service = new RoomServiceClient(
    process.env.NEXT_PUBLIC_LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
  );

  try {
    const res = await service.getParticipant(roomId, identity);
    const sid = res.tracks.find((track) => track.name === "audio")?.sid;
    //@ts-ignore
    // await service.mutePublishedTrack(roomId, identity, sid, true);
    await service.updateParticipant(roomId, identity, undefined, {
      canPublish,
      canSubscribe: true,
      canPublishData: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating participant:", error);
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update participant" },
      { status: 500 }
    );
  }
}
