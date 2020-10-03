import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, LoadColoursAction, ColoursState } from "../redux/store";

const LocalStorage = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const colours = useSelector((state: RootState) => state.colours);

    React.useEffect(() => {
        if (loaded) {
            localStorage.setItem("chatColours", JSON.stringify(colours));
        }
    }, [colours, loaded]);

    React.useEffect(() => {
        const coloursFromLocalStorage = localStorage.getItem("chatColours");

        if (coloursFromLocalStorage) {
            try {
                const parsedColours: ColoursState = JSON.parse(
                    coloursFromLocalStorage
                );
                setLoaded(true);
                dispatch<LoadColoursAction>({
                    type: "LOAD_COLOURS",
                    colours: parsedColours,
                });
            } catch (e) {
                console.error("Error retrieving colours from localstorage:", e);
                setLoaded(true);
            }
        }
    }, [dispatch]);

    return null;
};

export default LocalStorage;
