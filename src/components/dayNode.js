import React from 'react';
import PropTypes from 'prop-types'

DayNode.propTypes = {
    dayData: PropTypes.array.isRequired,
    getSelectedDay: PropTypes.func.isRequired,
    isSelectedDay: PropTypes.bool
}

function DayNode({dayData, getSelectedDay, isSelectedDay = false}){
    //console.log("isSelectedDay: ", isSelectedDay);
    let nodeRadius = 3;
    let strokeWidth = "4px";
    let stroke = "hsla(0, 0%, 0%, .0)";
    let fillOpacity = (((366-dayData.createdOrder)*0.02173224043) < 1 ? ((366-dayData.createdOrder)*0.02173224043) : .7);
    if(isSelectedDay){
        nodeRadius = 4;
        strokeWidth = "1px";
        stroke = "hsla(0, 0%, 0%, 1)";
        fillOpacity = 1;
    }
    return (
        <>
            <circle 
                id="day-node" 
                className={`month-${dayData.month} ${dayData.code} ${dayData.createdOrder} weekday-${dayData.dayName}`} 
                onClick={() => getSelectedDay(dayData)} 
                fillOpacity={fillOpacity}
                cx={dayData.xcoord}
                cy={dayData.ycoord}
                r={nodeRadius}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            {isSelectedDay &&
            <>
            {Math.abs(dayData.textAngle) <= 90 || Math.abs(dayData.textAngle) === 360 ?
            <text 
                className={`text-${dayData.code} weekday-${dayData.dayName} displayInfo`} 
                x={dayData.xcoord+7} 
                y={dayData.ycoord} 
                fill="white"
                fontSize="10px" 
                fontFamily="Arial" 
                dy=".3em"
                textAnchor="start" 
                transform={`rotate(${dayData.textAngle} ${dayData.xcoord} ${dayData.ycoord})`}
            >
                {dayData.dayName}, {dayData.month}
            </text>  
            :
            <text 
                className={`text-${dayData.code} weekday-${dayData.dayName} displayInfo`} 
                x={dayData.xcoord-7} 
                y={dayData.ycoord} 
                fill="white"
                textAnchor="end" 
                fontSize="10px" 
                fontFamily="Arial" 
                dy=".3em"
                transform={`rotate(${dayData.textAngle-180} ${dayData.xcoord} ${dayData.ycoord})`}
            >
               {dayData.dayName}, {dayData.month}
            </text> 
            }
            
            </>
            }
            {dayData.month === 13 && 
                <text 
                className={`text-${dayData.code} weekday-${dayData.dayName} displayInfo`} 
                x={dayData.xcoord-100} 
                y={dayData.ycoord} 
                fill="white"
                fontSize="10px" 
                fontFamily="Arial" 
                dy=".3em"
                textAnchor="start" 
                transform={`rotate(${dayData.textAngle + 45} ${dayData.xcoord} ${dayData.ycoord})`}
            >
                NOVEMBER
                </text> 
            }
        </>
    )
}

export default DayNode;
