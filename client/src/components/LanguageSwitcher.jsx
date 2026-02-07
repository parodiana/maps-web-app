import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        className={i18n.language === 'tr' ? 'active' : ''}
        onClick={() => changeLanguage('tr')}
      >
        {t('language.tr')}
      </button>
      <button
        className={i18n.language === 'en' ? 'active' : ''}
        onClick={() => changeLanguage('en')}
      >
        {t('language.en')}
      </button>
    </div>
  );
}

export default LanguageSwitcher;
