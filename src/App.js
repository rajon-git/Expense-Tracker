import React from 'react';
import Layout from './components/Layout';
import Form from './components/Form';
import Transactions from './components/Transactions/Transactions';
import Balance from './components/Balance';

function App() {
  return (
    <Layout>
      <Balance/>
      <Form/>
      <Transactions/>
    </Layout>
  );
}

export default App;
