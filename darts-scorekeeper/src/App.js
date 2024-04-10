import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { Darts301 } from './components/Darts301';


function App() {
  return (
    <div>
      < Header />
      <div className="container">
        <Darts301/>
      </div>
    </div>
  );
}

export default App;