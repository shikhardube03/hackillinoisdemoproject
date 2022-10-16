import './App.css';
import { useEffect, useState } from 'react';
import EventInformation from 'demoproject/src/eventinterface';
import axios from 'axios';


/*
  Loads the event list which is used to render the Box items from the Materials UI library 
*/
function LoadEvents(event_list, EventInformation[]): JSX.Element[] {
  let load_eventslist: JSX.Element[] = [];
  event_list.forEach((item) => {
    
    let newdescrip: string = item.description;
    newdescrip = newdescrip.trim();
    if (item.description >= 100) {
      let idx: number = newdescrip.indexOf(' ', 99);
      newdescrip = item.description.substring(0, idx) + "...";
    }
    let time: string; 

    // if item does not have limited time then you need to calculate time:
    if (item.isAsync != null && item.isAsync == false && item.startTine != null && item.endTime != null) {
      time = GetTime(item.startTine, item.endTime);
    }
    load_eventslist.push(EventBox(item.name, newdescrip, item.eventType, time)); 
  })
  return load_eventslist;
}

function GetTime(startTime: number, endTime: number): string {
  let start_Time: Date = new Date(0);
  start_Time.setUTCSeconds(startTime);
  let end_Time: Date = new Date(0);
  end_Time.setUTCSeconds(endTime);
  return (start_Time.toLocaleDateString() + " from " + start_Time.toLocaleDateString() + " to " + end_Time.toLocaleDateString());
}


function App() {
  const [event, setEvent] = useState<EventInformation[]>([]);
  const url = "https://api.hackillinois.org/event/";
  useEffect(() => {
    axios.get(url).then(response => {
      let event_list: EventInformation[] = [];
      response.data.events.map((event: Object) => {
        let stringobjs: string = JSON.stringify(event);
        let item: EventInformation = JSON.parse(stringobjs)
        event_list.push(item)
      })
      setEvent(event_list)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])
  console.log(event)

 return <header> EventBoxes here! </header>
}


export default App;
