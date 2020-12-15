import { Token } from '../features/user/model/token';
import { Credentials } from '../features/user/model/credentials';
import { post } from './base';
import { ApiResources } from './apiResources';

export const UserApi = {
    loginUser: (credentials: Credentials) => post<Token>(ApiResources.login, credentials),
};
