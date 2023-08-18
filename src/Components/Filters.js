// import { useD3 } from './hooks/useD3';
// import * as d3 from 'd3';
import {FilterBox} from './FilterBox';
import React, { useState, useEffect } from 'react';



export const Filters =  ({handleChildDataChange}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [year, setyear] = useState("");
    const [topic, settopic] = useState("");
    const [sector, setsector] = useState("");
    const [region, setregion] = useState("");
    const [country, setcountry] = useState("");
    const [source, setsource] = useState("");
    const [intensity, setintensity] = useState("");



    const yearsArray = [...new Set(data.map(item => item.start_year))];
    yearsArray.sort((a, b) => a - b);
    console.log("yearsarr" , yearsArray)

    const topicsArray = [...new Set(data.map(item => item.topic))];
    topicsArray.sort((a, b) => a - b);
    console.log("topicsArray" , topicsArray)

    const  sectorsArray = [...new Set(data.map(item => item.sector))];
    sectorsArray.sort((a, b) => a - b);
    console.log("sectorsArray" , sectorsArray)

    const regionsArray = [...new Set(data.map(item => item.region))];
    regionsArray.sort((a, b) => a - b);
    console.log("regionsArray" , regionsArray)

    const sourcesArray = [...new Set(data.map(item => item.source))];
    sourcesArray.sort((a, b) => a - b);
    console.log("sourcesArray" , sourcesArray)

    const countriesArray = [...new Set(data.map(item => item.country))];
    countriesArray.sort((a, b) => a - b);
    console.log("countriesArray" , countriesArray)

    const intensitiesArray = [...new Set(data.map(item => item.intensity))];
    intensitiesArray.sort((a, b) => a - b);
    console.log("intensitiesArray" , intensitiesArray)



    useEffect(() => {
      // Fetch data from Flask server
      console.log("fetch se pehle\n");
      fetch('https://scaling-umbrella-w5wxq7j7gg6fgqjw-5000.app.github.dev/getData')
        .then(response => response.json())
        .then(data => {
            console.log("data type",typeof(data))
            console.log("data",data.length)
          setData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        if(year || topic || sector || region || country || source || intensity) {
          const paramObj = {
            "year": year,
            "topic": topic,
            "sector": sector,
            "region": region,
            "country": country,
            "source": source,
            "intensity": intensity
          }
          console.log(paramObj)
          fetch('https://scaling-umbrella-w5wxq7j7gg6fgqjw-8081.app.github.dev/getFilterData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramObj)
          })
          .then(async (response) => {
            console.log("response is ", response)
            // const res = JSON.parse(response)
            const res = await response.json()
            console.log("At first ", typeof(res))
            console.log("data is ", res, "\nFilters me data ka type", typeof(res))
            setFilteredData(res)
            handleChildDataChange(res);
            // return res
          })
          // .then((data) => { 
          //   console.log("data is ", data, "\nFilters me data ka type", typeof(data))
          //   setFilteredData(data)
          //   handleChildDataChange(data);
          // })
          .catch(error => console.error('Error fetching data:', error));
        }

    }, [year, topic, sector, region, country, source, intensity]);
    

      const handleYearSelectChange = (event) => {
        setyear(event.target.value);
      };
      const handleTopicSelectChange = (event) => {
        settopic(event.target.value);
      };
      const handleSectorSelectChange = (event) => {
        setsector(event.target.value);
      };
      const handleRegionSelectChange = (event) => {
        setregion(event.target.value);
      };
      const handleSourceSelectChange = (event) => {
        setsource(event.target.value);
      };
      const handleCountrySelectChange = (event) => {
        setcountry(event.target.value);
      };
      const handleIntensitySelectChange = (event) => {
        setintensity(event.target.value);
      };

      return (
        <div>
          <h1>Select Box Component Example</h1>
          <FilterBox options={yearsArray} onChange={handleYearSelectChange} />
          <FilterBox options={topicsArray} onChange={handleTopicSelectChange} />
          <FilterBox options={sectorsArray} onChange={handleSectorSelectChange} />
          <FilterBox options={regionsArray} onChange={handleRegionSelectChange} />
          <FilterBox options={sourcesArray} onChange={handleSourceSelectChange} />
          <FilterBox options={countriesArray} onChange={handleCountrySelectChange} />
          <FilterBox options={intensitiesArray} onChange={handleIntensitySelectChange} />
        </div>
      );
}
