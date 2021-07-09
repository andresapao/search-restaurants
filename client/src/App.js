
import logo from './logo.svg';
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
  const [inputField , setInputField] = useState({
    desc: '',
    rating: 1,
    distance: 5,
    cuisine: ''
  });
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
              Header: "Rating",
              accessor: "customer_rating"
            }
          ]
        }
      ]
    );
    
    useEffect(() => {
      /*
      axios("/api/restaurants")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err))
        */
       console.log('effect', data)
    }, []);
    
    const inputsHandler = (e) =>{
      setInputField( {[e.target.name]: e.target.value} )
    }   
    const handleSubmit = (event) => {
      /*
      let urlQueryParams = '';
      
      for (const key of Object.keys(state)) {
        if(state[key])
        {
          urlQueryParams = urlQueryParams.length > 0 ? urlQueryParams.concat('&') : urlQueryParams.concat('');
          urlQueryParams = urlQueryParams.concat(`${key}=${state[key]}`);
        }
      }
      urlQueryParams = urlQueryParams.length > 0 ? `?${urlQueryParams}` : urlQueryParams;
      let mainUrl = urlQueryParams.length > 0 ? '/api/restaurants/search' : '/api/restaurants';
      fetch(mainUrl.concat(urlQueryParams))
      .then((res) => {
        console.log(res.json());
        data = res.data;
      })
      .catch((err) => console.log(err))
  
      event.preventDefault();
      */
     let urlQueryParams = '';
      for (const key of Object.keys(inputField)) {
        if(inputField[key])
        {
          urlQueryParams = urlQueryParams.length > 0 ? urlQueryParams.concat('&') : urlQueryParams.concat('');
          urlQueryParams = urlQueryParams.concat(`${key}=${inputField[key]}`);
        }
      }
      urlQueryParams = urlQueryParams.length > 0 ? `?${urlQueryParams}` : urlQueryParams;
      let mainUrl = urlQueryParams.length > 0 ? '/api/restaurants/search' : '/api/restaurants';
      fetch(mainUrl.concat(urlQueryParams))
      .then((res) => {
        res.json().then((jsonres) =>
        {
          console.log(jsonres);

          setData(jsonres);
        });
      })
      .catch((err) => console.log(err))
     event.preventDefault();     
    };
    function handleChange(event) {
      const { name, value } = event.target;
      setState(prevState => ({ ...prevState, [name]: value }));
    }      
  
/*
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/api/restaurants');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
*/
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
          Cuisine:
          <input type="text" name="cuisine"  onChange={inputsHandler}/>
        </label>

        <input type="submit" value="Submit" />
      </form>
      <Table columns={columns} data={data} />

      </div>
    );  
  
  

}
class App3 extends React.Component {
  constructor() {
    super();
    this.state = {name : '', rating: 1, distance: 5, cuisine: ''};
  }

  handleSubmit = (event)  =>{
    let urlQueryParams = '';
    for (const key of Object.keys(this.state)) {
      if(this.state[key])
      {
        urlQueryParams = urlQueryParams.length > 0 ? urlQueryParams.concat('&') : urlQueryParams.concat('');
        urlQueryParams = urlQueryParams.concat(`${key}=${this.state[key]}`);
      }
    }
    urlQueryParams = urlQueryParams.length > 0 ? `?${urlQueryParams}` : urlQueryParams;
    let mainUrl = urlQueryParams.length > 0 ? '/api/restaurants/search' : '/api/restaurants';
    fetch(mainUrl.concat(urlQueryParams))
    .then((res) => {
      console.log(res.json());
    })
    .catch((err) => console.log(err))

    event.preventDefault();
  }  
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }
  render() { 
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
        Rating:
        <input type="text" name="rating" value={this.state.rating} onChange={this.handleChange}/>
      </label>
      <label>
        Name:
        <input type="text" name="rating" value={this.state.name} onChange={this.handleChange}/>
      </label>
      <label>
        Distance:
        <input type="text" name="rating" value={this.state.distance} onChange={this.handleChange}/>
      </label>
      <label>
        Cuisine:
        <input type="text" name="cuisine" value={this.state.cuisine} onChange={this.handleChange}/>
      </label>

      <input type="submit" value="Submit" />
    </form>

   )
  }
}
//ReactDOM.render(<App/>, document.getElementById('root'));
export default App;
