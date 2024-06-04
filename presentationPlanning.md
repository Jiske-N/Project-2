# Presentation Planning

## Presentation Flow

-   [Brief Team/Taskmaster Introduction](#brief-teamtaskmaster-introduction) Brian 0.5/0.5

-   [Elevator Pitch](#elevator-pitch) Gayle 1/1.5

Demo Starts

-   [Home Page & Navbar](#home-page--navbar) Rasika 1/2.5

-   [Login/Logout and Account Settings](#loginlogout-and-account-settings) Jiske 1/3.5

-   [Board Page](#board-page) Brian 1/4.5

-   [Task Management](#task-management) Gayle 1/5.5

Demo Ends

-   [Concept](#concept) Rasika 1.5/7

-   [Process](#process) Jiske 1.5/8.5

-   [Directions for Future Development](#directions-for-future-development) Brian 1/9.5

-   [Links and Questions](#links-and-questions) Gayle/Everyone 0.5/10

## Brief Team/Taskmaster Introduction

## Elevator Pitch

## Home Page & Navbar

## Login/Logout and Account Settings

On the signup page we have the ability to make a new user account.
Upon signup automatically redirect to the board page.
Once signed in the current user will appear on the top left of the navbar.
Selecting logout will log you out believe it or not. It will also dynamically change the navbar options.
Access to all most other routes will now also redirect you automatically to the login page if you're logged out.
If you then login you will again be redirected to the board page and have access to all features again.
If you navigate to the accounts page you will see there are a number of options allowing the user to change their user details.
There are also checks on most fields for example on the password if you:
enter a new password thats less than 8 characters it will notify the user.
if the two new passwords don't match it will also alert the user and then if the current password is incorrect it will also let the user know.

## Board Page

-   Adding a new list
-   Editing a list name
-   Deleting a list

## Task Management

-   Adding a new task
-   Editing a task
-   Deleting a task
-   Writing a new comment

## Concept

    Description
    Motivation for development
    User story: "As a developer, I want to be able to organise tasks, so I can keep track of what I have done and still needs doing."

## Process

We started out our process by having a look at the trello page and deciding on what functionality we wanted to try and incorporate into our project.
We also used other sites for inspiration on styling and layout such as github for the navbar.
We then discussed how we wanted the relationship between tables to be and came up with an initial idea of how we wanted all the relationships to be structured.
We then decided to break the project into 4 mvp roles or roles within 2 sub sections - the taskboard and the other stuff such as welcome page and user accounts.
We used a random number generator to assign these four initial mvp roles and then moved on from there.

We used a number of technologies, most of them we've covered in class so I won't delve into too much but Argon 2 was what we decided to go with for our new package for the password hashing. It's similar in use to bcyrpt but has slightly different syntax and apparently better security.

Some particular challenges we faced as a group were:
Getting the database seeded on render.
Some issues with merge conflicts.
Using a popup with both handlebars and routing as it they don't want to call on seperate routes.
Dragging and dropping with handlebars.

Some successes of new things we learnt include:

Running checks to compare multiple inputs in order to match different password input fields.
Running a filtered search. That takes in multiple query paramaters. In case anyone is wondering it would have been alot easier to run filters on the front end than the back end but tri stitched us up.
How to run authorization to block access to entire routes without signing in.

## Directions for Future Development

## Links and Questions
