import React, {useState} from "react";
const axios = require('axios');

function App() {
  
  const [definitions, setDefinitions] = useState([]);
  const [word, setWord] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
       e.preventDefault();
       if(word.length === 0){
         alert("Please enter the word")
       }
      //  console.log(word);
     try{
       const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      //  console.log(response.data[0].meanings[0].definitions);
       const definitions = response.data[0].meanings[0].definitions;
       setDefinitions(definitions);
       console.log(definitions);
       setErrors("");

     } catch(error){
      //  console.log("error: ", error.response);
       setDefinitions([])
       setErrors(error.response.data.title);
      //  console.log("errors: ", errors);
     }
     setWord("");
  }

  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>Dictionary App</h1>
      <div style={{background:"pink", width:"50%", margin: "auto", textAlign:"center" }}>
         <form onSubmit={handleSubmit}>
           <input
               type="text" 
               value={word}  
               onChange={(e) => setWord(e.target.value)}
               placeholder="Enter the word"
           />
           <input type="submit" />
         </form>
      </div>
       <div style={{background:"yellow", width:"50%",margin: "auto", marginTop:"50px"}}>
          
         { !errors ?
          definitions.map(item => (
              <li>{item.definition}</li>
            ))
            :
            errors
         }
       </div>
       
    </div>
  );
}

export default App;
