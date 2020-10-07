import React, {useEffect, useState} from 'react';
import GameField from "./GameField/GameField";
import data from "../consts/cities.json";
import InfoBlock from "./InfoBlock";

function App() {
    const [capitalCities, setCapitalCities] = useState(data.capitalCities.slice(0).sort(() => {
        return Math.random() - 0.5;
    }));
    const [nextCity, setNextCity] = useState();
    const [lifes, setLifes] = useState(1500);
    const [distance, setDistance] = useState();
    const [counter, setCounter] = useState(-1);
    const [gameOver, setGameOver] = useState(false);
    const [currentCity, setCurrentCity] = useState({city: null, coords: {}});
    const [estimated, setEstimated] = useState({});
    const [victory, setVictory] = useState(false);

    useEffect(() => {
        const city = capitalCities[0];
        setNextCity(city.capitalCity);
    }, []);

    useEffect(() => {
        if (lifes <= 0) {
            setGameOver(true);
        }
    },[lifes]);

    useEffect(() => {
        setNextCity(capitalCities[0].capitalCity)

    }, [capitalCities])

    useEffect(() => {
        if (capitalCities.length > 0  && estimated.lat) {

            const city = capitalCities.shift();
            if (capitalCities.length > 0) {
                setNextCity(capitalCities[0].capitalCity);
            }
            setCurrentCity({city: city.capitalCity, coords: {lat: +city.lat, lng: +city.long}});
            setCounter(counter+1);

        }
        if (capitalCities.length === 0) {
            setVictory(true);
        }
    }, [estimated]);

    useEffect(() => {
        if (currentCity.coords.lat) {
            const dist = haversine_distance(currentCity.coords, estimated).toFixed(3);
            setDistance(dist);
            setLifes(lifes - dist);

        }
    }, [currentCity]);

    function haversine_distance(mk1, mk2) {
        let R = 3958.8; // Radius of the Earth in miles
        let rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
        let rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
        let difflat = rlat2-rlat1; // Radian difference (latitudes)
        let difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

        return 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    }

    function resetGame() {
        setCapitalCities(previousState => data.capitalCities.slice(0).sort(() => {
            return Math.random() - 0.5;
        }));
        setGameOver(false);
        setVictory(false);
        setCounter(-1);
        setLifes(1500);
        setDistance(null);
        setCurrentCity({city: null, coords: {}});
        setEstimated({});
    }

    return (
    <div className="App">
      <GameField estimated={estimated} currentCity={currentCity} setEstimated={setEstimated} gameOver={gameOver} victory={victory}/>
      <InfoBlock nextCity={nextCity} distance={distance} lifes={lifes} counter={counter} resetGame={resetGame}  gameOver={gameOver} victory={victory}/>
    </div>
  );
}

export default App;
