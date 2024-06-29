import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeatherData } from "../../redux/weatherSlice";




function Weather(){
  const {cityname, latitude, longitude,status,weatherData} = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  useEffect(() => {
    if (latitude && longitude) {
      dispatch(fetchWeatherData({ latitude, longitude }));
    }
  }, [latitude, longitude, dispatch]);

  return (
    <div>

{status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && weatherData && (
        <div>
          <h2>Weather Forecast for {cityname}</h2>
          {weatherData.list.slice(0, 5).map((weather, index) => (
            <div key={index}>
              <p>{new Date(weather.dt * 1000).toLocaleDateString()}: {weather.main.temp}°C</p>
            </div>
          ))}
        </div>
      )}
      {status === 'failed' && <p>Error fetching weather data</p>}

   
  
    </div>
  )
}

export default Weather