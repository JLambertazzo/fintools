import React from "react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { GraphData } from "../types/formData";

export type GraphProps = {
  data: GraphData;
};

export function Graph(props: GraphProps) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-10">
      <SparkLineChart
        data={props.data.costs}
        xAxis={{ data: props.data.years }}
        showTooltip
        showHighlight
        area
        sx={{
          "& .MuiLineElement-root": {
            strokeDasharray: "10 5",
            strokeWidth: 4,
          },
        }}
        margin={{ left: 0, right: 0, bottom: 0, top: 0 }}
      />
    </div>
  );
}
