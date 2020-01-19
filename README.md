# leasons_learned_by_coding
App that facilitates taking notes for lessons learned while coding.

in order to install the application you need to follow the folloing steps:
1. download the project
2. import the .sql file from the sql folder in a databse server
3. go in back-end folder and run npm install & node db_connection.js (starting back-end)
4. go in gui folder and run npm install & ng serve -o (serving the front-end in browser)

The application ideea is to be able to create users, repositories to specific users and add comments to those repositories.
At the moment the gui only deals with crus operations on User entity.
When finished the app will work as follows:
  - add/ delete/ edit users
  - by clicking on a user you will see all the repos that the user have
  - and by clicking on the repo you will see all the commnets that were registered on that repo.
   - you can add as many comments as you want (line number + comment/text).

