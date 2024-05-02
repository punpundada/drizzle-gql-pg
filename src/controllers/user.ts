import { GraphQLError } from "graphql";
import { userSchema } from "../db/user";
import { db } from "../server";
import { UserInput, UserLogin, loginSchema, userSelect } from "../types/user";
import { userZodSchema } from "../zodSchemas/userZodSchema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ApolloServerErrorCode } from '@apollo/server/errors';

const saltRound = 10;

export const registerUser = async (
  _: unknown,
  { User }: { User: UserInput }
): Promise<userSelect | undefined> => {
  try {
    User.email = User.email.toLowerCase();
    const parsedUser = userZodSchema.parse(User);
    parsedUser.password = await hash(parsedUser.password, saltRound);
    const savedUser = await db.insert(userSchema).values(parsedUser).returning();
    return savedUser[0];
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new GraphQLError(error.message, {
        originalError: error,
      });
    }
  }
};

export const userLogin = async (_: unknown, { User }: { User: UserLogin }) => {
  try {
    const parsedUser = loginSchema.parse(User);

    const foundUser = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, parsedUser.email),
    });

    if (!foundUser) {
      throw new Error(`Either email or password do not match`);
    }

    const isMatch = await compare(parsedUser.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          user: {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
          },
        },
        process.env.TOKEN_SECRET!,
        {
          expiresIn: "1m",
        }
      );
      return {
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        },
        token,
      };
    } else {
      throw new GraphQLError("Either email or password do not match");
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new GraphQLError(e.message, { originalError: e });
    }
  }
};

export const getUserFromToken = (token: string) => {
  try {
    token = token.split(" ")[1];
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log(data);
    return data?.user;
  } catch (e: any) {
    console.log(JSON.stringify(e));
    if(e.message === 'jwt expired' && e.name === "TokenExpiredError"){
      throw new GraphQLError("Session Expired", {
        extensions: {
          code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
          http: { status: 401 },
        },
      });
    }
    return undefined;
  }
};
