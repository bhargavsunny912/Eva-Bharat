/* eslint-disable react-hooks/set-state-in-effect */
import Repo from "./Repos";
import "../App.css";
import { useEffect, useState } from "react";

const UserRepos=({setPage,username,repoLoading,repoError,repoData,sort,language,setSort,setLanguage})=>{
    
    const [allRepos,setAllRepos]=useState([]);
    const [Fetching,setFetching]=useState(false);
    const [bookMarks,setBookMarks]=useState(()=>{
        return JSON.parse(localStorage.getItem("bookmarks"))||[];
    });

    useEffect(()=>{
        if(repoData){
            setAllRepos((prevRepos)=>{
                const newRepos=repoData.filter((repo)=>{
                    return !prevRepos.some((r)=>r.id === repo.id)
                })

                return [...prevRepos,...newRepos];
            });
        }   
    },[repoData]);

    useEffect(()=>{
        localStorage.setItem("bookmarks",JSON.stringify(bookMarks));
    },[bookMarks]);

    const toggleBookMark=(repo)=>{
        let exist=bookMarks.filter((f)=>f.id === repo.id);

        if(exist.length>0){
            setBookMarks(bookMarks.filter((f)=>f.id !==repo.id));
        }
        else{
            setBookMarks([...bookMarks,repo]);
        }
    }

    useEffect(()=>{
        setPage(1);
        setAllRepos([])
    },[username]);

    const handleScroll=(e)=>{
        if(!repoLoading && !Fetching && e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight+1){
            setFetching(true)
            setPage((pre)=>pre+1);
        }
    }

    useEffect(()=>{
        if(!repoLoading){
            setFetching(false);
        }
    },[repoLoading]);

    let processedRepos=allRepos;

    if(language){
        processedRepos=processedRepos.filter((repo)=>repo.language === language);
    }
    if(sort === "stars"){
        processedRepos=[...processedRepos].sort((a,b)=>b.stargazers_count-a.stargazers_count);
    }
    if(sort === "forks"){
        processedRepos=[...processedRepos].sort((a,b)=>b.forks_count-a.forks_count);
    }

    if(repoError){
        return <h1 className="text-lg top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 border bg-gray-300 border-gray-300 py-3 px-10 rounded-2xl text-red-500">Error Ocuured while fetching User repos {repoError.message}</h1>
    }

    return (
        <div onScroll={handleScroll} className="relative overflow-y-scroll scroll h-[70vh] w-1/3 mx-auto flex flex-col gap-5 items-center justify-start mt-5 border-2 rounded-lg border-gray-300">
            
            <h1 className="p-2 text-lg bg-gray-500 text-white text-center w-full rounded-md">Repositories of   {username}</h1>
            <div className="flex justify-around w-full items-center flex-wrap">

                <select className="border border-gray-400 w-1/3 py-2 text-center rounded-md" onChange={(e)=>setLanguage(e.target.value)}>
                    <option value="">Languages</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JAVASCRIPT</option>
                    <option value="Python">PYTHON</option>
                    <option value="TypeScript">TYPESCRIPT</option>
                </select>

                <select className="border border-gray-400 w-1/3 py-2 text-center rounded-md" onChange={(e)=>setSort(e.target.value)}>
                    <option value="">Sort</option>
                    <option value="stars">Stars</option>
                    <option value="forks">Forks</option>
                </select>
            </div>

            {processedRepos?.length===0 && <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg py-2 px-4 border-2 bg-gray-500 text-white border-gray-500 rounded-lg">No Repos found for {username}</h1>}

            <div className="mx-5 mb-5 flex flex-col gap-5 items-center justify-center">
                {processedRepos?.map((repo)=>{
                    return <Repo repo={repo} key={repo.id} isBookMarked={bookMarks.some((s)=>s.id===repo.id)} toggleBookMark={toggleBookMark}/>
                })}

                {repoLoading && <h1 className="text-lg border top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 bg-gray-500 border-gray-500 py-3  px-10 rounded-2xl text-white">Loading Repositories</h1>}
                </div>
        </div>
    );
}
export default UserRepos;