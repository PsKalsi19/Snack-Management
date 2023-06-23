import { useReducer } from 'react'
import './App.css'
import snacks from './db/snacks'
import Sort_Headings from './components/Sort_Headings';


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
function App() {

  const snaksInitialState = {
    snacksData: snacks,
    searchText: "",
    sortState: {
      name: "id",
      type: "asc"
    }
  }

  const handleChanges = () => {
    const sortType = typeof snacksData[0][sortState.name]

    return snacksData.filter(({ ingredients, product_name }) => (ingredients.toString().replaceAll(",", ", ").toLowerCase().includes((searchText.toLowerCase())) || product_name.toLowerCase().includes(searchText.toLowerCase()))).sort((a, b) => {
      if (sortState.type === '') return
      if (sortType === "number") {
        return sortState.type === 'desc' ? b[sortState.name] - a[sortState.name] : a[sortState.name] - b[sortState.name]
      }
      else {
        return sortState.type === 'desc' ? b[sortState.name] > a[sortState.name]? -1:0 : a[sortState.name] > b[sortState.name]?-1:0
      }
    })
  }

  const [snacksState, snacksDispatch] = useReducer(snackReducer, snaksInitialState)
  const { snacksData, searchText, sortState } = snacksState

  const handleSortChange = (payload) => {
    snacksDispatch({ type: SNACK_ACTIONS.SET_SORT, payload: payload })
  }
  return (
    <>

      <h2 className='text-2xl my-4 font-extrabold tracking-tight uppercase text-teal-800'>Snacks Management</h2>
      <input type="search" id="search-dropdown" value={searchText}
        onChange={(e) => snacksDispatch({ type: SNACK_ACTIONS.SEARCH_TEXT, payload: e.target.value })} className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border my-4 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Name or Ingredients" required />


      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-8 py-4 uppercase'> <Sort_Headings value={"id"} name={"ID"} handleSortChange={handleSortChange} currentState={sortState} /></th>

            <th className='px-8 py-4 uppercase'><Sort_Headings value={"product_name"} name={"Product Name"} handleSortChange={handleSortChange} currentState={sortState} /> </th>

            <th className='px-8 py-4 uppercase'><Sort_Headings value={"product_weight"} name={"Product Weight"} handleSortChange={handleSortChange} currentState={sortState} /> </th>

            <th className='px-8 py-4 uppercase'><Sort_Headings value={"price"} name={"Price"} handleSortChange={handleSortChange} currentState={sortState} /> </th>

            <th className='px-8 py-4 uppercase'><Sort_Headings value={"calories"} name={"Calories"} handleSortChange={handleSortChange} currentState={sortState} /> </th>

            <th className='px-8 py-4 uppercase'><Sort_Headings value={"ingredients"} name={"Ingredients"} handleSortChange={handleSortChange} currentState={sortState} /> </th>

          </tr>
        </thead>
        <tbody>
          { handleChanges().length>0 &&
            handleChanges().map((row, index) => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
              {
                Object.keys(row).map((keyName, index) => <td className='px-3 py-2' key={index}>{keyName === 'ingredients' ? row[keyName].toString().replaceAll(",", ", ") : row[keyName]}</td>)
              }
            </tr>)
          }
          {
            handleChanges().length===0 && <p>No Data Available</p>
          }
        </tbody>
      </table>
    </>
  )
}

export default App
