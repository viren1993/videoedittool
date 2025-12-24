import { default as StateManager } from '.';

declare function handleStateEvents(state: StateManager): {
    unsubscribe: () => void;
};
export default handleStateEvents;
