const messages = {
  responses: {
    GENERATE_USER_LOGIN_CODE: 'Successful user login code generated',
    CHECK_USER_LOGIN_CODE: 'Successful user login code checked',
    USER_DELETED_WITH_SUCCESS: 'User deleted with success',
    BOUGHT_CODE_DELETED_WITH_SUCCESS: 'Bought code deleted with success',
    CODE_DELETED_WITH_SUCCESS: 'Code deleted with success',
    CODE_INVALIDATE_SUCCESSFUL: 'Code invalidate successful',
  },
  errors: {
    INTERNAL_ERROR_SERVER: 'Internal Error Server',
    INTERNAL_ERROR_SERVER_MESSAGE: 'Something is wrong!',
    SCOPE_NOT_FOUND: 'Scope not found!',
    USER_NOT_FOUND: 'User not found',
    BUYER_NOT_FOUND: 'Buyer not found',
    SELLER_NOT_FOUND: 'Seller not found',
    BUYER_AND_SELLER_ARE_THE_SAME: 'Buyer and seller are the same',
    USER_ALREADY_EXISTS: 'User already exists',
    CODE_IS_NOT_VALID: 'Code is not valid',
    CODE_NOT_FOUND: 'Code not found',
    BOUGHT_CODE_NOT_FOUND: 'Bought code not found',
    CODE_CANNOT_BE_UPDATED_BY_CURRENT_USER:
      'Code cannot be updated by current user',
    USER_CANNOT_DO_THIS_ACTION: 'User cannot do this action',
  },
  keys: {
    logs: {
      ESSENTIALS: 'app:essentials',
      ERROR: 'app:essentials:error',
    },
  },
  logs: {
    INITIAL_LOG: '🚀️ Server started on port 3333!',
  },
};

export default messages;
