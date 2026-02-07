import { useTranslation } from 'react-i18next';
import { FaRoute, FaRulerHorizontal, FaClock, FaEuroSign, FaInfoCircle } from 'react-icons/fa';

function ResultDisplay({ result }) {
  const { t } = useTranslation();

  if (!result) {
    return (
      <div className="card">
        <div className="alert alert-info">
          <FaInfoCircle />
          <span>{t('app.subtitle')}</span>
        </div>
      </div>
    );
  }

  const { route, distance, duration, pricing, breakdown } = result.data;

  return (
    <div className="card">
      <h2>{t('result.title')}</h2>

      {/* Route Information */}
      <div className="result-section">
        <h3>
          <FaRoute />
          {t('result.route')}
        </h3>
        <div className="result-item">
          <span>{t('result.from')}:</span>
          <span>{route.origin}</span>
        </div>
        <div className="result-item">
          <span>{t('result.to')}:</span>
          <span>{route.destination}</span>
        </div>
      </div>

      {/* Distance & Duration */}
      <div className="result-section">
        <h3>
          <FaRulerHorizontal />
          {t('result.distance')}
        </h3>
        <div className="result-item">
          <span>{t('result.distance')}:</span>
          <span>{distance.kilometers} {t('result.kilometers')}</span>
        </div>
        <div className="result-item">
          <span>{t('result.duration')}:</span>
          <span>{duration.text}</span>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="result-section">
        <h3>
          <FaEuroSign />
          {t('result.pricing')}
        </h3>
        <div className="result-item">
          <span>{t('result.basePrice')}:</span>
          <span>€{pricing.basePrice}</span>
        </div>
        {pricing.additionalPrice > 0 && (
          <div className="result-item">
            <span>{t('result.additionalPrice')}:</span>
            <span>€{pricing.additionalPrice}</span>
          </div>
        )}
        <div className="result-item price-total">
          <span>{t('result.totalPrice')}:</span>
          <span>€{pricing.totalPrice}</span>
        </div>

        {/* Price Breakdown */}
        <div className="price-breakdown">
          <strong>{t('result.breakdown')}:</strong>
          <p>{breakdown.description}</p>
          <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>
            {breakdown.formula} = €{pricing.totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;
