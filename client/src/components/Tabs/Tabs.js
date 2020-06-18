import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import API from "../../utils/API";
import GoalList from "../GoalList"



class Tabs extends Component {
    componentDidMount() {
        M.Tabs.init(this.Tabs);
    }
    render() {
        return (
            <>
                <ul
                    ref={Tabs => {
                        this.Tabs = Tabs;
                    }}
                    id="tabs-swipe-demo"
                    className="tabs"
                >
                    <li className="tab col s3">
                        <a href="#test-swipe-1">Current Goals</a>
                    </li>
                    <li className="tab col s3">
                        <a href="#test-swipe-2">Completed Goals</a>
                    </li>
                </ul>

                <div id="test-swipe-1" className="col s12">
                    {this.props.goals.map(goal => {
                        console.log(this.props.goal)
                        // Count the number of complete tasks
                        var count = goal.Tasks.reduce((accumulator, goalx) => {
                            if (goalx.complete) {
                                return accumulator + 1
                            }
                            else {
                                return accumulator
                            }

                        }, 0)
                        if ((count / goal.Tasks.length) * 100 != 100) {
                            // console.log(this.props.goals.Tasks)
                            return <GoalList goal={goal} tasks={goal.Tasks} key={goal._id} goalId={goal._id} loadGoals={this.props.loadGoals} deleteGoal={this.props.deleteGoal} />
                        }
                    })}
                </div>
                <div id="test-swipe-2" className="col s12">
                    {this.props.goals.map(goal => {
                        console.log(this.props.goal)
                        // Count the number of complete tasks
                        var count = goal.Tasks.reduce((accumulator, goalx) => {
                            if (goalx.complete) {
                                return accumulator + 1
                            }
                            else {
                                return accumulator
                            }

                        }, 0)
                        if ((count / goal.Tasks.length) * 100 === 100) {
                            // console.log(this.props.goals.Tasks)
                            return <GoalList goal={goal} tasks={goal.Tasks} key={goal._id} goalId={goal._id} loadGoals={this.props.loadGoals} deleteGoal={this.props.deleteGoal} />
                        }
                    })}
                </div>
            </>
        );
    }
}

export default Tabs;