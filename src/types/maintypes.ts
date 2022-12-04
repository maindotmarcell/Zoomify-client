export interface IUser {
	email?: string;
	googeId?: string;
	githubId?: string;
	username: string;
	password: string;
	__v: number;
	_id: string;
}

export interface IUserContext {
	userObject: IUser;
	signedIn: boolean;
	setSignedIn(): void;
	refreshUser(): void;
}
