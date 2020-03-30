// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ObjectId } from '@types/mongodb'
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
