import {
  CreateBoughtCodeDTO,
  BoughtCode,
  RemoveBoughtCodeDTO,
  FindBoughtCodeByIdDTO,
  FindBoughtCodesByBuyerIdDTO,
  FindBoughtCodesBySelletIdDTO,
} from './dto';

export default interface ICodesRepository {
  createBoughtCode({
    buyer,
    codeId,
    unavailableAt,
    code,
    seller,
  }: CreateBoughtCodeDTO): Promise<BoughtCode>;
  removeBoughtCode({ boughtCodeId }: RemoveBoughtCodeDTO): Promise<boolean>;
  findBoughtCodeById({
    boughtCodeId,
  }: FindBoughtCodeByIdDTO): Promise<BoughtCode | null>;
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
