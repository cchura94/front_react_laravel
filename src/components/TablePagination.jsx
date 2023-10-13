import { useState } from "react";

const TablePagination = ({columnas, datos, total, page, paginate}) => {
    const [itemsPerPage, setItemsPerPage] = useState(5)
    return (
        <> 
    
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                    {columnas.map((columna, index) => (
                        <th className="py-2 px-4 text-left text-sm font-medium uppercase" key={index}>{ columna.label }</th>
                    ))}

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                        {datos.map((data) => (
                            <tr key={data.id}>
                                {columnas.map((columna, index) => (
                                    <td className="py-22 px-4 text-sm text-gray-500" key={index}>{ eval('data.'+columna.key) }</td>
                                ))}
                              <td className="py-22 px-4 text-sm text-gray-500">
                                <button className="py-1 px-2 bg-green-500 text-white rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

                                </button>

                                <button className="py-1 px-2 bg-green-500 text-white rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

                                </button>
                              </td>
                            </tr>
                        ))}

                </tbody>
            </table>
            
            <div className="flex justify-center mt-4">
                <nav className="inline-flex rounded-md shadow">
                    <button className="py-2 px-4 bg-gray-200 text-gray-500 rounded-l-md hover:bg-gray-300"
                        onClick={() => paginate(page-1)}
                        >
                        anterior
                    </button>

                    { total > itemsPerPage && (
                        <div className="flex">
                            {Array.from({length: Math.ceil(total/itemsPerPage)}).map((_, index) => (
                                <button key={index}
                                        onClick={() => paginate(index+1)}
                                        className={`${page === index+1?'bg-blue-500 text-white': 'bg-gray-200 text-gray-700'} px-2 px-4 mx-1 rounded-md focus:outline-none`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )

                    }

                    <button className="py-2 px-4 bg-gray-200 text-gray-500 rounded-r-md hover:bg-gray-300"
                            onClick={() =>paginate(page+1)}
                            disabled={page==Math.ceil(total/itemsPerPage)}>
                        siguiente
                    </button>

                </nav>
            </div>

        </>
    )
}

export default TablePagination;