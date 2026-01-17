import { useState } from 'react';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FlightCard from './components/FlightCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import airLabsAPI from './api/airlabs';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setFlights([]);

    try {
      let data;

      if (searchParams.type === 'flight') {
        // Search by flight number
        data = await airLabsAPI.searchFlightByNumber(searchParams.value);
      } else if (searchParams.type === 'route') {
        // Search by route
        data = await airLabsAPI.getFlightSchedules(
          searchParams.departure,
          searchParams.arrival
        );
      }

      // Handle response data
      if (data.response) {
        // If response is an array
        if (Array.isArray(data.response)) {
          setFlights(data.response);
          if (data.response.length === 0) {
            setError('No flights found. Please try again with different search criteria.');
          }
        }
        // If response is a single object
        else if (typeof data.response === 'object') {
          setFlights([data.response]);
        }
      } else {
        setError('No flight data found.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setHasSearched(false);
    setFlights([]);
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} loading={loading} />

          {/* Results Section */}
          <div className="results-section">
            {loading && <LoadingSpinner />}

            {error && !loading && (
              <ErrorMessage message={error} onRetry={handleRetry} />
            )}

            {!loading && !error && flights.length > 0 && (
              <div className="flights-grid">
                <div className="results-header">
                  <h2>Search Results</h2>
                  <span className="results-count">
                    {flights.length} {flights.length === 1 ? 'flight' : 'flights'}
                  </span>
                </div>
                {flights.map((flight, index) => (
                  <FlightCard key={index} flight={flight} />
                ))}
              </div>
            )}

            {!loading && !error && !hasSearched && (
              <div className="empty-state">
                <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3>Start Searching</h3>
                <p>Enter a flight number or select a route to search for flight information</p>
              </div>
            )}
          </div>
        </div>
      </main>

      
    </div>
  );
}

export default App;
