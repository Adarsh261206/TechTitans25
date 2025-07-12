import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const [screen, setScreen] = useState<'home' | 'ask' | 'detail'>('home');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [breadcrumbTitle, setBreadcrumbTitle] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const popularQuestions = [
    {
      title: "How to implement React hooks effectively?",
      preview: "Looking for best practices and common patterns...",
      user: "ReactMaster",
      answers: 47,
      tags: ["React", "Hooks", "JavaScript"]
    },
    {
      title: "Advanced SQL query optimization techniques",
      preview: "Need help with complex JOIN operations and indexing...",
      user: "DatabaseGuru",
      answers: 23,
      tags: ["SQL", "Database", "Performance"]
    },
    {
      title: "Python machine learning model deployment",
      preview: "Best practices for deploying ML models to production...",
      user: "AIExpert",
      answers: 31,
      tags: ["Python", "ML", "Docker"]
    },
    {
      title: "Modern CSS Grid vs Flexbox comparison",
      preview: "When to use Grid vs Flexbox for layouts...",
      user: "CSSNinja",
      answers: 18,
      tags: ["CSS", "Layout", "Design"]
    },
    {
      title: "Node.js microservices architecture",
      preview: "Designing scalable microservices with Node.js...",
      user: "BackendDev",
      answers: 35,
      tags: ["Node.js", "Architecture", "Microservices"]
    },
    {
      title: "TypeScript generic constraints explained",
      preview: "Understanding advanced TypeScript generic patterns...",
      user: "TypeScriptPro",
      answers: 12,
      tags: ["TypeScript", "Generics", "Types"]
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = () => {
    if (title.trim()) {
      setBreadcrumbTitle(title);
      setScreen('detail');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center relative z-50">
        <Link to="/" className="font-bold text-xl">StackIt</Link>
        <div className="space-x-4">
          <button onClick={() => setScreen('ask')} className="hover:underline">Ask</button>
          {token ? (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Background */}
      <FloatingParticles />
      <div
        className="absolute inset-0 opacity-30 transition-colors duration-500 z-0"
        style={{
          background: `
            radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
            rgba(147, 51, 234, 0.4) 0%, 
            rgba(236, 72, 153, 0.3) 25%, 
            rgba(59, 130, 246, 0.3) 50%, 
            rgba(16, 185, 129, 0.3) 75%, 
            rgba(0, 0, 0, 0.8) 100%)
          `
        }}
      />

      {/* Home */}
      {screen === 'home' && (
        <div className={`relative z-10 max-w-7xl mx-auto p-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              StackIt
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Where developers collaborate, learn, and build the future
            </p>
            <button
              onClick={() => setScreen('ask')}
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold hover:scale-110 transition-all duration-300"
            >
              Ask a Question
            </button>
          </div>

          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🔥 Trending Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularQuestions.map((q, i) => (
              <div
                key={i}
                onClick={() => {
                  setBreadcrumbTitle(q.title);
                  setTitle(q.title);
                  setDescription(q.preview);
                  setScreen('detail');
                }}
                className="cursor-pointer bg-gray-900/70 p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition-all hover:scale-105"
                style={{
                  transform: `rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * 5}deg)`
                }}
              >
                <h3 className="text-xl font-bold text-blue-400 mb-2">{q.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{q.preview}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {q.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{q.user}</span>
                  <span>{q.answers} answers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ask */}
      {screen === 'ask' && (
        <div className="relative z-10 max-w-4xl mx-auto p-8 transition-all duration-1000">
          <div className="bg-gray-900/70 p-8 rounded-3xl border border-gray-800 shadow-2xl">
            <button
              onClick={() => setScreen('home')}
              className="mb-6 text-white hover:text-purple-400 flex items-center gap-2"
            >
              ← Back to Home
            </button>
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Ask the Community
            </h2>
            <input
              type="text"
              placeholder="What's your programming question?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 mb-6 bg-black/50 border border-gray-700 rounded-xl text-white"
            />
            <textarea
              placeholder="Describe your problem in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-40 p-4 mb-6 bg-black/50 border border-gray-700 rounded-xl text-white"
            />
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xl font-bold hover:scale-105 transition"
            >
              🚀 Post Your Question
            </button>
          </div>
        </div>
      )}

      {/* Detail */}
      {screen === 'detail' && (
        <div className="relative z-10 max-w-4xl mx-auto p-8 transition-all duration-1000">
          <div className="bg-gray-900/70 p-8 rounded-3xl border border-gray-800 shadow-2xl">
            <div className="mb-4 text-sm text-gray-400 flex items-center gap-2">
              <button onClick={() => setScreen('home')} className="hover:text-purple-400">🏠 Home</button>
              <span>/</span>
              <span className="text-purple-400">{breadcrumbTitle}</span>
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {description || "Looking for insights and best practices for solving this problem. Any help appreciated!"}
            </p>

            <h3 className="text-2xl font-bold mb-4 text-purple-300">💡 Top Answer</h3>
            <div className="bg-gray-800 p-4 rounded-xl text-gray-300 leading-relaxed">
              You can use the `||` operator for defaults, `??` for nullish coalescing, and `useMemo` to optimize your React code. Make sure to avoid unnecessary re-renders with proper key usage and memoization!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
