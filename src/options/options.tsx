import * as React from 'react';
import './options.scss';
import {ReactNode} from "react";

interface OptionsProps {
    // Add properties here
}

interface OptionsState {
    // Define state here
}

export default class Popup extends React.Component<OptionsProps, OptionsState> {
    public constructor(props: OptionsProps, state: OptionsState) {
        super(props, state);
    }

    public componentDidMount(): void {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ optionsMounted: true });
    }

    public render(): ReactNode {
        return (
            <div className="optionsContainer">
                Options screen
            </div>
        )
    }
}
