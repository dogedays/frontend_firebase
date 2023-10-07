import React from 'react'

// export is used so that the class, function, or primitive can be imported in another file
export default function Table({theadData, tbodyData}) {
    // Any code can go before return for setting up table
    
    // .push() method is like append method for lists
    var td_list = [];
    console.log("thead Data:" + theadData);
    for(var i = 0; i<tbodyData.length; i++){
        var tr_data = <tr>
            <td>{tbodyData[i]["name"]}</td>
            <td>{tbodyData[i]["over"]}</td>
            <td>{tbodyData[i]["under"]}</td>
            <td>{tbodyData[i]["unit"]}</td>

        </tr>
        td_list.push(tr_data);
    }
     return (
        
       <table>
        
        <thead >
            <th style={{padding: "10px 20px"}}>Player Name </th>
            <th style={{padding: "10px 20px"}}>over</th>
            <th style={{padding: "10px 20px"}}>under</th>
            <th style={{padding: "10px 20px"}}>unit</th>
        </thead>
        <tbody>
        <tr>
            <td>Bobby Lee</td>
            <td>+100</td>
            <td>-130</td>
            <td>0.5</td>
        </tr>
        ${td_list}
    </tbody>
    
       </table>
    );
    
    }

    

  