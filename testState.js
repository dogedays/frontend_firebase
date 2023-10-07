import React, { useEffect, useState} from 'react';

// *** Introducing a helper function always changes the state and causes program to rerender


function TestState(){

    // Use state always returns const[data,setData] function 
    // const [count,setCount] = useState(() => {

    //     return 5;
    // }
    // );
    // console.log("IN test state");

    // function increment(){
    //     setCount(prevCount => prevCount + 1);
    // }
    // function decrement(){
    //     setCount(prevCount => prevCount -1);
    // }

    // return(
    //     <div>
    //         <p>Counter: {count}</p>
    //         <button onClick = {increment}>+</button>
    //         <button onClick = {decrement}>-</button>
    //     </div>
    // )

    const dict = {
        name : "Bob",
        job: "Banker",
        class : "A1"
    };
    

    let jobs = ['jobber', 'banker', 'teller', 'miner'];
    let num = RandomNumber();

    let user = {
        name : "John",
        job: "The ripper",
        data: {
            age: 34,
            status: "Married"
        }
    }
    PrintUser(user);
    const [name,job] = jobs;
    console.log("ran");
    
    Helper(jobs);
    return (
        <div>
            {`${jobs}`}
            {num}
        </div>
    )

}


function Helper(array){
    for(let i = 0; i < array.length; i ++){
        array[i] = "robber";
    }
    console.log("RAN HELPER");
    return array;
}

function PrintUser({name,data}){
    console.log(name + " "+  data.age);
}

function RandomNumber(){
    return Math.random
}


export default TestState        
