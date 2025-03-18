import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

//schema of database
export default defineSchema({
  //schema of boards table
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  }) //an index that points to the orgId
    .index("byOrg", ["orgId"])
    //to search by title in a specific organization
    .searchIndex("search_by_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),
  //schema of userFavorites table
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards"),
  }) //an index that points to the boards IDs
    .index("byBoard", ["boardId"])
    //an index that points to the user organizations
    .index("byUserOrg", ["userId", "orgId"])
    //an index that points to the user IDs
    .index("byUser", ["userId"])
    //an index that points to the user organizations boards
    .index("byUserOrgBoard", ["userId", "orgId", "boardId"])
    //an index that points to the user boards
    .index("byUserBoard", ["userId", "boardId"]),
});
