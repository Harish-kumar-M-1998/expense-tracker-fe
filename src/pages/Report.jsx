import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Report = () => {
  const { token } = useSelector((state) => state.auth);
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (token) {
      const fetchExpenses = async () => {
        const response = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      };

      fetchExpenses();
    }
  }, [token]);

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1; // 0-indexed
    const expenseYear = expenseDate.getFullYear();

    const matchesMonth = month ? expenseMonth === parseInt(month) : true;
    const matchesYear = year ? expenseYear === parseInt(year) : true;

    return matchesMonth && matchesYear;
  });

  const totalAmount = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="container mt-5" >
      <h2>Expense Report</h2>
      <div className="row">
        <div className="col">
          <label htmlFor="month">Month</label>
          <input
            type="number"
            className="form-control"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="MM"
          />
        </div>
        <div className="col">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            className="form-control"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="YYYY"
          />
        </div>
      </div>
      <h3 className="mt-3">Total: ${totalAmount}</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>${expense.amount}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
