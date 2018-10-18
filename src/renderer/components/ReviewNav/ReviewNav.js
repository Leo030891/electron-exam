import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Typography from '@material-ui/core/Typography'
import ReviewMenuLeftTop from './ReviewMenuLeftTop'
import ReviewMenuLeftBack from './ReviewMenuLeftBack'
import ReviewMenuLeftBottom from './ReviewMenuLeftBottom'
import ResultGrid from './ResultGrid'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.getContrastText(theme.palette.common.white),
    boxShadow: theme.shadows[0],
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    width: 73,
    height: 63,
    marginLeft: 0,
    marginRight: 36,
    backgroundColor: theme.palette.background.default,
    borderRadius: 0,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  chevron: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  content: {
    flexGrow: 1,
    height: '90vh',
    backgroundColor: theme.palette.common.white
  }
})

class ReviewNav extends Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  setReviewType = reviewType => {
    this.props.setReviewMode(1)
    this.props.setReviewType(reviewType)
  }

  backToSummary = () => {
    this.props.setReviewMode(0)
    this.props.setReviewType(null)
  }

  render() {
    const { reviewMode, title, code, report, total, exit, classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1">
              {title} {code}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
          }}
          open={this.state.open}
        >
          <div className={classNames(classes.toolbar, classes.chevron)}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {this.state.open && (
            <Typography variant="subtitle1" align="center">
              Review
            </Typography>
          )}
          <ReviewMenuLeftTop total={total} report={report} setReviewType={this.setReviewType} />
          <Divider />
          {this.state.open && (
            <ResultGrid total={total} report={report} setReviewType={this.setReviewType} />
          )}
          {this.state.open && <Divider />}
          {reviewMode !== 0 && <ReviewMenuLeftBottom backToSummary={this.backToSummary} />}
          <Divider />
          <ReviewMenuLeftBack exit={exit} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(ReviewNav)
