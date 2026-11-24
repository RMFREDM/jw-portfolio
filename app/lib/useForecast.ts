"use server";

import { useState } from "react";

// import { useEffect } from "react";

// define the url to get the forecast from
const forecastURL =
	"https://api.weather.gov/gridpoints/SLC/108,219/forecast/hourly?units=us";
export default async function useForecast() {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	return "No forecast";
}
