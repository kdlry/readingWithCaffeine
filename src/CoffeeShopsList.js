import React from 'react';
import Directions from "./Directions"

const CoffeeShopsList = (props) => {

    const { coffeeShops, handleCoffeeShopSelected, coffeeShopClicked, selectedCoffeeShop, modeOfTransportation, handleTransportationChange, directionsToCoffeeShop, handleBackButton } = props
    return (
        <>
            <div className="coffeeShops">
                <>{!coffeeShopClicked ?


                    <>
                        <h2>Coffee Shops</h2>
                        <ul className="coffeeShopsContainer">
                            {
                                coffeeShops.map((results) => {
                                    return (
                                        <li key={results.id}>
                                            <button
                                                type='button'
                                                key={results.id}
                                                onClick={handleCoffeeShopSelected}
                                                value={results.id}>
                                                {results.displayString}
                                            </button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </>
                    :
                    <React.Fragment>
                        {/* <button>SELECT ANOTHER COFFEE SHOP</button> */}


                        <div className='transportation'>
                            <button onClick={handleBackButton}>View All Coffee Shops</button>
                            {/* <label htmlFor='coffeeShops'>Select another Coffee Shop:</label>
                            <select className="coffeeShopsDropdown" id='coffeeShops'>
                                {coffeeShops.map((results) => {
                                    return (
                                        <option key={results.id} className="coffeeShopsDropdown" value={results.id}
                                            onClick={handleCoffeeShopSelected}>
                                            {results.displayString}
                                        </option>
                                    );
                                })}
                            </select> */}
                        </div>


                        <h2>Directions</h2>
                        <Directions
                            selectedCoffeeShop={selectedCoffeeShop}
                            modeOfTransportation={modeOfTransportation}
                            handleTransportationChange={handleTransportationChange}
                            directionsToCoffeeShop={directionsToCoffeeShop} />
                    </React.Fragment>

                }</>

            </div>

        </>
    );
};

export default CoffeeShopsList;