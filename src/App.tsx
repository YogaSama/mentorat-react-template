import './App.css';
import { DependencyList, useEffect, useLayoutEffect, useState } from 'react';

function renderDepList(deps: DependencyList | undefined): string {
  return deps ? `[${deps.join(',')}]` : '';
}

interface ComponentProps {
  name?: string;
  initCount?: number;
  depth?: number;
}

function Component({
  name = 'Comp.',
  initCount = 0,
  depth = 0,
}: ComponentProps) {
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

  const effectDeps: DependencyList | undefined = [count];
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
        {depth < 10 && (
          <button onClick={() => setShow((prevShow) => !prevShow)}>
            {show ? `démonter` : `monter`}
          </button>
        )}
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          +
        </button>
      </div>
      {show && depth < 10 && (
        <Component name={'Sub' + name} initCount={count} depth={depth + 1} />
      )}
    </>
  );
}

export default Component;
