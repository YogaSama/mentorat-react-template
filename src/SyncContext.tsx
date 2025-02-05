import React, { useMemo } from 'react';

function buildValue() {
  return new Map<string, () => unknown>();
}

export const SyncContext = React.createContext(buildValue());

export function SyncProvider({ children }: React.PropsWithChildren) {
  const value = useMemo(buildValue, []);
  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}
