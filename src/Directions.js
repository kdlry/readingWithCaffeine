import React from 'react';

const Directions = (props) => {

    const { 
        selectedCoffeeShop,
        modeOfTransportation, 
        handleTransportationChange, 
        directionsToCoffeeShop 
    } = props;

    return (
        <div className='transportationAndDirections'>
            {selectedCoffeeShop !== '' && (
            <>     
                <div className='transportation'>
                    <label htmlFor='modeOfTransportation'>Choose a mode of transportation:</label>
                    <select id='modeOfTransportation' value={modeOfTransportation} onChange={handleTransportationChange}>
                        <option value='fastest'>Drive</option>
                        <option value='pedestrian'>Walk</option>
                        <option value='bicycle'>Bike</option>
                    </select>
                </div>

                <ol>
                    {directionsToCoffeeShop.map((direction) => {
                        return (
                            <li>
                                {direction}
                            </li>
                        );
                    })}
                </ol>
            </>    
            )}
        </div>
    )
};

export default Directions;