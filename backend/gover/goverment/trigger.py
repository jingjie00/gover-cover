import asyncio
from aptos_sdk.account import Account, AccountAddress
from aptos_sdk.transactions import TransactionPayload, EntryFunction, TransactionArgument, TypeTag
from aptos_sdk.bcs import Serializer
from aptos_sdk.account import Account
from aptos_sdk.async_client import FaucetClient, IndexerClient, RestClient

from common import FAUCET_URL, INDEXER_URL, NODE_URL



async def main():
    rest_client = RestClient(NODE_URL)
    faucet_client = FaucetClient(FAUCET_URL, rest_client)  # <:!:section_1
    if INDEXER_URL and INDEXER_URL != "none":
        indexer_client = IndexerClient(INDEXER_URL)
    else:
        indexer_client = None

    # :!:>section_2
    goverment = Account.load_key("0x998adc8b753d91dff7df63674e1edf1046fd5a13f1c0e044770cd55cd8672533")
    
    payload = {
        "type": "entry_function_payload",
        "function": "0x95f2511d231f2ef854467a101dd8d3aba8f6673407eb2fffec0da73ce5c8bd88::message::set_message",
        "type_arguments": [],  # No type arguments needed unless required by the function
        "arguments": ['{"Transfer to": "Jason","Malaysian Identity Card Hash": "bab2455a57524929c19827240dfec07f","Program": "Student Assistantship","Collab": "Apple Pencil Free Gift from Urban Republic"}'],  # Arguments passed to the function
    }


    # Submit the transaction
    txn_hash = await rest_client.submit_transaction(goverment, payload)
    

    print(f"Transaction hash: {txn_hash}")


if __name__ == "__main__":
    asyncio.run(main())

# aptos move run --function-id 'default::message::set_message' --args 'string:hello, blockchain'
