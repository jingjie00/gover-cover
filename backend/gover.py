import argparse
import asyncio

from aptos_sdk.account_address import AccountAddress
from aptos_sdk.async_client import RestClient




async def main():

    node_api_client = RestClient("https://api.devnet.aptoslabs.com/v1")
    node_api_client.client.headers["Authorization"] = 'Bearer aptoslabs_geKtrJhg1eF_BVVQFFBxhVBjAML4ABtdyehGGzhR52wxv'

    response = await node_api_client.account(AccountAddress.from_str("0x1"))

    print(response)


if __name__ == "__main__":
    asyncio.run(main())