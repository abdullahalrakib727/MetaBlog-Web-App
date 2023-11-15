
import Recent from "./Recent";

import LimitedBlog from "../../function/LimitedBlog";


const RecentBlog = () => {
    
    const limitedBlogs = LimitedBlog();

    return (
        <div className="grid grid-cols-2 gap-4">
            {
                limitedBlogs.map(r=><Recent key={r._id} blog={r}></Recent>)
            }
        </div>
    );
};

export default RecentBlog;