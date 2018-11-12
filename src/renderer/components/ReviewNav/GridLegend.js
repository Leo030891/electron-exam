import React from 'react'

function GridLegend() {
  return (
    <div className="legend">
      <div className="row">
        Correct <div className="mini green" />
      </div>
      <div className="row">
        Incorrect <div className="mini red" />
      </div>
      <div className="row">
        Incomplete
        <div className="mini grey" />
      </div>
    </div>
  )
}

export default GridLegend
