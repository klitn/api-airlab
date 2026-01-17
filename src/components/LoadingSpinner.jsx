import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <svg className="spinner-plane" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21,16v-2l-8-5V3.5C13,2.67,12.33,2,11.5,2S10,2.67,10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z" />
                </svg>
            </div>
            <p className="loading-text">Loading flight data...</p>
        </div>
    );
};

export default LoadingSpinner;
