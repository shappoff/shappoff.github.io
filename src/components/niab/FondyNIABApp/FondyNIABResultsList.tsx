import React from "react";
import FondCard from "../FondCard";

const FondyNIABResultsList = ({resultsAll}: any) => (
    <div className="list-result">
        {
            resultsAll.map((item: any, index: number) => {
                return <FondCard key={index} index={index} item={item} />
            })
        }
    </div>
);

export default FondyNIABResultsList; 