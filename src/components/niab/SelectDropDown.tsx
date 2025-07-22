import {plural} from "@/components/utils";
import React from "react";
import './SelectDropDown.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {IconButton, InputAdornment} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
const SelectDropDown = ({facets, placeholder, selected, children}: any) => {
    const id = React.useId();

    return (
        <FormControl>
            <InputLabel size="small" id={id}>{placeholder}</InputLabel>
            <Select
                sx={{ minWidth: 145 }}
                className="select-filter"
                size="small"
                labelId={id}
                inputProps={{MenuProps: {disableScrollLock: true}}}
                value={selected || ''}
                onChange={children}
                startAdornment={
                    selected && (
                        <InputAdornment position="start">
                            <IconButton
                                onClick={() => children()}
                                size="small"
                                sx={{ visibility: selected ? 'visible' : 'hidden' }}
                            >
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    )
                }
            >
                {
                    Object.keys(facets).map((lang:  string, index: number) =>
                        <MenuItem key={index} value={lang}>
                            {`${lang} (${facets[lang]} ${plural(facets[lang])})`}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
};

export default React.memo(SelectDropDown);
