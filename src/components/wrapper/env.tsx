'use client';

import { envType } from '@/lib/utils/env';
import { ReactNode, createContext } from 'react';

export const EnvProvider = createContext<envType | undefined>(undefined);

const EnvProviderComponent = ({
  env,
  children,
}: {
  env: envType;
  children: ReactNode;
}) => {
  return <EnvProvider.Provider value={env}>{children}</EnvProvider.Provider>;
};

export default EnvProviderComponent;
