import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ListItem from './ListItem'
import shuffleArray from '../../utils/shuffleArray'
const update = require('immutability-helper')

class ListOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      choices: null
    }
  }

  componentDidMount() {
    let { choices, order } = this.props
    let newChoices
    if (order) newChoices = order.map(o => choices[o])
    else newChoices = shuffleArray(choices.slice(0))
    this.setState({ choices: newChoices })
  }

  renderChoices = () => {
    const { choices } = this.state
    return (
      choices &&
      choices.map((c, i) => (
        <ListItem
          key={c.label}
          index={i}
          id={c.label}
          text={c.text}
          moveAnswer={this.moveAnswer}
          onDragEnd={this.onDragEnd}
        />
      ))
    )
  }

  moveAnswer = (dragIndex, hoverIndex) => {
    const { choices } = this.state
    const dragChoice = choices[dragIndex]
    this.setState(
      update(this.state, {
        choices: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragChoice]]
        }
      })
    )
  }

  onDragEnd = () => {
    const { question, onAnswerDragOrder } = this.props
    let userGuess = this.state.choices.map(c => c.label)
    onAnswerDragOrder(userGuess, question)
  }

  render() {
    return <div className="list-order">{this.renderChoices()}</div>
  }
}

export default DragDropContext(HTML5Backend)(ListOrder)
