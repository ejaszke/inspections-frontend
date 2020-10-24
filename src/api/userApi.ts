import { Token } from '../features/user/model/token';
import { Credentials } from '../features/user/model/credentials';
import { post } from './base';

export const UserApi = {
	loginUser: (credentials: Credentials) => {
		const body = new FormData();
		body.append('username', credentials.username);
		body.append('password', credentials.password);
		return post<Token>('/oauth/token', body)
	},
};
