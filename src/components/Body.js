import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useEffect, useState } from "react";
// import { json } from "express";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () =>{

    console.log("Body rendered");

    const [listOfRestaurants,setListOfRestaurants] = useState([]);
    const [filteredRestaurant,setFilteredRestaurant] = useState([]);  //creating copy of the original list
    
    const [searchText,setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


    useEffect(()=>{
        fetchData();
    },[]);

    const ApiKey = '7dfcfb736685c8b7';
    const EDUCORS_URL = 'https://educorssolver.host/api/getData';
    const Target = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.00480&lng=75.94630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

    const fetchData = async () => {
        
        const data = await fetch(
            `${EDUCORS_URL}?ApiKey=${ApiKey}&Target=${encodeURIComponent(Target)}`
        );
        const json = await data.json();

        console.log(json);

        // console.log(json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants);

        setListOfRestaurants(json?.data?.cards[2].card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[2].card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    const OnlineStatus = useOnlineStatus();

    if(OnlineStatus===false){
        return(
            <h1>
                Looks like you're offline!! Please check your internet connection
            </h1>
        );
    }


    return listOfRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Filter and Search Section */}
          <div className="flex justify-between items-center mb-6">
            {/* Search Box */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                data-testid="searchInput"
                placeholder="Search restaurants..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                onClick={() => {
                  console.log(searchText);
                  const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.info.name.toLowerCase().includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                Search
              </button>
            </div>
      
            {/* Top Rated Filter */}
            <button
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
              onClick={() => {
                const filteredList = listOfRestaurants.filter(
                  (res) => res.info.avgRating > 4
                );
                setFilteredRestaurant(filteredList);
              }}
            >
              Top Rated Restaurants
            </button>
          </div>
      
          {/* Restaurant Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRestaurant.map((restaurant, index) => (
              <Link
                key={restaurant.info.id}
                to={`/restaurant/${restaurant.info.id}`}
                className="transform hover:scale-105 transition-transform"
              >
                {restaurant.info.isOpen ? (
                  <RestaurantCardPromoted resList={restaurant} />
                ) : (
                  <RestaurantCard resList={restaurant} />
                )}
              </Link>
            ))}
          </div>
        </div>
      );
      
}


export default Body;


