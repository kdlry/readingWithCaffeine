import React from 'react';

const Form = (props) => {
  const {
    handleLibraryInputChange,
    libraryInput,
    handleFormSubmit,
    handleRadiusSelected
  } = props;
  return (
    <>
      <form action='submit'>
        <div>
          <label htmlFor='inputLocation'>Enter your library:</label>
          <input
            type='text'
            id='inputLocation'
            value={libraryInput}
            onChange={handleLibraryInputChange}
            placeholder=''
          />
        </div>

        <div>
          <p>Select a radius:</p>
          <label htmlFor='radius5km'>5km</label>
          <input
            type='radio'
            value={5000}
            id='radius5km'
            name='selectedRadius'
            placeholder=''
            onChange={handleRadiusSelected}
            defaultChecked
          />
          <label htmlFor='radius20km'>20km</label>
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
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
