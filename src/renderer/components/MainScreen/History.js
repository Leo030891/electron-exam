import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NoneSaved from './NoneSaved'
import HistoryTitle from './HistoryTitle'
import HistoryItem from './HistoryItem'
import { getFilename } from '../../utils/fileHelpers'
import { getDateString, getTimeString, getTimeHHMMSS } from '../../utils/dateHelpers'
import groupBy from 'lodash/groupBy'
import isEqual from 'lodash/isEqual'

const styles = theme => ({
  panelRoot: {
    marginTop: 0,
    borderRadius: 0
  },
  summaryRoot: {
    backgroundColor: theme.palette.grey[300],
    minHeight: 64,
    marginTop: 10
  }
})

class History extends Component {
  constructor(props) {
    super(props)

    this.state = {
      grouped: null,
      codes: null,
      averages: null
    }
  }

  componentDidMount() {
    this.groupHistory()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.history, this.props.history)) {
      this.groupHistory()
    }
  }

  groupHistory = () => {
    const { history } = this.props
    let codes = []
    history.forEach((el, i) => {
      el.indexHist = i
      if (codes.indexOf(el.code) === -1) codes.push(el.code)
    })
    let grouped = groupBy(history, 'code')
    let averages = []
    for (let j = 0; j < codes.length; j++) {
      let sum = 0
      grouped[codes[j]].forEach(g => {
        sum += g.score
      })
      averages.push(Math.round(sum / grouped[codes[j]].length))
    }
    this.setState({ grouped, codes, averages })
  }

  render() {
    const { history, onHistoryClick, classes } = this.props
    const { grouped, codes, averages } = this.state
    if (history.length) {
      return (
        <div className="panels">
          <Typography variant="h4">History</Typography>
          {codes &&
            codes.map((c, i) => (
              <ExpansionPanel key={c} square elevation={1} defaultExpanded>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  classes={{ root: classes.summaryRoot }}
                >
                  <HistoryTitle title={grouped[c][0].title} code={c} average={averages[i]} />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="panel-details">
                    {grouped[c].map((g, j) => (
                      <HistoryItem
                        key={j}
                        pass={g.status}
                        score={g.score}
                        date={getDateString(g.date)}
                        time={getTimeString(g.date)}
                        elapsed={getTimeHHMMSS(g.elapsed)}
                        filename={getFilename(g.filename)}
                        onClick={e => onHistoryClick(e, g.indexHist)}
                      />
                    ))}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
        </div>
      )
    } else {
      return <NoneSaved message="No History Saved" />
    }
  }
}

export default withStyles(styles)(History)
