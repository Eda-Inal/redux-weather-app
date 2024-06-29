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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const today = new Date().toLocaleDateString();
  const currentWeather = weatherData ? weatherData.list.find(item => new Date(item.dt * 1000).toLocaleDateString() === today) : null;
  const dailyData = {};
  if (weatherData) {
    weatherData.list.forEach(item => {
      const date = formatDate(item.dt);
      if (!dailyData[date]) {
        dailyData[date] = { min: item.main.temp, max: item.main.temp };
      } else {
        dailyData[date].min = Math.min(dailyData[date].min, item.main.temp);
        dailyData[date].max = Math.max(dailyData[date].max, item.main.temp);
      }
    });
  }
  const dailyForecast = Object.keys(dailyData).slice(0, 7).map(date => ({
    date,
    ...dailyData[date]
  }));

  return (
    <div>
    {status === 'loading' && <p>Loading...</p>}
    {status === 'succeeded' && weatherData && (
      <div>
        <h2>Weather Forecast for {cityname}</h2>
        {currentWeather && (
          <div>
            <h3>Current Weather</h3>
            <p>{formatDate(currentWeather.dt)}: {(currentWeather.main.temp).toFixed(0)}°C</p>
          </div>
        )}
        {/* <div>
          { <h3>7-Day Weather Forecast</h3> }
          {dailyForecast.map((weather, index) => (
            <div key={index}>
              <p>{weather.date}: Min {(weather.min).toFixed(0)}°C, Max {(weather.max).toFixed(0)}°C</p>
            </div>
          ))}
        </div> */}
      </div>
    )}
    {status === 'failed' && <p>Error fetching weather data</p>}
  </div>
  )
}

export default Weather