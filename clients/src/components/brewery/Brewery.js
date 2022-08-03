import "./brewery.css";

const Brewery = ({brewery, setView}) => {
  const street = brewery.street === null ? 'TBD, ' : brewery.street + ', '
  const address = street + brewery.city + ', '+ brewery.state + ', '+ brewery.postal_code;
  const type = brewery.brewery_type.charAt(0).toUpperCase()+brewery.brewery_type.slice(1);

  return (
    <div className="brewContainer">
      <div className="brewNT">
        <div className="brewName" onClick={() => window.open(brewery.website_url, '_blank')}>{brewery.name}</div>
        { type === 'Closed' ?  <div className="brewClosed">{type}</div> :
          type === 'Planning' ? <div className="brewPlanning">{type}</div> :
          <div className="brewType">{type}</div>}

      </div>
      <div className="brewAddress">Address: {address}</div>
      <div className="brewWPD">
        { brewery.website_url ?
        <div className="brewWebsite" onClick={() => window.open(brewery.website_url, '_blank')}>
          <div className="brewIcon">
            <span className="material-symbols-outlined">public</span>
          </div>Visit website
        </div> : <div></div> }
        { brewery.phone ?
        <div className="brewPhone">
          <div className="brewIcon">
            <span className="material-symbols-outlined">call</span>
          </div>{brewery.phone}
        </div> : <div></div> }
        <div className="brewDetails" onClick={()=>setView(brewery)}>
          <div className="brewIcon">
            <span className="material-symbols-outlined">directions_car</span>
          </div>Details
        </div>
      </div>
    </div>
  );
}
export default Brewery;