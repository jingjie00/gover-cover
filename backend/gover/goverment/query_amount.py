# Copyright © Aptos Foundation
# SPDX-License-Identifier: Apache-2.0

import asyncio

from aptos_sdk.account import Account, AccountAddress
from aptos_sdk.async_client import FaucetClient, IndexerClient, RestClient

from common import FAUCET_URL, INDEXER_URL, NODE_URL


async def main():
    # :!:>section_1
    rest_client = RestClient(NODE_URL)
    faucet_client = FaucetClient(FAUCET_URL, rest_client)  # <:!:section_1
    if INDEXER_URL and INDEXER_URL != "none":
        indexer_client = IndexerClient(INDEXER_URL)
    else:
        indexer_client = None

    # :!:>section_2
    goverment = AccountAddress.from_str("0x1072b9f07c7fe4a71b14f79a65024a13565070b62111bfc0d5412cddf56385b9")
    bank = AccountAddress.from_str("0xb1a9e5b77615658a7dd54fcfd509f698833e95ba86c20554bcacf8e6f4069cb2")

  
    goverment_balance = rest_client.account_balance(goverment)
    bank_balance = rest_client.account_balance(bank)
    [goverment_balance, bank_balance] = await asyncio.gather(*[goverment_balance, bank_balance])
    print(f"goverment: {goverment_balance}")
    print(f"bank: {bank_balance}")  # <:!:section_4

    if indexer_client:
        query = """
            query TransactionsQuery($account: String) {
              account_transactions(
                limit: 20
                where: {account_address: {_eq: $account}}
              ) {
                transaction_version
                coin_activities {
                  amount
                  activity_type
                  coin_type
                  entry_function_id_str
                  owner_address
                  transaction_timestamp
                }
              }
            }
        """

        variables = {"account": f"{bank}"}
        data = await indexer_client.query(query, variables)
        assert len(data["data"]["account_transactions"]) > 0

    await rest_client.close()


if __name__ == "__main__":
    asyncio.run(main())
