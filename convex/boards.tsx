import { v } from "convex/values";
import { query } from "./_generated/server";
export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const boards = ctx.db
      //to select the boards table
      .query("boards")
      //with help of the index that contain organizations we get the boards of that organization
      .withIndex("byOrg", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    return boards;
  },
});
