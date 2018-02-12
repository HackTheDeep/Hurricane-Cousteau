# Hurricane Cousteau

This work was produced as part of the Hack the Deep Hackathon at the American Museum of Natural History, on February 9th to 11th 2018.

Check out our [deployed work](https://hurricane-cousteau.herokuapp.com).

## The Problem

As part of the Hackathon, we decided to work on the [Eye of Maria Challenge](https://github.com/amnh/HackTheDeep/wiki/The-Eye-of-Maria), a challenge presented to us by [David Lindo-Atichati](http://www.lindolab.com/), a professor in the Department of Engineering and Physics at CUNY College of Staten Island and at the Doctoral Program in Earth and Environmental Sciences at CUNY Graduate Center.

Hurricanes are powerful disruptive forces, and Maria in particular caused a lot of damage on land. However, its impact on the ocean has not been studied yet.
Using drifter and floater data from NOAA and Professor Lindo-Atichati, how can we visualize the way the path of Hurricane Maria affected the oceans and its currents?

## The Solution

### Approach

Using the data from the storm and the drifters, we aimed to first visulaize and then recreate through an algorithm the hurricane's physics through Phaser.js, a browser-optimized game library with its own built-in physics engine. Phaser provided us with a platform that was easy to customize for our needs, but also with powerful logic built in that we could leverage. Embedding the canvas into a webpage made it easy for us to then deploy our work online and allow anyone to access it.

### Challenges

As we worked on this project, we ran into several interesting challenges.

#### The Data
The data had to be turned into a format and structure that could be used by the game engine. To do this, we wrote several data parsing algorithms. We started with simple text files, and finished with arrays of data, organized by drifter id, and analyzed to remove or average duplicate data. This was difficult work, but getting this part right allowed us to move very fast with the vizualization steps in Phaser.

#### Recreating Hurricane Physics

We are currently working on a data set to train a machine learning algorithm, to predict the movement of future drifters based on this data set. However, this requires a lot of data cleaning, and we are eager to see how much we can achieve. 

### Our Results

![Hurricane Simulator](https://im5.ezgif.com/tmp/ezgif-5-956f5a66cb.gif)

After 24 hours of hard work in the Hall of Ocean Life at the American Museum of Natural History, we were able to deploy the Phaser visualization of the data provided to us as part of this hackathon. We are also close to being done producing a set of testing data to move on to the second part of our project, which was to predict the movement of the water. Once that is done, we plan on leveraging Phaser and its ability to take in user input to make this application interactive, for both scientists and students. We look forward to continuing our work.

## Thank you!

We had a great time working on this project. Thank you very much to the American Museum of Natural History for hosting us for three days and allowing us this opportunity to code in such a unique environment. We all learned a lot about the scientific breakthroughs taking place here, and we are grateful to have been given the chance to help the scientists in their research. We look forward to coming back next year.

### The Team

* [Jannine Chan](https://github.com/jn9cn)
* [Doris Cheng](https://github.com/dorcheng)
* [David Ko](https://github.com/daveyko)
* [Elisabeth Seite](https://github.com/eseite47)
* [Jackson Sui](https://github.com/Kiro705)