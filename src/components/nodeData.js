import React from 'react'

function NodeData({
    formatOne,
    milliseconds,
    createdOrder,
    dayDate,
    month,
    weekDay,
    dayName,
    monthName,
    xCoordinate,
    yCoordinate,
    code
}){
    return (
        <div className="node-data">
            <span><strong>alt: </strong> {formatOne} </span>
            <span><strong>ms:</strong> {milliseconds} </span>
            <span><strong>created:</strong> {createdOrder} </span>
            <span><strong>date:</strong> {dayDate} </span>
            <span><strong>mo-index:</strong> {month} </span>
            <span><strong>weekday-index:</strong> {weekDay} </span>
            <span><strong>day-name:</strong> {dayName} </span>
            <span><strong>month-name:</strong> {monthName} </span>
            <span><strong>x-coord:</strong> {xCoordinate} </span>
            <span><strong>y-coord:</strong> {yCoordinate} </span>
            <span><strong>day-code:</strong> {code}</span>
        </div>
    )
}

export default NodeData;