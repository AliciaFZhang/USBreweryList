import './navigation.css';
const Navigation = ({setCity, city, handleSearch}) => {

  return (
    <div className="navBar">
        <input className="navInput" type="text" placeholder="Search by City Name" value={city} onChange={(e) => {setCity(e.target.value); console.log('city',e.target.value)}}/>
        <button className="navButton" onClick={handleSearch}>Search</button>
    </div>
  );
}
export default Navigation;