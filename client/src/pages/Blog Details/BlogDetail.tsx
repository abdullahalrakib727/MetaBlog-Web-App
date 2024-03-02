import { FC, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import "react-loading-skeleton/dist/skeleton.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import Container from "../../components/Container/Container";
import HTMLReactParser from "html-react-parser";
import { format, parseISO } from "date-fns";
import useAxiosPublic from "../../api/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../api/useAxiosSecure";

const { Text } = Typography;
const { Title } = Typography;

const BlogDetail: FC = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const axiosPublic = useAxiosPublic();

  const params = useParams();
  const navigate = useNavigate();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["blog", params.id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs/${params.id}`);
      return res.data.data;
    },
  });

  const {
    _id,
    title,
    photoUrl,
    authorImg,
    authorName,
    published,
    authorId,
    content,
  } = data || {};

  const applyDarkMode = (tagName: string, className: string) => {
    const elements = document.getElementsByTagName(tagName);
    const elementsArray = Array.from(elements);
    elementsArray.forEach((element) => {
      element.classList.add(className);
    });
  };

  useEffect(() => {
    applyDarkMode("strong", "dark:text-white");
    applyDarkMode("h1", "dark:text-white");
    applyDarkMode("h2", "dark:text-white");
    applyDarkMode("h3", "dark:text-white");
    applyDarkMode("h4", "dark:text-white");
    applyDarkMode("h5", "dark:text-white");
    applyDarkMode("h6", "dark:text-white");
    applyDarkMode("p", "dark:text-[#BABABF]");
    applyDarkMode("a", "dark:text-white");
    applyDarkMode("span", "dark:text-white");
    applyDarkMode("td", "dark:text-white");
  }, [content]);

  const isValidDate = published && !isNaN(Date.parse(published));

  const publishDate = isValidDate
    ? format(parseISO(published), "MMMM dd, yyyy")
    : null;

  const handleDelete = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/blogs/${id}`);

          if (res.data.deletedCount > 0) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your Blog has been deleted.",
              icon: "success",
            });
            navigate("/");
          }
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Blog is safe :)",
            icon: "error",
          });
        }
      });
  };
  if (isLoading) {
    return (
      <span className="loading loading-spinner min-h-screen flex justify-center items-center mx-auto loading-lg"></span>
    );
  }

  return (
    <Container>
      <div className=" mb-10">
        <div className=" mt-10 p-2 lg:p-10">
          <Helmet>
            <title>Details | MetaBlog</title>
          </Helmet>

          <Typography>
            {isLoading ? (
              <>
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              <Title
                className="font-bold p-2 lg:p-0 dark:text-white lg:mt-8 text-center"
                level={2}
              >
                {title}
              </Title>
            )}
            <div className="flex flex-col md:flex-row  items-center gap-5 my-5 ">
              <div className="p-1 ">
                <div className="flex justify-center gap-2 items-center">
                  <img src={authorImg} alt="" className="w-10 rounded-full" />
                  <Text strong className="text-lg dark:text-[#696A75]">
                    {authorName}
                  </Text>
                </div>
              </div>
              {publishDate ? (
                <div className="dark:text-[#696A75]">{publishDate}</div>
              ) : (
                <Skeleton></Skeleton>
              )}
            </div>

            <div className=" mb-10 px-2 w-full">
              <PhotoProvider className="px-2 lg:px-0">
                <PhotoView src={photoUrl}>
                  <img
                    className="hover:cursor-zoom-in w-full max-h-[500px]"
                    src={photoUrl}
                    alt="Thumbnail"
                  />
                </PhotoView>
              </PhotoProvider>
            </div>
            {data?.content && (
              <div className="mb-10 overflow-auto dark:bg-[#181A2A]">
                {HTMLReactParser(
                  `<div class="dark:bg-[#181A2A] overflow-auto dark:text-white">${content}</div>`
                )}
              </div>
            )}
            <div className="mb-10 text-center">
              {authorId === user?.uid && (
                <div className="flex gap-3 justify-center">
                  <Link to={`/update/${_id}`}>
                    <button className=" py-2 px-4 text-center rounded-md bg-black text-white  normal-case hover:bg-white hover:text-black transition-all duration-300 shadow-md">
                      Update
                    </button>
                  </Link>
                  <button
                    className=" py-2 px-4 text-center rounded-md bg-green-700 text-white  normal-case hover:bg-red-600 transition-all duration-300 shadow-md"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default BlogDetail;
