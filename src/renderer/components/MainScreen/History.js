import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { HistoryIcon } from '../Icons'
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
      codes: null
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
    this.setState({ grouped, codes })
  }

  render() {
    const { onHistoryClick, classes } = this.props
    const { grouped, codes } = this.state
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
                <Typography variant="subtitle1">{`${c}   /   ${grouped[c][0].title}`}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="panel-details">
                  {grouped[c].map((g, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="panel-summary"
                      onClick={e => onHistoryClick(e, g.indexHist)}
                    >
                      <HistoryIcon fontSize="inherit" className="panel-icon" />
                      <div>
                        <div className="panel-info">
                          <Typography
                            variant="subtitle1"
                            className="panel-exam"
                            style={{ color: g.status ? 'green' : 'red' }}
                          >
                            {g.status ? 'PASS' : 'FAIL'}
                          </Typography>
                          <Typography variant="subtitle1">{g.score}%</Typography>
                        </div>
                        <div className="panel-info">
                          <Typography variant="caption" className="panel-exam">
                            Date: {getDateString(g.date)}
                          </Typography>
                          <Typography variant="caption" className="panel-exam">
                            Time: {getTimeString(g.date)}
                          </Typography>
                          <Typography variant="caption">
                            Elapsed Time: {getTimeHHMMSS(g.elapsed)}
                          </Typography>
                        </div>
                        <div className="panel-info">
                          <Typography variant="caption">
                            Filename: {getFilename(g.filename)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </div>
    )
  }
}

export default withStyles(styles)(History)
