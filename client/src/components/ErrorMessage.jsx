import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle } from 'react-icons/fa';

function ErrorMessage({ error, onClose }) {
  const { t } = useTranslation();

  if (!error) return null;

  return (
    <div className="alert alert-error">
      <FaExclamationTriangle />
      <div style={{ flex: 1 }}>
        <strong>{t('errors.title')}: </strong>
        <span>{error}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            color: 'inherit'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
