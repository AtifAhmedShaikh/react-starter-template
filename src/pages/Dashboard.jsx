"use client"

import GenericDashboard from "@/components/Dashboard/GenericDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDashboardData, selectDashboard } from "@/stores/slices/dashboardSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(selectDashboard)

  useEffect(() => {
    // dispatch(fetchDashboardData())
  }, [dispatch])

  if (loading) {
    return (
      <div className="p-1 sm:p-2 space-y-2 sm:space-y-3">
        <div className="space-y-1 p-2 sm:p-3">
          <Skeleton className="h-5 sm:h-6 lg:h-8 w-4/5" />
          <Skeleton className="h-3 sm:h-4 w-1/3" />
        </div>
        <div className="grid gap-1 sm:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-16 sm:h-20" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 sm:h-52" />
          ))}
        </div>
        <Skeleton className="h-48 sm:h-60 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-3 sm:p-6 text-red-500 text-center">
        <h2 className="text-lg sm:text-xl font-bold">Error loading dashboard</h2>
        <p className="text-sm sm:text-base mt-2">{error}</p>
      </div>
    )
  }

  // Transform the data to match the expected format for GenericDashboard
  const transformedData = data ? {
    // Summary data
    totalItems: data.totalComplaints || 0,
    newItems: data.newComplaintsCount || 0,
    pendingItems: data.openComplaintsCount || 0,
    completedItems: data.handledComplaintsCount || 0,
    totalUsers: data.totalUsers || 0,
    activeUsers: data.totalAdmins || 0,
    
    // Chart data - transform existing data to match expected format
    statusBreakdown: data.groupedStatusStats?.map(item => ({
      status: item.value,
      count: item.count
    })) || [],
    
    categoryDistribution: data.groupedOffenceStats?.map(item => ({
      category: item.value,
      count: item.count
    })) || [],
    
    locationStats: data.groupedCityUsers?.map(item => ({
      location: item.value,
      count: item.count
    })) || [],
    
    trendAnalysis: data.groupedTypeOfPersonStats?.map(item => ({
      month: item.value,
      count: item.count
    })) || [],
    
    departmentStats: data.groupedZoneStats?.map(item => ({
      department: item.value,
      total: item.total || 0,
      pending: item.opened || 0,
      completed: item.resolved || 0
    })) || [],
    
    performanceMetrics: data.groupedZoneStats?.map(item => ({
      metric: item.value,
      value: item.total || 0
    })) || [],
    
    comprehensiveAnalysis: data.groupedZoneStats?.map(item => ({
      category: item.value,
      total: item.total || 0,
      pending: item.opened || 0,
      completed: item.resolved || 0,
      rejected: 0 // Add if available in your data
    })) || []
  } : null;

  return (
    <GenericDashboard 
      data={transformedData} 
      title="Analytics Dashboard" 
    />
  )
}

export default DashboardPage
