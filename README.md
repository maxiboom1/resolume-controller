# Resolume-controller

## Table of Contents
  1. [Introduction](#introduction)
  2. [Resolume_basics](#Resolume_basics)
  3. [Concepts](#concepts)
  4. [Sources](#Sources)
  

## Introduction
### Simple way to create playlists in resolume
Resolume is a popular VJ (video  mixing && realtime visual performance instrument) software. In tv broadcast, it's usually used to stream videos to many videowalls onset and dynamically change them. In general, Resolume UI in those use cases is very complicated, the scenes are, and operator mistakes may cause videowalls to lose signals, turn to black etc... We prefer not use the native UI to operate Resolume in those scenarios. 

Our goal here is to create an intuitive and simple tool to manage media on different Resolume decks and layers, cue clips and create a complex rundown list (table) to manage the Resolume clips change from one place. Thanks to Resolume v. 7, we have now REST API and it is possible to trigger all those actions.

**[⬆ back to top](#table-of-contents)**

## **Resolume_basics**
### Understanding Decks, columns, layers and clips
Resolume may have unlimited numbers of decks. Each deck is like new instance of program (like new tab in browsers). So, using decks we can manage differend shows and media sets. Each layer can be connected to different output, and generally used to play clips to some screen, or part of screen (window in screen). 

**[⬆ back to top](#table-of-contents)**

## **Concepts**
### Single page, vanilla-js app.
For version 1, it should be single page app, and using fetch/ajax it will send API requests and parse the responses on page.

**[⬆ back to top](#table-of-contents)**

## **Sources**
### Understanding Resolume UI, API
Resolume API reference: https://resolume.com/docs/restapi/

Tutorial Resolume videos: https://resolume.com/training

**[⬆ back to top](#table-of-contents)**
