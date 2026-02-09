import { createContext } from 'react';

export interface OrganizeIdContextType {
  id: string;
  setId: (id: string) => void;
}

const OrganizeIdContext = createContext<OrganizeIdContextType>(undefined!);

export default OrganizeIdContext;
