import React, { useEffect, useState} from 'react';  
import BootstrapTable from 'react-bootstrap-table-next';
import  {Modal,Button} from 'react-bootstrap';


// Use curly brackets as parameter for objects ex: {endpoint}

function ShowPlayers(endpoint) {

    // Setting up use state hook for use effect

    // Setting up multiple use states will mean multiple re-renders will happen
    
    const[data,setData] = useState(() => {  
      return {}
    });
    const[isLoading,setLoading] = useState(false);
    const[element, setElement] = useState(<></>);
    const[leagues,setLeagues] = useState({});

    
    console.log("rendered in players");

    // Fetch api data from backend helper function 
    const apiGet = async (endpoint) => {
      // API call to fastapi 
      setLoading(true);
      console.log(endpoint + "ENDPOINT");
      await fetch(endpoint).then(response => response.json())
      .then(data => {setData(data)});
    };  

    const apiGetLeagues = () => {
      // API call to fastapi 
      let link = '/leagues';
      fetch(link).then(response => response.json())
      .then(leagues => {setLeagues(leagues)});
  
    };
    
    // const displayLeagues = () => {
    //   if(Object.keys(leagues).length != 0 ){
    //     let keys = Object.keys(leagues);
    //     let arr = [];
    //     for(let i =0;i<keys.length;i++){
    //       arr.push()
    //     }
    //   }
    // }

    // use effect to get leagues
    
    // Convert decimal odds to american odds helper function 
    const americanOdds = (odds) =>{
      let american = 0.0;
      let decimal = parseFloat(odds);
      if (odds >= 2){
        american = Math.ceil((decimal-1) * 100);
      }else{
        american = Math.ceil(-100/(decimal-1));
      }
      return american;
    }
    
  
    const columns = [{
      dataField: 'name',
      text: 'Player name'
    }, {
      dataField: 'unit',
      text: 'Unit'
    },
    {
      dataField: 'over',
      text: 'over'
    },
    {
      dataField: 'under',
      text: 'under' 
    }
  
  ];

  useEffect( () => {
    if (endpoint.length > 0){
      console.log("In initial useeffect");  
      apiGet(data);
    }
  },[]);

    useEffect( () => {
      if (Object.keys(data).length != 0){

        let keys = Object.keys(data);
        let players_market = data[keys[0]];
        let players_keys = Object.keys(players_market); 
        console.log(players_market);
        let players_list = [];

        for(let i = 0; i <players_keys.length; i++){
            let value = players_market[players_keys[i]];
            value['over'] = americanOdds(value['over']);
            value['under'] = americanOdds(value['under']);
            console.log(value);
            players_list.push(value);
        }
        console.log(players_list);
        setElement( 
                            <div><BootstrapTable
                            keyField='name'
                            data={players_list}
                            columns = {columns}
                            ></BootstrapTable>
                            </div>)
        setLoading(false);
    }
    },[data]);

    // second use effect for league buttons

    
  

    return (
        <div>
          {/* <p> {JSON.stringify(data,null,2)}</p> */}
          {isLoading? (<div>Loading</div>):
          (<pre>{element} </pre>)}
        <br></br> 
        {/* <button onClick={() => {apiGetLeagues()}}> Get Leagues</button>
        <br></br>  */}
        <button onClick={apiGet} > Get Players</button>

        {element?element:<>Click to load players</>}
        </div>
    )

}




export default ShowPlayers;

