import React from 'react';

function YearAhead({yearData = {}}){
 
       return (
        yearData.map((day) => {
           return (
                <div 
                    className="day-info" 
                    id={`day-info-${day.createdOrder}`} 
                    style={day.code === "today" ? {display: "block"} : {display: "none"}}
                >
                    <div id="flex-header">
                        <svg width="30" height="30" style={{display: "inline"}}>
                            <circle 
                                id="day-node" 
                                className={`month-${day.month} ${day.code} ${day.createdOrder} weekday-${day.dayName}`}
                                cx="12" 
                                cy="12" 
                                r="10" 
                            />
                        </svg>  
                        <div className={`date-heading monthfont-${day.month}`}>{day.dayName}, {day.monthName} {day.daydate}, {day.fullYear}</div> 
                        </div>
        
                        Node Data: 
                        <strong>alt: </strong> {day.formatOne}  
                        <strong>ms:</strong> {day.milliseconds}  
                        <strong>created:</strong> {day.createdOrder}  
                        <strong>date:</strong> {day.daydate}  
                        <strong>mo-index:</strong> {day.month}  
                        <strong>weekday-index:</strong> {day.weekday}  
                        <strong>day-name:</strong> {day.dayName}  
                        <strong>month-name:</strong> {day.monthName}  
                        <strong>x-coord:</strong> {day.xcoord}  
                        <strong>y-coord:</strong> {day.ycoord}  
                        <strong>day-code:</strong> {day.code} 
                </div>

            )
            }
        ))
        }        
    
export default YearAhead;