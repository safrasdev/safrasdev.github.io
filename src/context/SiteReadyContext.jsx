import { createContext, useContext } from 'react';

export const SiteReadyContext = createContext(false);

export function useSiteRevealed() {
  return useContext(SiteReadyContext);
}
