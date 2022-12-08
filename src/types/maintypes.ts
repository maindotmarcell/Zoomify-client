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
	loadingUser: boolean;
	setSignedIn(): void;
	refreshUser(): void;
}

export interface IEditFieldProps {
	onSubmit: (nextValue: string) => void;
}

export interface IChangePWModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}
