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
            <input
              type='radio'
              value={5000}
              id='radius5km'
              name='selectedRadius'
              className='sr-only'
              onChange={handleRadiusSelected}
              defaultChecked
            />
            <label htmlFor='radius5km'>5</label>
          </div>

          <div className="selectedRadiusInputContainer">
            <input
              type='radio'
              value={20000}
              id='radius20km'
              name='selectedRadius'
              onChange={handleRadiusSelected}
              className='sr-only'
            />
            <label htmlFor='radius20km'>20</label>
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
