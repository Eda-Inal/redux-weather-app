import { createSlice} from '@reduxjs/toolkit';
import cities from "../cities/cities.json"





const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    id : 35,
   cityname:"İzmir",
   latitude : "38.4189",
   longitude :"27.1287"


  },
  reducers: {
  updateCity : (state,action) => {

state.cityname = action.payload
let data = cities.find(city => city.name === state.cityname) ;
state.id = data.id;
state.latitude = data.latitude;
state.longitude =data.longitude
console.log(data.name,data.latitude);
  },

  },

});

 export const { updateCity} = weatherSlice.actions;
export default weatherSlice.reducer;
