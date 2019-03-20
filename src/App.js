import React from "react";
import Calendar from "./components/Calendar/Calendar";

import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header>
                    <div id="logo">
                        <span className="icon">date_range</span>
                        <span>
              Event Calendar with React
            </span>
                    </div>
                </header>
                <main>
                    <Calendar />
                </main>
            </div>
        );
    }
}

export default App;
