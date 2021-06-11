interface ExecuteResponse {
  message: string;
}

class UserRecoverPasswordService {
  execute(): ExecuteResponse {
    return {
      message: 'recover service',
    };
  }
}

export default UserRecoverPasswordService;
