export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dbo: string;
    password: string;
    joinedIn: Date;
    profileImage: string | undefined;
    deletedAt: Date;
}
