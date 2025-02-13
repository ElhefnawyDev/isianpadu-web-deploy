"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const data = [
  { value: 0 },
  { value: 60 },
  { value: 20 },
  { value: 50 },
  { value: 30 },
  { value: 45 },
];

export function GrowthChart() {
  return (
    <Card className="w-[199px] h-[152px] rounded-2xl shadow-[0px_9px_45px_-12px_rgba(0,0,0,0.1)] relative">
      <CardHeader className="p-0">
        <CardTitle className="absolute left-[13px] top-[11px] font-bold text-[14px] leading-[21px] text-[#141414]">
          Yearly Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="absolute left-[27px] top-[44px] w-[144px] h-[53.66px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="natural"
                dataKey="value"
                stroke="#6389EB"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute left-[58px] top-[128px] flex items-center gap-[6px]">
          <span className="w-3 h-3 rounded-full bg-[#DE2636]" />
          <span className="text-[8px] font-medium leading-[11px] text-[#141414]">
            12345
          </span>
        </div>
        <div className="absolute left-[111px] top-[128px] flex items-center gap-[6px]">
          <span className="w-3 h-3 rounded-full bg-[#2C388C]" />
          <span className="text-[8px] font-medium leading-[11px] text-[#141414]">
            2.4%
          </span>
          <span className="w-[5px] h-0 border-t-[0.654654px] border-[#06E135] rotate-90 transform origin-left" />
        </div>
      </CardContent>
    </Card>
  );
}
