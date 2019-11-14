import React, {useState} from 'react'

const SearchBar = (props)=>{
  let search;
  if(props.whichTab == '1'){
     search=( <form >
      <label>Search Companies:</label>
      <input type="text" value={props.name} onChange={props.nameChangeHandler} required></input>
      </form>);
  }
  else{
      search =( <div onClick ={()=>props.stockListChangeHandler()}>
        Search Company
      </div>)
    
  }
  return (
    <div className="search-button">
      {search}
      {/* <button className="search-button-button" type="submit">Submit</button> */}
      <div className="search-button-buys"><span onClick = {()=>props.buysListChangeHandler()}>
        Buys  
      </span> <span>  </span>  
      <span className="search-button-favorites" onClick ={()=>props.favsListChangeHandler()}>
        Favorites
      </span></div>
    </div>
  )
}
export default SearchBar;