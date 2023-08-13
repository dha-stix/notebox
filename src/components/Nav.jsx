const Nav = ({ setDisplayModal}) => {
  const handleAddNote = () => {
    setDisplayModal(true)
  }
  return (
      <nav className="w-full p-8 bg-[#EEEDED] h-[10vh] flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#6C3428]">NoteBox</h2>
          <button className=" bg-[#BA704F] text-white py-2 rounded px-4" onClick={handleAddNote}>Add Note</button>
      </nav>
  )
}

export default Nav