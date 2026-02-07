import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 seconds
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle API errors
   * @param {Error} error - Axios error object
   * @returns {Object} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data.error || 'Server error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        data: null
      };
    } else {
      // Error in request configuration
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1,
        data: null
      };
    }
  }

  /**
   * Calculate distance and pricing
   * @param {string} origin - Starting address
   * @param {string} destination - Destination address
   * @returns {Promise<Object>} Distance and pricing data
   */
  async calculateDistance(origin, destination, staticPrice) {
    try {
      // Convert staticPrice to number or undefined
      let price = undefined;
      if (staticPrice !== undefined && staticPrice !== null && staticPrice !== '') {
        price = Number(staticPrice);
      }

      const response = await this.client.post('/distance/calculate', {
        origin,
        destination,
        staticPrice: price
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get pricing configuration
   * @returns {Promise<Object>} Pricing rules
   */
  async getPricingConfig() {
    try {
      const response = await this.client.get('/distance/pricing-config');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Geocode an address
   * @param {string} address - Address to geocode
   * @returns {Promise<Object>} Geocoded location
   */
  async geocodeAddress(address) {
    try {
      const response = await this.client.post('/distance/geocode', {
        address
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();
