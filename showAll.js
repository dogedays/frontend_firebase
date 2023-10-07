// Parent element for showplayers and showleagues
// Try to combine both in this parent element 
import Button from 'react-bootstrap/esm/Button';
import React, {useState,useEffect,useCallback} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css'



// TODO: Add figures per week/lifetime tracker per account 


function ShowAll(){

    // Show all leagues, then show all markets, then show players   
    // Setting leagues and markets will happen in one step (arrow function)

    const[data,setData] = useState({}); // JSON api
    const[leagues,setLeagues] = useState({}); //Array of buttons
    const[league,setLeague] = useState(""); //Current league tracker
    const[condition,setCondition] = useState(1)
    const[confirm,setConfirm] = useState(<></>) // confirm bet button


    let endpoint = '/api/players?league=nba';
    let endpoint_leagues = '/api/leagues';
  
    const Condition_setter = (curr) =>{
      console.log("setting condition");
      setCondition(curr);
      if (condition ==1){
        console.log("under");
      }else{
        console.log("over");
      }
    }

    return (
        <div>   
            {HelperLeagues({leagues,setLeagues,league, setLeague,endpoint_leagues})}
            <br></br>
            {<Button key = {1}style={{ marginLeft: '.5rem' }} onClick={() => {Condition_setter(1)}}> Under </Button>}
            {<Button key = {2} style={{ marginLeft: '.5rem' }} onClick = {()=>{Condition_setter(3)}}> Over </Button>}
            {Helper({data,setData,league,condition,confirm,setConfirm})}  
        </div>
    )

}

function HelperLeagues({leagues,setLeagues,league,setLeague,endpoint_leagues}){

    const[elements,setElements] = useState([]);

    console.log("IN league helper");
    const apiGetLeagues = () => { // get leagues
        // API call to fastapi 
        console.log(endpoint_leagues + "ENDPOINT"); 
        fetch(endpoint_leagues).then(response => response.json())
        .then(leagues => {setLeagues(leagues)});
    
      };

    console.log(leagues);

    const League_setter = (curr) =>{

        console.log("Setting league");
        setLeague(curr);

    }
    
    useEffect( () =>{ 
        console.log("In buttons use effect");
        if(Object.keys(leagues) !== 0){
          
          let keys = Object.keys(leagues);
          let arr = [];
          for(let i =0; i<keys.length;i++){
            let jsx = <Button key = {i} style={{ marginLeft: '.5rem' }} onClick={()=> {League_setter(keys[i])}}>{keys[i]}</Button>; // every time we get leagues, set buttons to each league
            // ** Arrow function must be passed in onClick or the function will be called on render
            arr.push(jsx);
          }
          setElements(arr);
  
        }
      }
      
      , [leagues]);  
    return (
        <div>
        <pre>Current league: {league?league:"Select a league"} </pre>                       
        <br></br>
        <Button onClick={apiGetLeagues}> Get Leagues    
        </Button>
        {elements}
        </div>
    )
}


function Helper({data,setData,league,condition,confirm,setConfirm}){ 
    const[isLoading,setLoading] = useState(false);
    const[element,setElement] = useState(<></>);
    const[market,setMarket] = useState("") //Current market tracker
    const[markets,setMarkets] = useState(<></>) // Array of buttons
    const[current_row,setRow] = useState({});
    const[success,setSuccess] = useState([]);
    const[rate,setRateTable] = useState(<></>);  //success rate table



    let local_endpoint = '/api/players?league=' + league;
    console.log("In helper");
    const apiGet = async () => {    
        // API call to fastapi 
        
        setLoading(true);
        console.log(local_endpoint + " ENDPOINT");
        fetch(local_endpoint).then(response => response.json())   
        .then(data => {setData(data)});
        

      };  

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
      
      const placeBet = (row) =>{
        // Setting payload then placing bet 
        let payload = row['payload'];
        if(condition === 1){
          payload['events'][0]['conditionType'] = 1;      
          payload['events'][0]['type'] = 19;
          payload['events'][0]['odds'] = (row['under']).toFixed(2).toString();  
          //need to change both odds
          payload['odds'] = row['under'];
          payload['events'][0]['statisticId'] = payload['events'][0]['statisticIds'][0];   
          delete payload['events'][0]['statisticIds'];
          
        }else{
          payload['events'][0]['conditionType'] = 3;
          payload['events'][0]['type'] = 18;
          payload['events'][0]['odds'] = (row['over']).toFixed(2).toString();
          payload['odds'] = row['over'];
          payload['events'][0]['statisticId'] = payload['events'][0]['statisticIds'][1];          
          delete payload['events'][0]['statisticIds'];  
  

        }
        console.log(payload);
        console.log("Placing bet");
        setLoading(true);
        fetch('/api/place_bet',
        {method:"POST",
          headers: {"Content-Type":'application/json'},
          body: JSON.stringify(payload)
        }
        ).then(response => response.json())
        .then(success => {setSuccess(success)});
      }
    
    const rate_columns = [{
      dataField: 'user',
      text: 'User',
      sort:true
    },{
      dataField: 'status',
      text: 'Status'
    }]

    // useEffect for when success changes 
    useEffect( () => {
      console.log(success);
      setRateTable(       
        <div><BootstrapTable
        keyField='name'
        data={success}
        columns = {rate_columns}
        ></BootstrapTable>
        </div>)
    },[success]);
    
      const columns = [{
        dataField: 'name',
        text: 'Player name'
      }, {
        dataField: 'unit',
        text: 'Unit',
        sort: true

      },
      {
        dataField: 'over',
        text: 'over',
        sort: true

      },
      {
        dataField: 'under',
        text: 'under' ,
        sort: true

      }
    
    ];

    // const Condition_setter = (curr) =>{
    //   console.log("setting condition");
    //   setCondition(curr);
    //   console.log(condition);

    // }

      // useEffect for under/over, renders when row changes
    // useEffect( () =>{

    //   let arr = [];
    //   arr.push(<Button key = {1}style={{ marginLeft: '.5rem' }} onClick={() => {Condition_setter(1)}}> Under </Button>);
    //   arr.push(<Button key = {2} style={{ marginLeft: '.5rem' }} onClick = {()=>{Condition_setter(3)}}> Over </Button>);
    //   setConditionButton(arr);
      
    // },[data]);
    
    const handleSelect = (row, isSelect, rowIndex, e) =>{
        
        console.log(row);
        console.log(condition);
        setConfirm(<Button onClick={()=> {placeBet(row)}}>
          Confirm bet: {row.name} {condition === 1?"Under":"Over"} {row.unit} {row.market} {condition ===1? americanOdds(row.under):americanOdds(row.over)}
          </Button>);

    }
    // Row select handlers
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: handleSelect
      } 
      

    const Market_setter = (curr) =>{
        console.log("Setting market");
        setMarket(curr);
    }
    
        // useEffect for player tables, triggered everytime market changes
      useEffect( () => {

        if (Object.keys(data).length !== 0){
          let players_market = data[market];
          let players_keys = Object.keys(players_market); 
          console.log(players_market);
          let players_list = [];
  
          for(let i = 0; i <players_keys.length; i++){
              let value = players_market[players_keys[i]];
            //   if (value['over'] < 10) {
            //     value['over'] = americanOdds(value['over']);
            //     value['under'] = americanOdds(value['under']);
            //   }
              console.log(value);
              players_list.push(value);
          }
          console.log(players_list);
          setElement(       
                              <div><BootstrapTable
                              keyField='name'
                              data={players_list}
                              columns = {columns}
                              selectRow = {selectRow}
                              ></BootstrapTable>
                              </div>)   
          setLoading(false);
      }
      },[market]);


      //useEffect for markets, triggered when league changes
      useEffect( () => {

        if (Object.keys(data).length !== 0){       //Should only run if players have loaded
            console.log("In markets useEffect");
            let keys = Object.keys(data);
            let arr = [];
            for(let i =0; i<keys.length;i++){
                let jsx = <Button key = {i} style={{ marginLeft: '.5rem' }} onClick={()=> {Market_setter(keys[i])}}>{keys[i]}</Button>; // every time we get leagues, set buttons to each league
                // ** Arrow function must be p  assed in onClick or the function will be called on render
                arr.push(jsx);
              }
            setMarkets(arr);
            setLoading(false);
        }

      }, [data])
      
      return (
        <div>
          {rate}
          {/* <p> {JSON.stringify(data,null,2)}</p> */}
          {isLoading? (<h2>Loading {league}</h2>):
          (<pre>{league + " " + market}</pre>)}
       
        <button onClick={apiGet} > Get Markets for {league}</button> 
        <br></br>
        <br></br>
        {markets}
        <br></br>
        <br></br>
        {confirm}   
        {/* {conditionButton} */}
        <br></br>
        {element?element:<>Click to load players</>}
        </div>
    ) 
}



export default ShowAll;