'use client'

import React from "react";
import Form from "react-bootstrap/Form";

const SearchInputControl = ({searchHandler, searchTerm}: any) => {
    // const inputRef = React.useRef(null);
    return (
        <>
            <Form.Control id="input-id"
                          placeholder="Название или номер фонда НИАБ"
                          enterKeyHint={'search'}
                          multiple={false}
                          autoFocus={true}
                          onInput={searchHandler}
                          type="text"
                          className={'input-form-control'}
                          value={searchTerm}
            />
            {
                searchTerm ? <div className="select__indicator select__clear-indicator css-1xc3v61-indicatorContainer"
                                  onClick={() => {
                                      if (searchTerm) {
                                          searchHandler({target: {value: ''}});
                                      }

                                      // inputRef.current.focus({preventScroll: true});
                                  }}
                                  aria-hidden="true">
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg">
                        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                </div> : <></>
            }
        </>

    );
};

export default SearchInputControl;
