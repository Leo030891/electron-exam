import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function Settings({ setMainMode }) {
  return (
    <div className="settings">
      <Typography variant="h4">Settings</Typography>
      <Button onClick={() => setMainMode(0)}>Cancel</Button>
    </div>
  )
}

export default Settings
