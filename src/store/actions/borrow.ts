import { getBurrow } from "../../utils";
import { expandToken } from "../helper";
import { ChangeMethodsOracle } from "../../interfaces";
import { Transaction } from "../wallet";
import { getAccountDetailed } from "../accounts";
import { prepareAndExecuteTransactions, getMetadata } from "../tokens";

export async function borrow({
  tokenId,
  extraDecimals,
  amount,
}: {
  tokenId: string;
  extraDecimals: number;
  amount: number;
}) {
  const { oracleContract, logicContract, account } = await getBurrow();
  const { decimals } = (await getMetadata(tokenId))!;

  const accountDetailed = await getAccountDetailed(account.accountId);

  const borrowTemplate = {
    Execute: {
      actions: [
        {
          Borrow: {
            token_id: tokenId,
            amount: expandToken(amount, decimals + extraDecimals, 0),
          },
        },
        {
          Withdraw: {
            token_id: tokenId,
            max_amount: expandToken(amount, decimals + extraDecimals, 0),
          },
        },
      ],
    },
  };

  const asset_ids = accountDetailed
    ? [...accountDetailed.collateral, ...accountDetailed.borrowed]
        .map((c) => c.token_id)
        .filter((t, i, assetIds) => i === assetIds.indexOf(t))
        .filter((t) => t !== tokenId)
    : [];

  await prepareAndExecuteTransactions([
    {
      receiverId: oracleContract.contractId,
      functionCalls: [
        {
          methodName: ChangeMethodsOracle[ChangeMethodsOracle.oracle_call],
          args: {
            receiver_id: logicContract.contractId,
            asset_ids: [...asset_ids, tokenId],
            msg: JSON.stringify(borrowTemplate),
          },
        },
      ],
    } as Transaction,
  ]);
}