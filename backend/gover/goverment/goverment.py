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
    goverment = Account.generate() # 0x1072b9f07c7fe4a71b14f79a65024a13565070b62111bfc0d5412cddf56385b9
    bank = Account.generate() # 0x13603d7d17670d171eb8b03c1057f17ad1b2d0d8032ad8777dbc90f019f49028

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

# === Addresses ===
# Goverment: 0x762870eccdfad66e6a2121fde8488bb9d5a65e34edef5fadf829db2bd9168bfe
# Bank 0xb1a9e5b77615658a7dd54fcfd509f698833e95ba86c20554bcacf8e6f4069cb2

# === Private Keys ===
# Goverment: 0x998adc8b753d91dff7df63674e1edf1046fd5a13f1c0e044770cd55cd8672533
# Bank: 0x2f4d2a55ea18cb698c7188b1041aaf617c73779569a4f768c9e60550929663d8

# === Public Keys ===
# Goverment: 0x955f9e66f98a6893fa45c6710f97e14fd495801568fd2885752e2bc86923aa76
# Bank: 0x1e06cc54a3ce856d59f2bc9a538a89e9a414a79f0f9507b7e6833be2d3d8e445