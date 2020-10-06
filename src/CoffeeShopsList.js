import React from 'react';

const CoffeeShopsList = (props) => {

    const { coffeeShops, handleCoffeeShopSelected } = props
    return (
        <>
            <div className="coffeeShops">
                <h2>Coffee Shops:</h2>
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
            </div>

        </>
    );
};

export default CoffeeShopsList;