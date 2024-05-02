import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";
import * as userSchema from "./db/user";
import * as bookSchema from "./db/book";
import { ServerContext } from "./types/ServerContext";
import { getUserFromToken } from "./controllers/user";

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STR!,
});

async function dbConnect() {
  await client.connect();
}
dbConnect();

export const db = drizzle(client, {
  schema: { ...userSchema, ...bookSchema },
  logger: true,
});

const server = new ApolloServer<ServerContext>({ typeDefs: typeDefs, resolvers });

const serve = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      const token = req.headers.authorization || "";
      const user = getUserFromToken(token);
      return { user};
    },
  });
  console.log(`🚀 Server ready at ${url}`);
};

serve();
