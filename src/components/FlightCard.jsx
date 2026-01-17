import './FlightCard.css';

const FlightCard = ({ flight }) => {
    // Format time from ISO string or timestamp
    const formatTime = (timeStr) => {
        if (!timeStr) return '--:--';
        try {
            const date = new Date(timeStr);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } catch {
            return '--:--';
        }
    };

    // Format date
    const formatDate = (timeStr) => {
        if (!timeStr) return '';
        try {
            const date = new Date(timeStr);
            return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
        } catch {
            return '';
        }
    };

    // Get status badge class and text
    const getFlightStatus = () => {
        const status = flight.status || flight.flight_status;

        if (!status) return { class: 'status-unknown', text: 'Unknown' };

        const statusLower = status.toLowerCase();

        if (statusLower.includes('scheduled') || statusLower.includes('active')) {
            return { class: 'status-ontime', text: 'On Time' };
        } else if (statusLower.includes('landed') || statusLower.includes('arrived')) {
            return { class: 'status-landed', text: 'Landed' };
        } else if (statusLower.includes('delayed')) {
            return { class: 'status-delayed', text: 'Delayed' };
        } else if (statusLower.includes('cancelled')) {
            return { class: 'status-cancelled', text: 'Cancelled' };
        } else {
            return { class: 'status-unknown', text: status };
        }
    };

    const status = getFlightStatus();

    return (
        <div className="flight-card">
            {/* Header */}
            <div className="flight-card-header">
                <div className="flight-number">
                    <svg className="plane-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>{flight.flight_iata || flight.flight_icao || 'N/A'}</span>
                </div>
                <div className={`flight-status ${status.class}`}>
                    {status.text}
                </div>
            </div>

            {/* Airline Info */}
            <div className="airline-info">
                <span className="airline-name">{flight.airline_iata || flight.airline_icao || 'Unknown Airline'}</span>
                {flight.aircraft_icao && (
                    <span className="aircraft-type">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {flight.aircraft_icao}
                    </span>
                )}
            </div>

            {/* Route Timeline */}
            <div className="route-timeline">
                {/* Departure */}
                <div className="airport-info departure">
                    <div className="airport-code">{flight.dep_iata || flight.dep_icao || 'N/A'}</div>
                    <div className="airport-time">
                        <div className="time">{formatTime(flight.dep_time || flight.dep_actual)}</div>
                        <div className="date">{formatDate(flight.dep_time || flight.dep_actual)}</div>
                    </div>
                    {flight.dep_name && <div className="airport-name">{flight.dep_name}</div>}
                </div>

                {/* Flight Path */}
                <div className="flight-path">
                    <div className="path-line"></div>
                    <svg className="path-plane" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21,16v-2l-8-5V3.5C13,2.67,12.33,2,11.5,2S10,2.67,10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z" />
                    </svg>
                    <div className="path-line"></div>
                </div>

                {/* Arrival */}
                <div className="airport-info arrival">
                    <div className="airport-code">{flight.arr_iata || flight.arr_icao || 'N/A'}</div>
                    <div className="airport-time">
                        <div className="time">{formatTime(flight.arr_time || flight.arr_actual)}</div>
                        <div className="date">{formatDate(flight.arr_time || flight.arr_actual)}</div>
                    </div>
                    {flight.arr_name && <div className="airport-name">{flight.arr_name}</div>}
                </div>
            </div>

            {/* Additional Info */}
            {(flight.duration || flight.delayed) && (
                <div className="flight-details">
                    {flight.duration && (
                        <div className="detail-item">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{flight.duration} minutes</span>
                        </div>
                    )}
                    {flight.delayed && (
                        <div className="detail-item delayed">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Delayed {flight.delayed} minutes</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FlightCard;
