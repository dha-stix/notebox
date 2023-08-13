import { useState } from "react"
import {BiSolidEdit} from "react-icons/bi"
import { MdDeleteForever } from "react-icons/md"

const Main = ({ myNotebook, setDisplayModal, setTitle, setContent, setMyNotebook }) => {
    const [category, setCategory] = useState("")

    const handleEdit = (title, content, id) => {
        setDisplayModal(true)
        setContent(content)
        setTitle(title)
        const notes = localStorage.getItem("my_notebook")
        const notesArray = JSON.parse(notes)
        const newNotesArray = notesArray.filter(note => note.id !== id)
        localStorage.setItem("my_notebook", JSON.stringify(newNotesArray)) 
        alert("Note deleted ✅")
    }

    const handleDelete = (id) => {
        const response = confirm("Do you want to delete the note?")
        if (response) {
            const notes = localStorage.getItem("my_notebook")
            const notesArray = JSON.parse(notes)
            const newNotesArray = notesArray.filter(note => note.id !== id)
            localStorage.setItem("my_notebook", JSON.stringify(newNotesArray))  
        }    
    }

       const handleTagChange = (e) => {
        setCategory(e.target.value)
        const notebook = localStorage.getItem("my_notebook")
        const notes = JSON.parse(notebook)
        const filteredNote = notes.filter(note => note.tags.some(tag => tag.text === e.target.value))
       setMyNotebook(filteredNote)
    }
  return (
      <main className='py-8 md:px-10 px-3'>
          <div className="flex items-center justify-between">
              <h2 className='text-xl font-semibold mb-4'>Recent Notes</h2>
              <form className="space-x-4">
                  <label htmlFor="category">Tag</label>
                  <select value={category} onChange={handleTagChange} className="p-3 border-[1px]">
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Loved Ones">Loved Ones</option>
                      <option value="Others">Others</option>
                  </select>
              </form>
          </div>
         
          <div>
              {myNotebook.map(note => (
                  <div className='w-full bg-[#F5F5F5] rounded-lg flex items-center justify-between py-6 p-4 my-3' key={note.id}>
                  <h3 className='text-lg'>{note.title}</h3> 
                  <div className="flex items-center space-x-3">
                      <MdDeleteForever size={25} className="text-red-500 cursor-pointer" onClick={() => handleDelete(note.id)}/>
                          <BiSolidEdit size={25} className="text-blue-500 cursor-pointer" onClick={() => handleEdit(note.title, note.content, note.id) }/>
                  </div>
              </div> 
              ))}
              {myNotebook.length === 0 && <p className="text-red-500">You have no existing notes</p>}
             
          </div>
      </main>
  )
}


export default Main
