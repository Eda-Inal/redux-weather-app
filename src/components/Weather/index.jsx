import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeatherData } from "../../redux/weatherSlice";
import windIcon from "../../assets/wind.webp"; 
import humidityIcon from "../../assets/humidty.png";
import cloudy from "../../assets/cloudy.webp";
import partlyCloudy from "../../assets/PartlyCloudy.png";
import rainy from "../../assets/rainy.png";
import sunny from "../../assets/sun.webp";


const getLocalWeatherIcon = (iconCode) => {
  const iconMapping = {
    "01d": sunny,
    "01n": sunny,
    "02d": partlyCloudy,
    "02n": partlyCloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rainy,
    "09n": rainy,
    "10d": rainy,
    "10n": rainy,
    "11d": rainy,
    "11n": rainy,
    "13d": rainy,
    "13n": rainy,
    "50d": cloudy,
    "50n": cloudy
  };
  return iconMapping[iconCode] || cloudy;
};

function Weather() {
  const { cityname, latitude, longitude, status, weatherData } = useSelector((state) => state.weather);
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
        dailyData[date] = { 
          min: item.main.temp, 
          max: item.main.temp, 
          wind: item.wind.speed,
          humidity: item.main.humidity,
          icon: item.weather[0].icon 
        };
      } else {
        dailyData[date].min = Math.min(dailyData[date].min, item.main.temp);
        dailyData[date].max = Math.max(dailyData[date].max, item.main.temp);
        dailyData[date].wind = item.wind.speed;
        dailyData[date].humidity = item.main.humidity;
        dailyData[date].icon = item.weather[0].icon;
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
        <div className="bg-blue-950">
          <div className="bg-slate-400 w-3/4 h-[550px] rounded mx-auto">
            <div className="bg-slate-300 w-4/5 h-1/3 mx-auto inline-grid grid-cols-2">
              <div className="border-r-2">
                <div className="text-2xl ml-2">{cityname}, TR</div>
                {currentWeather && (
                  <div>
                    <div>{formatDate(currentWeather.dt)}</div>
                    <div className="text-5xl">{currentWeather.main.temp.toFixed(0)}°C</div>
                    <img src={getLocalWeatherIcon(currentWeather.weather[0].icon)} alt="weather icon" width="50" height="50" />
                  </div>
                )}
                <div>.</div>
              </div>
              <div className="text-lg">
                {currentWeather && (
                  <>
                    <div className="grid grid-cols-2 mt-10 mb-5 items-center">
                      <div>{currentWeather.main.temp_max.toFixed(0)}°C</div>
                      <div className="flex items-center">
                        <img src={windIcon} alt="wind icon" className="w-6 h-6 mr-2" />
                        <span>{currentWeather.wind.speed} m/s</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 mt-5 items-center">
                      <div>{currentWeather.main.temp_min.toFixed(0)}°C</div>
                      <div className="flex items-center">
                        <img src={humidityIcon} alt="humidity icon" className="w-6 h-6 mr-2" />
                        <span>{currentWeather.main.humidity}%</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div></div>
            </div>
            <div className="mt-6">
              <div>Weather</div>
              <div className="grid grid-cols-6 border mx-auto h-64 w-4/5">
                {dailyForecast.map((weather, index) => (
                  <div key={index} className="text-center border-r-2">
                    <h3>{weather.date}</h3>
                    <img src={getLocalWeatherIcon(weather.icon)} alt="weather icon" width="70" height="70" />
                    <p>Min {weather.min.toFixed(0)}°C</p>
                    <p>Max {weather.max.toFixed(0)}°C</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === 'failed' && <p>Error fetching weather data</p>}
    </div>
  );
}

export default Weather;
