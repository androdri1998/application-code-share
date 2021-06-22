import messages from '../../app/intl/messages/en-US';

interface ExecuteResponse {
  message: string;
}

class GenerateUserLoginCodeService {
  execute(): ExecuteResponse {
    return { message: messages.responses.GENERATE_USER_LOGIN_CODE };
  }
}

export default GenerateUserLoginCodeService;
