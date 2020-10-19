import React from 'react';
import NodeData from './nodeData'
import PropTypes from 'prop-types'

SelectedDay.propTypes = {
    selectedDay: PropTypes.object.isRequired
}

function SelectedDay({selectedDay}){
    if(selectedDay){
    return (
        <div 
        className="selected-day-info" 
        id={`day-info-${selectedDay.createdOrder}`} 
        style={{color: "white"}}
        >
        <p><i>Selected: </i></p>
        <div id="flex-header"> 
            <svg width="20" height="20" style={{display: "inline"}}>
                <circle 
                    id="day-node-icon" 
                    className={`month-${selectedDay.month} ${selectedDay.code} ${selectedDay.createdOrder} weekday-${selectedDay.dayName}`}
                    cx="10" 
                    cy="10" 
                    r="10" 
                />
            </svg>  
            <div className={`date-heading monthfont-${selectedDay.month}`}>
                {selectedDay.dayName}, {selectedDay.monthName} {selectedDay.daydate}, {selectedDay.fullYear}
            </div> 
        </div>
        <NodeData 
            formatOne={selectedDay.formatOne}  
            milliseconds={selectedDay.milliseconds}  
            createdOrder={selectedDay.createdOrder}  
            dayDate={selectedDay.daydate}  
            month={selectedDay.month}  
            weekDay={selectedDay.weekday}  
            dayName={selectedDay.dayName}  
            monthName={selectedDay.monthName}  
            xCoordinate={selectedDay.xcoord}  
            yCoordinate={selectedDay.ycoord}  
            code={selectedDay.code} 
        />
    </div>  
    )
    }
    return (
        <div>nada!!</div>
    )
}

export default SelectedDay;
