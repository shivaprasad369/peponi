import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from '../../Ui/Datatable';
import { FaQuestionCircle } from 'react-icons/fa';
import Faqs from '../../Ui/Faqs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

export default function Faq() {
  document.title = 'FAQs';
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const theme = useSelector((state) => state.theme);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        console.log(data);
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
      toast.error("Failed to save FAQ");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this FAQ?');
    if (!confirm) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/faq/${id}`);
      toast.success("FAQ Deleted Successfully");
      queryClient.invalidateQueries(['faqs']);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) { 
      toast.error("Failed to delete FAQ");
    }
  };

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

  const handleEdit = (faq) => {
    setIsEdit(faq);
    console.log(faq);
    setValue("question", faq.question);
    setValue("answer", faq.answer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Reorder FAQs
    const reorderedUsers = Array.from(users);
    const [movedFaq] = reorderedUsers.splice(source.index, 1);
    reorderedUsers.splice(destination.index, 0, movedFaq);

    setUsers(reorderedUsers);

    // Optional: Save the new order in the backend
    // axios.post(`${import.meta.env.VITE_API_URL}/faq`, { faqs: reorderedUsers })
    //   .then(() => toast.success("FAQ order updated"))
    //   .catch(() => toast.error("Failed to update FAQ order"));
  };

  const handleUpdateAnswer = async (id, updatedAnswer) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/faq/${id}`, { answer: updatedAnswer });
      if (response.status === 200) {
        toast.success("Answer Updated Successfully");
        queryClient.invalidateQueries(['faqs']);
      }
    } catch (error) {
      toast.error("Failed to update answer");
    }
  };


  return (
    <div className={`w-full px-4 h-[100%] ${theme === 'dark' ? 'bg-[#212631] text-white' : 'bg-slate-200 text-gray-800'} flex flex-col gap-5 items-center justify-center`}>
      <ToastContainer autoClose={1000} />
      <div className='flex gap-2 mt-[-2rem] items-center justify-start w-[100%]'>
        <FaQuestionCircle className='text-3xl font-semibold' />
        <h1 className='text-3xl font-normal'>Manage FAQs</h1>
      </div>
      <div className={`w-full mt-[-2rem] h-[100%] rounded-lg shadow-lg p-4 ${theme === 'dark' ? 'bg-[#2d3341]' : 'bg-white'}`}>
        {errors.question && <p className='text-red-500'>Question is required</p>}
        {errors.answer && <p className='text-red-500'>Answer is required</p>}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:p-4 max-md:p-2 rounded'>
          <label htmlFor="question" className='font-bold'>FAQ Question *</label>
          <input
            type="text"
            placeholder="Enter question"
            {...register("question", { required: true })}
            className={`"w-full p-2 border border-gray-300 outline-none rounded mb-2 ${theme === 'dark' ? 'bg-[#1F242E]' : 'bg-white'}`}
          />
          <label htmlFor="answer" className='font-bold'>FAQ Answer *</label>
          <textarea
            placeholder="Enter answer"
            {...register("answer", { required: true })}
            rows="4"
            className={`w-full p-2 border border-gray-300 outline-none rounded mb-4 ${theme === 'dark' ? 'bg-[#1F242E]' : 'bg-white'}`}
          />
          <div className='flex justify-between'>
            <button type="reset" onClick={() => { reset(); setIsEdit(null); }} className="px-4 py-2 border border-gray-300 rounded">Clear</button>
            <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded'>
              {isEdit ? 'Update FAQ' : 'Add FAQ'}
            </button>
          </div>
        </form>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="faqs">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`w-full flex flex-col p-2 gap-2 ${theme === 'dark' ? 'bg-[#2d3341]' : 'bg-white'}`}
            >
              <p className='text-start p-4 text-xl w-[100%] border-b border-gray-300 font-bold'>List of FAQs</p>
              <div className="w-[100%] flex flex-col gap-2 ">
                <div className={`h-[100%] w-[100%] relative  ${theme === 'dark' ? 'bg-[#2d3341]' : 'bg-white'} border-b-[1px] border-gray-400`}>
                  <div className='w-[100%] py-3 flex justify-around items-center'>
                    <div className=' flex justify-center items-center'>

                    </div>
                    <div className='text-center -mb-5  font-bold'>
                      Questions
                    </div>
                    <div className='flex gap-2 font-bold'>
                      Action
                    </div>

                  </div>
                  
                </div>

              </div>
              {users.map((user, index) => (
                <Draggable key={user.id} draggableId={user.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Faqs question={user.question} answer={user.answer} user={user} id={user.id} handleEdit={handleEdit} handleDelete={handleDelete} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <DataTable
        data={users}
        title="List Of FAQ"
        onDelete={handleDelete}
        onEdit={handleEdit}
      /> */}
    </div>
  );
}
