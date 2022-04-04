import React from "react";
import cities from "../../lib/city.list.json";
import Head from "next/head";
import TodaysWeather from "../../components/TodaysWeather";
import moment from "moment-timezone";
import HourlyWeather from "../../components/HourlyWeather.jsx";
import WeeklyWeather from "../../components/WeeklyWeather.jsx";
import SearchBox from "../../components/SearchBox";
import Link from "next/link";
import Footer from "../../components/Footer";

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
  );

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const hourlyWeather = getHourWeather(data.hourly, data.timezone);

  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
    },
  };
}

const getCity = (param) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);
  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};

export default function City({
  hourlyWeather,
  currentWeather,
  dailyWeather,
  city,
  timezone,
}) {
  return (
    <div>
      <Head>
        <title>{city.name} Weather - Next Weather App</title>
      </Head>
      <div className="pageW">
        <div className="page-wrapper">
          <Link href="/">
            <a className="back-link">&larr; Home</a>
          </Link>
          <SearchBox />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />

          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />

          <Footer />
        </div>
      </div>
    </div>
  );
}
