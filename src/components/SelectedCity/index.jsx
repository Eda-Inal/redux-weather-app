import cities from "../../cities/cities.json"
import { useSelector,useDispatch } from "react-redux";
import { updateCity } from "../../redux/weatherSlice";

function SelectedCity() {
  const dispatch = useDispatch();
  const cityname = useSelector((state) => state.weather.cityname);
  console.log(cityname);

  const handleUpdateCity = (cityname) => {
    dispatch(updateCity(cityname));
  }
    

    return (
      <div>
   <select className="m-6" onChange={(event) => handleUpdateCity(event.target.value)}>
    <option value="">Choose a city   </option>
        {cities.map((city) =>(
 <option key={city.id} value={city.name}   >
 {city.name}
</option>
        ))}
  
   </select>
   <div className="text-5xl text-red-500">{cityname}</div>
      </div>
    )
  }
  
  export default SelectedCity