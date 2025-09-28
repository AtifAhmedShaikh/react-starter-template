import React from 'react';
import ReactECharts from 'echarts-for-react';

// Color palette for consistent theming
const COLORS = [
  '#4f46e5', '#10b981', '#f59e0b', '#ef4444', 
  '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
];

// Common chart options
const commonOptions = {
  color: COLORS,
  textStyle: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut',
};

// Responsive configuration
const getResponsiveConfig = (isMobile) => ({
  grid: {
    left: isMobile ? '10%' : '15%',
    right: isMobile ? '10%' : '15%',
    top: isMobile ? '15%' : '20%',
    bottom: isMobile ? '15%' : '20%',
    containLabel: true,
  },
  textStyle: {
    fontSize: isMobile ? 10 : 12,
  },
  legend: {
    textStyle: {
      fontSize: isMobile ? 10 : 12,
    },
    itemWidth: isMobile ? 12 : 16,
    itemHeight: isMobile ? 8 : 12,
  },
});

// Bar Chart Component
export const EChartsBar = ({ 
  data, 
  dataKey, 
  nameKey, 
  title, 
  isHorizontal = false,
  height = 300 
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveConfig = getResponsiveConfig(isMobile);

  const option = {
    ...commonOptions,
    ...responsiveConfig,
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params) => {
        if (Array.isArray(params)) {
          return params.map(param => 
            `${param.seriesName}: ${param.value}`
          ).join('<br/>');
        }
        return `${params.seriesName}: ${params.value}`;
      },
    },
    xAxis: {
      type: isHorizontal ? 'value' : 'category',
      data: isHorizontal ? undefined : data?.map(item => item[nameKey]),
      axisLabel: {
        rotate: isHorizontal ? 0 : (isMobile ? -45 : -30),
        fontSize: isMobile ? 9 : 11,
      },
    },
    yAxis: {
      type: isHorizontal ? 'category' : 'value',
      data: isHorizontal ? data?.map(item => item[nameKey]) : undefined,
      axisLabel: {
        fontSize: isMobile ? 9 : 11,
      },
    },
    series: [{
      name: title,
      type: 'bar',
      data: data?.map(item => item[dataKey]),
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

// Pie Chart Component
export const EChartsPie = ({ 
  data, 
  dataKey, 
  nameKey, 
  title, 
  isDonut = false,
  height = 300 
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveConfig = getResponsiveConfig(isMobile);

  // Process data to show top 5 and group others
  const processedData = React.useMemo(() => {
    if (!Array.isArray(data)) return [];
    
    const sorted = [...data].sort((a, b) => (b[dataKey] || 0) - (a[dataKey] || 0));
    const top5 = sorted.slice(0, 4);
    const others = sorted.slice(4);
    
    if (others.length > 0) {
      const othersTotal = others.reduce((sum, item) => sum + (item[dataKey] || 0), 0);
      top5.push({
        [nameKey]: `Others +${others.length}`,
        [dataKey]: othersTotal,
      });
    }
    
    return top5;
  }, [data, dataKey, nameKey]);

  const option = {
    ...commonOptions,
    ...responsiveConfig,
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      textStyle: {
        fontSize: isMobile ? 9 : 11,
      },
    },
    series: [{
      name: title,
      type: 'pie',
      radius: isDonut ? ['40%', '70%'] : '70%',
      center: ['50%', '50%'],
      data: processedData.map(item => ({
        name: item[nameKey],
        value: item[dataKey],
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: {
        show: !isMobile,
        fontSize: isMobile ? 8 : 10,
      },
      labelLine: {
        show: !isMobile,
      },
    }],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

// Line Chart Component
export const EChartsLine = ({ 
  data, 
  dataKey, 
  nameKey, 
  title, 
  height = 300,
  smooth = true 
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveConfig = getResponsiveConfig(isMobile);

  const option = {
    ...commonOptions,
    ...responsiveConfig,
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        if (Array.isArray(params)) {
          return params.map(param => 
            `${param.seriesName}: ${param.value}`
          ).join('<br/>');
        }
        return `${params.seriesName}: ${params.value}`;
      },
    },
    xAxis: {
      type: 'category',
      data: data?.map(item => item[nameKey]),
      axisLabel: {
        rotate: isMobile ? -45 : -30,
        fontSize: isMobile ? 9 : 11,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: isMobile ? 9 : 11,
      },
    },
    series: [{
      name: title,
      type: 'line',
      data: data?.map(item => item[dataKey]),
      smooth,
      symbol: 'circle',
      symbolSize: isMobile ? 4 : 6,
      lineStyle: {
        width: isMobile ? 2 : 3,
      },
      areaStyle: {
        opacity: 0.1,
      },
      emphasis: {
        focus: 'series',
      },
    }],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

// Stacked Bar Chart Component
export const EChartsStackedBar = ({ 
  data, 
  keys, 
  nameKey, 
  title, 
  isHorizontal = false,
  height = 300 
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveConfig = getResponsiveConfig(isMobile);

  const option = {
    ...commonOptions,
    ...responsiveConfig,
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: keys,
      top: 'bottom',
    },
    xAxis: {
      type: isHorizontal ? 'value' : 'category',
      data: isHorizontal ? undefined : data?.map(item => item[nameKey]),
      axisLabel: {
        rotate: isHorizontal ? 0 : (isMobile ? -45 : -30),
        fontSize: isMobile ? 9 : 11,
      },
    },
    yAxis: {
      type: isHorizontal ? 'category' : 'value',
      data: isHorizontal ? data?.map(item => item[nameKey]) : undefined,
      axisLabel: {
        fontSize: isMobile ? 9 : 11,
      },
    },
    series: keys.map((key, index) => ({
      name: key,
      type: 'bar',
      stack: 'total',
      data: data?.map(item => item[key] || 0),
      itemStyle: {
        borderRadius: index === keys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0],
      },
    })),
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

// Area Chart Component
export const EChartsArea = ({ 
  data, 
  dataKey, 
  nameKey, 
  title, 
  height = 300 
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveConfig = getResponsiveConfig(isMobile);

  const option = {
    ...commonOptions,
    ...responsiveConfig,
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data?.map(item => item[nameKey]),
      axisLabel: {
        rotate: isMobile ? -45 : -30,
        fontSize: isMobile ? 9 : 11,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: isMobile ? 9 : 11,
      },
    },
    series: [{
      name: title,
      type: 'line',
      data: data?.map(item => item[dataKey]),
      smooth: true,
      areaStyle: {
        opacity: 0.3,
      },
      emphasis: {
        focus: 'series',
      },
    }],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

// Scatter Chart Component
export const EChartsScatter = ({ 
  data, 
  xKey, 
  yKey, 
  nameKey, 
  title, 
  height = 300 
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveConfig = getResponsiveConfig(isMobile);

  const option = {
    ...commonOptions,
    ...responsiveConfig,
    title: {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `${params.data[nameKey]}: (${params.data[xKey]}, ${params.data[yKey]})`;
      },
    },
    xAxis: {
      type: 'value',
      name: xKey,
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        fontSize: isMobile ? 9 : 11,
      },
    },
    yAxis: {
      type: 'value',
      name: yKey,
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: {
        fontSize: isMobile ? 9 : 11,
      },
    },
    series: [{
      name: title,
      type: 'scatter',
      data: data?.map(item => ({
        name: item[nameKey],
        value: [item[xKey], item[yKey]],
      })),
      symbolSize: isMobile ? 6 : 8,
      emphasis: {
        focus: 'series',
      },
    }],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};
