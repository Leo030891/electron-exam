import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { compose } from 'recompose'
import { DragSource, DropTarget } from 'react-dnd'
import Typography from '@material-ui/core/Typography'

const ItemTypes = {
  DOC: 'drag-order-choice'
}

const choiceSource = {
  beginDrag(props) {
    return {
      id: props.label,
      index: props.index
    }
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return
    }
    props.onDragEnd()
  }
}

const choiceTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null
    }

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveAnswer(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

class ListItem extends Component {
  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props
    const opacity = isDragging ? 0.75 : 1
    const backgroundColor = isDragging ? 'rgb(232, 244, 252)' : 'rgb(250, 250, 250)'
    const border = isDragging && '2px dashed rgb(1, 139, 244)'
    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className="list-order-box" style={{ opacity, backgroundColor, border }}>
            <Typography variant="subtitle1" className="list-order-text">
              {text}
            </Typography>
          </div>
        )
      )
    )
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export default compose(
  DragSource(ItemTypes.DOC, choiceSource, collectSource),
  DropTarget(ItemTypes.DOC, choiceTarget, collectTarget)
)(ListItem)
