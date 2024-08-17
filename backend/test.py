
# import argparse
import asyncio

# from aptos_sdk.account_address import AccountAddress
# from aptos_sdk.async_client import RestClient


# async def main():
#     node_api_url = "https://api.testnet.aptoslabs.com/v1"
#     api_key = "aptoslabs_JjDDwzUoHj2_7r6B5AYi5qiVsbLYFcvXAeyxA3JAp69YE"

#     node_api_client = RestClient(node_api_url)
#     node_api_client.client.headers["Authorization"] = f"Bearer {api_key}"

#     response = await node_api_client.account(AccountAddress.from_str("0x1"))

#     print(response)


# asyncio.run(main())

from .common import FAUCET_URL, NODE_URL, INDEXER_URL

async def main():
    print(FAUCET_URL, NODE_URL, INDEXER_URL)

asyncio.run(main())