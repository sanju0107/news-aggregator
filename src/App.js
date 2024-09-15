import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'c8c65c7564444cf3897698a24f1f7402';  // Replace with your News API key
const BASE_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState('publishedAt'); // Default sort by latest news
  const [query, setQuery] = useState('India'); // Default keyword for filtering (can be changed by the user)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}&q=${query}&sortBy=${sortMethod}`);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the news:', error);
        setLoading(false);
      }
    };
    fetchNews();
  }, [sortMethod, query]);

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="App">
      {/* Header and Centered Section */}
      <header className="header">
        <h1 className="app-title">Today’s News</h1>
        <p className="subtitle">Get the latest updates from around the world</p>
        <div className="controls">
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search news (e.g., Technology)"
          />
          <select className="sort-select" value={sortMethod} onChange={handleSortChange}>
            <option value="publishedAt">Latest</option>
            <option value="popularity">Popularity</option>
            <option value="relevancy">Relevancy</option>
          </select>
        </div>
      </header>
      
      {/* News Articles Section */}
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="news-grid">
          {articles.map((article) => (
            <div key={article.url} className="news-card">
              <img
                className="news-image"
                src={article.urlToImage || 'https://via.placeholder.com/150'}
                alt={article.title || 'News Image'}
              />
              <div className="news-content">
                <h2 className="news-title">{article.title || 'Title Unavailable'}</h2>
                <p className="news-description">
                  {article.description || 'No description available for this article.'}
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">Read More</a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Footer Navbar */}
      <footer className="footer">
        <nav className="footer-nav">
          <ul className="footer-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default App;
