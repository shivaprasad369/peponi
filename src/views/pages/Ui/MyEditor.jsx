import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
     
      className='w-[100%] h-[100%] '
    />
  );
};

export default MyEditor;
