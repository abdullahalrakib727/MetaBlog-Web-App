import React, { useRef, useState } from 'react';
import useAuth from './useAuth';
import useAxiosPublic from '../api/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAboutUser = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
  
    const {
      data = {},
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["userDetails", user?.uid],
      queryFn: async () => {
        const res = await axiosPublic.get(`/users/${user?.uid}`);
        return res.data.data;
      },
    });
  
    const [edit, setEdit] = useState(false);
    const about = useRef<HTMLTextAreaElement>(null);
  
    const handleEdit = () => {
      setEdit((prev) => !prev);
    };
  
    const handleSave = async (event: React.FormEvent) => {
      event.preventDefault();
  
      await axiosPublic.put(`/users/${user?.uid}`, {
        bio: about.current?.value,
      });
      refetch();
  
      setEdit((prev) => !prev);
    };


return { data, isLoading, edit, handleEdit, handleSave, about, user };

};

export default useAboutUser;