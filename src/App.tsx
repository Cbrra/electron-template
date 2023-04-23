import "./styles/App.scss";
import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import type { Data } from "./types/Data";
import { dataContext } from "./components/contexts/DataContext";
import Home from "./pages/Home";
import NotHome from "./pages/NotHome";

const App = () => {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        window.electronAPI.getData()
            .then(res => setData(res));
    }, []);

    return (
        <dataContext.Provider value={data}>
            <HashRouter>
                <Routes>
                    <Route path="*" Component={Home} />
                    <Route path="/not-home" Component={NotHome} />
                </Routes>
            </HashRouter>
        </dataContext.Provider>
    );
};

export default App;