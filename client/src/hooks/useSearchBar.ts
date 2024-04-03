import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../api/useAxiosPublic";
import { debounce } from "lodash";

export default function useSearchBar (){
    const [value, setValue] = useState("");
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
  
    const axiosPublic = useAxiosPublic();
  
    const handleSearch = useCallback(async () => {
      if (value.trim() === "") {
        clearSearchResults();
        return;
      }
  
      const res = await axiosPublic.get(`/blogs/search?include=${value}`);
      setBlogs(res.data.data);
    }, [value, axiosPublic]);
  
    const debouncedHandleSearch = debounce(handleSearch, 3000);
  
    const clearSearchResults = () => {
      setBlogs([]);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
  
      if (e.target.value.trim() === "") {
        clearSearchResults();
      } else {
        debouncedHandleSearch();
      }
    };
  
    useEffect(() => {
      handleSearch();
    }, [value, handleSearch]);
  
    const handleReset = () => {
      setValue("");
      clearSearchResults();
    };
 
    return { handleInputChange, handleReset, blogs, navigate, handleSearch };

}