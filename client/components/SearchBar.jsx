import React, {useState} from 'react'

const SearchBar = (props)=>{
  let search;
  if(props.whichTab == '1'){
     search=( <form className="searchbar">
      <label>Search Companies:</label>
      <input className="searchbar-input" type="text" value={props.name} onChange={props.nameChangeHandler} required></input>
      </form>);
  }
  else{
      search =( <div onClick ={()=>props.stockListChangeHandler()}>
        Search Company
      </div>)
    
  }
  return (
    <div>
      <div className="search-button">
        {search}
        {/* <button className="search-button-button" type="submit">Submit</button> */}
      </div>  
      <div>
        <span className="search-button-buys" onClick = {()=>props.buysListChangeHandler()}>Buys</span>   
        <span className="search-button-favorites" onClick ={()=>props.favsListChangeHandler()}>Favorites</span>
      </div>
    </div>
  )
}
export default SearchBar;