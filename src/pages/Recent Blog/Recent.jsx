

const Recent = ({blog}) => {
    const {title, published} = blog;

    const timestamp = published;

    const date = new Date(timestamp);
    

    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    
 
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    

    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    
    const formattedTime = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;

    return (
        <div className=" border p-10"> 
            <h3>{title}</h3>
            <p>{formattedTime}</p>
        </div>
    );
};

export default Recent;