import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import sortBy from 'sort-by'
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

  const chartOptions = {
    ...defaultChartOpts,
    yAxis: {
      ...defaultChartOpts.yAxis,
      type: isLogarithmic ? 'logarithmic' : 'linear'
    },
    series: Object.keys(records).map(x => {
      return {
        name: x,
        data: records[x].sort(sortBy('date')).map((x, i) => {
          const date = x.date
            .toString()
            .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')

          return [new Date(date).valueOf(), x.positive]
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
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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
