import React from 'react';

const CoffeeShopsList = (props) => {

    const { coffeeShops, handleCoffeeShopSelected } = props
    return (
        <>
            <div className="coffeeShops">
                <ul>
                    {coffeeShops.map((results) => {
                        return (
                            <li className=''>
                                <button
                                    type='button'
                                    key={results.id}
                                    onClick={handleCoffeeShopSelected}
                                    value={results.id}>
                                    {results.displayString}
                                </button>

                            </li>
                        );
                    })}
                </ul>
            </div>

        </>
    );
};

export default CoffeeShopsList;