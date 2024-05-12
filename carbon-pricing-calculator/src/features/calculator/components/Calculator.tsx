import React, { useEffect, useState } from "react";
import { InputTabs } from "./InputTabs";
import { Graph } from "./Graph";
import { getTransferData } from "../api/formData";
import { IncomeQuintile } from "../types/formData";

export function Calculator() {
  const [province, setProvince] = useState("");
  const [quintile, setQuintile] = useState<IncomeQuintile>("q1");
  const [data, setData] = useState<number[]>([0]);

  useEffect(() => {
    getTransferData(province, quintile).then((res) => {
      if (res) {
        setData(res);
      }
    });
  }, [quintile, province]);

  return (
    <div className="w-screen h-screen bg-gray-200 relative">
      <InputTabs
        province={province}
        setProvince={setProvince}
        quintile={quintile}
        setQuintile={setQuintile}
      />
      {data ? <Graph data={data} /> : <></>}
    </div>
  );
}
