// components/EChartsComponent.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const BarChart = () => {
  useEffect(() => {
    // Ambil elemen DOM tempat Anda ingin menampilkan grafik
    const chartContainer = document.getElementById('bar-chart');
    
    // Inisialisasi instance ECharts
    const chart = echarts.init(chartContainer);

    // Konfigurasi opsi grafik
    const option = {
      title: {
        top: -6,
        left: 'center',
        text: 'Monitoring Flag Transaction '
      },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: 20,
          bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Fraud',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Suspicious',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Not Fraud',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
        ]
      };

    // Terapkan konfigurasi ke grafik
    chart.setOption(option);

    // Perbarui ukuran grafik saat jendela diubah
    window.addEventListener('resize', () => chart.resize());

    // Hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener('resize', () => chart.resize());
    };
  }, []);

  return <div id="bar-chart" style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
