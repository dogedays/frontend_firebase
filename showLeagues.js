import Button from 'react-bootstrap/Button';
import React, {useState,useEffect} from 'react';
import ShowPlayers from './showPlayers';


// Use curly brackets as parameter for objects ex: {endpoint}
function ShowLeagues(endpoint) {

    // Setting up use state hook for use effect

    const[data,setData] = useState({}); // get leagues JSON data
    const[league,setLeague] = useState("");
    const[elements,setElements] = useState([]);
    const[markets,setMarkets] = useState([]);
    const[players_element,setPlayers_element] = useState(<></>);

    const apiGet = () => { // get leagues
      // API call to fastapi 
      console.log(endpoint + "ENDPOINT"); 
      fetch(endpoint).then(response => response.json())
      .then(data => {setData(data)});
  
    };

    const getPlayers = (curr) => {
      // get players for a given league
      console.log("setting league");
      setLeague(curr);
      let league_endpoint = `/players?league=${league}`;
      
      
    }

    

    console.log("rendered in leagues");


    

    // Use effect for rendering buttons. Triggered every time user clicks get leagues
    useEffect( () =>{ 
      console.log("In buttons use effect");
      if(Object.keys(data) != 0){
        
        let keys = Object.keys(data);
        let arr = [];
        for(let i =0; i<keys.length;i++){
          let jsx = <Button key = {i} style={{ marginLeft: '.5rem' }} onClick={()=> {getPlayers(keys[i])}}>{keys[i]}</Button>; // every time we get leagues, set buttons to each league
          // ** Arrow function must be passed in onClick or the function will be called on render
          arr.push(jsx);
        }
        setElements(arr);

      }
    }
    
    , [data]);  
    console.log(league);

    // 2nd use effect to get players, dependent on league state
    // useEffect( () => {
    //   console.log("In 2nd use effect");
    //   if(league.length > 0){
    //     ShowPlayers.apiGet()
    //   }
    // }.[league])

    return (
        <div>
        <pre>Current leagues are: {JSON.stringify(data,null,2)} </pre>
        <br></br>
        <Button onClick={apiGet}> Get Leagues
        </Button>
        {/* <Button style={{ marginLeft: '.5rem' }} href = {data['nfl']?(`/players?league=${league}`):"home"} >
          {data['nfl']}
        </Button> */}
        {elements}
        {players_element}
        </div>
    )

}

export default ShowLeagues; 


    