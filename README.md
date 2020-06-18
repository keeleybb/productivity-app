# Surată: Productivity Application for the Modern Human

## Links

[Presentation](https://docs.google.com/presentation/d/1SRm1DprYY_IBzjO_Dwj-uU3qPn8UIAE-iWoOJM_YxVY/edit?ts=5e9e4b57#slide=id.g83dacafeb9_0_44)

[Heroku](https://surata-goals.herokuapp.com)

## Description of app and process

  * As a busy person trying to keep track of my personal and professional progress, I want to be able to track my goals and the tasks neccessary to achieve them. I also want to make sure I take time to recenter through meditation so that I am better prepared to reach my goals stress free.

The user is able to: 

  * Add goals and individiual tasks. User is able to remove tasks and goals, or mark them as complete which triggers the progress bar to fill. At 100% completion they are congratulated with a pop up.

  * Visualize goals and tasks via a calendar.

  * Use a timer to use the Pomodoro Technique to complete their tasks and breaks.

  * Take a moment for themselves to reset by listening to a relaxing soundtrack while breathing in time with an onscreen animation.

## Technologies Used

  * Mongoose Database and Passport Authentication

  We used a Mongo/Mongoose database with authentication to allow each user to save their own goals and have them tied to their user information.

  * React Calendar 

  React-Big-Calendar allowed us to build our own calendar and customize it to make sure the user gets their tasks from their own list and be able to visually schedule them for planning. It allows monthly, weekly and daily views

  * GreenSock

  This set of plugins and tools allows for simple creation of animated objects. Modifying a div to display as a circle we were able to use TimelineMax and Power0
  to animate it as a breathing focus point on the page. TimelineMax allowed us to "yoyo" the div in and out at the desired rate. Power0 assists with the timing for each step of the movement.

  * React-Sound

  The React-Sound NPM contains an awesome Sound component that allows you to easily build the ability to play and control sound clips in your code. "Dunes" is provided with a Public Domain license at [Andrewkn's freesound link](https://freesound.org/people/Andrewkn/sounds/447511/). "Throat Singing" is provided with an Attribution License from [Metzik's freesound link](https://freesound.org/people/Metzik/sounds/244155/); it has been modified into a .mp3 file. "Quartz Crystal Singing Bowls" is provided with Attribution License from [juskiddink's freesound link](https://freesound.org/people/juskiddink/sounds/129219/); it has been modified into a .mp3 file. 

![Demo of Surata Productivity Web App](/client/public/images/surata.gif)

## My Goals

Users can enter goals and due dates, then break their goals down into tasks. View your progress with a progress bar and countdown to due date. When you complete a goal, get some much needed positive reinforcement with a popup congrats.

## My Plan

A Calendar page where all your tasks are sorted by their due date. You can drag and drop tasks and even make them shorter or longer.

## My Time

A Pomodoro timer where users can set up their 25 minutes of productiveness and track their progress, take breaks and keep on the productivity.

## My Soul

Use this page to take a moment for yourself. After choosing a track to meditate to and hitting play, the description will fade away allowing you to focus on the breathing bubble and music alone. Once you're done and hit stop the instructions slowly fade back into view. 

