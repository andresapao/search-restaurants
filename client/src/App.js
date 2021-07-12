import React, { useState, setState, useMemo, useEffect } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import { useTable } from "react-table";
import './App.css';
function Table({ columns, data }) {
  const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({
   columns,
   data,
 })
 
 return (
   <table {...getTableProps()}>
     <thead>
       {headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
           ))}
         </tr>
       ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {rows.map((row, i) => {
         prepareRow(row)
         return (
           <tr {...row.getRowProps()}>
             {row.cells.map(cell => {
               return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
             })}
           </tr>
         )
       })}
     </tbody>
   </table>
 )
}
 

function App () {

//  const [desc, setDesc, rating, setRating, distance, setDistance, cuisine, setCuisine] = useState(['', 1, 5, '']);
  const [inputField , setInputField] = useState({});
  const [data, setData] = useState([]);

  const columns = useMemo(
      () => [
        {
          Header: "Restaurants",
          columns: [
            {
              Header: "Name",
              accessor: "name"
            },
            {
              Header: "Distance",
              accessor: "distance"
            },
            {
              Header: "Rating",
              accessor: "customer_rating"
            },
            {
              Header: "Price",
              accessor: "price"
            },
            {
              Header: "Cuisine",
              accessor: "cuisineDesc"
            }
          ]
        }
      ]
    );
    
    const inputsHandler = (e) => {
      setInputField({...inputField, [e.target.name]: e.target.value} )

    }   
    const handleSubmit = (event) => {
     let urlQueryParams = '';
      for (const key of Object.keys(inputField)) {
        let keyValue = inputField[key];
        let keyName = key;
        if( keyName === 'desc') keyName = 'name';
        if(keyValue)
        {
          urlQueryParams = urlQueryParams.length > 0 ? urlQueryParams.concat('&') : urlQueryParams.concat('');
          urlQueryParams = urlQueryParams.concat(`${keyName}=${keyValue}`);
        }
      }
      urlQueryParams = urlQueryParams.length > 0 ? `?${urlQueryParams}` : urlQueryParams;
      let mainUrl = urlQueryParams.length > 0 ? '/api/restaurants/search' : '/api/restaurants';
      fetch(mainUrl.concat(urlQueryParams))
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => { 
          alert(response.message);
          return [];
        });
        }).then((jsonres) =>
        {
          setData(jsonres);
        })
      
     event.preventDefault();     
    };
  
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input type="text" name="rating"  onChange={inputsHandler}/>
        </label>
        <label>
          Name:
          <input type="text" name="desc"  onChange={inputsHandler}/>
        </label>
        <label>
          Distance:
          <input type="text" name="distance"  onChange={inputsHandler}/>
        </label>
        <label>
          Price:
          <input type="text" name="price"  onChange={inputsHandler}/>
        </label>
        <label>
          Cuisine:
          <input type="text" name="cuisine"  onChange={inputsHandler}/>
        </label>

        <input type="submit" value="Submit" />
      </form>
      <Table columns={columns} data={data} />

      </div>
    );  
  
  

}
export default App;
