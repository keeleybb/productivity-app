import React from 'react'
import { Col, Row } from "../Grid";
import Collapsible from "../collapsible/collapsible"
import moment from "moment"


export default function GoalList(props) {
    //How many Days til the Goal is Due
    function daysLeft(targetDate) {
        var currentDate = moment();
        var goalDate = moment(targetDate)
        // console.log("number of days: ", goalDate.diff(currentDate, "days", true));
        //return the right message for days left
        if (moment(targetDate).format("MMM Do YY") === moment().format("MMM Do YY")) {
            return "Due Today"
        } else if (goalDate.diff(currentDate, "days", true) > 0) {
            // return parseFloat(goalDate.diff(currentDate, "days", true)) + " days"
            // return parseFloat(goalDate.diff(currentDate, "days", true)) + " days"
            return Math.round(parseFloat(goalDate.diff(currentDate, "days", true))) + " days"
            // return parseInt(goalDate.diff(currentDate, "days", true)) + " days"
        } else {
            return "Past Due"
        }
    }

    //Element
    var element = document.getElementById("congrats");

    function percentage(tasks) {

        //Count the number of complete tasks
        var count = tasks.reduce((accumulator, goal) => {
            if (goal.complete) {
                return accumulator + 1
            }
            else {
                return accumulator
            }

        }, 0)

        //Variables for Function Dates
        var date = new Date();
        var completeTimes = new Date(props.goal.completeTime)
        var FIVE_SEC = 5000;
        var percent = (count / tasks.length) * 100;

        //Return Percent, If 100% and within 5 seconds of completion time ==congrats
        if (tasks.length === 0) {
            return 0 + "%"
        } else if ((count / tasks.length) * 100 === 100 && (date - completeTimes) <= FIVE_SEC) {
            console.log("Goal is 100%:  ", percent)
            setTimeout(function () {
                element.classList.remove("hidden");
            }, 500);
            setTimeout(function () {
                element.classList.add("hidden");
            }, 4000);
            return parseInt(percent) + "%"
        }
        else {
            return parseInt(percent) + "%"
        }

    }
    return (
        <Col size="sm-12 l-12">
            <Row>
                <div className="goal-list">
                    <h5 style={{ paddingLeft: "5px" }}><b>Goal: {props.goal.goal}</b> <button className="btn btn-primary button-gold" onClick={() => props.deleteGoal(props.goalId)}><i className="material-icons">delete</i></button></h5>
                    <span style={{ margin: "0px", padding: "0px 5px" }}>Due in: {daysLeft(props.goal.targetDate)}</span>
                    <br />
                    <span style={{ margin: "0px", padding: "0px  5px" }}>Click the progress bar to add tasks</span>
                    <Collapsible key={props.goal._id} percent={props.goal.percentage} percentage={percentage} tasks={props.tasks} goalId={props.goalId} loadGoals={props.loadGoals} formObject={props.formObject} handleTaskFormSubmit={props.handleTaskFormSubmit} handleInputChange={props.handleInputChange} />
                </div >
            </Row>
        </Col>
    )
}
