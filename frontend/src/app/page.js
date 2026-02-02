"use client";

import { useEffect, useState } from "react";
import Header from "@/component/Header";
import SearchBar from "@/component/SearchBar";
import InfoCard from "@/component/InfoCard";

export default function Home() {
  const [country, setCountry] = useState("India");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/v1/summary?country=${country}`
      );
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <Header />

      <SearchBar
        value={country}
        onChange={setCountry}
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      />

      {loading && <p className="text-slate-400">Fetching insights...</p>}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* COUNTRY */}
          <InfoCard title="Country">
            <p><b>Name:</b> {data.country}</p>
            <p><b>Capital:</b> {data.capital}</p>
          </InfoCard>

          {/* WEATHER */}
          <InfoCard title="Weather">
            {data.weather ? (
              <>
                <p><b>Temperature:</b> {data.weather.temperature}°C</p>
                <p><b>Condition:</b> {data.weather.condition}</p>
              </>
            ) : (
              <p>No weather data available</p>
            )}
          </InfoCard>

          {/* CACHE */}
          <InfoCard title="Cache Status">
            <p className={data.cached ? "text-emerald-400" : "text-blue-400"}>
              {data.cached ? "Served from Redis cache" : "Fresh API response"}
            </p>
          </InfoCard>
        </div>
      )}
    </div>
  );
}
