import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaCalculator, FaEraser } from 'react-icons/fa';

function CalculatorForm({ onCalculate, loading }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    staticPrice: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.origin.trim() || !formData.destination.trim()) {
      alert(t('errors.required'));
      return;
    }

    onCalculate(formData.origin, formData.destination, formData.staticPrice);
  };

  const handleReset = () => {
    setFormData({
      origin: '',
      destination: '',
      staticPrice: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card">
      <h2>
        <FaMapMarkerAlt style={{ display: 'inline', marginRight: '0.5rem' }} />
        {t('form.origin.label')} & {t('form.destination.label')}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="origin">
            {t('form.origin.label')} *
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder={t('form.origin.placeholder')}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination">
            {t('form.destination.label')} *
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder={t('form.destination.placeholder')}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="staticPrice">
            {t('form.staticPrice.label')}
          </label>
          <input
            type="number"
            id="staticPrice"
            name="staticPrice"
            value={formData.staticPrice}
            onChange={handleChange}
            placeholder={t('form.staticPrice.placeholder')}
            disabled={loading}
            min="0"
            step="0.01"
          />
        </div>

        <div className="pricing-rules">
          <h4>{t('pricing.rule1')}</h4>
          <ul>
            <li>{t('pricing.rule1')}</li>
            <li>{t('pricing.rule2')}</li>
          </ul>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px' }} />
                {t('form.calculating')}
              </>
            ) : (
              <>
                <FaCalculator />
                {t('form.calculate')}
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={loading}
          >
            <FaEraser />
            {t('form.reset')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CalculatorForm;
