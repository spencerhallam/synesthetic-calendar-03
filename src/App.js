import React, {useState, useEffect} from 'react';
//import MockYearEllipse from './data/mockYearEllipse';
import {calculatedYearNodes} from './functions/calculatedYearNodes'
//import MockYearCircle from './data/mockYearCircle';
import DayNode from './components/dayNode';
import TodayInformation from './components/todayInformation'
import SelectedDay from './components/selectedDay'
import './App.css';

function App() {
  const [yearOfNodes, setYearofNodes] = useState();
  const [selectedDay, getSelectedDay] = useState();
  //const [yearShape, setYearShape] = useState(MockYearEllipse)
  const [yearShape, setYearShape] = useState(calculatedYearNodes)
  
  useEffect(() => {
    setYearofNodes(yearShape);
  }, []);

  if(!yearOfNodes){
    return <div>loading...</div>
  }
  // const handleLeftKeyPress = (e) => {
  //   yearOfNodes.find()selectedDay.createdOrder + 1
  // }// left 37 right: 39
  const todayData = yearOfNodes.find((node) => node.code === "today");

  return (
    <div className="App" >
      <header className="App-header" style={{position: "fixed"}}>
        <div>
          <TodayInformation todayData={todayData} />
        </div>
        <div>
          {selectedDay && <SelectedDay selectedDay={selectedDay} />} 
        </div>
      </header>
      <main id="container" style={{position: "fixed", display: "block", paddingTop: "175px", textAlign: "left"}}>  
              
	    </main>
      <div style={{paddingTop: "200px", display: "block"}}>
      <svg id="svg-wrapper" width="1400" height="1000">
      <circle cx="650" cy="450" r="5" strokeWidth="2" fill="white" />
        {
          yearOfNodes.map((day, index) => {
            return (
              <DayNode dayData={day} key={index} getSelectedDay={getSelectedDay} isSelectedDay={(selectedDay?.createdOrder === day.createdOrder) ? true : false}/>
            )
          })
        }
	    </svg>
      </div>
    </div>
  );
}


export default App;
