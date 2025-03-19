import { Liveblocks } from "@liveblocks/node";

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_zVFEN9e2NWRuAFr3ZgzE1QJWQPKB6hs61KHcgqgVKnI492pTg3aD9n2GtBxbalqE",
});

export const POST = async (request: Request) => {
  const authorization = await auth();
  const user = await currentUser();

  //if we receive an external request we refuse it
  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  //check if the user is not from the current organization to refuse it
  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized");
  }

  //send the user information to the client side
  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl!,
  };

  //create a new session for the user
  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  //allow the user to access the room
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  // to return the response to the client
  const { status, body } = await session.authorize();
  return new Response(body, { status });
};
