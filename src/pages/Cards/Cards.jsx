import React, { useEffect } from "react";
import CardsTable from "./CardsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypeCards } from "../../Store/Cards/cards";

export default function Cards() {
    const dispatch = useDispatch();
    const typecards = useSelector((state) => state.typesCards?.typecards);
    const cardStatus = useSelector((state) => state.typesCards?.status);
      
    useEffect(() => {
        if (cardStatus === 'idle') {
          dispatch(fetchTypeCards());
        }
      }, [cardStatus, dispatch]);
  return (
    <>
      <div className="p-4">
        <div className="head">
          <h1 className="font-bold py-3"># Cards</h1>
        </div>

        {/* Table for Reports */}
        <CardsTable typecards={typecards}/>
      </div>
    </>
  );
}
