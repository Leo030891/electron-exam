import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HomeIcon from '@material-ui/icons/Home'
import SchoolIcon from '@material-ui/icons/School'
import { getFile } from '../../utils/fileHelpers'

const styles = theme => ({
  panelRoot: {
    marginTop: 0
  },
  summaryRoot: {
    backgroundColor: theme.palette.grey[300],
    minHeight: 64
  }
})

function MainScreen({ loading, mainMode, exams, fileData, filepaths, onSummaryClick, classes }) {
  if (loading) return <h4>Loading...</h4>
  else {
    return [
      <Slide key="exams" in={mainMode === 0} direction="left">
        <div>
          <Typography variant="h3">Exam Files</Typography>
          <ExpansionPanel elevation={1} defaultExpanded classes={{ root: classes.panelRoot }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: classes.summaryRoot, expanded: classes.summaryExpanded }}
            >
              <HomeIcon />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="exam-details">
                {exams.map((exam, i) => (
                  <div
                    key={`${exam.title}-${i}`}
                    onClick={() => onSummaryClick(i)}
                    className="exam-summary"
                  >
                    <SchoolIcon fontSize="inherit" className="exam-icon" />
                    <div>
                      <div className="exam-info">
                        <Typography variant="subtitle1" className="exam-exam">
                          {exam.code}
                        </Typography>
                        <Typography variant="subtitle1">{exam.title}</Typography>
                      </div>
                      <div className="exam-info">
                        <Typography variant="caption" className="exam-exam">
                          File: {getFile(filepaths[i])}
                        </Typography>
                        <Typography variant="caption">
                          Size: {`${(fileData[i].size / 1024).toFixed(2)} KB`}
                        </Typography>
                      </div>
                      <Typography variant="caption">{exam.test.length} Questions</Typography>
                    </div>
                  </div>
                ))}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Slide>,
      <Slide key="history" in={mainMode === 1} direction="left">
        <div>History</div>
      </Slide>,
      <Slide key="sessions" in={mainMode === 2} direction="left">
        <div>Sessions</div>
      </Slide>
    ]
  }
}

export default withStyles(styles)(MainScreen)
