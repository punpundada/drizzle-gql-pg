export const typeDefs = `#graphql

  # Filters and Sort types
  enum SortEnumType {
    asc
    desc
  }

  input IntFilter {
    equals: Int
    not: Int
    lt: Int
    lte: Int
    gt: Int
    gte: Int
  }

  input StringFilter {
    equals: String
    not: String
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
  }

  input BooleanFilter {
    equals: Boolean
    not: Boolean
  }
  
interface Res{
  isSuccess:Boolean!
  code:Int!
  resMsg:String!
}

type Book{
  id:Int!
  title: String!
  author: Int!
}

input BookInput{
  title:String!
}

type Groups{
  id:Int!
  name:String!
}
input GroupInput{
  name:String!
}

type UserSelect{
    id:Int!
    name:String!
    email:String!
  }
input UserLogin{
  email:String!
  password:String!
}

  input InputUserRegister{
    name:String!
    email:String!
    password:String!
  }


type Query {
  getBooks: [Book!]!
  getGroups:[Groups!]!
}

type UserLoginResponse{
  user:UserSelect!
  token:String!
}



input AddUsersToGroup{
  userIds:[Int!]!
  groupId:Int
}

type Mutation{
    registerUser(User:InputUserRegister!):UserSelect
    userLogin(User:UserLogin):UserLoginResponse!
    addBooks(books:[BookInput!]!):[Book!]!
    addGroups(groups:[GroupInput!]!):[Groups!]!
    addUsersToGroup(input:AddUsersToGroup):Int!
  }
`;