import AuthModel from './auth-model';
import { authLocal } from './passport'

class AuthServices {
		register ({ email, password, username }){
			if(!email) {
				throw	new	Error('Email is required');
			}else if (!password) {
				throw new Error('Password is requried');
			} else if (!username) {
				throw new Error('Username is required');
			}

			try {
				return AuthModel.create({ email, password, username });
			} catch (err) {
				if(global.isDev){
					throw new Error(err);
				}
				throw error;
			}
		}
		loginMiddleware(req, res , next){
			return authLocal(req, res, next);
		}
}

export default new AuthServices();