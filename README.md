WeeksMenu - When you can't figure out what to cook
============

Weeksmenu was created to help me on those times when I couldn't figure out what to cook. After entering recipes to the database, this website allows the user to 
choose for how many days they would like to create a menu and then the program randomly selects recipes for that many days.

The user can then remove suggestions, change them randomly as many times as they would like, or choose a specific recipe from the database.

When a menu has been saved, the user can then get a shopping list which combines ingredients required from all of the recipes in the menu.

Frontend was created using React, using Material-UI for design and Framer Motion for animations. Backend is running Node.js with Express, using MongoDB.

## Features
- Ability to add new recipes to database by copying and pasting
- Allows selecting how many days to create a menu for
- Added recipes can also be viewed through the site
- Menu's recipes can be reselected by selecting another random recipe or by selecting a specific recipe
- From the menu's created, a shopping list including all the items required can be created and printed as a pdf

## To-do
- Mobile interface could be improved for smaller screens
- Copy pasting recipes into database currently not super user-friendly.
- Shopping list creation doesn't handle ingredients named similarly as the same. 
- Bug fixes

Menu Creation
![Menu Creation](https://i.imgur.com/SgxLgQE.jpg)

Shopping List Creation
![Shopping List Creation](https://i.imgur.com/4uVb1tV.jpg)



Live demo available at https://weeks-menu.herokuapp.com/ using example data fetched from Mongo's cloud database. 

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm start` to start the application. You will then be able to access it at localhost:3000

If you want to run the project from your computer, you need to run the backend at the same time as the front end using a port of your choice. The default port address is localhost:5000

---
