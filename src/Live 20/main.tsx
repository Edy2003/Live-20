import './style.css'
import {useEffect, useState} from "react";

function Main (){
    const [number,setNumber]=useState<number>(0);
    const [arr,setArr]=useState<number[]>([]);
    const [correctArr,setCorrectArr]=useState<number[]>([]);
    const [result,setResult]=useState<string>('');
    const [message,setMessage]=useState<string>('');
    const [passedStatus,setPassedStatus]=useState<boolean>(true);
    const [level,setLevel]=useState<string>('5');
    const [endedGame,setEndedGame]=useState<boolean>(true)

    function restartGame(){
        setLevel('5')
        setCorrectArr([]);
        setArr([]);
        setEndedGame(true);
        setNumber(0);
        setMessage('');
        setResult('');
    }

    function generateArr() {
        if(endedGame) {
            switch (level) {
                case '5':
                    setArr([0, 0, 0, 0, 0]);
                    break;
                case '10':
                    setArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                    break;
                case '15':
                    setArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                    break;
                case '20':
                    setArr([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0]);
                    break;
            }
        }else{
            setMessage('Wait until game ends')
        }
        setEndedGame(false);
    }

    function generateNumb(){
        passedStatus?setNumber(Math.floor(Math.random()*1000)):setMessage('Choose button!!!');
        setPassedStatus(false);
    }

    function changeValue(e:number,index:number,el:any){
      if(passedStatus){
          setMessage('Generate new number!!!')
      }else {
          if (number != null) {
              arr[index] = number;
          }
          setCorrectArr([...correctArr, arr[index]])
          el.target.disabled = true;
          setArr([...arr]);
          setPassedStatus(true);
      }
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
            <div className='list'>
                {endedGame?<div>
                        <select onChange={(e)=>setLevel(e.target.value)}>
                            <option value={'5'}>5</option>
                            <option value={'10'}>10</option>
                            <option value={'15'}>15</option>
                            <option value={'20'}>20</option>
                        </select>
                        <button onClick={generateArr}>Generate array</button>
                    </div>
                    :
                    <button onClick={restartGame}>Restart Game</button>
                }

                <ul>
                    {arr.map((e,index)=>{
                        return <li key={index}><button onClick={(n)=>changeValue(e,index,n)}>{e}</button></li>
                    })}
                </ul>
            </div>
            <div className='result'>
                {arr.length>1&&correctArr.length === arr.length?result:message}
            </div>
            <div className='numbContainer'>
                <div className='currentNumb'>{arr.length === correctArr.length? '':number}</div>
                <button className='currentNumbBtn' onClick={generateNumb}>Generate new number</button>
            </div>
        </div>
    );
}

export default Main;