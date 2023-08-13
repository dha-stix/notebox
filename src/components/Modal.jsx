import { useState } from "react";
import { MdCancel } from "react-icons/md"
import { WithContext as ReactTags } from 'react-tag-input';
import {KeyCodes, delimiters, suggestions, generateID } from "../../src/tags"

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Modal = ({ setDisplayModal, title, setTitle, setContent, content, myNotebook, setMyNotebook }) => {
    const handleCloseModal = () => setDisplayModal(false)
    const [tags, setTags] = useState([ { id: "Work", text: "Work" },
	{ id: "Personal", text: "Personal" },
	{ id: "Others", text: "Others" },
	{ id: "Loved Ones", text: "Loved Ones" },]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);

  };
    
    const handleSubmit = (e) => {
        e.preventDefault()
      const notebook = localStorage.getItem("my_notebook")
      if (notebook) {
        const notes = JSON.parse(notebook)
        notes.unshift({ title, content, tags, id: generateID() })
        localStorage.setItem("my_notebook", JSON.stringify(notes))
        
      } else {
        const newNotes = [{ title, content, tags, id: generateID() }]
        localStorage.setItem("my_notebook", JSON.stringify(newNotes))
    }
	  alert("Noted created ✅") 
        setContent("")
        setTitle("")
        setDisplayModal(false)
    }
   
  return (
      <div className="md:p-8 py-8 px-4">
          <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-blue-500">Add/ Update your Note</h3>
              <MdCancel size={40}  className="text-red-500 cursor-pointer" onClick={handleCloseModal}/>
          </div>
         
          <form onSubmit={handleSubmit} className="flex flex-col justify-center">
              <label htmlFor="title">Title</label>
              <input type="text" value={title}
                  onChange={(e) => setTitle(e.target.value)} className="border-[1px] p-4 rounded text-2xl mb-3" name="title" id="title" required/>
              
               <label htmlFor="content">Content</label>
              <textarea rows={10} name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} className="border-[1px] p-4 rounded mb-3" required/>

              <label htmlFor="tags">Tags</label>

                 <ReactTags
                  tags={tags}
                  suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleDrag={handleDrag}
          inputFieldPosition="bottom"
          editable={false}
                autocomplete
              />
              

              <button className="px-4 py-3 w-[200px] bg-blue-600 text-white rounded shadow-lg hover:bg-blue-500">UPDATE NOTES</button>
          </form>
      </div>
  )
}

export default Modal
