import React, { useState } from 'react';

const ZakatCalculator = () => {
  const [inputs, setInputs] = useState({
    gold: '',
    goldPrice: '',
    silver: '',
    silverPrice: '',
    cash: '',
    business: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const calculateZakat = () => {
    const gold = parseFloat(inputs.gold) || 0;
    const goldPrice = parseFloat(inputs.goldPrice) || 0;
    const silver = parseFloat(inputs.silver) || 0;
    const silverPrice = parseFloat(inputs.silverPrice) || 0;
    const cash = parseFloat(inputs.cash) || 0;
    const business = parseFloat(inputs.business) || 0;

    const goldValue = gold * goldPrice;
    const silverValue = silver * silverPrice;
    const totalWealth = goldValue + silverValue + cash + business;

    const silverNisab = 612.36 * silverPrice;
    const zakatDue = totalWealth >= silverNisab ? totalWealth * 0.025 : 0;

    setResult({
      totalWealth,
      silverNisab,
      zakatDue
    });
  };

  return (
    <div style={styles.container}>
      <h2>Zakat Calculator</h2>
      {['gold', 'goldPrice', 'silver', 'silverPrice', 'cash', 'business'].map((field) => (
        <div key={field} style={styles.inputGroup}>
          <label style={styles.label}>
            {field === 'gold' && 'Gold (grams)'}
            {field === 'goldPrice' && 'Gold Price per gram'}
            {field === 'silver' && 'Silver (grams)'}
            {field === 'silverPrice' && 'Silver Price per gram'}
            {field === 'cash' && 'Cash (PKR)'}
            {field === 'business' && 'Business Assets (PKR)'}
          </label>
          <input
            type="number"
            name={field}
            value={inputs[field]}
            onChange={handleChange}
            style={styles.input}
            placeholder="0"
          />
        </div>
      ))}
      <button onClick={calculateZakat} style={styles.button}>Calculate Zakat</button>

      {result && (
        <div style={styles.result}>
          <p><strong>Total Zakatable Wealth:</strong> PKR {result.totalWealth.toLocaleString()}</p>
          <p><strong>Nisab (Silver):</strong> PKR {result.silverNisab.toLocaleString()}</p>
          {result.zakatDue > 0 ? (
            <p style={{ color: 'green' }}><strong>Zakat Due (2.5%):</strong> PKR {result.zakatDue.toLocaleString()}</p>
          ) : (
            <p style={{ color: 'red' }}><strong>You are below Nisab. No Zakat due.</strong></p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f3fbfc',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#2d8f7f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  result: {
    marginTop: '20px',
    backgroundColor: '#e6f9f5',
    padding: '15px',
    borderRadius: '5px'
  }
};

export default ZakatCalculator;
