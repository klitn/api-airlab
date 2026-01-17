import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading }) => {
    const [searchType, setSearchType] = useState('flight');
    const [searchValue, setSearchValue] = useState('');
    const [departureCode, setDepartureCode] = useState('');
    const [arrivalCode, setArrivalCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchType === 'flight' && searchValue.trim()) {
            onSearch({ type: 'flight', value: searchValue.trim() });
        } else if (searchType === 'route' && departureCode.trim()) {
            onSearch({
                type: 'route',
                departure: departureCode.trim(),
                arrival: arrivalCode.trim() || null
            });
        }
    };

    const getPlaceholder = () => {
        switch (searchType) {
            case 'flight':
                return 'Enter flight number (e.g., AA100, VN220)';
            case 'route':
                return 'Departure airport code (e.g., JFK, LAX)';
            default:
                return 'Search...';
        }
    };

    return (
        <div className="search-bar-container">
            {/* Search Type Tabs */}
            <div className="search-tabs">
                <button
                    className={`tab ${searchType === 'flight' ? 'active' : ''}`}
                    onClick={() => setSearchType('flight')}
                >
                    <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Flight Number
                </button>
                <button
                    className={`tab ${searchType === 'route' ? 'active' : ''}`}
                    onClick={() => setSearchType('route')}
                >
                    <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Route
                </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="search-form">
                {searchType === 'flight' ? (
                    <div className="input-group">
                        <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={getPlaceholder()}
                            className="search-input"
                            disabled={loading}
                        />
                    </div>
                ) : (
                    <div className="route-inputs">
                        <div className="input-group">
                            <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <input
                                type="text"
                                value={departureCode}
                                onChange={(e) => setDepartureCode(e.target.value)}
                                placeholder={getPlaceholder()}
                                className="search-input"
                                disabled={loading}
                            />
                        </div>
                        <div className="route-arrow">→</div>
                        <div className="input-group">
                            <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <input
                                type="text"
                                value={arrivalCode}
                                onChange={(e) => setArrivalCode(e.target.value)}
                                placeholder="Arrival airport code (optional)"
                                className="search-input"
                                disabled={loading}
                            />
                        </div>
                    </div>
                )}

                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? (
                        <>
                            <div className="spinner"></div>
                            Searching...
                        </>
                    ) : (
                        <>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
