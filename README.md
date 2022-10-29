# Resolume-controller

## Table of Contents
  1. [Introduction](#introduction)
  2. [Resolume_basics](#Resolume_basics)
  3. [Aplication_characterize](#Aplication_characterize)
  4. [Sources](#Sources)
  

## Introduction
### Simple way to create playlists in resolume
Resolume is a popular VJ (video  mixing && realtime visual performance instrument) software. In TV broadcast, it's usually used to stream videos to video walls on set, and dynamically change them. In general, Resolume UI in those use cases is complicated, operations like mounting new media clips are risky, and operator mistakes may cause video walls to lose signals, turn to black etc... We prefer not use the native UI to operate Resolume in those scenarios. 

Our goal here is to create an intuitive and simple tool to manage media on different Resolume decks and layers, cue clips and create a complex rundown list (table) to manage the Resolume clips change from one place. Thanks to Resolume v. 7, we have now REST API and it is possible to trigger all those actions.

**[⬆ back to top](#table-of-contents)**

## Resolume_basics
### Understanding Decks, columns, layers and clips
Resolume can have unlimited numbers of decks. Each deck is like new instance of program (like new tab in browsers). So, using decks we can manage differend shows and media sets. Each layer can be connected to different output, and generally used to play clips to some screen, or part of screen (window in screen). 

**[⬆ back to top](#table-of-contents)**

## Aplication_characterize
### Detail design

First, lets characterize the app features:
1. The user will be able to select resolume deck - the select list will be synced with Resolume decks. Select event will change decks in Resolume.
2. The user will be able to choose preset from preset list - each preset represent Resolume layer.
3. The user will be able to set name to the playlist item.
4. The user will be able to choose media item.
5. When the user click "Add" (submit) button, the preset, item name, media will be added to playlist. Also, "Add" action will cue the media on precofigured range of clip slots, say 3-20 - that means the app will manage those media slots to positioning clips automatically. 
6. Each lineup item can be removed - it also uncue media in Resolume.
7. The app will have playlist control interface - GOTO START, PLAY, PREV, NEXT, REMOVE. 
8. The playlist will select whole list row on click. On double-click it will play the item.
9. Resolume API provide URL with media thumbnail to each cued clip - so it could be nice to include this thumbnail for each playlist item.
10. Resolume have limitation - you cannot edit not active deck - so we need to handle case that deck has been changed from resolume UI - in that case we need to notice warning msg in our app.
11. Use local storage, so if user reloads the page, the playlist he built is still available.

### Extra features:
1. Preconfigured presets
2. Integration with newsroom production systems - Avid Inews, Ross Inception, Octopus.
3. Config page - with Resolume addres field, clip range setting, media folder URL, new template create etc...
4. View the files in media folder as tree (without selecting files from "choose file" html form element). P 
5. Do the same app with node.js/react.

For version 1, I will create single page app, 
and using fetch/ajax it will send API requests and parse the responses on page.
We got three main methods in API - GET, PUT, POST.
 

**[⬆ back to top](#table-of-contents)**

## Sources
### Understanding Resolume UI, API
Resolume API reference: https://resolume.com/docs/restapi/

Tutorial Resolume videos: https://resolume.com/training

**[⬆ back to top](#table-of-contents)**
