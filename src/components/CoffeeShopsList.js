import React from 'react';
import Directions from "./Directions"

const CoffeeShopsList = (props) => {

    const { coffeeShops, handleCoffeeShopSelected, coffeeShopClicked, selectedCoffeeShop, modeOfTransportation, handleTransportationChange, directionsToCoffeeShop, handleBackButton, selectedLibrary } = props
    return (
        <>
            <div className="coffeeShops">
                <>{!coffeeShopClicked ?


                    <>
                        <h2>Your Library: <span>{selectedLibrary.name}</span></h2>
                        <h2>Coffee Shops In The Area</h2>
                        <ol className="coffeeShopsContainer">
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
                        </ol>
                    </>
                    :
                    <React.Fragment>

                        <div className='transportation'>
                            <button onClick={handleBackButton}>⬅ to Coffee Shops</button>
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