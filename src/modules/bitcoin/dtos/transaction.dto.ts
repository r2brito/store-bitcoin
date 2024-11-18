import { TransactionType } from "../enum/TransactionType";

export default interface ITransactionDTO {
  account: string;
  amount: number;
  type: TransactionType
}
