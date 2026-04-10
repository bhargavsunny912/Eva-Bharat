import { Link } from "react-router-dom";

const Repo=({repo,isBookMarked,toggleBookMark})=>{
    const {id,name,description,stargazers_count,forks_count,html_url}=repo;

    return (
        <div key={id} className="border-2 border-gray-300 hover:bg-gray-200 rounded-xl p-3 w-full">
            <div className="flex items-center justify-between flex-wrap">
                <h1>Name : {name}</h1>
                <Link target="_blank" to={html_url} className="px-2 py-1 rounded-md bg-black text-white">Link </Link>
            </div>
            <div className="flex items-center justify-start gap-5 flex-wrap">
                <p>Stars count : {stargazers_count}</p>
                <p>Forks count : {forks_count}</p>
                <button onClick={()=>toggleBookMark(repo)}>{isBookMarked?"remove ⭐":"Bookmark ⭐"}</button>
            </div>
            <p>Description : {description || "No description available"}</p>
        </div>
    );
}
export default Repo;