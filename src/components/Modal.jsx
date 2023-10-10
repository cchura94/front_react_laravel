const Modal = ({children, modalOpen, setModalOpen, titulo}) => {
    return(
        <>
        {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white rounded-lg p-6 w-2/3 md:w-1/2 xl:w-1/3 relative">
                    <h2>{titulo}</h2>
                    {children}
                    <button className="px-4 py-2 mt-4 bg-gray-300 hover:bg-gray-400 rounded top-0 absolute right-0 mr-4" onClick={() => setModalOpen(false)}>X</button>
                </div>

            </div>
        )}
        </>
    )
}

export default Modal;