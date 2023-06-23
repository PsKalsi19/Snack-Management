/* eslint-disable react/prop-types */

const Sort_Headings = ({ name, value, handleSortChange, currentState }) => {

    const handleButtonClick=()=>{
        handleSortChange({name:value,type:currentState.type==='asc'?'desc':'asc'})
    }
    return (
        <button className="px-3  bg-gray-600 rounded-md border border-teal-600 flex py-3" onClick={handleButtonClick} >{name}

            {
                currentState.name===value && currentState.type === 'asc' && <svg fill="none" className='h-4 w-4 ml-2 text-green-500' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
            }

            {
                currentState.name===value && currentState.type==='desc' && <svg fill="none" className='h-4 w-4 ml-2 text-red-500' stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            }

            {
                currentState.name!==value  && <svg fill="none" className="h-5 w-5 text-teal-400" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            }

        </button>
    );
};

export default Sort_Headings;