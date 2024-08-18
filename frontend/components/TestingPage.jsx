import React, { useState } from 'react';
import {
  Button, Card, Typography, notification,
} from 'antd';
import {
  AptosClient, AptosAccount, FaucetClient, Types,
} from 'aptos';

const { Title } = Typography;



const COIN_STORE_RESOURCE = '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>';

function TestingPage() {
  const [initialBalances, setInitialBalances] = useState({ government: 0, bank: 0 });
  const [finalBalances, setFinalBalances] = useState({ government: 0, bank: 0 });
  const [transactionHash, setTransactionHash] = useState(null);
  const [loading, setLoading] = useState(false);







  return (
    <Card>
      <Title level={3}>Aptos Blockchain Transaction</Title>
      <Button type='primary' onClick={handleTransaction} loading={loading}>
        Execute Transaction
      </Button>

      {initialBalances.government !== 0 && (
        <div>
          <h4>Initial Balances:</h4>
          <p>
            Government:
            {initialBalances.government}
          </p>
          <p>
            Bank:
            {initialBalances.bank}
          </p>
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
          <p>
            Government:
            {finalBalances.government}
          </p>
          <p>
            Bank:
            {finalBalances.bank}
          </p>
        </div>
      )}
    </Card>
  );
}

export default TestingPage;
