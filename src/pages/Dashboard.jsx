import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const fetchExpenses = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/expenses', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setExpenses(response.data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchExpenses();
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((expense) => expense._id !== id)); // Remove from state
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your Expenses</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>${expense.amount}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/edit-expense/${expense._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate('/add-expense')}
      >
        Add New Expense
      </button>
      {/* Button to go to Report page */}
      <button
        className="btn btn-info mt-3 ms-2" // Add some margin for spacing
        onClick={() => navigate('/report')}
      >
        View Report
      </button>
    </div>
  );
};

export default Dashboard;
