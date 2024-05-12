import React, { useCallback } from "react";

export type GraphResultProps = {
  data: number[];
};

export function GraphResults(props: GraphResultProps) {
  const getSum = useCallback(
    () => props.data.reduce((total, curr) => total + curr, 0),
    [props.data],
  );

  return (
    <div>
      <h2>What the tax means for you:</h2>
      <p>
        From now until April, 2031, you will {getSum() >= 0 ? "earn" : "lose"} $
        {getSum()}
      </p>
    </div>
  );
}
