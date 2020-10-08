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
        <div className='formTopSection'>

          <label htmlFor='inputLocation'>Find Library</label>
          <div className='inputLocationContainer'>
            <input
              type='text'
              id='inputLocation'
              className='inputLocation'
              value={libraryInput}
              onChange={handleLibraryInputChange}
              placeholder=''
              autoComplete='off'
            />

            {/* displaying autocomplete results / event handler on click */}
            {
              showSuggestions &&
              <ul className='inputLocationAutoComplete'>
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

        <div className='formBottomSection'>
          <label htmlFor='inputRadius'>Maximum distance <span>(1 - 20km)</span></label>
          <input
            type='number'
            id='inputRadius'
            className='inputRadius'
            min='0'
            max='20'
            value={selectedRadius}
            onChange={handleRadiusSelected}
            placeholder=''
            autoComplete='off'
            required
          />

        <button className='formSubmitButton' type='submit' onClick={handleFormSubmit}>Go</button>

        </div>

      </form>
    </>
  );
};

export default Form;
