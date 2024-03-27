import { FC } from "react";
import toast from "react-hot-toast";
import Container from "../../components/Container/Container";

const Contact: FC = (): JSX.Element => {
  // todo: will add email js later

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Message Sent Successfully");
  };

  return (
    <Container>
      <div className="min-h-[calc(100vh-100px)] my-5 flex justify-center items-center">
        <div className="w-11/12 mx-auto bg-[#F6F6F7] dark:bg-[#242535] py-5 rounded-md">
          <div className="flex flex-col items-center mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-white text-center">
              Contact Us
            </h1>
            <p className="text-gray-600 my-8 text-center md:w-1/2 mx-auto dark:text-white text-sm">
              Have a question, suggestion, or just want to say hi? We'd love to
              hear from you! Fill out the form below and well get back to you as
              soon as possible.
            </p>

            <form
              className="w-full max-w-lg"
              onSubmit={(event) => handleSend(event)}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white">
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white">
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white">
                    Email Address
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white">
                    Message
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                    placeholder="Write your message here..."
                    rows={6}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
