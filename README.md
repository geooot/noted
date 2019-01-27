# noted

<img src="https://s3.amazonaws.com/sharkplayers/NotedLoad.JPG?key=value" alt="drawing" width="250"/>

## Inspiration
When I open my photo gallery on my phone, I am shocked to find how many pictures are just of powerpoint screens and homework assignments. Usually the thought process is that taking the picture will be useful to me in the future when I need it, but in reality it just takes space and makes it harder to find real meaningful pictures. 

The idea was to create an app that was a camera specifically for class notes and reminders. With organizers features such as course based tags and Google OCR allowing for the potential of robust search capability, Noted ends up being a great way to keep your gallery clean while being the best camera app for the use case.

## What it does
The app is very minimalistic. All you have to do is select what class you want to focus on and take a picture of notes or PowerPoint presentation. The app will immediately categorize and store the image for you and transcribe the text found on the picture.

## How we built it
We used react-native (specifically Expo) to create both an Android and iOS app. This allowed all members of the team to contribute code without having a compiler or the same OS. To share code: we used Github (and attempted good branching practices).

## Challenges we ran into
From the get go, We had to spend an immense amount of time trying to get the project set up and working for everyone. Most of us are pretty new to react-native so things like build errors, merge conflicts, and lock files gave us pretty huge headaches. 

## Accomplishments that we're proud of
- Using Github to organize code
- Using Google Cloud APIs
- Making a freaking app

## What we learned
- Some git fundamentals
- The ups and downs while working with react-native
- How to deal with terrible error messages

## What's next for Noted
There is still a lot of potential ideas that can be added to this app. Here is a few:
- Import events from the calendar to create tags
- Use timing of courses (what time of day, etc) to predict what tag the picture would belong to from before hand
- Using the keywords coming from text analysis to allow for search for text in pictures
- Importing from existing photo gallery to find older pictures of notes and categorize them into the correct tags

## Clone and get up and running

What you need first
- Install Node.JS https://nodejs.org/en/
- Yarn.JS https://yarnpkg.com/en/docs/install
- Some terminal knowlege

Installation
Clone the repo (or use Github Desktop)
```
$ git clone https://github.com/geooot/noted.git
```
Use a terminal and cd into the project folder
```
$ cd noted
```
Use yarn to install stuff
```
$ yarn install
```
Run tha app yo!
```
$ yarn start
```

## Built With

* [React Native](https://facebook.github.io/react-native/) - Web Framework
* [Expo](https://expo.io/) - Testing Toolkit
* [Google Vision API](https://cloud.google.com/vision/) - Text Detection in Images

## Authors
* **George Thayamkery** - [geooot](https://github.com/geooot)
* **Ansh Jain** - [Gamebot3](https://github.com/Gamebot3)
* **Annie Paul** - [Anniep999](https://github.com/Anniep999)
* **Justin Liu** - [justinliu403](https://github.com/justinliu403)
* **Piyush Mewada** - [piyushmewada](https://github.com/piyushmewada)

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on our code of conduct.

## License

This project is licensed under the MIT license - see the [License.md](License.md) file for details


