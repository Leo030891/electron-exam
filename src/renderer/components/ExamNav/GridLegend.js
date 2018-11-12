import React from 'react'

function GridLegend() {
  return (
    <div className="legend">
      <div className="row">
        Answered <div className="mini answered" />
      </div>
      <div className="row">
        Marked <div className="mini marked" />
      </div>
      <div className="row">
        Incomplete <div className="mini incomplete" />
      </div>
    </div>
  )
}

export default GridLegend
