import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SwitchOption from './SwitchOption'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const FILEPATH = path.resolve(__static, 'options.json')

const styles = theme => ({})

class Options extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: true
    }
  }

  componentDidMount() {
    const { timer } = this.props.options
    this.setState({
      timer
    })
  }

  saveOptions = () => {
    let options = {
      timer: this.state.timer
    }
    writeFile(FILEPATH, JSON.stringify(options))
      .then(() => {
        this.props.saveOptions(options)
        this.props.setMainMode(0)
      })
      .catch(console.error)
  }

  onChangeTimer = (e, timer) => this.setState({ timer })

  render() {
    const { timer } = this.state
    const { setMainMode, classes } = this.props
    return (
      <div className="settings">
        <Typography variant="h4">Options</Typography>
        <Typography variant="h6">Under Construction</Typography>
        <div className="columns">
          <div>
            <SwitchOption
              label="Timer On"
              description="Use exam timer with time defined in exam file"
              checked={timer}
              onChange={this.onChangeTimer}
            />
          </div>
          <div />
          <div />
        </div>
        <Button onClick={this.saveOptions} className="button">
          Save
        </Button>
        <Button onClick={() => setMainMode(0)}>Cancel</Button>
      </div>
    )
  }
}

export default withStyles(styles)(Options)
