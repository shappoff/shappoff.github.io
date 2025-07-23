'use client'

import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import './SearchInputControl.css';

const SearchInputControl = ({searchHandler, searchTerm}: any) => {
    // const inputRef = React.useRef(null);
    return (
        <>
            <TextField
                id="input-id"
                label="Название или номер фонда НИАБ"
                variant="outlined"
                className="input-form-control"
                onInput={searchHandler}
                value={searchTerm}
                placeholder="Начните вводить"
                size="small"
                fullWidth
                slotProps={{
                    input: {
                        endAdornment: <>
                            {searchTerm ? <ClearIcon className="clear-indicator" onClick={() => {
                                if (searchTerm) {
                                    searchHandler({target: {value: ''}});
                                }

                                // inputRef.current.focus({preventScroll: true});
                            }} /> : ''}
                        </>,
                    },
                }}
            />
        </>

    );
};

export default SearchInputControl;
