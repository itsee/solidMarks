import * as React from 'react';
import './popup.scss';
import {ReactNode} from "react";

interface PopupProps {
    // Add properties here
}

interface PopupState {
    // Define state here
}

export default class Popup extends React.Component<PopupProps, PopupState> {
    public constructor(props: PopupProps, state: PopupState) {
        super(props, state);
    }

    public componentDidMount(): void {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ popupMounted: true });
    }

    public render(): ReactNode {
        return (
            <div className="popupContainer">
                Popup screen
            </div>
        )
    }
}
