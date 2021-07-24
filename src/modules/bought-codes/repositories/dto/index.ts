/* eslint-disable camelcase */
export interface CreateBoughtCodeDTO {
  buyer: string;
  seller: string;
  codeId: string;
  code: string;
  unavailableAt: string | null;
}

export interface BoughtCode {
  id: string;
  buyer: string;
  seller: string;
  code_id: string;
  code: string;
  unavailable_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface RemoveBoughtCodeDTO {
  boughtCodeId: string;
}

export interface FindBoughtCodeByIdDTO {
  boughtCodeId: string;
}

export interface FindBoughtCodesByBuyerIdDTO {
  buyerId: string;
  limit: number;
  offset: number;
}
export interface FindBoughtCodesBySelletIdDTO {
  sellerId: string;
  limit: number;
  offset: number;
}
