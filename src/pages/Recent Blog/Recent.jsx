import TimeFormat from "../../function/TimeFormat";


const Recent = ({blog}) => {
    const {title, published} = blog;
    const formattedTime = TimeFormat(published);
    return (
        <div className=" border p-10"> 
            <h3>{title}</h3>
            <p>{formattedTime}</p>
        </div>
    );
};

export default Recent;