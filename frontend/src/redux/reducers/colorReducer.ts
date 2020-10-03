import { ColoursState, AddColourAction, LoadColoursAction } from "../store";
import randomColor from "randomcolor";

const INITIAL_STATE: ColoursState = {};
type AddColourActions = AddColourAction | LoadColoursAction;

const reducer = (
    state = INITIAL_STATE,
    action: AddColourActions
): ColoursState => {
    switch (action.type) {
        case "ADD_COLOUR":
            const source = action.source;

            if (!state[source]) {
                const sourceColour = randomColor({
                    luminosity: "light",
                });

                return {
                    ...state,
                    [source]: sourceColour,
                };
            }
            break;

        case "LOAD_COLOURS":
            return {
                ...action.colours,
            };
        default:
            return state;
    }

    return state;
};

export default reducer;
