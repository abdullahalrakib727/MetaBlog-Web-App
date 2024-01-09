import SendIcon from "@mui/icons-material/Send";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";

const NewSletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.email.value) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You will be notified regularly",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="h-60 ">
      <div className="mt-10 h-full bg-cover bg-center bg-slate-200 ">
        <h3 className="text-center text-2xl italic font-semibold pt-10 mb-5">
          Subscribe For Latest Updates
        </h3>
        <div className="w-3/4 mx-auto">
          <form className="space-y-4 " onSubmit={handleSubmit}>
            <TextField
              name="email"
              type="email"
              fullWidth
              label="Email"
              id="fullWidth"
            />
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSletter;
