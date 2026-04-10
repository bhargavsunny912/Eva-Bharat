import "../App.css";

const SearchedUsers=({loading,error,data,SelectUser})=>{

    if(loading){
        return <h1 className="text-lg top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 border bg-gray-500 border-gray-500 py-3  px-10 rounded-2xl text-white">Loading Github Users</h1>
    }

    if(error){
        return <h1 className="text-lg top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 border bg-gray-300 border-gray-300 py-3 px-10 rounded-2xl text-red-500">Error occured while fetching github users {error.message}</h1>
    }

    if(data?.length === 0){
        return <h1 className="text-lg border top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 bg-gray-500 border-gray-500 py-3  px-10 rounded-2xl text-white">No Users found</h1>
    }

    return (
        <div className="w-1/3 border-2 border-gray-300 cursor-pointer rounded-b-2xl h-[70vh] overflow-y-scroll scroll">
            {/* if user has records */}

            {data?.map((user)=>{
                return <div className="flex gap-5 justify-start items-center p-2 hover:bg-gray-200" key={user?.id} onClick={()=>SelectUser(user?.login)}>
                <img className="h-15 w-15 rounded-xl" src={user?.avatar_url} alt="avatar" />
                <h1 className="text-lg font-semibold">{user?.login}</h1>
                </div>
            })}
        </div>
    );
}
export default SearchedUsers;