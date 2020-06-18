import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import Tabs from "../components/Tabs/Tabs.js"
import "./Goals.css"
import { Row } from "../components/Grid";
import userContext from '../utils/userContext'
// import moment from 'moment';


function Goals() {
    // Setting our component's initial state
    const [formObject, setFormObject] = useState({})
    const { goals, loadGoals, user } = useContext(userContext)

    useEffect(() => {
        loadGoals()
    }, [])

    // Deletes a goal and reload
    function deleteGoal(id) {
        API.deleteGoal(id)
            .then(res => loadGoals())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // Handle goal submit and reload
    function handleFormSubmit(event) {
        event.preventDefault();
        var targetDateHours = formObject.targetDate + "T23:55:00.000Z"

        if (formObject.goal) {
            API.saveGoal({
                goal: formObject.goal,
                targetDate: targetDateHours
            })
                .then(() => setFormObject({
                    goal: "",
                    targetDate: ""
                }))
                .then(() => loadGoals())
                .catch(err => console.log(err));
        }
    };

    return (
        <div id="containerGoal">
            <div id="congrats" className="popup hidden">
                <div className="row" >
                    <div className="col s6">&nbsp;&nbsp;<img src="./images/Surata.png" className="popup-image responsive-img"
                        alt="Image of the Surata app's mascot, Little Sister. She has a high brown bun, large green eyes, blushing cheeks and a sweet blue sweater." />
                    </div>
                    <div className="col s6">
                        <h6><br /><br /><br />Congrats! <br />You did it!</h6>
                    </div>
                </div>
            </div>
            <div className="test">
                <div className="container">
                    <Row>
                        <div className="col s-8 parent">
                            <h5 className="goal-quote" >"If you want to be happy, set a goal that commands your thoughts, liberates your energy and inspires your hopes."<br />--Andrew Carnegie</h5>
                            <img src="./images/hand.png" className="goal-image responsive-img" alt="An image of a woman's hands resting on a striped pad of paper on which she has written a list of todos. The photo is composed of black and plum lines striped together to render the image." />
                            <h1 className="goal-child">Set a new goal</h1>
                        </div>
                    </Row>
                    <Row>
                        <div className="col s12">
                            <form>
                                <div className="row" >
                                    <div className="col s12 m12 l6">
                                        <input
                                            onChange={handleInputChange}
                                            name="goal"
                                            placeholder="Enter a new goal"
                                            value={formObject.goal} />
                                    </div>
                                    <div className="col s12 m12 l3">
                                        <input onChange={handleInputChange} type="date" name="targetDate" id="targetDate" value={formObject.targetDate} style={{ width: "100%", margin: "0px 0px", fontSize: ".95rem" }} />
                                    </div>
                                    <div className="col s12 m12 l3">
                                        <button className="waves-effect waves-light btn-small button-gold button-margin"
                                            disabled={!formObject.goal || !formObject.targetDate}
                                            onClick={handleFormSubmit}>
                                            Add&nbsp;Goal</button>                                    </div>
                                </div>
                            </form>
                        </div>
                    </Row>
                    <div className="row">
                        <Tabs goals={goals} loadGoals={loadGoals} deleteGoal={deleteGoal} />
                    </div>

                </div>
            </div>
        </div>
    );
}


export default Goals;