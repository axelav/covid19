import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import sortBy from 'sort-by'
import { getStateNameByStateCode } from 'us-state-codes'
import { useDailyStatesRecords } from '../services/api'
import defaultChartOpts from '../config/chartConfig'

const groupBy = (arr, iterator) =>
  arr.reduce((mem, x) => {
    const value = iterator(x)

    mem[value] = mem[value] || []
    mem[value].push(x)

    return mem
  }, {})

const getRecords = data => {
  return data ? groupBy(data, x => x.state) : []
}

const StatesChart = () => {
  const { data, errorMessage } = useDailyStatesRecords()
  const [records, setRecords] = useState([])
  const [isLogarithmic, setIsLogarithmic] = useState(false)

  useEffect(() => {
    if (!records.length) {
      setRecords(getRecords(data))
    }
  }, [data, records.length])

  const casesChartOptions = {
    ...defaultChartOpts,
    yAxis: {
      ...defaultChartOpts.yAxis,
      type: isLogarithmic ? 'logarithmic' : 'linear'
    },
    legend: { enabled: false },
    tooltip: {
      ...defaultChartOpts.tooltip,
      pointFormatter: function() {
        return `<span style="color:${this.color}">●</span>  <b>${
          this.series.name
        }</b>: ${this.y.toLocaleString()}`
      }
    },
    series: Object.keys(records).map(x => {
      return {
        name: getStateNameByStateCode(x) || x,
        data: records[x].sort(sortBy('date')).map((x, i) => {
          const date = x.date
            .toString()
            .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')

          return [new Date(date).valueOf(), x.positive]
        })
      }
    })
  }

  const deathsChartOptions = {
    ...defaultChartOpts,
    yAxis: {
      ...defaultChartOpts.yAxis,
      type: isLogarithmic ? 'logarithmic' : 'linear'
    },
    legend: { enabled: false },
    tooltip: {
      ...defaultChartOpts.tooltip,
      pointFormatter: function() {
        return `<span style="color:${this.color}">●</span>  <b>${
          this.series.name
        }</b>: ${this.y.toLocaleString()}`
      }
    },
    series: Object.keys(records).map(x => {
      return {
        name: getStateNameByStateCode(x) || x,
        data: records[x].sort(sortBy('date')).map((x, i) => {
          const date = x.date
            .toString()
            .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')

          return [new Date(date).valueOf(), x.death]
        })
      }
    })
  }

  return (
    <div className="StatesChart mb4">
      <h2 className="f3 mv4">States Daily</h2>
      {errorMessage ? (
        <p className="tr mt0 mb3">{errorMessage}</p>
      ) : !data ? (
        <p className="tr mt0 mb3 tc">Loading records...</p>
      ) : (
        <div>
          <h3 className="f4 mv4">Positive Cases</h3>
          <HighchartsReact
            highcharts={Highcharts}
            options={casesChartOptions}
          />

          <h3 className="f4 mv4">Deaths</h3>
          <HighchartsReact
            highcharts={Highcharts}
            options={deathsChartOptions}
          />
          <div className="flex justify-center">
            <button
              className="input-reset bg-near-white ba b--moon-gray br2 ph2 pv1"
              onClick={() => setIsLogarithmic(!isLogarithmic)}
            >
              Toggle {isLogarithmic ? 'Linear' : 'Logarithmic'} Y-Axis
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatesChart
