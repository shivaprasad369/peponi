import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const MyEditor = ({value,setValue}) => {
 
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
    'line-height', // Include line-height in formats
  ];
  const theme=useSelector((state)=>state.theme)
  return (
    <div className={`pb-[2rem]  h-[25rem]`}>
    <ReactQuill
      theme={`${theme === 'dark' ? 'snow' : 'snow'}`}
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
     
      className={`w-[100%] h-[100%] `}
    />
    </div>
  );
};

export default MyEditor;
