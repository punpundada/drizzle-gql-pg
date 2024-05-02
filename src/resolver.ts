import { addBooks, getBooks } from "./controllers/book";
import { registerUser, userLogin } from "./controllers/user";

export const resolvers = {
  Query: {
    getBooks,
  },
  Mutation: {
    registerUser,
    userLogin,
    addBooks
  },
};
