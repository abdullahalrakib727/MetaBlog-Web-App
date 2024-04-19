
import { format, parseISO } from 'date-fns';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BlogsProps } from '../../api/useBlogData';
import { CiEdit } from 'react-icons/ci';

type BlogTableProps = {
    blog:BlogsProps;
    handleChangeStatus: (id: string, status: string) => void;
    handleDeleteBlog: (id: string) => void;
};


const BlogTable = ({blog, handleChangeStatus,handleDeleteBlog}:BlogTableProps) => {
    return (
        <tr key={blog._id}>
                <td>
                  <img
                    src={blog.photoUrl}
                    alt={blog.title}
                    className="h-20 w-16 object-contain"
                  />
                </td>
                <td>{blog.title}</td>
                <td>{blog.authorName}</td>
                <td>{format(parseISO(blog.published), "dd, M, yyyy")}</td>
                <td>{blog.status}</td>
                <td>
                  <button className="hover:bg-blue-500 p-2 hover:text-white transition-all duration-300 rounded-md">
                    <Link to={`/blogs/${blog.slug}`}>Details</Link>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleChangeStatus(blog._id, blog.status)}
                    className="text-2xl bg-blue-400 p-2 rounded-md hover:bg-blue-700 transition-colors duration-300 hover:text-white"
                  >
                    <CiEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="text-2xl bg-blue-400 p-2 rounded-md hover:bg-red-600 transition-colors duration-300 hover:text-white"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
    );
};

export default BlogTable;