import { sign } from 'jsonwebtoken';
import appConfig from '../../../config/app';

interface ExecuteResponse {
  token: string;
}

class UserAuthenticateLoginService {
  execute(): ExecuteResponse {
    const { secret, expiresIn } = appConfig.jwt;
    const token = sign({}, secret as string, {
      subject: 'user.id',
      expiresIn,
    });

    return { token };
  }
}

export default UserAuthenticateLoginService;
