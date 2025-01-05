import { Outlet } from "react-router-dom"
import NavigationBar from "../Components/NavigationBar/NavigationBar"

const Main = () => {
    return (
        <div className="w-full mx-auto ">
            <div className="fixed z-40 w-full   flex items-center justify-center">
                <NavigationBar />
            </div>
            <div className=" max-w-6xl mx-auto w-full">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Main