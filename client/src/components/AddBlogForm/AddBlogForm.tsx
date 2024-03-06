import JoditEditor from "jodit-react";


interface AddBlogFormProps {
    content : string; 
    setContent: (content: string) => void; 
    isSubmitting: boolean; 
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}


const AddBlogForm = ({content,setContent,isSubmitting,handleSubmit}:AddBlogFormProps) => {
    return (
        <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Title
                </span>
              </label>
              <input
                type="text"
                name="blogTitle"
                placeholder="Blog's title"
                className="appearance-none focus:outline-none input bg-gray-200 dark:bg-white dark:border-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Image URL
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Thumbnail link"
                className="appearance-none focus:outline-none input bg-gray-200 dark:bg-white dark:border-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Choose a Category
                </span>
              </label>
              <select
                name="category"
                className="appearance-none focus:outline-none select bg-gray-200 dark:bg-white dark:border-white w-full"
                required
              >
                <option value="Lifestyle">Life Style</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Business">Business</option>
                <option value="Economy">Economy</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black dark:text-white">
                  Body
                </span>
              </label>
              <JoditEditor
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                disabled={isSubmitting}
                className=" py-2 rounded-md text-white bg-[#4B6BFB] hover:bg-blue-400 transition-colors duration-300  dark:bg-[#4B6BFB] uppercase w-32 mx-auto"
              >
                Add
              </button>
            </div>
          </form>
    );
};

export default AddBlogForm;