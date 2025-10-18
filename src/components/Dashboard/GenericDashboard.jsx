import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  EChartsBar, 
  EChartsPie, 
  EChartsLine, 
  EChartsStackedBar, 
  EChartsArea, 
  EChartsScatter 
} from './EChartsRenderer';

// Generic summary cards configuration
const summaryConfig = [
  {
    key: "totalItems",
    title: "Total Items",
    icon: "📊",
    bgColor: "bg-foreground",
    textColor: "text-background",
  },
  {
    key: "newItems",
    title: "New Items",
    icon: "🆕",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
  {
    key: "pendingItems",
    title: "Pending Items",
    icon: "⏳",
    bgColor: "bg-yellow-500",
    textColor: "text-white",
  },
  {
    key: "completedItems",
    title: "Completed Items",
    icon: "✅",
    bgColor: "bg-green-600",
    textColor: "text-white",
  },
  {
    key: "totalUsers",
    title: "Total Users",
    icon: "👥",
    bgColor: "bg-purple-600",
    textColor: "text-white",
  },
  {
    key: "activeUsers",
    title: "Active Users",
    icon: "🟢",
    bgColor: "bg-emerald-600",
    textColor: "text-white",
  },
];

// Chart configuration for different chart types
const chartConfigs = [
  {
    id: 'statusBreakdown',
    title: 'Items by Status',
    type: 'bar',
    dataKey: 'count',
    nameKey: 'status',
    height: 300,
    isHorizontal: false,
  },
  {
    id: 'categoryDistribution',
    title: 'Items by Category',
    type: 'pie',
    dataKey: 'count',
    nameKey: 'category',
    height: 300,
    isDonut: true,
  },
  {
    id: 'locationStats',
    title: 'Items by Location',
    type: 'horizontalBar',
    dataKey: 'count',
    nameKey: 'location',
    height: 300,
    isHorizontal: true,
  },
  {
    id: 'trendAnalysis',
    title: 'Trend Over Time',
    type: 'line',
    dataKey: 'count',
    nameKey: 'month',
    height: 300,
    smooth: true,
  },
  {
    id: 'departmentStats',
    title: 'Items by Department',
    type: 'stackedBar',
    dataKey: 'count',
    nameKey: 'department',
    keys: ['total', 'pending', 'completed'],
    height: 300,
    isHorizontal: false,
  },
  {
    id: 'performanceMetrics',
    title: 'Performance Metrics',
    type: 'area',
    dataKey: 'value',
    nameKey: 'metric',
    height: 300,
  },
];

export default function GenericDashboard({ data, title = "Dashboard" }) {
  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-2">No Data Available</h2>
        <p>Please check your data source or try again later.</p>
      </div>
    );
  }

  const renderChart = (config) => {
    const chartData = data[config.id] || [];
    
    if (!Array.isArray(chartData) || chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available for {config.title}
        </div>
      );
    }

    switch (config.type) {
      case 'bar':
      case 'horizontalBar':
        return (
          <EChartsBar
            data={chartData}
            dataKey={config.dataKey}
            nameKey={config.nameKey}
            title={config.title}
            isHorizontal={config.isHorizontal}
            height={config.height}
          />
        );
      
      case 'pie':
        return (
          <EChartsPie
            data={chartData}
            dataKey={config.dataKey}
            nameKey={config.nameKey}
            title={config.title}
            isDonut={config.isDonut}
            height={config.height}
          />
        );
      
      case 'line':
        return (
          <EChartsLine
            data={chartData}
            dataKey={config.dataKey}
            nameKey={config.nameKey}
            title={config.title}
            height={config.height}
            smooth={config.smooth}
          />
        );
      
      case 'stackedBar':
        return (
          <EChartsStackedBar
            data={chartData}
            keys={config.keys}
            nameKey={config.nameKey}
            title={config.title}
            isHorizontal={config.isHorizontal}
            height={config.height}
          />
        );
      
      case 'area':
        return (
          <EChartsArea
            data={chartData}
            dataKey={config.dataKey}
            nameKey={config.nameKey}
            title={config.title}
            height={config.height}
          />
        );
      
      case 'scatter':
        return (
          <EChartsScatter
            data={chartData}
            xKey={config.xKey}
            yKey={config.yKey}
            nameKey={config.nameKey}
            title={config.title}
            height={config.height}
          />
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-500">
            Unsupported chart type: {config.type}
          </div>
        );
    }
  };

  return (
    <div className="p-1 sm:p-2 space-y-2 sm:space-y-3">
      {/* Header */}
      <div className="space-y-1 p-2 sm:p-3">
        <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-primary leading-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Analytics and Statistics Overview
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-2 sm:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6">
        {summaryConfig.map(({ key, title, icon, bgColor, textColor }) => (
          <Card key={key} className={`${bgColor} ${textColor} border-0 p-3 sm:p-4`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-2 sm:p-3">
              <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
                {title}
              </CardTitle>
              <span className="text-lg sm:text-xl opacity-75 flex-shrink-0">
                {icon}
              </span>
            </CardHeader>
            <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
              <div className="text-base sm:text-lg lg:text-xl font-bold">
                {data[key] ?? 0}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2">
        {chartConfigs.map((config) => (
          <Card key={config.id} className="w-full">
            <CardHeader className="pb-1 px-2 pt-2 sm:px-4 sm:pt-4">
              <CardTitle className="text-sm sm:text-base lg:text-lg">
                {config.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-3 pb-2 sm:px-4 sm:pb-4">
              {renderChart(config)}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full-width charts */}
      <div className="grid grid-cols-1 gap-1 sm:gap-2">
        <Card className="w-full">
          <CardHeader className="pb-1 px-2 pt-2 sm:px-4 sm:pt-4">
            <CardTitle className="text-sm sm:text-base lg:text-lg">
              Comprehensive Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2 sm:px-4 sm:pb-4">
            {data.comprehensiveAnalysis ? (
              <EChartsStackedBar
                data={data.comprehensiveAnalysis}
                keys={['total', 'pending', 'completed', 'rejected']}
                nameKey="category"
                title=""
                isHorizontal={false}
                height={400}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No comprehensive analysis data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
