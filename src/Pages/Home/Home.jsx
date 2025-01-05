import { Helmet } from "react-helmet";

const Home=()=>{
    return( <div>
         <Helmet>
                <title>Pixventory | Home</title>
            </Helmet>
        <h1 className="text-xs text-red-700">Home</h1>
        <p className="text-red-500">Paragraph</p>
    </div>)
}

export default Home;