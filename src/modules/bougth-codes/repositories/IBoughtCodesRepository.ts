import {
  CreateBoughtCodeDTO,
  BoughtCode,
  RemoveBoughtCodeDTO,
  FindBoughtCodeByIdDTO,
  FindBoughtCodesByBuyerIdDTO,
  FindBoughtCodesBySelletIdDTO,
} from './dto';

export default interface ICodesRepository {
  createCode({
    buyer,
    codeId,
    unavailableAt,
    code,
    seller,
  }: CreateBoughtCodeDTO): Promise<BoughtCode>;
  removeBoughtCode({ boughtCodeId }: RemoveBoughtCodeDTO): Promise<boolean>;
  findCodeById({ boughtCodeId }: FindBoughtCodeByIdDTO): Promise<BoughtCode>;
  findBoughtCodesByBuyerId({
    buyerId,
    limit,
    offset,
  }: FindBoughtCodesByBuyerIdDTO): Promise<BoughtCode[]>;
  findBoughtCodesBySelletId({
    sellerId,
    limit,
    offset,
  }: FindBoughtCodesBySelletIdDTO): Promise<BoughtCode[]>;
}
