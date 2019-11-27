import React from 'react'

const Tooltip = ({ content, ...props }) => {
  return (
    <div {...props}>
      {content}
      <div className="tooltip-arrow-down"></div>
    </div>
  )
}

export { Tooltip };