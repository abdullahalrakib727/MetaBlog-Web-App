
import axios from "axios";
import { useEffect, useState } from "react";


const LimitedBlog = () => {
    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/all').then(result=>{
            // console.log(result.data)
            setBlogs(result.data)
        })
    },[])
    const recentBlogs = blogs.sort((a, b) => new Date(b.published) - new Date(a.published));
    
    
    const limitedBlogs = recentBlogs.slice(0,6)
    return limitedBlogs;
};

export default LimitedBlog;
