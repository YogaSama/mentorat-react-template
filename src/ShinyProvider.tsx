import { createContext, useState, useContext } from 'react';

interface ShinyContext {
  shiny: boolean;
  setShiny(newShiny: boolean): void;
}

const ShinyContext = createContext<ShinyContext>({
  shiny: false,
  setShiny: () => {},
});

export function ShinyProvider(props: React.PropsWithChildren) {
  const [shiny, setShiny] = useState<boolean>(false);

  return (
    <ShinyContext.Provider value={{ shiny, setShiny }}>
      {props.children}
    </ShinyContext.Provider>
  );
}

export function useShiny() {
  return useContext(ShinyContext);
}