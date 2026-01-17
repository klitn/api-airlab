/**
 * AirLabs API Service
 * Handles all API calls to AirLabs Flight Data API
 */

const API_KEY = 'b213e94c-3cc7-4c9b-b1bf-58d89152377c';
const BASE_URL = 'https://airlabs.co/api/v9';

class AirLabsAPI {
    /**
     * Make a request to AirLabs API
     * @param {string} endpoint - API endpoint
     * @param {object} params - Query parameters
     * @returns {Promise<object>} API response
     */
    async request(endpoint, params = {}) {
        try {
            const queryParams = new URLSearchParams({
                api_key: API_KEY,
                ...params
            });

            const url = `${BASE_URL}/${endpoint}?${queryParams}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Check if API returned an error
            if (data.error) {
                throw new Error(data.error.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('AirLabs API Error:', error);
            throw error;
        }
    }

    /**
     * Search for flight information by flight number
     * @param {string} flightNumber - Flight IATA or ICAO code (e.g., "AA100", "VN220")
     * @returns {Promise<object>} Flight information
     */
    async searchFlightByNumber(flightNumber) {
        const params = {};

        // Determine if it's IATA or ICAO code (ICAO is typically longer)
        if (flightNumber.length <= 6) {
            params.flight_iata = flightNumber.toUpperCase();
        } else {
            params.flight_icao = flightNumber.toUpperCase();
        }

        const data = await this.request('flight', params);
        return data;
    }

    /**
     * Get flight schedules by departure airport
     * @param {string} departureCode - Airport IATA or ICAO code
     * @param {string} arrivalCode - Optional arrival airport code
     * @returns {Promise<object>} Flight schedules
     */
    async getFlightSchedules(departureCode, arrivalCode = null) {
        const params = {};

        // Determine if it's IATA or ICAO code
        if (departureCode.length === 3) {
            params.dep_iata = departureCode.toUpperCase();
        } else {
            params.dep_icao = departureCode.toUpperCase();
        }

        if (arrivalCode) {
            if (arrivalCode.length === 3) {
                params.arr_iata = arrivalCode.toUpperCase();
            } else {
                params.arr_icao = arrivalCode.toUpperCase();
            }
        }

        const data = await this.request('schedules', params);
        return data;
    }

    /**
     * Get real-time flights
     * @param {object} filters - Optional filters (airline_iata, flight_iata, etc.)
     * @returns {Promise<object>} Real-time flight data
     */
    async getRealTimeFlights(filters = {}) {
        const data = await this.request('flights', filters);
        return data;
    }

    /**
     * Search airlines
     * @param {string} airlineCode - Airline IATA or ICAO code
     * @returns {Promise<object>} Airline information
     */
    async searchAirline(airlineCode) {
        const params = {};

        if (airlineCode.length === 2) {
            params.iata_code = airlineCode.toUpperCase();
        } else {
            params.icao_code = airlineCode.toUpperCase();
        }

        const data = await this.request('airlines', params);
        return data;
    }

    /**
     * Search airports
     * @param {string} airportCode - Airport IATA or ICAO code
     * @returns {Promise<object>} Airport information
     */
    async searchAirport(airportCode) {
        const params = {};

        if (airportCode.length === 3) {
            params.iata_code = airportCode.toUpperCase();
        } else {
            params.icao_code = airportCode.toUpperCase();
        }

        const data = await this.request('airports', params);
        return data;
    }
}

// Export singleton instance
export default new AirLabsAPI();
