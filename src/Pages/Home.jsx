/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import useFetchapi from "../CustomHooks/useFetchapi";
import SearchedUsers from "../Components/SearchedUsers";
import UserRepos from "../Components/UserRepos";

const Home=()=>{
    const [input,setInput]=useState("");
    const [debounce,setDebounce]=useState(input);
    const {data,loading,error}=useFetchapi(debounce?`https://api.github.com/search/users?q=${debounce}`:null);
    const [username,setUsername]=useState("");
    const [page,setPage]=useState(1);
    const {data:repoData,loading:repoLoading,error:repoError}=useFetchapi(username?`https://api.github.com/users/${username}/repos?page=${page}&per_page=5`:null);
    const [sort,setSort]=useState(null);
    const [language,setLanguage]=useState("");

    useEffect(()=>{
        let timer;

        timer=setTimeout(() => {
           setDebounce(input);
        },500);

        return ()=>clearTimeout(timer);
    },[input]);

    //clearing the old debounce value
    useEffect(()=>{
        setUsername("")
    },[debounce]);


    const handleUserRepo=(username)=>{
        setUsername(username);   
    }


    return (
        <div className="relative flex w-full justify-start items-center flex-col h-screen">
        <input
        className={`p-3 border-2 w-1/3 border-gray-300 text-black text-lg mt-10 ${data && !repoData?"rounded-t-xl":"rounded-xl"}`}
        type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Search Github User Repos " required/>

        {/* if there is no input  */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {!debounce && <h1 className="text-lg border bg-gray-500 border-gray-500 py-3  px-10 rounded-2xl text-white">Search for any github users</h1>}
        </div>

        {debounce && !username && <SearchedUsers loading={loading} error={error} data={data?.items} SelectUser={handleUserRepo}/>}

        {/* repos */}

        {username && <UserRepos page={page} setPage={setPage} username={username} repoLoading={repoLoading} repoError={repoError} repoData={repoData} sort={sort} language={language} setSort={setSort} setLanguage={setLanguage} />}
        </div>
    );
}
export default Home;