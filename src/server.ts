import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { ApolloServer } from "@apollo/server";
import "dotenv/config";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";
import * as userSchema from "./db/user";
import * as bookSchema from "./db/book";
import * as groupSchema from "./db/group";
import { ServerContext } from "./types/ServerContext";
import { getUserFromToken } from "./controllers/user";
import express from "express";
import http from "http";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import "dotenv/config";

const app = express();
const httpServer = http.createServer(app);

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STR!,
});

export const db = drizzle(client, {
  schema: { ...userSchema, ...bookSchema, ...groupSchema },
  logger: true,
});

async function dbConnect() {
  await client.connect();
}
dbConnect();

const server = new ApolloServer<ServerContext>({
  typeDefs: typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const serve = async () => {
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["https://localhost", "https://studio.apollographql.com"],
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = getUserFromToken(token);
        return { user };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
};

serve();
