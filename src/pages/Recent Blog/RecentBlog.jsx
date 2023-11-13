
import Recent from "./Recent";
import { useEffect, useState } from "react";
import axios from "axios";


const RecentBlog = () => {
    
    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/all').then(result=>{
            // console.log(result.data)
            setBlogs(result.data)
        })
    },[])
  
    const recentBlogs = blogs.sort((a, b) => new Date(b.published) - new Date(a.published));
    
    
    const limitedBlogs = recentBlogs.slice(0,6)

    return (
        <div className="grid grid-cols-2 gap-4">
            {
                limitedBlogs.map(r=><Recent key={r._id} blog={r}></Recent>)
            }
        </div>
    );
};

export default RecentBlog;