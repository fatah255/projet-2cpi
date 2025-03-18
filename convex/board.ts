import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
  "/placeholders/11.svg",
  "/placeholders/12.svg",
];

//an api endpoint to create a new board
export const create = mutation({
  //arguments that should be passed to create a board
  args: {
    title: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    //get the identity of the user for the board
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    //randomly select an image for the board
    const randomImage = images[Math.floor(Math.random() * images.length)];
    //insert the board into the database (in the boards table)
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject!,
      authorName: identity.name!,
      imageUrl: randomImage,
    });
    return board;
  },
});

//an api endpoint to remove the board
export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    //remove the board from the database
    await ctx.db.delete(args.id);
  },
});

//an api endpoint to update the board
export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    //validate the title
    const title = args.title.trim();
    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length > 60) {
      throw new Error("Title is too long");
    }

    //update the board in the database
    await ctx.db.patch(args.id, {
      title,
    });
  },
});

//an api endpoint to favorite the board
export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;
    //check if the board is already favorited if exist we return it
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("byUserOrgBoard", (q) =>
        q.eq("userId", userId).eq("orgId", args.orgId).eq("boardId", board._id)
      )
      .unique();

    //if the board is already favorite
    if (existingFavorite) {
      throw new Error("Board already favorited");
    }

    //insert the favorite board into the database (in the userFavorites table)
    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

//an api endpoint to unfavorite the board
export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;
    //check if the board is favorite if exist we return it
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("byUserBoard", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    //if the board is not favorite
    if (!existingFavorite) {
      throw new Error("Board is not favorited");
    }

    //delete the favorite board from the database (from the userFavorites table)
    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
