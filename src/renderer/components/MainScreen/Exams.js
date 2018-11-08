import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HomeIcon from '@material-ui/icons/Home'
import SchoolIcon from '@material-ui/icons/School'
import { getFilename } from '../../utils/fileHelpers'

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

function Exams({ exams, filepaths, fileData, onExamClick, classes }) {
  if (exams.length) {
    return (
      <div className="panels">
        <Typography variant="h4">Exam Files</Typography>
        <ExpansionPanel square elevation={1} defaultExpanded classes={{ root: classes.panelRoot }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{ root: classes.summaryRoot }}
          >
            <HomeIcon />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="panel-details">
              {exams.map((exam, i) => (
                <div
                  key={`${exam.title}-${i}`}
                  onClick={e => onExamClick(e, i)}
                  className="panel-summary"
                >
                  <SchoolIcon fontSize="inherit" className="panel-icon" />
                  <div>
                    <div className="panel-info">
                      <Typography variant="h6" className="panel-exam">
                        {exam.title}
                      </Typography>
                      <Typography variant="h6">{exam.code}</Typography>
                    </div>
                    <div className="panel-info">
                      <Typography variant="caption" className="panel-exam">
                        File: {getFilename(filepaths[i])}
                      </Typography>
                      <Typography variant="caption">
                        Size: {`${(fileData[i].size / 1024).toFixed(2)} KB`}
                      </Typography>
                    </div>
                    <div className="panel-info">
                      <Typography variant="caption" className="panel-exam">
                        Questions: {exam.test.length}
                      </Typography>
                      <Typography variant="caption">Time Limit: {exam.time} Min</Typography>
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
          No Saved Exams
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Exams)
