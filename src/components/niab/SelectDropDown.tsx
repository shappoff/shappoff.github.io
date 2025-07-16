import {plural} from "@/components/utils";
import Select from "react-select";
import React from "react";

function createOptionsList(lang: string, facets: any) {
    return ({label: `№ ${lang} (${facets[lang]} ${plural(facets[lang])})`, value: lang});
}

const SelectDropDown = ({facets, setStoreFilter, setCurrentPage, placeholder}: any) => {
    return (
        <Select className="select-filter"
                isClearable={true}
                options={Object.keys(facets).map((lang, index) => createOptionsList(lang, facets)) as any}
                placeholder={placeholder}
                onChange={(e: any) => {
                    setStoreFilter(e?.value);
                    setCurrentPage(0);
                }}
        />
    );
};

export default SelectDropDown;
