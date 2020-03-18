// import React, { useState, useEffect, useCallback } from 'react'
import React from 'react'
import { useCurrentUSRecords } from '../services/api'

const USTotals = () => {
  const { data, errorMessage } = useCurrentUSRecords()
  // const [totals, setTotals] = useState({})

  // const memoizedGetTotals = useCallback(() => {
  //   const getTotals = data => (data ? data[0] : totals)

  //   getTotals(data)
  // }, [data, totals])

  // useEffect(() => {
  //   if (!totals.positive) {
  //     console.log(totals.positive)
  //     setTotals(memoizedGetTotals(data))
  //   }
  // }, [data, totals, memoizedGetTotals])

  const totals = data ? data[0] : null

  return (
    <div className="USTotals mb4">
      <h2 className="f3 mv4">Current Totals</h2>
      {errorMessage ? (
        <p className="tr mt0 mb3">{errorMessage}</p>
      ) : !data ? (
        <p className="tr mt0 mb3 tc">Loading totals...</p>
      ) : (
        <div>
          <div className="f4 flex items-center mb2">
            <div className="pr2 w5">Positive Cases</div>
            <div className="b f3">{totals.positive.toLocaleString()}</div>
          </div>
          <div className="f4 flex items-center">
            <div className="pr2 w5">Deaths</div>
            <div className="b f3">{totals.death.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default USTotals
