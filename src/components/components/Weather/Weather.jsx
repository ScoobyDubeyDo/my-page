import { get } from "axios";
import { CircleLoader } from "react-spinners";
import { FaPencilAlt } from "react-icons/fa";
import { ImArrowDown2 } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { WiSunset, WiSunrise } from "react-icons/wi";
import { useOnClickOutside } from "../../../hooks";
import style from "./weather.module.css";

export const Weather = () => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [cityName, setCityName] = useState(localStorage.getItem("location"));
    const [citySearchInput, setCitySearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [weatherFetchError, setWeatherFetchError] = useState("");
    const weatherBoxRef = useRef();
    const weatherBoxTogglerRef = useRef();
    useOnClickOutside(weatherBoxRef, weatherBoxTogglerRef, () =>
        setIsBoxOpen(false)
    );

    const [weatherData, setWeatherData] = useState({
        city: "",
        temperature: 0,
        icon: "c01n",
        feelsLike: 0,
        humidity: 0,
        description: "",
        WindSpeed: 0,
        WindDirection: 0,
        partOfDay: "",
        AirQualityIndex: 0,
        sunrise: "",
        sunset: "",
    });

    const APIKEY = "a3063e3556e644f6bd4f3c53c20491b3";

    const callWeatherAPI = async (lat, lon) => {
        let API = "";
        cityName === null || cityName === ""
            ? lat === undefined || lon === undefined
                ? (API = `https://api.weatherbit.io/v2.0/current?key=${APIKEY}&city=Kolkata`)
                : (API = `https://api.weatherbit.io/v2.0/current?key=${APIKEY}&lat=${lat}&lon=${lon}`)
            : (API = `https://api.weatherbit.io/v2.0/current?key=${APIKEY}&city=${cityName}`);
        setIsLoading(true);
        try {
            const res = await get(API);
            if (res.status === 200) {
                localStorage.setItem("location", res.data.data[0].city_name);
                setCitySearchInput(res.data.data[0].city_name);
                setWeatherData({
                    city: res.data.data[0].city_name,
                    temperature: res.data.data[0].temp,
                    icon: res.data.data[0].weather.icon,
                    feelsLike: res.data.data[0].app_temp,
                    humidity: res.data.data[0].rh,
                    description: res.data.data[0].weather.description,
                    WindSpeed: res.data.data[0].wind_spd,
                    WindDirection: res.data.data[0].wind_dir,
                    partOfDay: res.data.data[0].pod,
                    AirQualityIndex: res.data.data[0].aqi,
                    sunset: res.data.data[0].sunset,
                    sunrise: res.data.data[0].sunrise,
                });
                setWeatherFetchError("");
            }
        } catch (err) {
            setCitySearchInput("");
            setWeatherFetchError("something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const success = (pos) => {
        const crd = pos.coords;
        callWeatherAPI(crd.latitude, crd.longitude);
    };
    const error = (err) => {
        callWeatherAPI();
    };

    useEffect(() => {
        (() => {
            navigator.geolocation.getCurrentPosition(success, error);
        })();
    }, [cityName]);

    return (
        <span className={`${style["weather-box"]}`}>
            {isLoading ? (
                <div className="loader">
                    <CircleLoader speedMultiplier={1.5} color="#ffffff" />
                </div>
            ) : weatherFetchError !== "" ? (
                <p className="text-caption">{weatherFetchError}</p>
            ) : (
                <div
                    onClick={() => setIsBoxOpen((prev) => !prev)}
                    className={`${style["current-weather"]}`}
                    ref={weatherBoxTogglerRef}
                >
                    <span className="heading-5">
                        <img
                            src={`https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png`}
                            alt="icon"
                            height={40}
                        />
                        {weatherData.temperature}°
                    </span>
                    <span className="text-caption">{weatherData.city}</span>
                </div>
            )}
            {isBoxOpen && (
                <div
                    ref={weatherBoxRef}
                    className={`${style["extra-weather-info"]}`}
                >
                    <div>
                        <input
                            spellCheck={false}
                            autoComplete="off"
                            type="text"
                            className="weather-search heading-6"
                            value={citySearchInput}
                            onChange={(e) => setCitySearchInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    localStorage.setItem(
                                        "location",
                                        citySearchInput
                                    );
                                    setCityName(() => citySearchInput);
                                }
                            }}
                        />
                        <FaPencilAlt />
                        <div className="text-body-sm">
                            {weatherData.description}
                        </div>
                    </div>
                    <div className={`${style["weather-details-row-one"]}`}>
                        <img
                            src={`https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png`}
                            alt="icon"
                            className="responsive-image"
                        />
                        <span className="heading-2">
                            {weatherData.temperature}°
                        </span>
                        <div className={`${style["wind"]} flex-center`}>
                            <p className="heading-6">Wind:</p>
                            <p className="text-caption">
                                {Math.ceil(weatherData.WindSpeed)}km/h
                            </p>
                            <ImArrowDown2
                                size={25}
                                style={{
                                    transform: `rotate(${weatherData.WindDirection}deg)`,
                                }}
                            />
                        </div>
                    </div>
                    <div className="divider-light-horizontal" />
                    <div className={`${style["weather-details-row-two"]}`}>
                        <span className={`${style["extra-weather-data"]}`}>
                            <p className="text-caption">
                                AQI: {weatherData.AirQualityIndex}
                            </p>
                            <p className="text-caption">
                                Humidity: {Math.ceil(weatherData.humidity)}%
                            </p>
                            <p className="text-caption">
                                Feels like: {weatherData.feelsLike}°
                            </p>
                        </span>
                        <div className="divider-light-vertical" />
                        <span className={`${style["extra-weather-data"]}`}>
                            <p className="text-body-sm">Sunrise:</p>
                            <WiSunrise size={40} />
                            <p className="text-caption">
                                {weatherData.sunrise}
                            </p>
                        </span>
                        <div className="divider-light-vertical" />
                        <span className={`${style["extra-weather-data"]}`}>
                            <p className="text-body-sm">Sunset:</p>
                            <WiSunset size={40} />
                            <p className="text-caption">{weatherData.sunset}</p>
                        </span>
                    </div>
                </div>
            )}
        </span>
    );
};
