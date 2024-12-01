import React, { useState } from 'react';
import calculator from './assets/calculator.svg';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [rate, setRate] = useState(0);
  const [type, setType] = useState('repayment');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const curRes = (value) => {
    return new Intl.NumberFormat('en-GB').format(value);
  };

  const calculateRepayments = () => {
    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const totalMonths = parseInt(term, 10) * 12;

    if (type === 'repayment') {
      const monthly =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalMonths));
      setMonthlyPayment(isNaN(monthly) ? 0 : monthly.toFixed(2));
      setTotalPayment(isNaN(monthly) ? 0 : (monthly * totalMonths).toFixed(2));
    } else {
      const monthly = principal * monthlyRate;
      setMonthlyPayment(isNaN(monthly) ? 0 : monthly.toFixed(2));
      setTotalPayment(isNaN(monthly) ? 0 : (monthly * totalMonths).toFixed(2));
    }
  };

  const resetForm = () => {
    const confirmClear = window.confirm('Rostdan ham o‘chirmoqchimisiz?');
    if (confirmClear) {
      setAmount(0);
      setTerm(0);
      setRate(0);
      setType('repayment');
      setMonthlyPayment(0);
      setTotalPayment(0);
    }
  };

  return (
    <div className="container shadow bg-white rounded flex items-center justify-center">
      <div className="form-section">
        <div className="header">
          <h1>Mortgage Calculator</h1>
          <button onClick={resetForm}>Clear All</button>
        </div>
        <div className="input-container">
          <label htmlFor="mortgage">Mortgage Amount</label>
          <div className="input-wrapper">
            <button>£</button>
            <input
              id="mortgage"
              type="number"
              value={amount}
              placeholder="Enter amount in £"
              onChange={(e) =>
                setAmount(Math.max(0, parseFloat(e.target.value) || 0))
              }
            />
          </div>
        </div>

        <div className="flex-row">
          <div className="input-container">
            <label htmlFor="calc-year">Mortgage Term</label>
            <div className="input-wrapper">
              <input
                id="calc-year"
                type="number"
                value={term}
                placeholder="Enter term in years"
                onChange={(e) =>
                  setTerm(Math.max(0, parseFloat(e.target.value) || 0))
                }
              />
              <button>years</button>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="rate">Interest Rate</label>
            <div className="input-wrapper">
              <input
                id="rate"
                type="number"
                value={rate}
                placeholder="Enter interest rate"
                onChange={(e) =>
                  setRate(Math.max(0, parseFloat(e.target.value) || 0))
                }
              />
              <button>%</button>
            </div>
          </div>
        </div>

        <div className="radio-container">
          <label>Mortgage Type</label>
          <div className="radio-wrapper">
            <input
              id="repayment"
              type="radio"
              name="mortgageType"
              value="repayment"
              checked={type === 'repayment'}
              onChange={() => setType('repayment')}
            />
            <label htmlFor="repayment">Repayment</label>
          </div>
          <div className="radio-wrapper">
            <input
              id="only"
              type="radio"
              name="mortgageType"
              value="interestOnly"
              checked={type === 'interestOnly'}
              onChange={() => setType('interestOnly')}
            />
            <label htmlFor="only">Interest only</label>
          </div>
        </div>

        <button onClick={calculateRepayments} className="button">
          <img src={calculator} alt="Calculator Icon" />
          Calculate Repayments
        </button>
      </div>

      <div className="results">
        <h2>Your results</h2>
        <p>
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "Calculate Repayments"
          again.
        </p>
        <div className="highlight">
          <p>Your monthly repayments</p>
          <h3>£{curRes(monthlyPayment)}</h3>
        </div>
        <div>
          <p>Total payment</p>
          <h3>£{curRes(totalPayment)}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
