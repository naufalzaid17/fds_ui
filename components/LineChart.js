// components/EChartsComponent.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
  useEffect(() => {
    // Ambil elemen DOM tempat Anda ingin menampilkan grafik
    const chartContainer = document.getElementById('line-chart');
    
    // Inisialisasi instance ECharts
    const chart = echarts.init(chartContainer);

    // Konfigurasi opsi grafik
    const option = {
      title: {
        top: -5,
        left: 'center',
        text: 'Monitoring Alert '
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 20,
        data: ['Positife', 'Suspicious', 'Negative']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Positife',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Suspicious',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Negative',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
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

  return <div id="line-chart" style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
