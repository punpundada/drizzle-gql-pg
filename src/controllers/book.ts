import { GraphQLError } from "graphql";
import { ServerContext } from "../types/ServerContext";
import { BookInput } from "../types/bookTypes";
import { db } from "../server";
import { BookSchema } from "../db/book";
import { and, eq } from "drizzle-orm/sql/expressions/conditions";

/* QUERIES */
//?page=2

export const getBooks = async (_: unknown, __: unknown, { user }: ServerContext) => {
  try {
    if (!user) {
      throw new GraphQLError("Unauthorized User", {
        extensions: {
          code: "GRAPHQL_VALIDATION_FAILED",
          http: { status: 401 },
        },
      });
    }
    return await db.query.BookSchema.findMany({
      where: and(eq(BookSchema.author, user.id)),
    });
  } catch (e: any) {
    throw new GraphQLError(e.message, { originalError: e });
  }
};

/* MUTATATIONS */
export const addBooks = async (
  _: unknown,
  { books }: { books: BookInput[] },
  { user }: ServerContext
) => {
  if (!user) {
    throw new GraphQLError("User not Authorized");
  }
  try {
    books.forEach((x) => (x.author = user.id));
    return await db.insert(BookSchema).values(books).returning();
  } catch (e) {
    if (e instanceof Error) {
      throw new GraphQLError(e.message, { originalError: e });
    }
    throw new GraphQLError("Something went wrong");
  }
};
