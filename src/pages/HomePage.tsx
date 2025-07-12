import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Question {
  _id: string;
  title: string;
  createdAt: string;
  author?: {
    username: string;
  };
}

const HomePage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/api/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to load questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Recent Questions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li key={q._id} className="p-4 bg-white shadow rounded hover:bg-gray-50">
              <Link to={`/question/${q._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {q.title}
              </Link>
              <div className="text-sm text-gray-500">
                Asked by <strong>{q.author?.username || 'Anonymous'}</strong> on {new Date(q.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
