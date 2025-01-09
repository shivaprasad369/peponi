import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from '../../Ui/Datatable';
import { TbRuler } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
export default function Faq() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(null); 
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
const theme=useSelector((state)=>state.theme)

// console.log(theme)
  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/faq/${isEdit.id}`, data);
        if (response.status === 200) {
          toast.success("FAQ Updated Successfully");
        }
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/faq`, data);
        if (response.status === 200) {
          toast.success("FAQ Added Successfully");
        }
      }
      setIsEdit(null);
      reset();
      queryClient.invalidateQueries(['faqs']);
    } catch (error) {
      // console.error(error);
      toast.error("Failed to save FAQ");
    }
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/faq/${id}`);
      toast.success("FAQ Deleted Successfully");
      queryClient.invalidateQueries(['faqs']);

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      // console.error(error);
      toast.error("Failed to delete FAQ");
    }
  };

  // Load FAQs
  const { data: dataFaq, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/faq`);
      return response.data.result;
    }
  });

  useEffect(() => {
    if (dataFaq) setUsers(dataFaq);
  }, [dataFaq]);

  // Edit FAQ
  const handleEdit = (faq) => {
    setIsEdit(faq);
    setValue("question", faq.question);
    setValue("answer", faq.answer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update Answer from Expanded Row
  const handleUpdateAnswer = async (id, updatedAnswer) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/faq/${id}`, { answer: updatedAnswer });
      if (response.status === 200) {
        toast.success("Answer Updated Successfully");
        queryClient.invalidateQueries(['faqs']);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Failed to update answer");
    }
  };

  return (
   
    <div className={`w-full h-[100%] ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-white text-gray-800 '} flex flex-col gap-10 items-center justify-center`}>
      <ToastContainer autoClose={1000} />
      <div className={`w-full h-[100%] rounded-lg shadow-lg p-4 ${theme === 'dark' ? 'bg-[#2d3341]' : 'bg-white'}`}>
        <h1 className='text-2xl font-bold mb-4'>Manage FAQs</h1>
        {(errors.quetion || errors.answer) && <p className='text-red-500'>Question and Answer is required</p>}
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${theme === 'dark' ? 'bg-[#2d3341]' : 'bg-white'} md:p-4 max-md:p-2 rounded '`}>
          <label htmlFor="question" className='font-bold'>FAQ Question *</label>
          <input
            type="text"
            placeholder="Enter question"
            {...register("question", { required: TbRuler})}
            className={`w-full p-2 border ${errors.question ? 'border-red-500' : 'border-gray-300'} outline-none rounded mb-2 ${theme === 'dark' ? 'bg-[#272b38] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
          />
          <label htmlFor="answer" className='font-bold'>FAQ Answer *</label>
          <textarea
            placeholder="Enter answer"
            {...register("answer", { required: true})}
            rows="4"
            className={`w-full p-2 border ${errors.answer ? 'border-red-500' : 'border-gray-300'} outline-none rounded mb-4 ${theme === 'dark' ? 'bg-[#272b38] text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
          />
          <div className='flex  justify-between'>
            <button type="reset" onClick={() => reset()} className={`px-4 py-2 border-1 border-gray-300 rounded ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-gray-200 text-black'}`}>Clear</button>
            <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded'>
              {isEdit ? 'Update FAQ' : 'Add FAQ'}
            </button>
          </div>
        </form>
      </div>
      <DataTable
        data={users}
        onDelete={handleDelete}
        expand={true}
        onEdit={handleEdit}
        onAnswerUpdate={handleUpdateAnswer} // Pass callback for answer updates
      />
    </div>
    
  );
}
