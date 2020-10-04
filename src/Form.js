import React from 'react';

const Form = (props) => {
  const {
    handleLibraryInputChange,
    libraryInput,
    handleFormSubmit,
    handleRadiusSelected,
    modeOfTransportation,
    handleTransportationChange,
    showSuggestions,
    autoComplete,
    handleLibraryInputSelected
  } = props;
  return (
    <>
      <form action='submit'>
        <div className="inputLocationContainer">
          <label htmlFor='inputLocation'>Start Location</label>
          <div className="inputLocationResultsContainer">
            <input
              type='text'
              id='inputLocation'
              className='inputLocation'
              value={libraryInput}
              onChange={handleLibraryInputChange}
              placeholder=''
              autoComplete="off"
            />
            {
            showSuggestions &&
            <ul className="inputLocationAutoComplete">
              {
                autoComplete.map((results) => {
                  return (
                    <li className='autoCompleteResults'>
                      <button
                        type='button'
                        key={results.id}
                        onClick={handleLibraryInputSelected}
                        value={results.name}
                      >
                        {results.name}
                      </button>
                    </li>
                  );
                })

              }
            
            </ul>
          }
          </div>
        </div>

        <div className="selectedRadiusContainer">
          <p>Radius <span>(km)</span></p>
          <div className="selectedRadiusInputContainer">
            <label htmlFor='radius5km'>5</label>
            <input
              type='radio'
              value={5000}
              id='radius5km'
              name='selectedRadius'
              placeholder=''
              onChange={handleRadiusSelected}
              defaultChecked
            />
          </div>

          <div className="selectedRadiusInputContainer">
            <label htmlFor='radius20km'>20</label>
            <input
              type='radio'
              value={20000}
              id='radius20km'
              name='selectedRadius'
              onChange={handleRadiusSelected}
              placeholder=''
            />
          </div>

          <div>
          <button className='' type='submit' onClick={handleFormSubmit}>
            Go
          </button>
        </div>
          
        </div>


        
      </form>
      <div>
        <label htmlFor="modeOfTransportation">Choose a mode of transportation:</label>
        <select id="modeOfTransportation" value={modeOfTransportation} onChange={handleTransportationChange}>
          <option value="fastest">Drive</option>
          <option value="pedestrian">Walk</option>
          <option value="bicycle">Bike</option>
        </select>
      </div>
    </>
  );
};

export default Form;
