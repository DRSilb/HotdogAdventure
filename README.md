# Hotdog Adventure

A fun, fast-paced 2D platformer game built with the [Phaser 3](https://phaser.io/) game framework. Take control of a heroic hotdog on a quest through multiple levels, collecting condiments and dodging dangerous kitchen utensils!

This was made as a practice of phaser and javascript as well as cause I was bored.

Play it here:
https://drsilb.github.io/HotdogAdventure/

Hotdog Adventure Gameplay

<img width="20%" height="20%" alt="image" src="https://github.com/user-attachments/assets/5d09b345-597d-4f0b-8e11-0ca6477b7d33" />


## How to Play

The goal of the game is to navigate through each level, collect all the condiments, and reach the exit door to advance to the next stage.

### Controls

- **Desktop:**
  - **A / Left Arrow:** Move Left
  - **D / Right Arrow:** Move Right
  - **W / Up Arrow / Spacebar:** Jump
- **Mobile:**
  - On-screen touch controls are provided for moving left, right, and jumping.

### Characters

Choose from a selection of hotdogs, each with its own unique look:
- Classic Dog
- Cheesy Dog
- Spicy Dog

## How to Run Locally

To play Hotdog Adventure, you need to run it from a local web server. Modern web browsers have security policies that prevent loading game assets directly from the local file system.

1.  **Clone or download this repository.**

2.  **Navigate to the project directory** in your terminal:
    ```bash
    cd path/to/HotdogAdventure
    ```

3.  **Start a simple local web server.** If you have Python installed, you can use its built-in HTTP server.

    - For **Python 3**:
      ```bash
      python -m http.server
      ```
    - For **Python 2**:
      ```bash
      python -m SimpleHTTPServer
      ```
    If you have Node.js installed, you can use the `serve` package:
    ```bash
    npx serve
    ```

4.  **Open your web browser** and go to the address provided by the server (usually `http://localhost:8000` or `http://localhost:3000`).

The game will start automatically.

## Project Structure

```
.
├── assets/         # All game images and sounds
│   ├── images/
│   └── sounds/
├── js/             # JavaScript source code
│   ├── scenes/     # Individual game scenes (e.g., Title, Levels)
│   ├── game.js     # Main Phaser game configuration and entry point
│   └── ...
├── index.html      # The main HTML file that runs the game
└── README.md       # This file
```

## Credits

- **Game Development:** Based on the project structure
- **Framework:** Phaser 3
