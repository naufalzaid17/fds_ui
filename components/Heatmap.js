// components/EChartsComponent.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Heatmap = () => {
  useEffect(() => {
    // Ambil elemen DOM tempat Anda ingin menampilkan grafik
    const chartContainer = document.getElementById('heatmap');
    
    // Inisialisasi instance ECharts
    const chart = echarts.init(chartContainer);

    function getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }
    // Konfigurasi opsi grafik
    const option =  {
      title: {
        top: 30,
        left: 'center',
        text: 'Transaction Monitoring'
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2016',
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData('2016')
      }
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

  return <div id="heatmap" style={{ width: '100%', height: '400px' }} />;
};

export default Heatmap;
