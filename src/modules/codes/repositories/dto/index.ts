/* eslint-disable camelcase */
export interface CreateCodeDTO {
  userId: string;
  code: string;
  unavailableAt?: string;
}

export interface Code {
  id: string;
  user_id: string;
  code: string;
  is_valid: boolean;
  unavailable_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface FindCodesByUserIdDTO {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface FindCodeByIdDTO {
  codeId: string;
}

export interface UpdateCodeByIdDTO {
  codeId: string;
  code: string;
}

export interface UpdateAvailableAtByIdDTO {
  codeId: string;
  unavailableAt: string;
}

export interface UpdateIsValidByIdDTO {
  codeId: string;
  isValid: boolean;
}

export interface FindCodesDTO {
  limit?: number;
  offset?: number;
}
