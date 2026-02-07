import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory path (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from server directory
dotenv.config({ path: join(__dirname, '../../.env.local') });

class GoogleMapsService {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api';

    if (!this.apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY is not defined in environment variables');
    }
  }

  /**
   * Calculate distance between two addresses using Distance Matrix API
   * @param {string} origin - Starting address
   * @param {string} destination - Destination address
   * @returns {Promise<Object>} Distance and duration information
   */
  async calculateDistance(origin, destination) {
    try {
      const url = `${this.baseUrl}/distancematrix/json`;

      const params = {
        origins: origin,
        destinations: destination,
        key: this.apiKey,
        units: 'metric', // Use kilometers
        language: 'tr' // Turkish language support
      };

      const response = await axios.get(url, { params });

      // Check if API call was successful
      if (response.data.status !== 'OK') {
        throw new Error(`Google Maps API Error: ${response.data.status}`);
      }

      const element = response.data.rows[0].elements[0];

      // Check if route was found
      if (element.status !== 'OK') {
        throw new Error(`Route not found: ${element.status}`);
      }

      return {
        distance: {
          text: element.distance.text,
          value: element.distance.value, // in meters
          kilometers: (element.distance.value / 1000).toFixed(2) // convert to km
        },
        duration: {
          text: element.duration.text,
          value: element.duration.value // in seconds
        },
        origin: response.data.origin_addresses[0],
        destination: response.data.destination_addresses[0]
      };
    } catch (error) {
      if (error.response) {
        throw new Error(`Google Maps API Error: ${error.response.data.error_message || error.response.statusText}`);
      }
      throw error;
    }
  }

  /**
   * Geocode an address to get coordinates
   * @param {string} address - Address to geocode
   * @returns {Promise<Object>} Geocoded location
   */
  async geocodeAddress(address) {
    try {
      const url = `${this.baseUrl}/geocode/json`;

      const params = {
        address: address,
        key: this.apiKey,
        language: 'tr'
      };

      const response = await axios.get(url, { params });

      if (response.data.status !== 'OK') {
        throw new Error(`Geocoding Error: ${response.data.status}`);
      }

      const result = response.data.results[0];

      return {
        formattedAddress: result.formatted_address,
        location: result.geometry.location,
        placeId: result.place_id
      };
    } catch (error) {
      if (error.response) {
        throw new Error(`Geocoding API Error: ${error.response.data.error_message || error.response.statusText}`);
      }
      throw error;
    }
  }
}

export default new GoogleMapsService();
