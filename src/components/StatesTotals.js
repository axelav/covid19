// import React, { useState, useEffect, useCallback } from 'react'
import React from 'react'
import { getStateNameByStateCode } from 'us-state-codes'
import max from 'lodash.max'
import { useCurrentStatesRecords } from '../services/api'

const StatesTotals = () => {
  const { data, errorMessage } = useCurrentStatesRecords()
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

  const totals = data ? data : null

  const maxPositive = totals && max(totals.map(x => x.positive))
  const maxDeath = totals && max(totals.map(x => x.death))

  return (
    <div className="StatesTotals mb4">
      <h2 className="f3 mv4">Current State Totals</h2>
      {errorMessage ? (
        <p className="tr mt0 mb3">{errorMessage}</p>
      ) : !data ? (
        <p className="tr mt0 mb3 tc">Loading totals...</p>
      ) : (
        <table className="collapse w-100 ba br2 b--black-10 pv2 ph3 f5">
          <tbody>
            <tr className="striped--light-gray tl f6 fw6 ttu">
              <th className="pv2 ph3">State</th>
              <th className="pv2 ph3">Positive</th>
              <th className="pv2 ph3">Deaths</th>
            </tr>
            {totals.map(x => (
              <tr className="striped--light-gray" key={x.state}>
                <td className="pv2 ph3 fw6">
                  {getStateNameByStateCode(x.state) || x.state}
                </td>
                <td
                  className={
                    x.positive === maxPositive ? 'pv2 ph3 fw6 red' : 'pv2 ph3'
                  }
                >
                  {x.positive.toLocaleString()}
                </td>
                <td
                  className={
                    x.death === maxDeath ? 'pv2 ph3 fw6 red' : 'pv2 ph3'
                  }
                >
                  {x.death}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StatesTotals
