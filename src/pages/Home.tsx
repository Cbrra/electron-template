import "../styles/home.scss";
import { useContext } from "react";
import { dataContext } from "../components/contexts/DataContext";
import LogoIcon from "../icons/LogoIcon";

const Page = () => {
    const data = useContext(dataContext);

    return (
        <div className="container">
            <main className="main">
                <LogoIcon/>

                <h1 className="title">
                    Electron App
                </h1>

                <p>
                    Data stored in your files: {data ? JSON.stringify(data) : data}
                </p>
                
                <a href="#/not-home" className="link">Go to the second page</a>
            </main>
        </div>
    )
}

export default Page;