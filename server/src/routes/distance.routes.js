import express from 'express';
import googleMapsService from '../services/googleMaps.service.js';
import pricingService from '../services/pricing.service.js';
import { validateCalculateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

/**
 * POST /api/distance/calculate
 * Calculate distance and price between two locations
 */
router.post('/calculate', validateCalculateRequest, async (req, res, next) => {
  try {
    const { origin, destination, staticPrice } = req.body;

    // Get distance from Google Maps API
    const distanceData = await googleMapsService.calculateDistance(origin, destination);

    // Calculate pricing based on distance
    const pricingData = pricingService.calculatePrice(distanceData.distance.kilometers, staticPrice);

    // Combine results
    const response = {
      success: true,
      data: {
        route: {
          origin: distanceData.origin,
          destination: distanceData.destination
        },
        distance: {
          kilometers: parseFloat(distanceData.distance.kilometers),
          meters: distanceData.distance.value,
          text: distanceData.distance.text
        },
        duration: {
          seconds: distanceData.duration.value,
          text: distanceData.duration.text
        },
        pricing: pricingData.pricing,
        breakdown: pricingData.breakdown
      },
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/distance/pricing-config
 * Get current pricing configuration
 */
router.get('/pricing-config', (req, res) => {
  const config = pricingService.getPricingConfig();

  res.status(200).json({
    success: true,
    data: config,
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/distance/geocode
 * Geocode an address to get coordinates
 */
router.post('/geocode', async (req, res, next) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'Address is required'
      });
    }

    const result = await googleMapsService.geocodeAddress(address);

    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

export default router;
