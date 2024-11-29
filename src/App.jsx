import { useState } from 'react';
import calculator from './assets/calculator.svg';
import yellow from './assets/yellow-icon.svg';
import white from './assets/white.svg';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [rate, setRate] = useState(0);
  const [type, setType] = useState('repayment');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateRepayments = () => {
    const principal = amount;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = term * 12;

    if (type === 'repayment') {
      const monthly =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalMonths));
      setMonthlyPayment(monthly.toFixed(2));
      setTotalPayment((monthly * totalMonths).toFixed(2));
    } else {
      const monthly = principal * monthlyRate;
      setMonthlyPayment(monthly.toFixed(2));
      setTotalPayment((monthly * totalMonths).toFixed(2));
    }
  };

  const resetForm = () => {
    setAmount(0);
    setTerm(0);
    setRate(0);
    setType('repayment');
    setMonthlyPayment(0);
    setTotalPayment(0);
  };

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container header__container">
          <h2 className="header-title">Mortgage Calculator</h2>
          <button className="header-end" onClick={resetForm}>
            Clear All
          </button>
        </div>
      </header>

      <main className="main">
        <div className="container main__container">
          <h2>Mortgage Amount</h2>
          <div className="input-group">
            <span>£</span>
            <input
              className="number"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, e.target.value))}
              placeholder="Enter amount in £"
            />
          </div>

          <div className="rate-section">
            <div>
              <h2>Mortgage Term</h2>
              <input
                type="number"
                value={term}
                onChange={(e) => setTerm(Math.max(0, e.target.value))}
                placeholder="Enter term in years"
              />
            </div>
            <div>
              <h2>Interest Rate</h2>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Math.max(0, e.target.value))}
                placeholder="Enter rate in %"
              />
            </div>
          </div>
        </div>
      </main>

      <section>
        <div className="container">
          <h2 className="section-title">Mortgage Type</h2>
          <div
            className={`section-yellow ${
              type === 'repayment' ? 'selected' : ''
            }`}
            onClick={() => setType('repayment')}
          >
            <img src={yellow} alt="yellow" />
            <h4>Repayment</h4>
          </div>
          <div
            className={`section-white ${
              type === 'interestOnly' ? 'selected' : ''
            }`}
            onClick={() => setType('interestOnly')}
          >
            <img src={white} alt="white" />
            <h4>Interest Only</h4>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__container">
          <button className="footer-btn" onClick={calculateRepayments}>
            <img src={calculator} alt="calculator" />
            <h2>Calculate Repayments</h2>
          </button>
          <div className="results">
            <h3>Your Monthly Payment: £{monthlyPayment}</h3>
            <h3>Total Payment: £{totalPayment}</h3>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
