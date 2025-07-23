import {plural} from "@/components/utils";
import React from "react";
import './SelectDropDown.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';

const SelectDropDown = ({facets, placeholder, selected, children}: any) => {
    return (
        <FormControl>
            <Autocomplete
                blurOnSelect
                sx={{ minWidth: 145 }}
                className="select-filter"
                renderInput={(params) => <TextField {...params} label={placeholder} />}
                size="small"
                value={selected || ''}
                onChange={children}
                options={Object.keys(facets).map((lang:  string, index: number) => ({
                    label: `${lang} (${facets[lang]} ${plural(facets[lang])})`,
                    value: lang
                }))}
            />
        </FormControl>
    );
};

export default React.memo(SelectDropDown);
