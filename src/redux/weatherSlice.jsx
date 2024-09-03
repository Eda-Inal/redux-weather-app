import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import cities from "../cities/cities.json"




const API_KEY = process.env.REACT_APP_API_KEY;
console.log('API Key:', API_KEY);



export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ latitude, longitude }) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    id : 35,
   cityname:"İzmir",
   latitude : "38.4189",
   longitude :"27.1287",
   weatherData: null,
   status: 'idle',
   error: null,


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
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

});

 export const { updateCity} = weatherSlice.actions;
export default weatherSlice.reducer;
