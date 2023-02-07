# Our Activity
---
## instructions
Our Activity is for social
Its main function is Launch event
## Installation and operation requirements
*** Operating conditions ***
registered
## development environment
Operating system: Windows 10
Programming language: HTML
Development tools: IDEA, Navi cat, Git
Project build: Maven 3.3.9
Server: Tomcat 8.5
Databases: MySQL, Redis
Code hosting platform: GitHub 4. Our Activity Operation instructions
(The address of operation manual is introduced here)
## code structure description
├── Readme.md                   // help
├── app                         // Application
├── config                      // configuration
│   ├──default.json
│   ├── dev.json
│   ├── experiment.json
│   ├── index.js
│   ├── local.json
│   ├── production.json
│   └── test.json
├── CSS
│   ├── home.css
│   ├── sign_in.css
├── html
│   ├── home.html
│   ├── sign_in.html
├── images
│   ├── 1.jpg
│   ├── background.jpg
│   ├── stars.jpg
├── JavaScript
│   ├── home.js
│   ├── sign_in.js


## Project contact
---
### HOMEPAGE
（The central area of the home page displays a list of user events, including the time when the event occurred, the name of the event, and a button called view details. Click this button to view the details of the event. The newly created event is placed in the two boxes on the right side of the home page so that users can understand the newly created event. The navigation bar is located on the left side of the home page. The navigation bar contains "home", "user information", "calendar", "search activity", "delete activity", "search person", "delete person" and "create administrator". Ordinary users can only view the home page, user information, calendar and query activities. On the contrary, in addition to all the contents that ordinary users can see, administrators can also see delete activity, query personnel, delete personnel, and new administrator signature. These contents will be presented in the form of icons. When the user places the mouse over an icon, a text description of the icon is displayed.）

The main buttons and available functions in the navigation bar on the left of the home page
***（Ordinary users:）***
1. User Information     //Click this button, there will be a pop-up box, which will display your personal information, including user name, email and password. At the same time, there are two buttons "modify" and "finish" in the box. Click "modify" to change their user name, email or password. Click "finish" and the changed data will be saved.

2.	Home     // Click the button to go directly to the home page, and it will help the user to clear all pop-ups, and then jump to the home page.

3.	Calendar     // Enter the calendar page to view the activities that have been successfully reserved. Google calendar will remind the activity. If the activity conflicts, the creation will fail.

4. Query Activity   //This button queries the list of all activities in progress on the current site. This button is mainly used to facilitate users to quickly query activities.

5. User event list     // This includes the time the event was held, the name of the event, and a button called view details.

***（Administrators:）***
6. Delete Activity   //Button used by the administrator to delete an activity. If some activities are too dangerous or do not comply with regulations, the administrator can delete them.

7.	Query People   //The key used by the administrator to query the user. Click the button to query the number of users and the specific information of users.

8.	Delete People   // The button that the administrator can delet the user who violate regulations.

9.	Sign New Admin   //This is the page for registering administrators. Administrator code is required. Note that only administrators can display the "sign new admin" button.

---

### SIGN UP PAGE
***（This page is used to register new users and log in old users）***

1.  Sign in & Sign up   //These two buttons are taken as a whole. When you click the "sign in" button, the registration interface will be hidden. After clicking the "register" button, the login interface will be hidden.

2.	Sign New Admin   //This is the page for registering administrators. Administrator code is required. Note that only administrators can display the "sign new admin" button.






