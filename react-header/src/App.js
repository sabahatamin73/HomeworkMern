/* eslint-disable no-unused-vars */
import './App.css';
import Table from './Table'
import {useState} from 'react';

function App() {
  //table1
  const [Status, setStatus]=useState("Today,3:00 PM");
  const [Match, setMatch]=useState("40th Match, Group1");
  const [Type, setType]=useState("T20");
  const [Team1, setTeam1]=useState("Afghanistan");
  const [Wickets1, setWickets1]=useState(200);
  const [Runs1, setRuns1]=useState(6);
  const [Team2, setTeam2]=useState("Newzealand");
  const [Runs2, setRuns2]=useState(190);
  const [Wickets2, setWickets2]=useState(10);
  const [Details, setDetails]=useState("Match starts in 4 hours");
//d=Duplicate 
//table2       
  const [Statusd, setStatusd]=useState("STUMPS");
  const [Matchd, setMatchd]=useState("2nd unofficial test");
  const [Typed, setTyped]=useState("Pallekelle");
  const [Team1d, setTeam1d]=useState("Pakistan");
  const [Wickets1d, setWickets1d]=useState(7);
  const [Runs1d, setRuns1d]=useState(120);
  const [Team2d, setTeam2d]=useState("Shirilanka");
  const [Runs2d, setRuns2d]=useState(120);
  const [Wickets2d, setWickets2d]=useState(7);
  const [Detailsd, setDetailsd]=useState("Day 4 - Shirilanka a trial by 204 runs");

//d1=Duplicate1
//table3
const [Statusd1, setStatusd1]=useState("Today,2:00 PM");
const [Matchd1, setMatchd1]=useState("39th Match, Group1");
const [Typed1, setTyped1]=useState("T20");
const [Team1d1, setTeam1d1]=useState("Pakistan");
const [Wickets1d1, setWickets1d1]=useState(7);
const [Runs1d1, setRuns1d1]=useState(120);
const [Team2d1, setTeam2d1]=useState("India");
const [Runs2d1, setRuns2d1]=useState(120);
const [Wickets2d1, setWickets2d1]=useState(7);
const [Detailsd1, setDetailsd1]=useState("India chose to feild");

  return (
    <div className="App">
      <div className="contents">
      <Table 
      status={Status}
      match={Match}
      type={Type}
      team1={Team1}
      runs1={Runs1}
      wickets1={Wickets1}
      team2={Team2}
      runs2={Runs2}
      wickets2={Wickets2}
      details={Details}
      />
      <Table 
      status={Statusd}
      match={Matchd}
      type={Typed}
      team1={Team1d}
      runs1={Runs1d}
      wickets1={Wickets1d}
      team2={Team2d}
      runs2={Runs2d}
      wickets2={Wickets2d}
      details={Detailsd}
      />
      <Table 
      status={Statusd1}
      match={Matchd1}
      type={Typed1}
      team1={Team1d1}
      runs1={Runs1d1}
      wickets1={Wickets1d1}
      team2={Team2d1}
      runs2={Runs2d1}
      wickets2={Wickets2d1}
      details={Detailsd1}
      />
    </div>
    </div>
  );
}

export default App;
