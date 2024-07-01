import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWeatherData } from "../../redux/weatherSlice";
import windIcon from "../../assets/wind.webp"; 
import humidityIcon from "../../assets/humidty.png";
import cloudy from "../../assets/cloudy.webp";
import onecloudy from "../../assets/oneCloudy.png"
import partlyCloudy from "../../assets/PartlyCloudy.png";
import rainy from "../../assets/rainy.png";
import sunny from "../../assets/sun.webp";
import cloudandrainy from "../../assets/cloudandrainy.png"
import ligthning from "../../assets/lightning.webp";
import snow from "../../assets/snow.png";
import mist from "../../assets/mist.png"

const getLocalWeatherIcon = (iconCode) => {
  const iconMapping = {
    "01d": sunny,
    "01n": sunny,
    "02d": partlyCloudy,
    "02n": partlyCloudy,
    "03d": onecloudy,
    "03n": onecloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rainy,
    "09n": rainy,
    "10d": cloudandrainy,
    "10n": cloudandrainy,
    "11d": ligthning,
    "11n": ligthning,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist
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

  let todayMinTemp = Infinity;
  let todayMaxTemp = -Infinity;

  const dailyData = {};

  if (weatherData) {
    weatherData.list.forEach(item => {
      const date = formatDate(item.dt);
      const temp = item.main.temp;

      if (new Date(item.dt * 1000).toLocaleDateString() === today) {
        todayMinTemp = Math.min(todayMinTemp, temp);
        todayMaxTemp = Math.max(todayMaxTemp, temp);
      }

      if (!dailyData[date]) {
        dailyData[date] = { 
          min: temp, 
          max: temp, 
          wind: item.wind.speed,
          humidity: item.main.humidity,
          icon: item.weather[0].icon 
        };
      } else {
        dailyData[date].min = Math.min(dailyData[date].min, temp);
        dailyData[date].max = Math.max(dailyData[date].max, temp);
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
        <div >
          <div className=" w-3/4 h-[550px] rounded mx-auto">
            <div className=" w-4/5 h-1/3 mx-auto inline-grid sm:grid-cols-1 md:grid-cols-2">
            <div className="md:border-r-2 ">
                <div className="text-xl text-left ">{cityname}, TR
                </div>
                {currentWeather && (
                  <div>
                    <div className="text-left">{formatDate(currentWeather.dt)}</div>
                    <div className="flex items-center justify-center">
                      <img src={getLocalWeatherIcon(currentWeather.weather[0].icon)} alt="weather icon" width="100" height="100" />
                      <div className="text-4xl ml-4">{currentWeather.main.temp.toFixed(0)}°C</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-lg">
                {currentWeather && (
                  <>
                    <div className="grid grid-cols-2 mt-10  items-center">
                      <div>
                      <span className="text-sm font-thin text-slate-200">high:    </span>
                        {todayMaxTemp.toFixed(0)}°C
                      </div>
                      <div className="flex  items-center">
                        <img src={windIcon} alt="wind icon" className="w-6 h-6 mr-2" />
                        <span>{currentWeather.wind.speed} m/s</span>
                        <div className="text-sm ml-1 font-thin text-slate-200 "> wind</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 mt-5 items-center mb-10">
                      <div>
                      <span className="text-sm font-thin   text-slate-200">low:   </span>
                        {todayMinTemp.toFixed(0)}°C
                        
                      </div>
                      <div className="flex items-center">
                        <img src={humidityIcon} alt="humidity icon" className="w-6 h-6 mr-2" />
                        <span>{currentWeather.main.humidity}%</span>
                        <div className="text-sm ml-1 font-thin text-slate-200">hum</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
            </div>
            <div className="mt-32 md:mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4  mx-auto h-48 w-4/5">
  {dailyForecast.map((weather, index) => (
    <div key={index} className="text-center rounded-2xl p-2 mt-2  bg-blue-600">
      <h3>{weather.date}</h3>
      <img className="mx-auto" src={getLocalWeatherIcon(weather.icon)} alt="weather icon" width="70" height="70" />
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
