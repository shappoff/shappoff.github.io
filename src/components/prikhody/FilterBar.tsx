import Form from "react-bootstrap/Form";
import Select from "react-select";
import React from "react";

const FilterBar = ({
                       searchHandler,
                       keysHandler,
                       searchTerm,
                       setPlaceTerm,
                       isTypoTolerance,
                       setIsTypoTolerance,
                       placeFilterOptions,
                       currentLocId,
                       setCurrentLocId,
                       defaultFacets,
                       setUezdFilter,
                        children
                   }: any) => {
    return <>
        <div className="input-typo-tolerance">
            <div className="input-with-cross">
                <Form.Control id="input-id"
                              placeholder="Селение"
                              multiple={false}
                              onInput={searchHandler}
                              onChange={keysHandler}
                              type="text"
                              className={'input-form-control white-space-nowrap'}
                              value={searchTerm}
                />
                {
                    searchTerm ? <div className="select__indicator select__clear-indicator css-1xc3v61-indicatorContainer"
                                      onClick={async () => {
                                         if (searchTerm) {
                                             const text = await navigator.clipboard.readText();
                                             if (searchTerm !== text) {
                                                 searchHandler({target: {value: text}});
                                             } else {
                                                 searchHandler({target: {value: ''}});
                                             }
                                         }

                                 }}
                                 aria-hidden="true">
                                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg">
                                        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                                    </svg>
                                </div> : <></>
                }
            </div>
            <div className="form-check form-check-inline form-switch typo-tolerance">
                <input className="form-check-input" type="checkbox"
                       role="switch" id="flexSwitchCheckDefault"
                       checked={!isTypoTolerance}
                       onChange={(e: any) => setIsTypoTolerance(!e.target.checked)}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Точное совпадение</label>
            </div>
        </div>
        {children}
    </>
};

export default FilterBar;
