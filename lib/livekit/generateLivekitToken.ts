import { AccessToken } from "livekit-server-sdk";

export async function generateLiveKitToken({
  userId,
  userName,
  roomName,
}: {
  userId: string;
  userName: string;
  roomName: string;
}) {
  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;

  const token = new AccessToken(apiKey, apiSecret, {
    identity: userId,
    name: userName,
  });

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  const jwt = await token.toJwt();

  return jwt;
}
