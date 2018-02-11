# Hurricane Cousteau

This work was produced as part of the Hack the Deep Hackathon at the American Museum of Natural History, on February 9th to 11th 2018.

## The Problem

As part of the Hackathon, we decided to work on the [Eye of Maria Challenge](https://github.com/amnh/HackTheDeep/wiki/The-Eye-of-Maria).

Hurricanes are powerful forces of disruptions in the oceans, and Maria in particular caused a lot of damage on land. However, its impact on the ocean has not been studied yet.
Using drifter and floater data from NOAA, how can we visualize the way the path of Hurricane Maria affected the oceans and its currents?

## The Solution

### Approach

Using the data from the storm and the drifters, we aimed to first visulaize and then recreate through an algorithm the hurricane's physics through Phaser.js, a browser-optimized game engine. Phaser provided us with a platform that was easy to customize for our needs, but also with powerful logic built in that we could leverage. Embedding the canvas into a webpage made it easy for us to then deploy our work online and allow anyone to access it.

### Challenges

As we worked on this project, we ran into several challenges.

#### The Data
The Data had to be turned into a format and structure that could be used by the game engine. To do this, we wrote several data parsing algorithms. We started with simple text files, and finished with arrays of data, organized by drifter id, and analyzed to remove or average duplicate data. This was difficult work but getting this part right allowed us to move very fast with the vizualization steps in Phaser.

#### Recreating Hurricane Physics

### Our Results


## Thank you!

We had a great time working on this project. Thank you very much to the American Museum of Natural History for hosting us for three days and allowing us this opportunity to code in such a unique environment. We all learned a lot about the scientific breakthroughs taking place here, and we are grateful to have been given the chance to help the scientists in their research. We look forward to coming back next year.

### The Team

* [Jannine Chan](https://github.com/jn9cn)
* [Doris Cheng](https://github.com/dorcheng)
* [David Ko](https://github.com/daveyko)
* [Elisabeth Seite](https://github.com/eseite47)
* [Jackson Sui](https://github.com/Kiro705)