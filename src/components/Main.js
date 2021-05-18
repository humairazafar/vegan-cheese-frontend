
import {useEffect, useState} from "react";
import {Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
    const [cheese, setCheese] = useState(null);
    const URL = "https://vegancheese.herokuapp.com/cheese/";
    const getCheese = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setCheese(data);

    };

    const createCheese = async (paneer) => {
        //make post request to create people
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paneer)
        })
        //update list of cheese
        getCheese()
    };

    const updateCheese = async (paneer, id) => {
        console.log(paneer, id)
        //make post request to update cheese
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paneer)
        })
        // update list of cheese
        getCheese()

    }   
    
    const deleteCheese = async id => {
        //make post request to delete cheese
        await fetch(URL + id, {
            method: "delete",
        })
        //update list of people
        getCheese()
    }
    
    useEffect(() => getCheese(), []);
       
   
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index cheese={cheese} createCheese={createCheese}/>
                </Route>
                <Route
                path="/cheese/:id"
                render={(rp) => (
                    <Show
                    cheese={cheese}
                    updateCheese={updateCheese}
                    deleteCheese={deleteCheese}
                    {...rp}
                    />
                )}
                />
               
            </Switch>
        </main>
    );
}
export default Main;