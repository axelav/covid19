import React from 'react'
import USTotals from './components/USTotals'
import StatesTotals from './components/StatesTotals'
import USChart from './components/USChart'
import StatesChart from './components/StatesChart'

const App = () => (
  <div className="App black-80 sans-serif f6 mw8 center">
    <div className="mh2 mv4">
      <header className="App-header">
        <h1 className="f2 mt0 mb4">COVID-19 in the United States</h1>
        {/* <hr className="near-white" /> */}
      </header>
      <hr className="near-white" />
      <section>
        <USChart />
        <USTotals />
        <hr className="near-white" />
        <StatesChart />
        <StatesTotals />
      </section>
      <footer>
        <p className="mt0 mb3">
          Data from{' '}
          <a
            href="https://covidtracking.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The COVID Tracking Project
          </a>
        </p>
      </footer>
    </div>
  </div>
)

export default App
