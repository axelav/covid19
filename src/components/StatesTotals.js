import React, { useState, useEffect } from 'react'
import { getStateNameByStateCode } from 'us-state-codes'
import max from 'lodash.max'
import sortBy from 'sort-by'
import { DateTime } from 'luxon'
import cx from 'classnames'
import { useCurrentStatesRecords } from '../services/api'

const dateFormat = 'M/d HH:mm'

const getTotals = data => (data ? data : [])

const getStateName = code => {
  const name = getStateNameByStateCode(code)

  if (name) {
    return name
  } else if (code === 'VI') {
    return 'US Virgin Islands'
  } else if (code === 'GU') {
    return 'Guam'
  } else if (code === 'AS') {
    return 'American Samoa'
  } else if (code === 'MP') {
    return 'Northern Mariana Islands'
  }
}

const StatesTotals = () => {
  const { data, errorMessage } = useCurrentStatesRecords()
  const [totals, setTotals] = useState([])
  const [sort, setSort] = useState('state')

  const sanitizedSort = sort.replace('-', '')

  const handleSort = sortKey => {
    let nextSort
    if (sanitizedSort === sortKey && sort.substr(0, 1) === '-') {
      nextSort = sortKey
    } else {
      nextSort = `-${sortKey}`
    }

    setTotals([...data].sort(sortBy(nextSort)))
    setSort(nextSort)
  }

  useEffect(() => {
    if (!totals.length) {
      setTotals(getTotals(data))
    }
  }, [data, totals.length])

  const maxPositive = totals && max(totals.map(x => x.positive))
  const maxDeath = totals && max(totals.map(x => x.death))

  const arrow = <span>{sort === sanitizedSort ? '↓' : '↑'}</span>

  return (
    <div className="StatesTotals mb4">
      <h2 className="f3 mv4">Current State Totals</h2>
      {errorMessage ? (
        <p className="tr mt0 mb3">{errorMessage}</p>
      ) : !data ? (
        <p className="tr mt0 mb3 tc">Loading totals...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="collapse dt--fixed ba br2 b--black-10 pv2 ph3 f5">
            <tbody>
              <tr className="striped--light-gray tl f6 ttu">
                <th
                  className={cx('pv2 ph3 pointer w5', {
                    fw5: sanitizedSort !== 'state'
                  })}
                  onClick={() => handleSort('state')}
                >
                  State {sanitizedSort === 'state' && arrow}
                </th>
                <th
                  className={cx('pv2 ph3 pointer w4', {
                    fw5: sanitizedSort !== 'positive'
                  })}
                  onClick={() => handleSort('positive')}
                >
                  Positive {sanitizedSort === 'positive' && arrow}
                </th>
                <th
                  className={cx('pv2 ph3 pointer w4', {
                    fw5: sanitizedSort !== 'death'
                  })}
                  onClick={() => handleSort('death')}
                >
                  Deaths {sanitizedSort === 'death' && arrow}
                </th>
                <th
                  className={cx('pv2 ph3 pointer w4', {
                    fw5: sanitizedSort !== 'total'
                  })}
                  onClick={() => handleSort('total')}
                >
                  Tested {sanitizedSort === 'total' && arrow}
                </th>
                <th
                  className={cx('pv2 ph3 pointer w5', {
                    fw5: sanitizedSort !== 'lastUpdateEt'
                  })}
                  onClick={() => handleSort('lastUpdateEt')}
                >
                  Last Updated (EDT) {sanitizedSort === 'lastUpdateEt' && arrow}
                </th>
              </tr>
              {totals.map(x => (
                <tr className="striped--light-gray" key={x.state}>
                  <td className="pv2 ph3 w4">
                    {getStateName(x.state) || x.state}
                  </td>
                  <td
                    className={cx('pv2 ph3 w4', {
                      'fw7 red': x.positive === maxPositive
                    })}
                  >
                    {x.positive ? x.positive.toLocaleString() : '--'}
                  </td>
                  <td
                    className={cx('pv2 ph3 w4', {
                      'fw7 red': x.death === maxDeath
                    })}
                  >
                    {x.death ? x.death.toLocaleString() : '--'}
                  </td>
                  <td className="pv2 ph3 w4">
                    {x.total ? x.total.toLocaleString() : '--'}
                  </td>
                  <td className="pv2 ph3 w5">
                    {DateTime.fromFormat(
                      x.lastUpdateEt,
                      dateFormat
                    ).toLocaleString(DateTime.DATETIME_SHORT)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StatesTotals
