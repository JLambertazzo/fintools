import React, { useEffect, useState } from "react";
import { InputTabs } from "./InputTabs";
import { Graph } from "./Graph";
import { GraphData } from "../types/formData";
import { graphDataFromSimpleForm } from "../api/graphData";

export function Calculator() {
  const [data, setData] = useState<GraphData | undefined>(undefined);

  useEffect(() => {
    graphDataFromSimpleForm({ province: "mb", quintile: "q1" }).then(setData);
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-200 relative">
      <InputTabs />
      {data ? <Graph data={data} /> : <></>}
    </div>
  );
}
