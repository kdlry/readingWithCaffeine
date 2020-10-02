import React from 'react';

const Form = (props) => {
    const { handleLibraryInputChange, libraryInput, handleFormSubmit } = props
    return (
        <>
            <form action="submit">
                <div>
                    <label htmlFor=""></label>
                    <input
                        type="text"
                        id=""
                        value={libraryInput}
                        onChange={handleLibraryInputChange}
                        placeholder="" />
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
                    <button
                        className=""
                        type="submit"
                        onClick={handleFormSubmit}>submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default Form;