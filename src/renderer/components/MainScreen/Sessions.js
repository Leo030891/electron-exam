import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SaveIcon from '@material-ui/icons/SaveSharp'
import { getFilename } from '../../utils/fileHelpers'
import { getDateString, getTimeString, getTimeHHMMSS } from '../../utils/dateHelpers'

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

function Sessions({ sessions, onSessionClick, classes }) {
  if (sessions.length) {
    return (
      <div className="panels">
        <Typography variant="h4">Saved Sessions</Typography>
        <ExpansionPanel square elevation={1} defaultExpanded classes={{ root: classes.panelRoot }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{ root: classes.summaryRoot }}
          >
            <Typography variant="subtitle1">Sessions</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="panel-details">
              {sessions &&
                sessions.map((s, i) => (
                  <div
                    key={`${s.filename}-${i}`}
                    onClick={e => onSessionClick(e, i)}
                    className="panel-summary"
                  >
                    <SaveIcon fontSize="inherit" className="panel-icon" />
                    <div>
                      <div className="panel-info">
                        <Typography variant="h6" className="panel-exam">
                          {s.title}
                        </Typography>
                        <Typography variant="h6">{s.code}</Typography>
                      </div>
                      <div className="panel-info">
                        <Typography variant="caption" className="panel-exam">
                          {`Questions Answered: ${s.completed}/${s.answers.length}`}
                        </Typography>
                        <Typography variant="caption" className="panel-exam">
                          {`Time Remaining: ${getTimeHHMMSS(s.time)}`}
                        </Typography>
                      </div>
                      <div className="panel-info">
                        <Typography variant="caption" className="panel-exam">
                          {`Date: ${getDateString(s.date)}`}
                        </Typography>
                        <Typography variant="caption" className="panel-exam">
                          {`Time: ${getTimeString(s.date)}`}
                        </Typography>
                      </div>
                      <div className="panel-info">
                        <Typography variant="caption">
                          Filename: {getFilename(s.filename)}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  } else {
    return (
      <div className="empty-panels">
        <Typography variant="h6" align="center" className="message">
          No Saved Sessions
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Sessions)
