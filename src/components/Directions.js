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
                        <div className="directionMarkers">
                            <div className="directionMarkerContainer">
                                <img src="https://assets.mapquestapi.com/icon/v2/marker-start.png" />
                                <p>Start</p>
                            </div>
                            <div className="directionMarkerContainer">
                                <img src="https://assets.mapquestapi.com/icon/v2/marker-end.png" />
                                <p>End</p>
                            </div>
                        </div>
                       
                       <div className="modeOfTransportationInputContainer">
                            <label htmlFor='modeOfTransportation'>Choose a mode of transportation:</label>
                            <select id='modeOfTransportation' value={modeOfTransportation} onChange={handleTransportationChange}>
                                <option value='fastest'>Drive</option>
                                <option value='pedestrian'>Walk</option>
                                <option value='bicycle'>Bike</option>
                            </select>
                       </div>
                    </div>

                    <ol>
                        {directionsToCoffeeShop.map((direction, index) => {
                            return (
                                <li key={index}>
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