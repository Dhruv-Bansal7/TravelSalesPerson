import React, { useState, useEffect } from 'react';
import './App.css';

const gridSize = 20; // Grid Size if change it here also change in css file


// Cites and there coordinates
const cities = [
    { id: 0, x: 1, y: 1 },
    { id: 1, x: 5, y: 5 },
    { id: 2, x: 2, y: 4 },
    { id: 3, x: 14, y: 8 },
    { id: 4, x: 12, y: 7 },
    { id: 5, x: 18, y: 9 },
    { id: 6, x: 4, y: 11 },
    { id: 7, x: 8, y: 6},
    { id: 8, x: 12, y: 13 },
    { id: 9, x: 3, y: 2 },
    { id: 10, x: 5, y: 9 },
    { id: 11, x: 12, y: 13 },
    { id: 12, x: 11, y: 18},
    { id: 13, x: 2, y: 19 },
    { id: 14, x: 17, y: 2 },
  ];

//main Function

function App () {


  const[tour,setTour] = useState([0]); // Tour array the store the tour of cities
  const [visited,setVisited] = useState([true]); // visited array that store the bool value that city is visited or not
  const[currentCity,setCurrentCity] = useState(0); // store current city
  const [isAnimating,setIsAnimating] = useState(false); // for button

  useEffect(()=> { // if anythig is change it will restart the code automatic

    let interval; // animation interval

    if(isAnimating) {

      interval = setInterval(() => {

        if(tour.length < cities.length) {
          
          const nextCity =findNearestNeighour(currentCity,visited,cities); // find nearest neighour of current city

          if(nextCity !== -1){ // if next city is find then set visited to true

            setVisited((prev) => {
              const newVisited = [...prev];
              newVisited[nextCity] = true;
              return newVisited;
            });

            setTour((prev) => [...prev,nextCity]); // store the next city in tour 

            setCurrentCity(nextCity); // set next city to current city

          }

        }
        else if(tour.length === cities.length) { 
          setTour((prev) => [...prev,tour[0]]); // if both tour and cities array are equal then return it to the native city by adding 0 in the tour

          setIsAnimating(false); // set animation is set to false 

          clearInterval(interval); // and clear interval
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  
  }, [currentCity , tour, visited, isAnimating] );

  const findNearestNeighour = (currentCity,visited,cities) => { // this function find the nearest Neighour of the current city
    let minDistance = Infinity;
    let nearestCity = -1;

    for(let i = 0 ; i < cities.length; i++){ // traverse the whole city and find the city which have minimum distance to the current city
      if(!visited[i]){
        const distance = calculateDistance(cities[currentCity],cities[i]);
        if(distance < minDistance){
          minDistance = distance; // set mindistance to current distance because distance is less then mindistance
          nearestCity = i;
        }
      }
    }
    return nearestCity; // return the city which have minimum distance
  };

  const calculateDistance = (city1,city2) => {
    return Math.sqrt(Math.pow(city2.x - city1.x, 2) + Math.pow(city2.y - city1.y , 2)); // retur the ditancebetween teo points distance = underroot(x^2 + y^2);
  };

  const startAnimation = () => { // when button isclixk set default condition
    setTour([0]);
    setVisited([true]);
    setCurrentCity(0);
    setIsAnimating(true);
  };

  return (
    <div className='App'>

      <h1>Travelling SalesPerson Problem - Nearest Neighour</h1>

      <button onClick={startAnimation} disabled= {isAnimating}>Start Animation</button>

      <div className='grid'>
         {/* Creation of grid */}
        {Array.from({ length : gridSize }).map((_,row) => (
          <div key={row} className="row">
            {Array.from({ length : gridSize }).map((_,col) => {
              const city = cities.find(city => city.x === col && city.y === row);
              const isVisited = city && visited[city.id];
              return (

                <div
                  key={col}
                  className={`cell ${city ? 'city' : ''} ${isVisited ? 'visited' : ''}`}
                  style={{
                    backgroundColor: city ? (isVisited ? 'green' : 'red') : 'white'
                  }}
                >
                  {city ? city.id : ''}
                </div>
              );
            })}
          </div>
        ))}

        {/* Creation of path  */}
        <svg className="path" width= "100%" height="100%">
          {tour.map((cityId,index) => {
            if(index < tour.length - 1){
              const nextCityId = tour[index + 1];
              return (
                <line
                  key={index}
                  x1 = {cities[cityId].x * 22 + 10}
                  y1 = {cities[cityId].y * 22 + 10}
                  x2 = {cities[nextCityId].x * 22 + 10}
                  y2 = {cities[nextCityId].y * 22 + 10}
                  stroke='blue'
                  strokeWidth='2'
                />
              );
            }
            return null;
          })}
        </svg>
      </div>
    </div>
  )

  
}

export default App;
