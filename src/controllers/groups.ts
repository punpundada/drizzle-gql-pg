import { groupSchema, userToGroupSchema } from "../db/group";
import { userSchema } from "../db/user";
import { db } from "../server";
import { GroupInput } from "../types/groupTypes";

export const addGroups = async (
  _: unknown,
  { groups }: { groups: GroupInput[] },
  __: unknown
) => {
  return await db.insert(groupSchema).values(groups).returning();
};

export const getGroups = async () => {
  return await db.select().from(groupSchema);
};

export const addUsersToGroup = async (data:any,{input:{groupId,userIds}}:{input:{ userIds: number[], groupId: number }}) => {
  try {
    const list = userIds.map(x=>({userId:x,groupId}))
     await db.insert(userToGroupSchema).values(list)
    return 1
  } catch (e) {
    console.log(e)
    return 0
  }
}


