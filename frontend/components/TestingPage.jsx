import React, { useState } from 'react';
import { Button, Card, Typography, notification } from 'antd';
import { AptosClient, AptosAccount, FaucetClient, Types } from "aptos";

const { Title } = Typography;

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const COIN_STORE_RESOURCE = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";

const TestingPage = () => {
  const [initialBalances, setInitialBalances] = useState({ government: 0, bank: 0 });
  const [finalBalances, setFinalBalances] = useState({ government: 0, bank: 0 });
  const [transactionHash, setTransactionHash] = useState(null);
  const [loading, setLoading] = useState(false);

  const amount = 1070; // Amount to transfer

  const governmentPrivateKey = "b3d4a9e6c947728ab4ed1258c6a9f1a2a2c7816c1fe64dbad89e9f9cdb45b5a1"; // Replace with your own 32-byte hex seed
  const bankAddress = "0xb1a9e5b77615658a7dd54fcfd509f698833e95ba86c20554bcacf8e6f4069cb2";

  const getAccountBalance = async (client, address) => {
    try {
      const resources = await client.getAccountResources(address);
      const accountResource = resources.find((r) => r.type === COIN_STORE_RESOURCE);
      return accountResource?.data?.coin?.value || 0;
    } catch (error) {
      console.error("Failed to fetch account balance:", error);
      return 0;
    }
  };

  const handleTransaction = async () => {
    setLoading(true);
    try {
      // Initialize clients
      const aptosClient = new AptosClient(NODE_URL);
      const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

      // Load government account with the private key
      const government = new AptosAccount(Buffer.from(governmentPrivateKey, "hex"));

      // Fund the government account if needed
      await faucetClient.fundAccount(government.address(), 100_000_000); // Fund with 100 APT

      // Get initial balances
      const initialGovernmentBalance = await getAccountBalance(aptosClient, government.address());
      const initialBankBalance = await getAccountBalance(aptosClient, bankAddress);
      setInitialBalances({ government: initialGovernmentBalance, bank: initialBankBalance });

      // Prepare transaction payload for transferring coins
      const payload = {
        type: "entry_function_payload",
        function: "0x1::aptos_account::transfer",
        type_arguments: [],
        arguments: [
          bankAddress, // Recipient address
          amount // Amount to transfer in Octas (1 APT = 10^8 Octas)
        ],
      };

      // Generate, sign, and submit the transaction
      const txnRequest = await aptosClient.generateTransaction(government.address(), payload);
      const signedTxn = await aptosClient.signTransaction(government, txnRequest);
      const transactionResponse = await aptosClient.submitTransaction(signedTxn);
      await aptosClient.waitForTransaction(transactionResponse.hash);

      setTransactionHash(transactionResponse.hash);

      // Get final balances
      const finalGovernmentBalance = await getAccountBalance(aptosClient, government.address());
      const finalBankBalance = await getAccountBalance(aptosClient, bankAddress);
      setFinalBalances({ government: finalGovernmentBalance, bank: finalBankBalance });

      // Query transaction details using `getTransactions`
      const transactions = await aptosClient.getAccountTransactions(bankAddress);
      console.log("Transaction Data:", transactions);

      notification.success({
        message: "Transaction Successful",
        description: `Transaction Hash: ${transactionResponse.hash}`,
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      notification.error({
        message: "Transaction Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title level={3}>Aptos Blockchain Transaction</Title>
      <Button type="primary" onClick={handleTransaction} loading={loading}>
        Execute Transaction
      </Button>

      {initialBalances.government !== 0 && (
        <div>
          <h4>Initial Balances:</h4>
          <p>Government: {initialBalances.government}</p>
          <p>Bank: {initialBalances.bank}</p>
        </div>
      )}

      {transactionHash && (
        <div>
          <h4>Transaction Hash:</h4>
          <p>{transactionHash}</p>
        </div>
      )}

      {finalBalances.government !== 0 && (
        <div>
          <h4>Final Balances:</h4>
          <p>Government: {finalBalances.government}</p>
          <p>Bank: {finalBalances.bank}</p>
        </div>
      )}
    </Card>
  );
};

export default TestingPage;