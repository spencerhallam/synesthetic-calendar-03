function createYearObjectArray(todayCalcs, yearLengthInDays, shapeType = "circle"){
  const dataArray = []
  for(let i = 0; i < yearLengthInDays; i++){
    let thisDay = todayCalcs.start + (todayCalcs.millisecondsPerDay*i);
    let standard = new Date(thisDay);
    let daydatei = standard.getDate();
    let theYear = standard.getFullYear();
    let slashFormat = (standard.getMonth() + 1) + "/" + (standard.getDate()) + "/" +  (standard.getFullYear());
    let currDayFormat = (todayCalcs.formatNow.getMonth() + 1) + "/" + (todayCalcs.formatNow.getDate()) + "/" +  (todayCalcs.formatNow.getFullYear());
    let isToday = slashFormat === currDayFormat ? "today" : "otherday";
    let monthId = standard.getMonth() + 1;
    let dayId = standard.getDay();//day of the week
    let shapeCoordinate = {};
    console.log("shapeType: ", shapeType);
    if(shapeType === "circle"){
      shapeCoordinate = new YearCircle(1200, 365, i, 50);
    }else if(shapeType === "ellipse"){
      shapeCoordinate = calculateEllipsePoints(368, 600, 300, 50, i);
    }
    //given shapeCoordinate x and y, calculate angle of ray from center point
    const dayNode = new SynestheticMonth(
      standard,
       thisDay,
       slashFormat,
       i,
       daydatei,
       monthId,
       dayId,
       theYear,
       shapeCoordinate.x,
       shapeCoordinate.y,
       isToday,
       shapeCoordinate.angleFromCenter);
    if(thisDay < todayCalcs.nextYearInMilliseconds){
      dataArray.push(dayNode);
    }
    
  }
  return dataArray
}

export default createYearObjectArray;

function TodayCalculations(now){
    this.now = now;
    this.start = now.getTime();
    this.formatNow = new Date(this.start);
    this.nextYear = (this.formatNow.getMonth() + 1) + "/" + (this.formatNow.getDate()) + "/" +  (this.formatNow.getFullYear() + 1);
    this.nextYearStandard = new Date(this.nextYear);
    this.nextYearInMilliseconds = this.nextYearStandard.getTime();
    this.millisecondsPerDay = 86400000;
  }
  
  function createYearArray(todayCalcs){
    const {now, start, formatNow, nextYear, nextYearStandard, nextYearInMilliseconds, millisecondsPerDay} = todayCalcs;
    const yearOfDays = []
    for(let i = 0; i < 370; i++){
      let thisDay = start + (millisecondsPerDay*i)
      if(thisDay < nextYearInMilliseconds){
        yearOfDays.push(thisDay);
      }
    }
    return yearOfDays
  }
  
  // Utility Functions
  const convertToDayOfTheWeek = (dayOfTheWeekAsNumber) => {
    let day = dayOfTheWeekAsNumber;
    if(day === 0){
      return "Sunday";
    } else if(day === 1){
      return "Monday";
    } else if(day === 2){
      return "Tuesday";
    } else if(day === 3){
      return "Wednesday";
    } else if(day === 4){
      return "Thursday";
    } else if(day === 5){
      return "Friday";
    } else if(day === 6){
      return "Saturday";
    } else {
      return "not found";
    }
  }
  
  const monthNumToName = (monthAsNumber) => {
    let month = monthAsNumber;
    if(month === 1){
      return "Jan";
    } else if(month === 2){
      return "Feb";
    } else if(month === 3){
      return "Mar";
    } else if(month === 4){
      return "Apr";
    } else if(month === 5){
      return "May";
    } else if(month === 6){
      return "Jun";
    } else if(month === 7){
      return "Jul";
    } else if(month === 8){
      return "Aug";
    } else if(month === 9){
      return "Sep";
    } else if(month === 10){
      return "Oct";
    } else if(month === 11){
      return "Nov";
    } else if(month === 12){
      return "Dec";
    } else {
      return "not found";
    }
  }
  
  function SynestheticMonth (
     date,
     milliseconds,
     formatOne,
     createdOrder,
     daydate,
     month,
     weekday,
     fullYear,
     xcoord,
     ycoord,
     code,
     textAngle
    ) {
    this.date = date;
    this.milliseconds = milliseconds;
    this.formatOne = formatOne;
    this.createdOrder = createdOrder;
    this.daydate = daydate;
    this.month = month;
    this.weekday = weekday;
    this.fullYear = fullYear;
    this.dayName = convertToDayOfTheWeek(weekday);
    this.monthName = monthNumToName(month);
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.code = code;
    this.textAngle = textAngle;
  }
  
  function YearCircle(radius = 1200, numberOfNodes = 366, nodeIndex = null, graphicPadding = 50){
    this.radius = radius;
    this.numberOfNodes = numberOfNodes;
    this.graphicPadding = graphicPadding;
    this.nodeIndex = nodeIndex;
    this.width = (this.radius * 2) + this.graphicPadding;
    this.anglechange = 10.471975511965978;
    this.angle = ((this.nodeIndex / (this.numberOfNodes/2)) * Math.PI) + this.anglechange; // Calculate the angle at which the element will be placed.
    this.x = (this.radius * Math.cos(this.angle)) + (this.width/2); // Calculate the x position of the element.
    this.y = (this.radius * Math.sin(this.angle)) + (this.width/2); // Calculate the y position of the element.
  }
  
  function formatYear(arrayx){
      let yoyo = arrayx.map(function(index){
        let mynumtodate = new Date(index);
        let myday = mynumtodate.getDate();
        let mymonth = mynumtodate.getMonth() + 1;
        let myyear = mynumtodate.getFullYear();
        return mymonth + "/" + myday + "/" + myyear;
      })
    return yoyo;
  }
  
  const _now = new Date();
  const _yearLengthInDays = 366;
  const todayCalcs = new TodayCalculations(_now);
  const yearArray = createYearArray(todayCalcs); //stores array of milliseconds for each day
  export const calculatedYearNodes = createYearObjectArray(todayCalcs, _yearLengthInDays, "ellipse");
  const formattedYear = formatYear(yearArray); //stores array of formatted dates
  
  //ELLIPSE CODE:
   /*
    * Bounding Square Reference: (see Wikipedia Article on Steiner Generation for Ellipses)
    * topLeftPoint = {x: 0, y: 2*vertRad};
    * topRightPoint = {x: 2*horizRad, y: 2*vertRad};
    * bottomRightPoint = {x: 2*horizRad, y: -2*vertRad};
    * bottomLeftPoint = {x: 0, y: -2*vertRad};
    */
  function calculateEllipsePoints(
      nodeNum = 40, 
      horizRad = 1200, 
      vertRad = 600, 
      padding = 50, 
      i
    ){
    const horizLength = 2*horizRad;
    const vertLength = 2*vertRad;
    
    if((nodeNum % 4) !== 0){
      console.log("nodeNum not divisible by 4")
      return false;
    }
    const segmentLengthHoriz = horizLength/(nodeNum/4);
    const segmentLengthVert = vertLength/(nodeNum/4);
    const quad1 = getEllipsePoint(nodeNum, horizLength, vertLength, segmentLengthVert, segmentLengthHoriz, padding, i);  
    return quad1
  }
  
  function getEllipsePoint(nodeNum, horizLength, vertLength, segmentLengthVert, segmentLengthHoriz, padding, index){
        const quadPointsArray = [];
        const nodesInQuad = nodeNum/4;
        const minHeaderHeight = 400;
        const v1 = {x: horizLength, y: 0};
        const v2 = {x: 0, y: 0};
        // const ellipseCenterX = (horizLength/2)+padding;
        // const ellipseCenterY = (vertLength/2)+padding;
        const ellipseCenterX = 650;//TODO: These should be calculated instead
        const ellipseCenterY = 450;//TODO: These should be calculated instead
        console.log("HL: ", horizLength);
        console.log("VL: ", vertLength);
        console.log("MHH: ", minHeaderHeight);
        console.log("P: ", padding);
        console.log("ellipseCenterX: ", ellipseCenterX);
        console.log("ellipseCenterY: ", ellipseCenterY);
      //Quadrant 1 Points
      if(index <= nodesInQuad){  
          const bq1 = {x: horizLength, y: -vertLength+(segmentLengthVert*index)};
          const aq1 = {x: 0+(index*segmentLengthHoriz), y: -vertLength};
          const intersect = findIntersect(v2.x, v2.y, bq1.x, bq1.y, v1.x, v1.y, aq1.x, aq1.y);
          const x = intersect.x+padding;
          const y = intersect.y+minHeaderHeight+padding
          const angleFromCenter = findTextAngle(ellipseCenterX, ellipseCenterY, x, y);
          //console.log("angleFromCenter: ", angleFromCenter);
          return {x: x, y: y, angleFromCenter: angleFromCenter}
      }
      //Quadrant 2 Points
      if(index > nodesInQuad && index <= nodesInQuad*2){  
          const thisIndex = index - nodesInQuad;
          const bq2 = {x: horizLength, y: 0+(segmentLengthVert*thisIndex)};
          const aq2 = {x: horizLength-(thisIndex*segmentLengthHoriz), y: vertLength};
          const intersect = findIntersect(v2.x, v2.y, bq2.x, bq2.y, v1.x, v1.y, aq2.x, aq2.y);
          const x = intersect.x+padding;
          const y = intersect.y+minHeaderHeight+padding
          const angleFromCenter = findTextAngle(ellipseCenterX, ellipseCenterY, x, y);
          //console.log("angleFromCenter: ", angleFromCenter);
          return {x: x, y: y, angleFromCenter: angleFromCenter}
      }
      //Quadrant 3 Points
      if(index > nodesInQuad*2 && index <= nodesInQuad*3){  
          const thisIndex = index - nodesInQuad*2;
          const bq3 = {x: horizLength-(segmentLengthHoriz*thisIndex), y: vertLength};
          const aq3 = {x: 0, y: vertLength-(thisIndex*segmentLengthVert)};
          const intersect = findIntersect(v2.x, v2.y, bq3.x, bq3.y, v1.x, v1.y, aq3.x, aq3.y);
          const x = intersect.x+padding;
          const y = intersect.y+minHeaderHeight+padding
          const angleFromCenter = findTextAngle(ellipseCenterX, ellipseCenterY, x, y);
          //console.log("angleFromCenter: ", angleFromCenter);
          return {x: x, y: y, angleFromCenter: angleFromCenter}
        }
      //Quadrant 4 Points
      if(index > nodesInQuad*3 && index <= nodeNum){  
          const thisIndex = index - nodesInQuad*3;    
          const bq4 = {x: 0+(segmentLengthHoriz*thisIndex), y: -vertLength};
          const aq4 = {x: 0, y: 0-(thisIndex*segmentLengthVert)};
          const intersect = findIntersect(v2.x, v2.y, bq4.x, bq4.y, v1.x, v1.y, aq4.x, aq4.y);
          const x = intersect.x+padding;
          const y = intersect.y+minHeaderHeight+padding
          const angleFromCenter = findTextAngle(ellipseCenterX, ellipseCenterY, x, y);
          //console.log("angleFromCenter: ", angleFromCenter);
          return {x: x, y: y, angleFromCenter: angleFromCenter}
    }    
        console.log("quadPointsArray: ", quadPointsArray)
        return {}
  } 
  
  function findDistance(x1, y1, x2, y2){
    const x1x2Squared = Math.pow((x1-x2), 2);
    const y1y2Squared = Math.pow((y1-y2), 2);
    return Math.sqrt(x1x2Squared+y1y2Squared);
  }
  
  function findTextAngle(cx1, cy1, x2, y2){
    //angle = atan2(y2 - y1, x2 - x1) * 180 / PI;
    const angle = Math.atan2(y2 - cy1, x2 - cx1) * 180/3.14159265359;
    //console.log("Angle: ", angle.toFixed(2));
    return parseInt(angle.toFixed(5));
  }


  function findIntersect(x1, y1, x2, y2, x3, y3, x4, y4){
    // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
          return false
      }
  
    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
  
    // Lines are parallel
      if (denominator === 0) {
          return false
      }
  
      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
  
    // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return false
      }
  
    // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua*(x2 - x1);
      let y = y1 + ua*(y2 - y1);
  
      return {x, y}
  }
  