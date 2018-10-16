import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { HistoryIcon } from '../Icons'
import { getFilename } from '../../utils/fileHelpers'
import groupBy from 'lodash/groupBy'

const styles = theme => ({
  panelRoot: {
    marginTop: 0,
    borderRadius: 0
  },
  summaryRoot: {
    backgroundColor: theme.palette.grey[300],
    minHeight: 64
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
    const { history } = this.props
    let codes = []
    history.forEach(el => {
      if (codes.indexOf(el.code) === -1) codes.push(el.code)
    })
    let grouped = groupBy(history, 'code')
    this.setState({ grouped, codes })
  }

  render() {
    const { classes } = this.props
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
                <Typography variant="subtitle1">{c}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="panel-details">
                  {grouped[c].map((g, j) => (
                    <div key={`${i}-${j}`} className="panel-summary">
                      <HistoryIcon fontSize="inherit" className="panel-icon" />
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
