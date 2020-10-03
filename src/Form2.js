import React from 'react';

const Form2 = (props) => {
  const {
    handleLibraryInputChange,
    libraryInput,
    handleFormSubmit,
    clicked,
    selectedLibraryName,
  } = props;
  return (
    <>
      <div>
        <form action='submit'>
          <div>
            <label htmlFor=''></label>
            {clicked % 2 ? (
              <input
                type='text'
                id=''
                value={libraryInput}
                onChange={handleLibraryInputChange}
                placeholder=''
              />
            ) : (
              <input
                type='text'
                id=''
                value={selectedLibraryName}
                onChange={handleLibraryInputChange}
                placeholder=''
              />
            )}
          </div>

          {/* 1. store selectedLibrary in input field  
            create toggle to close autocomplete box*/}

          {/* <div>
                    <label htmlFor=""></label>
                    <input
                        type="radio"
                        value="5"
                        id=""
                        onChange={}
                        value={}
                        placeholder="" />
                    <input
                        type="radio"
                        value="20"
                        id=""
                        onChange={}
                        placeholder="" />
                </div> */}

          <div>
            <button className='' type='submit' onClick={handleFormSubmit}>
              submit
            </button>
          </div>
        </form>
        )
      </div>
    </>
  );
};

export default Form2;
