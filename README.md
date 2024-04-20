# Wemoo
## Location-Based Group Chat with Mini Games and Leaderboard

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Setup](#setup)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction
Welcome to our project! We've developed a location-based group chat application that not only allows users to interact with each other in real-time but also includes mini-games and a leaderboard to enhance user engagement and foster a sense of community.
![Designer](https://github.com/trevorlietch/Software-Engineering-Spring-2024/assets/92610400/9dde60cf-0d1e-4cc5-b866-99910cba462c)

## Features
- **Location-Based Group Chat**: Users can join chat rooms that are specific to their geographical location, fostering local communities.
- **Real-Time Interaction**: Leveraging the power of Socket.IO, our application offers seamless real-time interaction among users.
- **Mini Games**: To add a fun element, users can engage in various mini-games within the chat room.
- **Leaderboard**: To fuel a healthy competitive spirit, a leaderboard tracks the scores of the mini games.

## Technologies
- Node.js v14.17.0
- Socket.IO v4.1.3
- HTML5/CSS3
- JavaScript ES6

## Setup
To get this project up and running, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/trevorlietch/Software-Engineering-Spring-2024/`
2. Navigate into the repository using Command Prompt or PowerShell.
3. Install the project's dependencies as described below.
4. Navigate to the `Socket_files` Directory
5. Start the server using `node index.js`.
6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Installing Dependencies

### For Windows:
#### Installing Node.js v14.17.0:
1. Visit the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/).
2. Download the Windows Installer (.msi) for Node.js v14.17.0.
3. Double-click the downloaded installer to launch it.
4. Follow the prompts in the Node.js Setup Wizard to complete the installation.
5. After installation, open Command Prompt or PowerShell and type `node -v` to verify that Node.js has been installed successfully.

#### Installing Socket.IO v4.1.3:
1. Once Node.js is installed, open Command Prompt or PowerShell.
2. Type the following command and press Enter to install Socket.IO globally:
   ```
   npm install -g socket.io@4.1.3
   ```

### For macOS and Linux:
#### Installing Node.js v14.17.0:
1. Open Terminal.
2. Use a package manager like Homebrew (for macOS) or APT (for Linux) to install Node.js. For example, for macOS with Homebrew, you can use:
   ```
   brew install node@14
   ```
   For Linux with APT, you can use:
   ```
   sudo apt install nodejs npm
   ```
3. After installation, type `node -v` in Terminal to verify that Node.js has been installed successfully.

#### Installing Socket.IO v4.1.3:
1. Once Node.js is installed, open Terminal.
2. Type the following command and press Enter to install Socket.IO locally within your project:
   ```
   npm install socket.io@4.1.3
   ```

## Usage
Once you've set up the project, you can join a chat room based on your location. Engage in conversations with other users in the same room, participate in mini-games, and watch as your scores get updated on the leaderboard. Visit [wemoo.lol](http://wemoo.lol) to access the website.

## License
This project is licensed under the MIT License. For more details, please see the **LICENSE** file.
