# Welcome to Fridge Recipes!
Fridge recipes is a modern day fridge-management, recipe-discovery tool to help users save money, minimize food waste, and get inspired in the kitchen. Try it out [here](https://fridgerecipes.herokuapp.com)!


![Landing Page](https://i.ibb.co/XYjVnRC/fr1.png)

This is actually the second version of the app, built with the **MERN** stack. This new version of the app was an oppourtunity to play around with **ReactJS**, while also brushing up on **Mongo, Node, and Express** [Check out the first version of the app here!](https://github.com/JankyCS/fridge-recipes)

## How To Use 
After registering and logging in on the website, users are prompted to a dashboard, where they can add items to their "fridge". These can be any food-items/ingredients found in the user's kitchen - they don't necessarily need to be refrigerated!

Then, a page of recipes is automatically returned to the user, based on the ingredients they already have.

![Edit Fridge Contents](https://i.ibb.co/N9B3q5f/fr2.png)

The recipes are dynamically, and automatically generated as the user's fridge is updated, which helps to streamline the process.

## How It Works/Technologies Used
This project is built with the **MERN** stack. THe frontend is built with **Bootstrap** and **ReactJS**. The **Express** server acts as a backend and uses **Mongoose** to model users for communicating with the **MongoDB database**. 

User passwords are secured/encrypted with **bpcrytJS**, and authentication is facilitated with the **PassportJS** middleware, with the **Javascript Web Token** strategy.

The recipes are obtained with the [Recipe Puppy API](http://www.recipepuppy.com/about/api/)

## License & Copyright

Licensed under the MIT [License](LICENSE)
