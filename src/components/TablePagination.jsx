import { useState } from "react";

const TablePagination = ({ columnas, datos, total, page, paginate, handleUploadImage, handleEdit, handleDelete, handleShow, handleAddCarrito, handlePDF }) => {
    const [itemsPerPage, setItemsPerPage] = useState(5)
    return (
        <>

            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {columnas.map((columna, index) => (
                            <th className="py-2 px-4 text-left text-sm font-medium uppercase" key={index}>{columna.label}</th>
                        ))}

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {datos.map((data) => (
                        <tr key={data.id}>
                            {columnas.map((columna, index) => (
                                <td className="py-22 px-4 text-sm text-gray-500" key={index}>{eval('data.' + columna.key)}</td>
                            ))}
                            <td className="py-22 px-4 text-sm text-gray-500">

                                {handleAddCarrito &&
                                    <button className="py-1 px-2 bg-orange-500 text-white rounded" onClick={() => handleAddCarrito(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>


                                    </button>
                                }

                                {handleUploadImage &&

                                    <button className="py-1 px-2 bg-orange-500 text-white rounded" onClick={() => handleUploadImage(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </button>
                                }

                                {handleShow &&
                                    <button className="py-1 px-2 bg-green-500 text-white rounded" onClick={() => handleShow(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>


                                    </button>
                                }
                                
                                {handlePDF &&
                                    <button className="py-1 px-2 bg-red-500 text-white rounded" onClick={() => handlePDF(data)}>
                                        PDF
                                    </button>
                                }

                                {handleEdit &&
                                    <button className="py-1 px-2 bg-yellow-500 text-white rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>

                                    </button>
                                }

                                {handleDelete &&
                                    <button className="py-1 px-2 bg-red-500 text-white rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <nav className="inline-flex rounded-md shadow">
                    <button className="py-2 px-4 bg-gray-200 text-gray-500 rounded-l-md hover:bg-gray-300"
                        onClick={() => paginate(page - 1)}
                    >
                        anterior
                    </button>

                    {total > itemsPerPage && (
                        <div className="flex">
                            {Array.from({ length: Math.ceil(total / itemsPerPage) }).map((_, index) => (
                                <button key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-2 px-4 mx-1 rounded-md focus:outline-none`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )

                    }

                    <button className="py-2 px-4 bg-gray-200 text-gray-500 rounded-r-md hover:bg-gray-300"
                        onClick={() => paginate(page + 1)}
                        disabled={page == Math.ceil(total / itemsPerPage)}>
                        siguiente
                    </button>

                </nav>
            </div>

        </>
    )
}

export default TablePagination;