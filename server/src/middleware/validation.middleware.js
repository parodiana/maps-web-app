/**
 * Validation middleware for API requests
 */

/**
 * Validate calculate distance request
 */
export const validateCalculateRequest = (req, res, next) => {
  const { origin, destination, staticPrice } = req.body;

  // Validate staticPrice if provided
  if (staticPrice !== undefined && staticPrice !== null && staticPrice !== '') {
    const priceNum = Number(staticPrice);
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({
        success: false,
        error: 'Static price must be a positive number'
      });
    }
  }

  // Check if both fields are provided
  if (!origin || !destination) {
    return res.status(400).json({
      success: false,
      error: 'Both origin and destination are required',
      details: {
        origin: !origin ? 'Origin address is required' : null,
        destination: !destination ? 'Destination address is required' : null
      }
    });
  }

  // Validate that fields are strings
  if (typeof origin !== 'string' || typeof destination !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Origin and destination must be strings'
    });
  }

  // Validate minimum length
  if (origin.trim().length < 3 || destination.trim().length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Origin and destination must be at least 3 characters long'
    });
  }

  // Sanitize inputs (trim whitespace)
  req.body.origin = origin.trim();
  req.body.destination = destination.trim();
  req.body.staticPrice = (staticPrice !== undefined && staticPrice !== null && staticPrice !== '')
    ? Number(staticPrice)
    : undefined;

  next();
};
