/**
 * Pricing Service for Emergency Service Distance-Based Pricing
 *
 * Pricing Rules:
 * - Base price: €40 for distances up to 30 km
 * - Additional: €1 per km for distances over 30 km
 */

class PricingService {
  constructor() {
    this.BASE_PRICE = 40; // Euro
    this.BASE_DISTANCE_LIMIT = 30; // km
    this.ADDITIONAL_PRICE_PER_KM = 1; // Euro per km
  }

  /**
   * Calculate price based on distance in kilometers
   * @param {number} distanceInKm - Distance in kilometers
   * @returns {Object} Pricing breakdown
   */
  calculatePrice(distanceInKm, staticPrice) {
    const distance = parseFloat(distanceInKm);

    if (isNaN(distance) || distance < 0) {
      throw new Error('Invalid distance value');
    }

    // Use staticPrice if provided, otherwise use BASE_PRICE
    const basePrice = staticPrice !== undefined && staticPrice !== null && staticPrice !== ''
      ? parseFloat(staticPrice)
      : this.BASE_PRICE;

    if (isNaN(basePrice) || basePrice < 0) {
      throw new Error('Invalid static price value');
    }

    let totalPrice = basePrice;
    let additionalKm = 0;
    let additionalPrice = 0;

    // Calculate additional price if distance exceeds base limit
    if (distance > this.BASE_DISTANCE_LIMIT) {
      additionalKm = distance - this.BASE_DISTANCE_LIMIT;
      additionalPrice = additionalKm * this.ADDITIONAL_PRICE_PER_KM;
      totalPrice = basePrice + additionalPrice;
    }

    return {
      distance: {
        total: distance.toFixed(2),
        base: Math.min(distance, this.BASE_DISTANCE_LIMIT).toFixed(2),
        additional: additionalKm.toFixed(2)
      },
      pricing: {
        basePrice: parseFloat(basePrice.toFixed(2)),
        additionalPrice: parseFloat(additionalPrice.toFixed(2)),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        currency: 'EUR'
      },
      breakdown: {
        description: distance <= this.BASE_DISTANCE_LIMIT
          ? `Base price for ${distance.toFixed(2)} km`
          : `Base price (${this.BASE_DISTANCE_LIMIT} km) + €${this.ADDITIONAL_PRICE_PER_KM}/km for ${additionalKm.toFixed(2)} km`,
        formula: distance <= this.BASE_DISTANCE_LIMIT
          ? `€${basePrice.toFixed(2)}`
          : `€${basePrice.toFixed(2)} + (${additionalKm.toFixed(2)} km × €${this.ADDITIONAL_PRICE_PER_KM})`
      }
    };
  }

  /**
   * Get pricing configuration
   * @returns {Object} Current pricing rules
   */
  getPricingConfig() {
    return {
      basePrice: this.BASE_PRICE,
      basePriceUpToKm: this.BASE_DISTANCE_LIMIT,
      additionalPricePerKm: this.ADDITIONAL_PRICE_PER_KM,
      currency: 'EUR'
    };
  }
}

export default new PricingService();
