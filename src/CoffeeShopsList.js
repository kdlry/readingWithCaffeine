import React from 'react';

const CoffeeShopsList = (props) => {

    const { coffeeShops, handleCoffeeShopSelected } = props
    return (
        <>
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
        </>
    );
};

export default CoffeeShopsList;