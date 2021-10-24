import Boards from "./components/Boards/Boards";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: 100 }}>
                <Boards />
            </div>
        </div>
    );
}

export default App;
