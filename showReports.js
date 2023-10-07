import Button from 'react-bootstrap/esm/Button';
import React, {useState,useEffect,useCallback} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css'


function ShowReports(){
    const [data,setData] = useState({});
    const [elements,setElements] = useState([]);
    const [options,setOptions] = useState([]);
    const[selected,setSelected] = useState(''); // refernece to the key of reports displayed
    const[open,setOpen] = useState({});    

    let endpoint = '/api/past_reports?range=1';
    let open_endpoint = '/api/open_reports';
    const apiGet = () => {
        // doesnt need return because data is modified

        console.log(endpoint + " ENDPOINT");

        fetch(endpoint).then(response => response.json())
        .then(data => {setData(data)});
    };

    const apiGetopen = () => {
        // doesnt need return because data is modified

        console.log(open_endpoint + " ENDPOINT");

        fetch(open_endpoint).then(response => response.json())
        .then(data => {setData(data)});
    };

    useEffect( ()=> {
        if(Object.keys(data) !== 0){
            let keys = Object.keys(data);

            let arr2 = [];
            for(let i =0; i<keys.length;i++){
              let jsx = <option key={keys[i]} value={keys[i]}>{keys[i]}</option>
              // ** Arrow function must be passed in onClick or the function will be called on render
              arr2.push(jsx);
            }
            setOptions(arr2);
    
          
        }
    },[data]);

    useEffect( ()=> {
        if (Object.keys(data).length != 0){
            console.log(data);
            const columns = [{
                dataField: 'user',
                text: 'user',
                sort: true
              }, {
                dataField: 'risk',
                text: 'risk',
                sort: true
              },
              {
                dataField: 'towin',
                text: 'To win',
                sort: true
              }
              ];
              
            // Conversion of dict to dicts (Pythonic way)
            // to list of dicts (JS way)
            // let keys = Object.keys(data);
            let arr = data[selected]['users'];
            console.log(arr);
            // for(let i =0; i<keys.length; i++){
            //   arr.push(data[keys[i]])
            // }
            setElements( 
              <div><BootstrapTable
              keyField='user'
              data={arr}
              columns = {columns}
              ></BootstrapTable>
              </div>)
          }
        
    },[selected]);



    return (
        <div>
            <button onClick={apiGet}>Get bets (last week)</button>
            <button onClick={apiGetopen}>Current week</button>
 
            <br></br>
            <br></br>

            <select
            onChange={(e)=>{
                console.log(e.target.value);
                setSelected(e.target.value);
            }}>
                {options}
            </select>
            {elements}
        </div>
    )

}


export default ShowReports;