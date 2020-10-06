import React from 'react';
import Directions from "./Directions"

const CoffeeShopsList = (props) => {

    const { coffeeShops, handleCoffeeShopSelected, coffeeShopclicked, selectedCoffeeShop, modeOfTransportation, handleTransportationChange, directionsToCoffeeShop } = props
    return (
        <>
            <div className="coffeeShops">
                <>{!coffeeShopclicked ?


                    <>
                        <h2>Coffee Shop Direction:</h2>
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
                            <label htmlFor='coffeeShops'>Select another Coffee Shop:</label>
                            <select className="coffeeShopsDropdown" id='coffeeShops'>
                                {coffeeShops.map((results) => {
                                    return (
                                        <option className="coffeeShopsDropdown" value={results.id}
                                            onClick={handleCoffeeShopSelected}>
                                            {results.displayString}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>


                        <h2>Coffee Shops:</h2>
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