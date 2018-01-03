PorfolioBlog

An experimental application to generate a blog (short messages) and portfolio (proyects each in ejs files) based on Angular+Express with BBDD mongoDB.

This app allow a user to made signup, login, logout, and load a image as user image.

The no logged user can see the porfolio, the list of proyects in  porfolio, and open in another tab the proyect page. Also, the no logged user can read the post list of blog.

The logged user, can see the porfolio, and generate a new proyect with upload of a "global image" for it. Then, the ejs file of proyect must be generated manually in /views/proyects carpet of server. Logged user can generate a new entry for the blog. The main-layout.ejs for proyects ejs have configured bootstrap 4, so it can be used in proyect files.

The app server have three models configured to load in BBDD mongoDB:
-- user model: with username, password, email, and imageURL.
-- post model: with autor (user), title, content, and date.
-- proyect model: with autor (user), title, content, date, and imageURL.

The file referenced by the proyect model, is a ejs (or several of them) manually generated, as said before. And can be open in a tab from the porfolio component, referenced by its title.

Therefore, this experimental structure requires the use of databases, and manual realization of the project files. This is done to assess the capabilities of the application, and the inconveniences of use that may have.
