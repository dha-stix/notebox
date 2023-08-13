import Nav from "./components/Nav"
import Main from "./components/Main"
import { useState, useEffect, useCallback } from "react"
import Modal from "./components/Modal"

const App = () => {
  const [displayModal, setDisplayModal] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [myNotebook, setMyNotebook] = useState([])

  const fetchNoteBook = useCallback(() => {
    const notebook = localStorage.getItem("my_notebook")
    if (notebook) {
      const notes = JSON.parse(notebook)
      setMyNotebook(notes)
    }
  }, [])

  useEffect(()=> {fetchNoteBook()}, [fetchNoteBook])

  return (

    <div>
      {displayModal ?
        <Modal
          setDisplayModal={setDisplayModal}
          title={title}
          setTitle={setTitle}
          setContent={setContent}
          content={content}
          myNotebook={myNotebook}
          setMyNotebook={setMyNotebook}
        /> : (
        <div>
            <Nav
              setDisplayModal={setDisplayModal} />
            <Main
              myNotebook={myNotebook}
              setDisplayModal={setDisplayModal}
              setContent={setContent}
              setTitle={setTitle}
              setMyNotebook={setMyNotebook}
           />
         
        </div>
      )}
     
      </div>
  )
}

export default App