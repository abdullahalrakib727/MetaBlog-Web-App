import { useLoaderData } from "react-router-dom";


const BlogDetail = () => {
    const data = useLoaderData();
    const {_id,title,photUrl,shortDescription,longDescription}= data;
    console.log(data)
    // title,image,short 
    // description, long description
    return (
        <div>
            <h2>this is blog of : {title}</h2>
            <img src={photUrl} alt="" />
            <p>{shortDescription}</p>
            <p>{longDescription}</p>
        </div>
    );
};

export default BlogDetail;