import React from 'react';

const Directions = (props) => {
 const { directionsToCoffeeShop } = props;
    return (
        <>
            <ul>
                {directionsToCoffeeShop.map((direction) => {
                    return (
                        <li className=''>
                            {direction}
                        </li>
                    );
                })}
            </ul>
        </>
    )
};

export default Directions;