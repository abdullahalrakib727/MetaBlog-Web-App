import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../api/useAxiosSecure";

const AllBlogsList = () => {
    const axiosSecure = useAxiosSecure();

    const {data = []} = useQuery({
        queryKey : ['blogs-list'],
        queryFn : async ()=>{
            const response = await axiosSecure.get('/admin/blogs');
            return response.data;
        }
    })
    
    
    console.log(data);
    


    return (
        <section className="dark:text-white">
          <h1>All Blogs</h1>  
        </section>
    );
};

export default AllBlogsList;