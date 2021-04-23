import { User } from "./user";

export interface RequestMessage {
    userId: number;
    requestId: number;
    message: string;
    createdAt: Date;
    user: User;
}