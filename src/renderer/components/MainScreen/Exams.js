import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HomeIcon from '@material-ui/icons/Home'
import SchoolIcon from '@material-ui/icons/School'
import ExamItem from './ExamItem'
import NoneSaved from './NoneSaved'
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
                <ExamItem
                  key={i}
                  title={exam.title}
                  code={exam.code}
                  filename={getFilename(filepaths[i])}
                  size={`${(fileData[i].size / 1024).toFixed(2)} KB`}
                  questions={exam.test.length}
                  time={exam.time}
                  onClick={e => onExamClick(e, i)}
                />
              ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  } else {
    return <NoneSaved message="No Exam Files Saved" />
  }
}

export default withStyles(styles)(Exams)
