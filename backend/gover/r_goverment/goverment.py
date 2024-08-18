# Copyright © Aptos Foundation
# SPDX-License-Identifier: Apache-2.0

import asyncio

from aptos_sdk.account import Account
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
    goverment = Account.load_key("0x998adc8b753d91dff7df63674e1edf1046fd5a13f1c0e044770cd55cd8672533")
    bank = Account.generate() # 0xb162321c068a04905466a2cfa450e3dfd27e3dd68d7bb2ed90255a3a59e3d291

    print("\n=== Addresses ===")
    print(f"Goverment: {goverment.address()}")
    print(f"Bank {bank.address()}")
    print("\n=== Private Keys ===")
    print(f"Goverment: {goverment.private_key}")
    print(f"Bank: {bank.private_key}")
    print("\n=== Public Keys ===")
    print(f"Goverment: {goverment.public_key()}")
    print(f"Bank: {bank.public_key()}")

    # :!:>section_3
    goverment_fund = faucet_client.fund_account(goverment.address(), 100_000_000)
    bank_fund = faucet_client.fund_account(bank.address(), 0)  # <:!:section_3
    await asyncio.gather(*[goverment_fund, bank_fund])

    print("\n=== Initial Balances ===")
    # :!:>section_4
    goverment_balance = rest_client.account_balance(goverment.address())
    bank_balance = rest_client.account_balance(bank.address())
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

        variables = {"account": f"{bank.address()}"}
        data = await indexer_client.query(query, variables)
        assert len(data["data"]["account_transactions"]) > 0

    await rest_client.close()


if __name__ == "__main__":
    asyncio.run(main())
