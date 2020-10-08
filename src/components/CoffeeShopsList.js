import React from 'react';
import Directions from "./Directions"

const CoffeeShopsList = (props) => {
    const { coffeeShops, handleCoffeeShopSelected, coffeeShopClicked, selectedCoffeeShop, modeOfTransportation, handleTransportationChange, directionsToCoffeeShop, handleBackButton, selectedLibrary } = props
    return (      
      <div className='coffeeShops'>
        {/* ternary operator to display the coffee shops buttons or the directions clicking on an coffee shop button */}
        {!coffeeShopClicked ?
          <>
          {/* display the coffee shops list */}
            <h2>Coffee Shops In The Area</h2>
            <ol className='coffeeShopsContainer'>
              {
                coffeeShops.map((results, index) => {
                    return (
                      <li key={results.id}>
                        <button
                          className='coffeeShopButton'
                          type='button'
                          key={results.id}
                          onClick={handleCoffeeShopSelected}
                          
                          value={results.id}>
                            <div className="coffeeShopNumber"><p>{index + 1}</p></div>
                            <div className="coffeeShopText">
                              <h3>{results.name}</h3>
                              <p>{results.place.properties.street}</p>
                            </div>
                        </button>
                      </li>
                    );
                  })
              }
            </ol>
          </>
          :
          <>
          {/* display transportation and directions */}
            <div className='transportation'>
              <button className="transportationButton" onClick={handleBackButton}>⬅ to Coffee Shops</button>
            </div>
            <h2>Directions</h2>
            <Directions
              selectedCoffeeShop={selectedCoffeeShop}
              modeOfTransportation={modeOfTransportation}
              handleTransportationChange={handleTransportationChange}
              directionsToCoffeeShop={directionsToCoffeeShop} 
            />
          </>
        }
      </div>
    );
};

export default CoffeeShopsList;n