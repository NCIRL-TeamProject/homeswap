import { Home } from "./home";
import { User } from "./user";

export interface HomeSwapRequest {
    id: number;
    createdAt: Date;
    checkin: Date;
    checkout: Date;
    toHomeId: number;
    toUserId: number;
    fromHomeId: number;
    fromUserId: number;
    status: number;
    toUser: User;
    fromUser: User;
    toHome: Home;
    fromHOme: Home;
}