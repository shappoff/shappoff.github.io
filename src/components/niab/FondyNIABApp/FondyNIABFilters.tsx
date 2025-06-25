import React from "react";
import Select from "react-select";

const FondyNIABFilters = ({facets, setStoreFilter, setLangFilter, isTypoTolerance, setIsTypoTolerance, setCurrentPage, plural}: any) => (
    <div className="second-raw noselect">
        <Select className="select-filter storage"
                isClearable={true}
                options={facets && facets.storage && Object.keys(facets.storage).map((lang, index) => ({label: `№ ${lang} (${facets.storage[lang]} ${plural(facets.storage[lang])})`, value: lang})) as any}
                placeholder={'№ хранилища'}
                onChange={(e: any) => {
                    setStoreFilter(e?.value);
                    setCurrentPage(0);
                }}
        />
        <Select className="select-filter lang"
                isClearable={true}
                options={facets && facets.lang && Object.keys(facets.lang).map((lang, index) => ({label: `${lang} (${facets.lang[lang]} ${plural(facets.lang[lang])})`, value: lang})) as any}
                placeholder={'Язык фонда'}
                onChange={(e: any) => {
                    setLangFilter(e?.value);
                    setCurrentPage(0);
                }}
        />
        <div className="form-check form-check-inline form-switch typo-tolerance">
            <input className="form-check-input" type="checkbox"
                   role="switch" id="flexSwitchCheckDefault"
                   checked={!isTypoTolerance}
                   onChange={(e: any) => setIsTypoTolerance(!e.target.checked)}/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Точное совпадение</label>
        </div>
    </div>
);

export default FondyNIABFilters; 