import { addBooks, getBooks } from "./controllers/book";
import { addGroups, addUsersToGroup, getGroups } from "./controllers/groups";
import { registerUser, userLogin } from "./controllers/user";

export const resolvers = {
  Query: {
    getBooks,
    getGroups,
  },
  Mutation: {
    registerUser,
    userLogin,
    addBooks,
    addGroups,
    addUsersToGroup,
  },
};
