import localizations from './localizations';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n(localizations)
// i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.locale = 'es';
i18n.fallbacks = true;

export default i18n;
