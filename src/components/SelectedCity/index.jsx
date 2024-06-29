import cities from "../../cities/cities.json"
import { useSelector,useDispatch } from "react-redux";
import { updateCity} from "../../redux/weatherSlice";

function SelectedCity() {
  const dispatch = useDispatch();
  const {cityname,id} = useSelector((state) => state.weather);
  console.log(cityname);
  console.log(id);

  const handleUpdateCity = (cityname) => {
    dispatch(updateCity(cityname));
  }
    

    return (
      <div>
   <select className="m-6" onChange={(event) => handleUpdateCity(event.target.value)}>
    <option value="">{cityname}  </option>
        {cities.map((city) =>(
 <option key={city.id} value={city.name}    >
 {city.name}
</option>
        ))}
  
   </select>
   <div className="text-5xl text-red-500">{cityname} {id}</div>
      </div>
    )
  }
  
  export default SelectedCity