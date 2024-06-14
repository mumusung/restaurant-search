import React, { useEffect, useState } from 'react';
import './App.css'
import Searchbar from './Searchbar/Searchbar.js'
import Searchbartext from './Searchbar/Searchbartext.js'
import Card from './Card/Card.js'
function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/example_data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setData(json);
        console.log(json)
      } catch (error) {
        setError(error);
        console.error("fail",error)
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  const handleOnClick = () =>{
    console.log(data)
  }
  return (
    <div>
     <div className='search-menu'>
      <div className='search-start'>
      <h1>Place List</h1>
      </div>
      <div className='search-end'>
      <Searchbar data ={data}/>
      <p>|</p>
     <Searchbartext data={data}/>
     </div>
     </div>
     <div className='card-display'>
      <Card data={data}/>
     </div>
    </div>
  );
}
export default App;
