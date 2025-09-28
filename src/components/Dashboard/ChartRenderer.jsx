import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LabelList
} from "recharts"

// Original green color palette
const COLORS = [
  "#4f46e5", "oklch(51.82% 0.173 142.06)", "#f97316", "#ef4444",
  "oklch(51.82% 0.173 142.06)", "#facc15", "#a855f7", "#3b82f6"
]

// Enhanced tooltip for better mobile UX
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-lg text-xs">
        <p className="font-semibold text-gray-900 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            <span className="font-medium">{entry.name}:</span> {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function renderPie(data, dataKey, nameKey, donut = false, height = 400) {
  let updatedData = []
  if (Array.isArray(data)) {
    const sorted = [...data].sort((a, b) => b?.count - a?.count)
    const top5 = sorted.slice(0, 4)
    const others = sorted.slice(4)

    if (others.length > 0) {
      const othersTotal = others.reduce((sum, item) => sum + (item.count || 0), 0)
      top5.push({
        id: "others",
        value: `Others +${others.length}`,
        count: othersTotal,
      })
    }

    updatedData = top5
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const responsiveHeight = isMobile ? 180 : height
  const outerRadius = isMobile ? 55 : 100
  const innerRadius = donut ? (isMobile ? 25 : 60) : 0

  return (
    <ResponsiveContainer width="100%" height={responsiveHeight}>
      <PieChart>
        <Pie
          data={updatedData}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          label={false} // Remove labels to prevent overlap
          labelStyle={{ fontSize: 8 }}
        >
          {updatedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ 
            fontSize: isMobile ? '8px' : '12px',
            lineHeight: isMobile ? '12px' : '16px',
            padding: 0,
            // marginTop: "40px"
          }}
          iconSize={isMobile ? 6 : 12}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function renderBar(data, dataKey, nameKey, isHorizontal = false, barSize = 50, containerHeight = 400) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  if (isHorizontal) {
    // Special handling for horizontal status chart with 2/5 text, 3/5 bars ratio
    const responsiveHeight = isMobile ? Math.max(data.length * 25, 275) : Math.max(data.length * 35, 450)
    
    // Calculate widths based on 2/5 text, 3/5 bars ratio
    const textWidthPercent = isMobile ? 10 : 11 // 2/5 = 25% (LESS space for text)
    const barWidthPercent = 85 // 3/5 = 75% (MORE space for bars)
    
    const totalAvailableWidth = isMobile ? 300 : 500 // Approximate card width
    const textWidth = Math.floor(totalAvailableWidth * (textWidthPercent / 100))
    const leftMargin = textWidth + 5 // 5px buffer
    
    return (
      <ResponsiveContainer width="100%" height={responsiveHeight}>
        <BarChart
          data={data}
          layout="vertical"
          barCategoryGap={isMobile ? 5 : 8}
          margin={{ 
            top: 15, 
            right: 10, 
            left: leftMargin, 
            bottom: 15 
          }}
        >
          <XAxis 
            type="number" 
            tick={{ fontSize: isMobile ? 8 : 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            dataKey={nameKey} 
            type="category" 
            width={textWidth}
            tick={<CustomStatusYAxisTick />}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '8px' : '12px',
              padding: 0
            }}
          />
          <Bar 
            dataKey={dataKey} 
            fill="oklch(51.82% 0.173 142.06)"
            radius={[0, 4, 4, 0]}
            barSize={isMobile ? 15 : 20}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  } else {
    // Regular vertical bar chart
    const responsiveHeight = isMobile ? 200 : containerHeight
    const mobileBarSize = isMobile ? 12 : barSize
    
    return (
      <ResponsiveContainer width="100%" height={responsiveHeight}>
        <BarChart
          data={data}
          layout="horizontal"
          barCategoryGap={isMobile ? 5 : 15}
          margin={{ 
            top: 10, 
            right: isMobile ? 15 : 30, 
            left: isMobile ? 5 : 20, 
            bottom: isMobile ? 35 : 20 
          }}
        >
          <XAxis 
            dataKey={nameKey} 
            tick={{ 
              fontSize: isMobile ? 7 : 10, 
              angle: isMobile ? -90 : -45,
              textAnchor: isMobile ? 'end' : 'end'
            }} 
            tickLine={false}
            axisLine={false}
            interval={0}
            height={isMobile ? 40 : 60}
          />
          <YAxis 
            tick={{ fontSize: isMobile ? 7 : 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '8px' : '12px',
              padding: 0
            }}
          />
          <Bar 
            dataKey={dataKey} 
            fill="oklch(51.82% 0.173 142.06)"
            radius={[4, 4, 3, 3]}
            barSize={mobileBarSize}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

// Custom tick formatter for city names
const formatCityName = (value, isMobile) => {
  if (!value) return ''
  const maxLength = isMobile ? 8 : 12 // Shorter since we have less space now
  if (value.length > maxLength) {
    return value.substring(0, maxLength - 3) + '...'
  }
  return value
}

// Custom Y-axis tick component for cities - FULL TEXT VERSION
const CustomCityYAxisTick = ({ x, y, payload }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const fontSize = isMobile ? 7 : 12 // Increased font size for better visibility
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={3} 
        textAnchor="end" 
        fill="#374151"
        fontSize={fontSize}
        fontWeight="500"
      >
        {payload.value}
      </text>
    </g>
  )
}

// Custom Y-axis tick component for cities (original with truncation for other charts)
const CustomYAxisTick = ({ x, y, payload }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const fontSize = isMobile ? 7 : 10
  const maxWidth = isMobile ? 70 : 130
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={3} 
        textAnchor="end" 
        fill="#374151"
        fontSize={fontSize}
        width={maxWidth}
      >
        {formatCityName(payload.value, isMobile)}
      </text>
    </g>
  )
}

// Custom Y-axis tick component for status labels with text wrapping
const CustomStatusYAxisTick = ({ x, y, payload }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const fontSize = isMobile ? 6 : 12
  const maxWidth = isMobile ? 70 : 120 // Reduced width since text gets less space
  const lineHeight = fontSize + 2
  
  // Function to wrap text
  const wrapText = (text, maxWidth) => {
    if (!text || typeof text !== 'string') return ['']
    
    const words = text.split(' ')
    if (words.length === 0) return ['']
    
    const lines = []
    let currentLine = words[0] || ''
    
    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const testLine = currentLine + ' ' + word
      // Rough estimation: each character is about 0.6 * fontSize wide
      const testWidth = testLine.length * fontSize * 0.6
      
      if (testWidth > maxWidth && currentLine.length > 0) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    lines.push(currentLine)
    return lines
  }
  
  const lines = wrapText(payload.value, maxWidth)
  const totalHeight = lines.length * lineHeight
  const startY = -(totalHeight / 2) + (lineHeight / 2)
  
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text 
          key={index}
          x={0} 
          y={startY + (index * lineHeight)} 
          dy={3} 
          textAnchor="end" 
          fill="#374151"
          fontSize={fontSize}
          fontWeight="500"
        >
          {line}
        </text>
      ))}
    </g>
  )
}

export function renderHorizontalBar(data, dataKey, nameKey) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const responsiveHeight = isMobile ? Math.max(data.length * 20, 200) : Math.max(data.length * 30, 350)
  
  // Adjusted ratio for full city names: 25% text, 75% bars
  const textWidthPercent = 12 // Actually need more space for the labels to show properly
  const barWidthPercent = 70 // 70% for bars
  
  const totalAvailableWidth = isMobile ? 320 : 550 // Increased total width
  const textWidth = Math.floor(totalAvailableWidth * (textWidthPercent / 100))
  const leftMargin = textWidth + 15 // 15px buffer for proper spacing
  
  return (
    <ResponsiveContainer width="100%" height={responsiveHeight}>
      <BarChart
        data={data}
        layout={"vertical"}
        barCategoryGap={isMobile ? 3 : 6}
        margin={{ 
          top: 10, 
          right: 10, 
          left: leftMargin, 
          bottom: 10 
        }}
      >
        <XAxis 
          type="number" 
          tick={{ fontSize: isMobile ? 8 : 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          dataKey={nameKey} 
          type="category" 
          width={textWidth}
          tick={<CustomCityYAxisTick />}
          interval={0}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ 
            fontSize: isMobile ? '8px' : '12px',
            padding: 0
          }}
        />
        <Bar 
          dataKey={dataKey} 
          fill="oklch(51.82% 0.173 142.06)"
          radius={[0, 5, 5, 0]}
          barSize={isMobile ? 12 : 18}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function renderRadialBar(data, dataKey, nameKey) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="90%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey={dataKey}
          nameKey={nameKey}
          label={{ fill: "#000", position: "insideStart", fontSize: 12 }}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </RadialBar>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

// Custom X-axis tick component for division names
const CustomZoneXAxisTick = ({ x, y, payload }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const fontSize = isMobile ? 7 : 10
  const maxLength = isMobile ? 6 : 10
  
  // Abbreviate division names for better readability
  const abbreviateZone = (zoneName) => {
    if (!zoneName || typeof zoneName !== 'string') return ''
    
    const abbreviations = {
      'Shaheed Benazirabad Zone': 'SB Zone',
      'Sukkur Zone': 'Sukkur',
      'Central Zone': 'Central',
      'Karachi Central Zone': 'KC Zone',
      'Karachi South Zone': 'KS Zone',
      'Karachi East Zone': 'KE Zone',
      'Central Karachi Zone': 'CK Zone',
      'Karachi West Zone': 'KW Zone',
      'Larkana Zone': 'Larkana',
      'Hyderabad Zone': 'Hyderabad',
      'Mirpurkhas Zone': 'Mirpurkhas'
    }
    
    if (abbreviations[zoneName]) {
      return abbreviations[zoneName]
    }
    
    // Fallback: truncate if too long
    if (zoneName.length > maxLength) {
      return zoneName.substring(0, maxLength - 1) + '.'
    }
    
    return zoneName
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        textAnchor="middle" 
        fill="#374151"
        fontSize={fontSize}
        fontWeight="500"
        transform={`rotate(${isMobile ? -45 : -30})`}
      >
        {abbreviateZone(payload.value)}
      </text>
    </g>
  )
}

export function renderStackedBar({
  data,
  keys,
  nameKey,
  isHorizontal = false,
  colors = [],
  barSize = 50,
  height = 500
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const responsiveHeight = isMobile ? 300 : Math.max(height, 400)
  const mobileBarSize = isMobile ? 20 : Math.max(barSize, 25)
  
  // Apply same ratio: 12% text, 85% bars for better bar visibility (for horizontal only)
  const textWidthPercent = 10
  const totalAvailableWidth = isMobile ? 300 : 600
  const textWidth = Math.floor(totalAvailableWidth * (textWidthPercent / 100))
  const leftMargin = textWidth + 8
  
  return (
    <ResponsiveContainer width="100%" height={responsiveHeight}>
      <BarChart
        data={data}
        layout={isHorizontal ? "vertical" : "horizontal"}
        barCategoryGap={isMobile ? 8 : 20}
        margin={{ 
          top: 20, 
          right: 15, 
          left: isHorizontal ? leftMargin : (isMobile ? -30 : 25), 
          bottom: isMobile ? 0 : 0 
        }}
      >
        {isHorizontal ? (
          <>
            <XAxis 
              type="number" 
              tick={{ fontSize: isMobile ? 7 : 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              dataKey={nameKey} 
              type="category" 
              width={textWidth}
              tick={{ fontSize: isMobile ? 7 : 12 }}
              interval={0}
              axisLine={false}
              tickLine={false}
            />
          </>
        ) : (
          <>
            <XAxis 
              dataKey={nameKey} 
              tick={<CustomZoneXAxisTick />}
              tickLine={false}
              axisLine={false}
              interval={0}
              height={isMobile ? 30 : 40}
            />
            <YAxis 
              tick={{ fontSize: isMobile ? 8 : 12 }}
              axisLine={false}
              tickLine={false}
            />
          </>
        )}

        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ 
            fontSize: isMobile ? '9px' : '12px',
            padding: '5px 0',
            marginTop: '5px'
          }}
          iconSize={isMobile ? 8 : 12}
        />

        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={colors[index] || `hsl(${index * 60}, 70%, 50%)`}
            barSize={mobileBarSize}
            radius={index === keys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}