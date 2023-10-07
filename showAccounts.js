import React, {useState,useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';



// Use curly brackets as parameter for objects ex: {endpoint}
function ShowAccounts(endpoint) {

    // Setting up use state hook for use effect


    const[data,setData] = useState({});
    const[elements,setElements] = useState([]);
    const[username,setUser] = useState("");
    const[password,setPassword] = useState("");
    const[book,setBook] = useState("");
    const[limit,setLimit] = useState('');
    const[token,setToken] = useState('');
    const[current, setCurrent] = useState("");
    const[deleteUser,setDeleteUser] = useState("");
    const[pauseUser,setPauseUser] = useState("");
    const[resumeUser,setResumeUser] = useState("");
 
    const apiGet = () => {
      // API call to fastapi 
      console.log(endpoint + "ENDPOINT");

      fetch(endpoint).then(response => response.json())
      .then(data => {setData(data)});
  
    }; 

    //handling state for pause accounts form
    const handlePause = (e) =>{
      e.preventDefault(); // stops page from reloading everytime form submitted
      const content = {'username':pauseUser};
      fetch('/api/pause_accounts',
        {method:"POST",
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(content)
      }
      ).then( ()=>{
        console.log('Account paused');
        setCurrent('Account ' + pauseUser + " paused");
      })
    }
    const handleResume= (e) =>{
      e.preventDefault(); // stops page from reloading everytime form submitted
      const content = {'username':resumeUser};
      fetch('/api/resume_accounts',
        {method:"POST",
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(content)
      }
      ).then( (result)=>{
        console.log('Account unpaused');
        setCurrent('Account ' + resumeUser + " unpaused");
      })
    }

    // handling state for delete
    const handleDelete = (e) =>{
      e.preventDefault();
      const content = {'username':deleteUser};
      fetch('/api/delete_accounts',
        {method:"POST",
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(content)
      }
      ).then( ()=>{ 
        console.log("Account Deleted");
        setCurrent("User "+ deleteUser + " deleted");
      })
    }

    const handleSubmit = (e) =>{
      console.log("Form submitted");
      e.preventDefault();
      const userObject = {username,password,book,limit,token}
      console.log(userObject);
      fetch('/api/add_accounts',
      {
        method:'POST',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(userObject)
      }
      ).then((result) => {
        console.log(result['msg']);
        setCurrent("Account " + username + " added")
      })
    }
    
    useEffect( ()=>{
      if (Object.keys(data).length != 0){
        const columns = [{
          dataField: 'user',
          text: 'username'
        }, {
          dataField: 'password',
          text: 'Password'
        },
        {
          dataField: 'book',
          text: 'book'
        },
        {
          dataField: 'limit',
          text: 'limit' 
        },
        {
          dataField: 'token',
          text: 'token'
        }]

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
    },[data])
    
    return (
        <div>
        <h2>Add new User</h2>
          <form onSubmit={handleSubmit}>
            <label>User</label>
            <input 
            type = "text"
            required
            value = {username}
            onChange= {(e) => setUser(e.target.value)}
            ></input>
            <label>Password</label>
            <input 
            type = "text"
            required
            value = {password}
            onChange= {(e) => setPassword(e.target.value)}
            ></input>
            <label>Bookmaker</label>
            <input
            type = 'text'
            required
            value={book}
            onChange= {(e) => setBook(e.target.value)}

            ></input>
            <label>Limit</label>
            <input
            type = 'text'
            required
            value = {limit}
            onChange= {(e) => setLimit(e.target.value)}

            ></input>
            <label>Token</label>
            <input
            type= 'text'
            value = {token}
            onChange= {(e) => setToken(e.target.value)}

            ></input>
          <button>Add account</button>
          </form>
        <br></br>

        
        <h2>Remove User</h2>
        <form onSubmit={handleDelete}>
          <label>User (must be exact)</label>
          <input
          type='text'
          required
          value = {deleteUser}
          onChange = {(e) => setDeleteUser(e.target.value)}></input>
          <button>Remove user</button>
        </form>
        
        <br></br>
        <h2>Pause user</h2>

        <form onSubmit = {handlePause}>
        <label>User (must be exact)</label>
          <input
          type='text'
          required
          value = {pauseUser}
          onChange = {(e) => setPauseUser(e.target.value)}></input>
          <button>Pause user</button>
        </form>

        <br></br>
        <h2>Unpause user</h2>

        <form onSubmit = {handleResume}>
        <label>User (must be exact)</label>
          <input
          type='text'
          required
          value = {resumeUser}
          onChange = {(e) => setResumeUser(e.target.value)}></input>
          <button>Unpause user</button>
        </form>


        <br></br>
        <br></br>
        <p>{current.length>0?current:null}</p>
        <h1>Current Accounts are: </h1>
        <button onClick={apiGet}> Get Accounts
        </button> 
        {elements}
        </div>
    )

}


export default ShowAccounts;

