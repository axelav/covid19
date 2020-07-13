const DATE_TIME_LABEL_FORMATS = {
  millisecond: '%H:%M:%S.%L',
  second: '%H:%M:%S',
  minute: '%b %e %H:%M:%S',
  hour: '%H:%M',
  day: '%b %e',
  week: '%b %e',
  month: "%b '%y",
  year: '%Y'
}

const defaultChartOpts = {
  credits: { enabled: false },
  chart: {
    style: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif"
    }
  },
  plotOptions: {
    series: {
      type: 'line'
    },
    line: {
      animation: false,
      marker: {
        enabled: false
      }
    }
  },
  title: {
    text: null
  },
  yAxis: {
    gridLineWidth: 1,
    gridLineDashStyle: 'longdash',
    labels: {
      style: {
        color: 'black',
        fontSize: '0.75rem'
      }
    },
    title: {
      text: null
    }
  },
  xAxis: {
    gridLineWidth: 1,
    gridLineDashStyle: 'longdash',
    type: 'datetime',
    labels: {
      style: {
        color: 'black',
        fontSize: '0.75rem'
      }
    },
    dateTimeLabelFormats: DATE_TIME_LABEL_FORMATS,
    title: {
      text: null
    }
  },
  tooltip: {
    dateTimeLabelFormats: DATE_TIME_LABEL_FORMATS,
    headerFormat:
      "<span style='font-size: 0.875rem; margin-bottom: 0.875rem'>{point.key}</span><br />",
    pointFormatter: function() {
      return `<span style="color:${this.color}">●</span>  <b>${
        this.series.name
      }</b>: ${this.y.toLocaleString()}`
    },
    style: {
      fontSize: '0.875rem',
      color: 'black'
    }
  },
  legend: {
    verticalAlign: 'top',
    itemStyle: {
      fontSize: '0.75rem',
      color: 'black'
    },
    itemHoverStyle: {
      color: 'gray'
    }
  }
}

export default defaultChartOpts
