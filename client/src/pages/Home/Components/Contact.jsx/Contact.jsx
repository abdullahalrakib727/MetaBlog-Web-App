import { Button, ChakraProvider, Input, Text, Textarea } from "@chakra-ui/react";
import Swal from "sweetalert2";


const Contact = () => {
const handleSubmit = e=>{
    e.preventDefault();
    if(e.target.email.value){
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thanks for your feedback.Our admin has been notified about the issue",
            showConfirmButton: false,
            timer: 1500
          });
          e.target.reset();
    }
}

 
  return (
    <div className="container mx-auto w-3/4 " >
        <h4 className="text-center mt-10 text-3xl font-bold">Contact Us</h4>
    <ChakraProvider>
    <div className="bg-white shadow-lg mt-10 mb-10 p-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h1>Email:</h1>
          <Input className="w-3/4" name="email" type="email" placeholder="Your Email" />
          <Text mb="8px">Your Message: </Text>
          <Textarea
         className="w-3/4 "
         type="text"
            placeholder="Send us feedback or your opinion or any query"
            size="lg"
          />
          <br />
          <Button  type="submit" >Send</Button>
        </form>
      </div>
    </ChakraProvider>
    </div>
  );
};

export default Contact;
