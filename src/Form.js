import React from 'react';

const Form = (props) => {
  const {
    handleLibraryInputChange,
    libraryInput,
    handleFormSubmit,
    handleRadiusSelected,
    showSuggestions,
    autoComplete,
    handleLibraryInputSelected,
    selectedRadius,
  } = props;
  return (
    <>
      <form action='submit'>
        <div className="formTopSection">
          <label htmlFor='inputLocation'>Find Library</label>
          <div className="inputLocationContainer">
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
                      <li key={results.id} className='autoCompleteResults'>
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

        <div className="formBottomSection">
          {/* <p>Radius <span>(km)</span></p> */}
          <label htmlFor='inputRadius'>Maximum distance (up to 20km)</label>
          <input
            type='number'
            id='inputRadius'
            className='inputLocation'
            min='0'
            max='20'
            value={selectedRadius}
            onChange={handleRadiusSelected}
            placeholder=''
            autoComplete="off"
          />

          {/* <div className="selectedRadiusContainer">
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

          <div className="selectedRadiusContainer">
            <input
              type='radio'
              value={20000}
              id='radius20km'
              name='selectedRadius'
              onChange={handleRadiusSelected}
              className='sr-only'
            /> */}
          {/* <label htmlFor='radius20km'>20</label> */}
          {/* </div> */}

          <div>
            <button className='formSubmitButton' type='submit' onClick={handleFormSubmit}>
              Go
          </button>
          </div>

        </div>



      </form>
    </>
  );
};

export default Form;
