"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const DougnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        datasets:[
{
    label: 'Bank',
    data: [1250,1500,3750],
    backgroundColor: ['#0747b6', '#2265d8','#2f91fa']
}
        ],
        labels:['Bank 1', 'Bank 2','Bank 3']
    }
  return  <Doughnut
  options={{
    cutout: '60%',
    plugins:{
        legend:{
            display:false
        }
    }
  }}
  data={data} />
}

export default DougnutChart
