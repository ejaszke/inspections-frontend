import { Token } from '../features/user/model/token';
import { Credentials } from '../features/user/model/credentials';
import { post } from './base';

export const UserApi = {
	loginUser: (credentials: Credentials) =>
		post<Token>('/api/login', credentials),
};
