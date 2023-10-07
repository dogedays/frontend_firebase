import Button from 'react-bootstrap/esm/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import React, {useState,useEffect,useCallback} from 'react';



function ShowFigures(){
    const[data,setData] = useState({});
    const[open,setOpen] = useState({});
    const[elements,setElements] = useState([]);
    const[total, setTotal] = useState(0);

    const endpoint = '/api/past_figures?range=1';    // default range 1 for 1 week
    const net_endpoint = '/api/week_net?range=1';
    const open_endpoint = '/api/open_figures';

    const apiGet = () => {
        // doesnt need return because data is modified

        console.log(endpoint + " ENDPOINT");

        fetch(endpoint).then(response => response.json())
        .then(data => {setData(data)});
    };

    const apiGetnet = () => {

        fetch(net_endpoint).then(response => response.json())
        .then(total => {setTotal(total)});

    }
    
    const apiGetopen = () => {
        fetch(open_endpoint).then(response => response.json())
        .then(open=> {setOpen(open)});
    }

    
    useEffect( () => {
        console.log('fetched');

        if (Object.keys(data).length != 0){
            const columns = [{
                dataField: 'date placed',
                text: 'date placed',
                sort: true
              }, {
                dataField: 'name',
                text: 'Bet'
              },
              {
                dataField: 'risk',
                text: 'Risk',
                sort: true
              },
              {
                dataField: 'towin',
                text: 'To win',
                sort: true
              },
              {
                dataField: 'result',
                text: 'result',
                sort: true
              },
              ];
              
            // Conversion of dict to dicts (Pythonic way)
            // to list of dicts (JS way)
            let keys = Object.keys(data);
            let arr = [];
            for(let i =0; i<keys.length; i++){
              arr.push(data[keys[i]])

            }
            setElements( 
              <div><BootstrapTable
              keyField='name'
              data={arr}
              columns = {columns}
              ></BootstrapTable>
              </div>)
          }

    }, [data]);

        
    useEffect( () => {
        console.log('fetched');

        if (Object.keys(open).length != 0){
            const columns = [{
                dataField: 'date placed',
                text: 'date placed',
                sort: true
              }, {
                dataField: 'name',
                text: 'Bet'
              },
              {
                dataField: 'risk',
                text: 'Risk',
                sort: true
              },
              {
                dataField: 'towin',
                text: 'To win',
                sort: true
              },
              {
                dataField: 'result',
                text: 'result',
                sort: true
              },
              ];
              
            // Conversion of dict to dicts (Pythonic way)
            // to list of dicts (JS way)
            let keys = Object.keys(open);
            let arr = [];
            for(let i =0; i<keys.length; i++){
              arr.push(open[keys[i]])

            }
            setElements( 
              <div><BootstrapTable
              keyField='name'
              data={arr}
              columns = {columns}
              ></BootstrapTable>
              </div>)
          }

    }, [open]);


    return (
        <div>
            <br></br>
            <Button onClick={apiGet}>last week</Button>
            <Button onClick ={apiGetopen} style={{ marginLeft: '.9rem' }}>open bets</Button>
            {elements}
            <br></br>
            <br></br>
            <Button onClick={apiGetnet}>last week net</Button>
            <h2>Week net {total}</h2>
        </div>
    )
}

export default ShowFigures;