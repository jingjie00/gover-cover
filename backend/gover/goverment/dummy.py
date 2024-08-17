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
    Dummy = Account.generate()
    print("\n=== Addresses ===")
    print(f"Dummy: {Dummy.address()}")
    print("\n=== Private Keys ===")
    print(f"Dummy: {Dummy.private_key}")
    print("\n=== Public Keys ===")
    print(f"Dummy: {Dummy.public_key()}")

    # :!:>section_3
    Dummy_fund = faucet_client.fund_account(Dummy.address(), 100_000_000)
    await asyncio.gather(*[Dummy_fund])

    print("\n=== Initial Balances ===")
    # :!:>section_4
    Dummy_balance = rest_client.account_balance(Dummy.address())
    [Dummy_balance] = await asyncio.gather(*[Dummy_balance])
    print(f"Dummy: {Dummy_balance}")

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

        variables = {"account": f"{Dummy.address()}"}
        data = await indexer_client.query(query, variables)
        assert len(data["data"]["account_transactions"]) > 0

    await rest_client.close()


if __name__ == "__main__":
    asyncio.run(main())

# === Addresses ===
# Dummy: 0x6e5863853682df072526382b4e71883ef05ae93f29c9d5b7a16fa558853b7650

# === Private Keys ===
# Dummy: 0x9148e996aa7689b5a982a6b9e1e5161ace30ec1c67d413be3fcdad8109f33380

# === Public Keys ===
# Dummy: 0x9c29eafc81357ba5e9b26d3a416d354c3ddfab110702adbc49984cf4360cd5da

# aptos move compile --named-addresses featurehello=0x6e5863853682df072526382b4e71883ef05ae93f29c9d5b7a16fa558853b7650
# aptos move create-object-and-publish-package --address-name featurehello --named-addresses featurehello=0x6e5863853682df072526382b4e71883ef05ae93f29c9d5b7a16fa558853b7650