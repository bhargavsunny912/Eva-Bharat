import axios from "axios";
import { useEffect, useState } from "react";

const useFetchapi=(url)=>{

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [data,setData]=useState(null);

    useEffect(()=>{
        
        async function fetchData() {
            try{

                if(url===null) return;

                setLoading(true);

                const res=await axios.get(url,{
                    headers:{
                        Accept: "application/vnd.github.v3+json"
                    }
                });
                setData(res?.data);
            }
            catch(error){
                console.error("API error",error);
                setError(error);
            }
            finally{
                setLoading(false);
            }
        }
        
        fetchData();
    },[url]);

    return {data,loading,error};

}

export default useFetchapi;