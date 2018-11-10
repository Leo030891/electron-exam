import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NoneSaved from './NoneSaved'
import SessionItem from './SessionItem'
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
                  <SessionItem
                    key={i}
                    title={s.title}
                    code={s.code}
                    date={getDateString(s.date)}
                    time={getTimeString(s.date)}
                    answered={`${s.completed}/${s.answers.length}`}
                    remaining={getTimeHHMMSS(s.time)}
                    filename={getFilename(s.filename)}
                    onClick={e => onSessionClick(e, i)}
                  />
                ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  } else {
    return <NoneSaved message="No Sessions Saved" />
  }
}

export default withStyles(styles)(Sessions)
