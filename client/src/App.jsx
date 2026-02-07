import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import ErrorMessage from './components/ErrorMessage';
import LanguageSwitcher from './components/LanguageSwitcher';
import apiService from './services/api.service';
import './styles/App.css';

function App() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async (origin, destination, price) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiService.calculateDistance(origin, destination, price);
      setResult(data);
    } catch (err) {
      console.error('Calculation error:', err);
      // Determine error message
      let errorMessage = t('errors.apiError');

      if (err.status === 0) {
        errorMessage = t('errors.networkError');
      } else if (err.status === 400) {
        errorMessage = err.message || t('errors.invalidAddress');
      } else if (err.status >= 500) {
        errorMessage = t('errors.serverError');
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="app">
      <LanguageSwitcher />

      <div className="container">
        <header className="header">
          <h1>{t('app.title')}</h1>
          <p>{t('app.subtitle')}</p>
        </header>

        {error && <ErrorMessage error={error} onClose={handleCloseError} />}

        <div className="main-content">
          <CalculatorForm onCalculate={handleCalculate} loading={loading} />
          <ResultDisplay result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;
