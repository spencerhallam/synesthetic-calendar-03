import React from 'react'
import NodeData from './nodeData'

function TodayInformation({todayData}){
    if(!todayData){
        return <div>loading...</div>
    }
    console.log("TD2!!: ", todayData);
    return (
        <div className="day-info" id={`day-info-${todayData.createdOrder}`}>
            <p><i>Today: </i></p>
            <div id="flex-header">
                <svg width="20" height="20">
                    <circle 
                        id="day-node-icon" 
                        className={`month-${todayData.month} ${todayData.code} ${todayData.createdOrder} weekday-${todayData.dayName}`}
                        cx="10" 
                        cy="10" 
                        r="10" 
                    />
                </svg>  
                <div className={`date-heading monthfont-${todayData.month}`}>
                    {todayData.dayName}, {todayData.monthName} {todayData.daydate}, {todayData.fullYear}
                </div>
            </div>
            <NodeData 
                formatOne={todayData.formatOne}  
                milliseconds={todayData.milliseconds}  
                createdOrder={todayData.createdOrder}  
                dayDate={todayData.daydate}  
                month={todayData.month}  
                weekDay={todayData.weekday}  
                dayName={todayData.dayName}  
                monthName={todayData.monthName}  
                xCoordinate={todayData.xcoord}  
                yCoordinate={todayData.ycoord}  
                code={todayData.code} 
            />
        </div>
    )  
}

export default TodayInformation