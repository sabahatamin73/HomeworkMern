/* eslint-disable no-unused-vars */
import './Table.css';

function Table(props) {
    const {runs1, runs2, wickets1, wickets2, team1, team2, status, type, match, details} = props;
  return (
    <div className="Table">
      <div>
      <p>{`${status}`}   .   {`${type}`}    .    {`${match}`}</p>
      <p>{`${team1}`}</p>
      <p>{`${runs1}`}/{`${wickets1}`}</p>
      <p>{`${team2}`}</p>
      <p>{`${runs2}`}/{`${wickets2}`}</p>
      <p>{`${details}`}</p>
      <div id="outer">
            <div className  ="inner"><button type="submit" className="msgBtn" >Schedule</button></div>
            <div className="inner"><button type="submit" className="msgBtn2">Points Table</button></div>
            <div className="inner"><button className="msgBtnBack">Report</button></div>
      </div>
      </div>
    </div> 
  )};

export default Table;
