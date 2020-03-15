import { ObjectId } from 'mongodb'

declare global {
    namespace Express {
      export interface User {
        displayName: string;
        login: string;
        provider: string;
        _id: ObjectId
    }
    export interface Request {
      user?: User | undefined
    }
  }
}
