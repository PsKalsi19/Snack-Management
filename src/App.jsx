import { useReducer } from 'react'
import './App.css'
import snacks from './db/snacks'


const SNACK_ACTIONS = {
  SEARCH_TEXT: 'search_text',
  SET_SORT: 'set_sort'
}

const snackReducer = (state, { type, payload }) => {

  switch (type) {
    case SNACK_ACTIONS.SEARCH_TEXT:
      return { ...state, searchText: payload }

    case SNACK_ACTIONS.SET_SORT:
      return { ...state, sortState: payload }

    default:
      return state;
  }
}
// {
//   id: 1,
//   product_name: "Granola Bar",
//   product_weight: "21g",
//   price: 299,
//   calories: 150,
//   ingredients: ["Oats", "Honey", "Nuts", "Dried Fruits"]
// },
// {
//   id: 2,
//   product_name: "Fruit and Nut Mix",
//   product_weight: "73g",
//   price: 749,
//   calories: 353,
//   ingredients: [
//     "Almonds",
//     "Cashews",
//     "Dried Cranberries",
//     "Dried Blueberries"
//   ]
// },
function App() {

  const snaksInitialState = {
    snacksData: snacks,
    searchText: "",
    sortState: {
      name: "",
      type: ""
    }
  }

  const handleChanges=()=>{
   return snacksData.filter(({ingredients,product_name})=>(ingredients.toString().replaceAll(",",", ").toLowerCase().includes((searchText.toLowerCase()))|| product_name.toLowerCase().includes(searchText.toLowerCase()) ))
  }

  const [snacksState, snacksDispatch] = useReducer(snackReducer, snaksInitialState)
  const { snacksData, searchText, sortState } = snacksState
  return (
    <>

      <h2>Snacks Management</h2>

      <input type="search" id="search-dropdown" value={searchText} 
      onChange={(e)=>snacksDispatch({type:SNACK_ACTIONS.SEARCH_TEXT,payload:e.target.value})} className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Name or Ingredients" required />


      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-3 py-2'>ID</th>
            <th className='px-3 py-2'>Product Name</th>
            <th className='px-3 py-2'>Product Weight</th>
            <th className='px-3 py-2'>Price</th>
            <th className='px-3 py-2'>Calories</th>
            <th className='px-3 py-2'>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {
            handleChanges().map((row,index)=><tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
              {
                Object.keys(row).map((keyName,index)=><td className='px-3 py-2' key={index}>{keyName==='ingredients'?row[keyName].toString().replaceAll(",",", ") :row[keyName]}</td>)
              }
            </tr>)
          }
        </tbody>
      </table>
    </>
  )
}

export default App
