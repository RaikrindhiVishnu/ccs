import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', acres: 10 },
  { name: 'Tue', acres: 25 },
  { name: 'Wed', acres: 15 },
  { name: 'Thu', acres: 35 },
  { name: 'Fri', acres: 20 },
  { name: 'Sat', acres: 30 },
  { name: 'Sun', acres: 25 },
];

const DailyClearanceChart: React.FC = () => {
  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAcres" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2780C4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2780C4" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#98A0B2' }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey="acres" 
            stroke="#2780C4" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorAcres)" 
            dot={{ r: 4, fill: '#2780C4', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#2780C4' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyClearanceChart;
