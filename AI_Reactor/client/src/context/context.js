
import {createContext, useState} from 'react'
import run from '../config/gemini';

export const Context=createContext();

const ContextProvider=(props)=>{
    const [input,setInput]=useState("");
    const[recentPrompt,setRecentPrompt]=useState("");
    const[prevPrompts,setPrevprompts]=useState([]);
    const[showResult,setShowResult]=useState(false);
    const[loading,setLoading]=useState(false);
    const[resultData,setResultData]=useState("");

    const delayPara=(index,next)=>{
        setTimeout(function(){
            setResultData(prev=>prev+next);

        },75*index)

    }


    const onSent=async(prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevprompts(prev=>[...prev,input])
       const response=await run(input)
       let responseArray=response.split("**");
       let newResponse;
    //    for double star ** we use it to hightlight it 
       for(let i=0;i<responseArray.length;i++){
        if(i===0 || i%2!==1){
            newResponse+=responseArray[i];
        }
        else{
            newResponse+="<b>"+responseArray[i]+"</b>"

        }
       }

       // now after double star we have single star * .in place of it we use new line;
       let newResponse2=newResponse.split("*").join("</br>")

      let newResponseArray=newResponse2.split(" ");
      for(let i=0;i<newResponseArray.length;i++){
        const nextWord=newResponseArray[i];
        delayPara(i,nextWord +" ");
      }
       setLoading(false);
       setInput("");

    }
   
    const contextValue={
        prevPrompts,
        setPrevprompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
       

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;
