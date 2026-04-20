import { useEffect } from 'react';

const SITE = 'UpLevel';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Switch from TCS/Infosys to Amazon & Flipkart`;
    return () => { document.title = `${SITE} — Switch from TCS/Infosys to Amazon & Flipkart`; };
  }, [title]);
}
