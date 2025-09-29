import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Download, FileText, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import GenericDashboard from '@/components/Dashboard/GenericDashboard';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [filters, setFilters] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'users', label: 'Users Report', icon: FileText },
    { value: 'items', label: 'Items Report', icon: FileText },
    { value: 'analytics', label: 'Analytics Report', icon: BarChart3 },
    { value: 'performance', label: 'Performance Report', icon: TrendingUp },
    { value: 'summary', label: 'Summary Report', icon: PieChart }
  ];

  const handleGenerateReport = async () => {
    if (!reportType) return;
    
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would call your API to generate the report
      console.log('Generating report:', { reportType, dateRange, filters });
      
      // Simulate download
      const blob = new Blob(['Report data'], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}_report.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickReport = (type) => {
    setReportType(type);
    // Generate quick report immediately
    handleGenerateReport();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <Button onClick={() => window.print()}>
          <Download className="h-4 w-4 mr-2" />
          Print Report
        </Button>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.value}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleQuickReport(type.value)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{type.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date From</Label>
              <DatePicker
                date={dateRange.from}
                onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Date To</Label>
              <DatePicker
                date={dateRange.to}
                onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button 
              onClick={handleGenerateReport}
              disabled={!reportType || isGenerating}
              className="w-full md:w-auto"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sample Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Live Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <GenericDashboard
            data={{
              totalItems: 1250,
              newItems: 45,
              pendingItems: 120,
              completedItems: 1085,
              totalUsers: 250,
              activeUsers: 180,
              statusBreakdown: [
                { status: 'Active', count: 800 },
                { status: 'Pending', count: 120 },
                { status: 'Completed', count: 1085 },
                { status: 'Cancelled', count: 45 }
              ],
              categoryDistribution: [
                { category: 'Type A', count: 400 },
                { category: 'Type B', count: 350 },
                { category: 'Type C', count: 300 },
                { category: 'Type D', count: 200 }
              ],
              locationStats: [
                { location: 'Location 1', count: 300 },
                { location: 'Location 2', count: 250 },
                { location: 'Location 3', count: 200 },
                { location: 'Location 4', count: 150 }
              ],
              trendAnalysis: [
                { month: 'Jan', count: 100 },
                { month: 'Feb', count: 120 },
                { month: 'Mar', count: 150 },
                { month: 'Apr', count: 180 },
                { month: 'May', count: 200 },
                { month: 'Jun', count: 220 }
              ],
              departmentStats: [
                { department: 'Dept A', total: 500, pending: 50, completed: 450 },
                { department: 'Dept B', total: 400, pending: 40, completed: 360 },
                { department: 'Dept C', total: 350, pending: 30, completed: 320 }
              ],
              performanceMetrics: [
                { metric: 'Efficiency', value: 85 },
                { metric: 'Quality', value: 92 },
                { metric: 'Speed', value: 78 },
                { metric: 'Accuracy', value: 95 }
              ],
              comprehensiveAnalysis: [
                { category: 'Category A', total: 500, pending: 50, completed: 450, rejected: 0 },
                { category: 'Category B', total: 400, pending: 40, completed: 360, rejected: 0 },
                { category: 'Category C', total: 350, pending: 30, completed: 320, rejected: 0 }
              ]
            }}
            title="System Analytics"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;