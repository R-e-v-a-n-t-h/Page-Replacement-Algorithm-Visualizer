import React,{useState,useEffect} from 'react'
import './visualizer.css'

const initialColor='rgba(0, 0, 0, 0.144)'





function Visualizer() {
//--------------------------------------------------------------------------------------------> Variable States
    const [algo,setAlgo]= useState('FIFO')

    const[hit,setHit]=useState(0)
    const[fault,setFault]=useState(0)
    const[hitRatio,setHitratio]=useState('-')

    const [mainButtonColor,setMainButtonColor]=useState("btn-primary")
    const[reset,setReset]=useState(false)

    const buttonThemes=['red','yellow','lime','aqua','darkorange','magenta','chocolate']
    const [queue,setQueue]=useState([])
    const [framesArray,setFramesArray]=useState([initialColor,initialColor,initialColor,initialColor])    
//--------------------------------------------------------------------------------------------X

//--------------------------------------------------------------------------------------------> Changing algorithm
    function changeAlgo(){
        if (algo=='FIFO'){
            setAlgo('LRU')
            setMainButtonColor("btn-success")
        }
        else{
            setAlgo('FIFO')
            setMainButtonColor("btn-primary")
        }
    }

    useEffect(() =>{
            setFramesArray([initialColor,initialColor,initialColor,initialColor])
            setHit(0)
            setFault(0)
            setHitratio('-')
            setQueue([])
    },[algo,reset])
//--------------------------------------------------------------------------------------------X
    


//--------------------------------------------------------------------------------------------> Changing frames colors
    function findCol(A,col){
        for(let i=0;i<4;i++){
            if (A[i]==col)
                return true
        }
        return false
    }

    function removeReAdd(A,col){
        let temp=[]
        for(let i=0;i<A.length;i++){
            if(A[i]!=col)
                temp.push(A[i])
        }
        temp.unshift(col)
        return temp
    }

    function setColor(color){
        let hhit=hit,ffault=fault
        if(algo === 'FIFO'){
            if (findCol(framesArray,color)){
                setHit(hit+1)
                hhit+=1
            }
            else{
                setFault(fault+1)
                if(findCol(framesArray,initialColor)){
                    let x=[...framesArray];
                    let n= x.indexOf(initialColor);
                    x[n]=color;
                    setFramesArray(x);
                }

                else{
                    let x=[...framesArray];
                    let n= x.indexOf(queue[3]);
                    x[n]=color;
                    setFramesArray(x);
                }
                if(queue.length<4){
                    let x=[...queue]
                    x.unshift(color)
                    setQueue(x)
                }
                else{
                    let x=[...queue]
                    x.unshift(color)
                    x.pop()
                    setQueue(x)
                }
              ffault+=1  
            }
        }
        
        else{
            if (findCol(framesArray,color)){
                setHit(hit+1)
                let x=[...queue]
                x=removeReAdd(x,color)
                setQueue(x)
                hhit+=1
            }
            else{
                setFault(fault+1)
                if(findCol(framesArray,initialColor)){
                    let x=[...framesArray];
                    let n= x.indexOf(initialColor);
                    x[n]=color;
                    setFramesArray(x);
                }

                else{
                    let x=[...framesArray];
                    let n= x.indexOf(queue[3]);
                    x[n]=color;
                    setFramesArray(x);
                }
                if(queue.length<4){
                    let x=[...queue]
                    x.unshift(color)
                    setQueue(x)
                }
                else{
                    let x=[...queue]
                    x.unshift(color)
                    x.pop()
                    setQueue(x)
                }
              ffault+=1  
            }
        }

        setHitratio(hhit/(hhit+ffault))
    }
//--------------------------------------------------------------------------------------------X


    return (
        <div>
            {/*Algorithm Changing Button*/}
            <br></br>
            <button type="button" className={"algoButton btn w-100 "+" "+ mainButtonColor} onClick={()=>changeAlgo()}>{algo} <i class="fas fa-repeat"></i></button>
            <br></br><br></br>

            {/*Paint Buttons*/ }
            <div className="buttonGrid">
                {buttonThemes.map(x=>{
                    return(
                        <button className={'btn paintButton'} style={{'background-color':x}}  onClick={()=>{setColor(x)}}><i class="fas fa-paint-brush"></i></button>
                    )
                })}

                <button type="button" className={"btn btn-danger redoButton"} style={{'border-radius':'100%', 'border':'none'}} onClick={()=>{setReset(!reset)}}><i class="fad fa-sync"></i></button>
            </div>
     
            {/*Frames*/}
            <div className="framesHolder">
                {framesArray.map(x=>{
                    return(
                        <div className="frame" style={{'height':"30vh", "width":'17vw','background-color':x }}></div>
                    )
                })}

            </div>

            {/*Hits, Faults and Hit ratio*/}
            <div className='writtenHolder'>
                <div className='written'><h2>Hits: {hit}</h2></div>
                <div className='written'><h2>Faults: {fault}</h2></div>
            </div>
            <div className='hitratio'><h2>Hit ratio: {hitRatio}</h2></div>
        </div>
    )
}

export default Visualizer
