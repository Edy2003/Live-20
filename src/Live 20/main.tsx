import './style.css'
import {useEffect, useState} from "react";

function Main (){
    const [numb,setNumb]=useState<number>();
    const [arr,setArr]=useState<number[]>([0,0,0,0,0]);
    const [correctArr,setCorrectArr]=useState<number[]>([]);
    const [result,setResult]=useState<string>('');

    function generateNumb(){
        setNumb(Math.floor(Math.random()*10))
    }
    function changeValue(e:number,index:number,el:any){
        if (numb != null) {
            arr[index] = numb;
        }
        setCorrectArr([...correctArr,arr[index]])
        el.target.disabled = true;
        setArr([...arr]);
        checkArr();
    }
    function checkArr(){
        correctArr.sort((a,b)=>a > b? 1:-1);
        if (correctArr.length === arr.length){
            if(correctArr.every((el,index)=>el === arr[index])){
              setResult('You Win');
            }
            else{
                setResult('You Lose');
            }
        }else{}
    }
    useEffect(()=>{
        checkArr();
    },[arr])
    return(
        <div className='container'>
            <div>
                <ul>
                    {arr.map((e,index)=>{
                        return <li key={index} ><button onClick={(n)=>changeValue(e,index,n)}>{e}</button></li>
                    })}
                </ul>
            </div>
            <div className='result'>
                {result}
            </div>
            <div className='numbContainer'>
                <div className='currentNumb'>{numb}</div>
                <button className='currentNumbBtn' onClick={generateNumb}>Generate new number</button>
            </div>
        </div>
    );
}

export default Main;