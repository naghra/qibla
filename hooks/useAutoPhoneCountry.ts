import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../data/i18n/types';
import {
  defaultPhoneCountryFromLang,
  detectPhoneCountryFromIp,
} from '../utils/phoneCountry';

export function useAutoPhoneCountry(lang: Lang) {
  const [phoneCountry, setPhoneCountryState] = useState(() => defaultPhoneCountryFromLang(lang));
  const userChangedRef = useRef(false);

  const applyDetectedCountry = useCallback(async () => {
    const detected = await detectPhoneCountryFromIp();
    if (!detected || userChangedRef.current) return;
    setPhoneCountryState(detected);
  }, []);

  useEffect(() => {
    userChangedRef.current = false;
    setPhoneCountryState(defaultPhoneCountryFromLang(lang));
    void applyDetectedCountry();
  }, [lang, applyDetectedCountry]);

  const setPhoneCountry = useCallback((code: string) => {
    userChangedRef.current = true;
    setPhoneCountryState(code);
  }, []);

  const resetPhoneCountry = useCallback(() => {
    userChangedRef.current = false;
    setPhoneCountryState(defaultPhoneCountryFromLang(lang));
    void applyDetectedCountry();
  }, [lang, applyDetectedCountry]);

  return { phoneCountry, setPhoneCountry, resetPhoneCountry };
}
