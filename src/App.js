import React from 'react'
import USTotals from './components/USTotals'
import USChart from './components/USChart'
import StatesChart from './components/StatesChart'

const App = () => (
  <div className="App sans-serif f6 mw8 center">
    <div className="mh2 mv4">
      <header className="App-header">
        <h1 className="f2 mt0 mb4 tc">COVID-19 in the United States</h1>
        {/* <hr className="near-white" /> */}
      </header>
      <section>
        <USTotals />
        <hr className="near-white" />
        <USChart />
        <StatesChart />
      </section>
      <footer>
        <p className="tc mt0 mb3">
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
