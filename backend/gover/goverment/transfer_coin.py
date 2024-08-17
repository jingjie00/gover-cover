# Copyright © Aptos Foundation
# SPDX-License-Identifier: Apache-2.0

import asyncio

from aptos_sdk.account import Account
from aptos_sdk.async_client import FaucetClient, IndexerClient, RestClient

from common import FAUCET_URL, INDEXER_URL, NODE_URL

amount = 1_070

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
    bank_address = "0xb1a9e5b77615658a7dd54fcfd509f698833e95ba86c20554bcacf8e6f4069cb2"

    print("\n=== Addresses ===")
    print(f"goverment: {goverment.address()}")
    print(f"bank: {bank_address}")


    print("\n=== Initial Balances ===")
    goverment_balance = rest_client.account_balance(goverment.address())
    bank_balance = rest_client.account_balance(bank_address)
    [goverment_balance,bank_balance] = await asyncio.gather(*[goverment_balance,bank_balance])
    print(f"goverment: {goverment_balance}")
    print(f"bank: {bank_balance}")

    # Have goverment give bank 1_000 coins
    # :!:>section_5
    txn_hash = await rest_client.transfer(goverment, bank_address, amount)  # <:!:section_5
    # :!:>section_6
    await rest_client.wait_for_transaction(txn_hash)  # <:!:section_6

    print(txn_hash)

    print("\n=== Final Balances ===")
    goverment_balance = rest_client.account_balance(goverment.address())
    bank_balance = rest_client.account_balance(bank_address)
    [goverment_balance,bank_balance] = await asyncio.gather(*[goverment_balance,bank_balance])
    print(f"goverment: {goverment_balance}")
    print(f"bank: {bank_balance}")

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

        variables = {"account": f"{bank_address}"}
        data = await indexer_client.query(query, variables)
        assert len(data["data"]["account_transactions"]) > 0

    await rest_client.close()


if __name__ == "__main__":
    asyncio.run(main())
  #Alice: 0x6ca361b1f78f8546a3fc99f6d6485210add6955f8cdd7631ba856443eb992178
  #Bob: 0xca7d7efae4ee074b63b4460ff625ce0dfbc98cda3d5e38a85b4c3e875a05f4d0