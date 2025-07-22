import {plural} from "@/components/utils";
import React from "react";
import './SelectDropDown.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
                value={selected}
                onChange={children}
            >
                {
                    Object.keys(facets).map((lang:  string) =>
                        <MenuItem value={lang}>
                            {`${lang} (${facets[lang]} ${plural(facets[lang])})`}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
};

export default React.memo(SelectDropDown);
