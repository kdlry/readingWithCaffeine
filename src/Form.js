import React from 'react';

const Form = (props) => {
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
        {clicked % 2 ? (
          <form action='submit'>
            <div>
              <label htmlFor=''></label>
              <input
                type='text'
                id=''
                value={libraryInput}
                onChange={handleLibraryInputChange}
                placeholder=''
              />
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
        ) : (
          <form action='submit'>
            <div>
              <label htmlFor=''></label>
              <input
                type='text'
                id=''
                value={selectedLibraryName}
                onChange={handleLibraryInputChange}
                placeholder=''
              />
            </div>

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
        )}
      </div>
    </>
  );
};

export default Form;
