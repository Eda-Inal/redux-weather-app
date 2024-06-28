import cities from "../../cities/cities.json"
function SelectedCity() {
    
    return (
      <div>

   <select>
    <option value="">Choose a city   </option>
        {cities.map((city) =>(
 <option key={city.id} value={city.name}>
 {city.name}
</option>
        ))}
  
   </select>
      </div>
    )
  }
  
  export default SelectedCity