import './Component.css';
import { DependencyList, useEffect, useLayoutEffect, useState } from 'react';

function renderDepList(deps: DependencyList | undefined): string {
  return deps ? `[${deps.join(',')}]` : '';
}

interface ComponentProps {
  name?: string;
  initCount?: number;
}

function Component({ name = 'Comp.', initCount = 0 }: ComponentProps) {
  console.log(
    `${name} (fonction): au montage, à chaque mise à jour de props / state, au démontage.`
  );

  const [count, setCount] = useState(() => {
    console.log(`${name} (useState init): montage pour initialiser "count"`);
    return initCount;
  });
  const [show, setShow] = useState(false);

  const layoutEffectDeps: DependencyList | undefined = [];
  useLayoutEffect(() => {
    console.log(
      `${name} (useLayoutEffect${renderDepList(layoutEffectDeps)} mount)`
    );
    return () => {
      console.log(
        `${name} (useLayoutEffect${renderDepList(layoutEffectDeps)} unmount):`
      );
    };
  }, layoutEffectDeps);

  const effectDeps: DependencyList | undefined = [];
  useEffect(() => {
    console.log(`${name} (useEffect${renderDepList(effectDeps)} mount)`);
    return () => {
      console.log(`${name} (useEffect${renderDepList(effectDeps)} unmount):`);
    };
  }, effectDeps);

  return (
    <>
      <div className="flex">
        {name} count : {count}
        <button onClick={() => setShow((prevShow) => !prevShow)}>
          {show ? `démonter` : `monter`}
        </button>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          +
        </button>
      </div>
      {show && <Component name={'Sub' + name} initCount={count} />}
    </>
  );
}

export default Component;
