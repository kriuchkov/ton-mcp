
export type Transaction = {
    address: bigint;
    lt: bigint;
    prevTransactionHash: bigint;
    prevTransactionLt: bigint;
    outMessagesCount: number;
};