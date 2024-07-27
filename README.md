# **PokeBattle**

A toptrumps like webapp created for the second milestrone projects for Code Institues full stack developer course. 

[The deployed website can be found here.](https://monkphin.github.io/PokeBattle/)

//Insert mockups

# Contents 

- [User Experience](#user-experience)

  - [Site Owner Goals](#siteowner-club-goals)
  - [A Visitors Goals](#visitor-goals)

- [User Stories](#user-stories)

  - [Club Visitor](#site-visitor)
  - [Mobile User](#mobile-user)
  - [Club Owner](#site-owner)

- [Design](#design)

  - [Wireframes](#wireframes)
  - [Colour Palette](#colour-palette)
  - [Typography](#typography)
  - [Images](#images)
  - [Icons](#icons)

- [Features](#features)

  - [Header](#header)
  - [Footer](#footer)
  - [Index Page](#Index-page)
  - [Game Page](#game-page)
  - [404 Page](#404-page)
  - [Future Features](#future-features)

- [Bugs and Issues](#bugs-and-issues)

  - [Index Page](#index-page)

- [Technology](#technology)

  - [Languages](#languages)
  - [Frameworks and Programs](#frameworks-and-programs)

- [Testing](#testing-and-validation)

  - [HTML Validation](#html-validation)
  - [CSS Validation](#css-validation)
  - [Javascript Validation](#javascript-validation)
  - [Accessibility](#accessibility)
  - [User Testing](#user-testing)
  - [User Stories](#user-story-testing)
  - [Performance](#performance)
  - [Device and Browser Testing](#device-and-browser-testing)
  - [Responsiveness](#responsiveness)


- [Version Control and Deployment](#version-control-and-deployment)
  - [Repository Creation](#repo-creation)
  - [Cloning Locally](#cloning-locally)
  - [Version Control](#version-control)
    - [CLI](#CLI)
    - [GitHub Website](#github-website)
  - [Branching](#branching)
  - [Deployment](#deployment)

- [Credits](#credits)

# User Experience

PokeBattle is an online toptrumps like game created to allow fans of the Pokemon series and TopTrumps games to have a single player game that can be played online. Due to the nature of the game and the IP, the site needs to be relatively simplistic in its display as well as using a bright, simple colour pallette. 

# Design
The design needed to be realtively simplistic, reflecting the nature of the game and IP in use. Ideally with minimal moving content, with the pertinent data, such as cards, output etc all being visible on a single screen. This meant using CSS query selectors to allow for the cards to be displayed side by side when shifting resolutions. Since on smaller screens any other card positioning would result in some data being pushed off the bottom. Overall the design has been kept deliberartely clean and simple in order to not distract from the main content. With areas of note being called out in bounding boxes that sit above the background. Initial testing was done with drop shadows on these elements and the cards. However it was deccided that the shaows detracted from the overall clean look and could lead to potential distraction due to the UI being a little too busy. 

## Wireframes:

Wireframes were created with Balsamiq software to provide rough mockups for layout.

<details>
<summary>Index page</summary>
<img src="docs/desktop=indexpage.png">
<img src="docs/mobile-indexpage.png">
</details>

<details>
<summary>Game</summary>
<img src="docs/desktop-gamehtml.png">
<img src="docs/mobile-gamehtml.png">
</details>

<details>
<summary>404</summary>
<img src="docs/desktop-404.png">
<img src="docs/mobile-404.png">

</details>

## Colour Palette.

The colours selected were chosen to be inline with the bright, bold colours in use by the Pokemon IP, keeping things relatively simple but allowing all the elements to clearly standout and be viewable, as well as text to be legible. 

After some experimentation I settled on a simple range of colours between blue and white, since these seemed to be most pleasent without providing too much conflict with the varying colours of the cards. 

## Typography.

The font was picked due to being somewhat reflective of the Pokemon IP's font, while also remaining clear to read at varying font sizes and weights. 
Based on the simple appearance of the cards and IP as a whole I elected to stick to a single font to ensure this simplicity was reflected throughout. 

## Images
Images were sourced from a few locations - the pokemon themselves were from PokemonDB, the logos from a PokemonGo fan site, the cards from a Pokemon card making website. Credits for these will be provided at the end of the readme. 

## Icons

Icons were provided by [FontAwesome](https://fontawsome.com)

# Features

The website consists of 3 pages:
- Index page
- game page
- 404 page

The game page is normally only accessible via the 'play game' button, once the player has entered their name into the text field. If the player tries to bypass entering their name an alert is generated advising them to enter their name. The custom 404 page is present in case a visitor somehow manages to access a nonexistent part of the website and offers methods to get back to the index page. 

## Logo
The header exists predominantly to show the sites logo. However it is clickable and will return the player back to the index page should they feel the need to navigate away from the game page while remaining on the website. It has two differently sized images to allow for better rendering on devices of differing capabilities. The appropriate image is picked by a javascript function, which calls on a helper function to determine the size of the window, allowing the appropriate image to be selected. 

## Hero Image
The hero image is displayed on the index page only. Ot provides a picture of two pokemon trainers about to battle, helping to give a sense of what is to come to the visitor where the game will see you face off against a computer controlled opponent. Its fully responsive and will adjust to meet the dimensions of the screen that is being used to browse the website. 


## Instructions
These are provided to ensure that players know the basics of how the game will function. Advising on how the game round should flow, what the objective of the turn and game is, as well as how many cards the two players have. This also presents an opportunity for the player to enter their name, which is called on at the end of hte game to congratulate or commiserate with the with player. Like other aspects of the site this is fully responsive and will react to varying screen resolutions, adjusting as needed. 

## Footer
The footer provides links to the the site owners socials, in this case Facebook, Github, twitter and LinkedIn. 

## Index page

## Game Page

## 404 Page

## Future Features

# Bugs and issues.
Had to refactor HTML due to initially using a mix of flexbox and bootstrap to try to achieve the layout I was aiming for, this was causing significant issues with rendering which were proving too complex to fix, so decided to simplify things and shifted to using plain CSS for the index page. 

Need to add a slight pause before allowing player to interact with their cards again after the opponent players turn. While this isn't causing a specific issue I can see, it does mean that the player can, via spamming the card buttons leave themselves unaware of the outcome of the opponent turn. Have tried to do this in a few places but have never been able to get it to work. 

Have seen a slight issue with the response for a victory condition clearing faster than expected after the player scores a draw. I have thus far been unable to identify the cause of this. 

Tabbed navigation will sometimes allow the spamming of stat option presses in some situations, causing functions to be triggered before they're supposed to be (Ie before the end of the current turn) This is rare and isn't easily replicable sadly so I have been unable to identify the root cause. 

# Technology.

## Languages

THe site is built with HTML, CSS and Javascript. It also calls on external CSS and Javascript from Bootstrap and FontAWesome, which are used to assist with layout, using bootstraps grid system and icons from FontAwesome. Much of the content on the game page is generated dynamically by the Javascript, while the index page and 404 are mostly built with static HTML, since they needed very little interactivity. 

## Frameworks and Programs. 

- Bootstrap 5.3.3

  - Used for layout and positioning.

- W3Schools

  - Used for help with CSS and Javascript.

- Git

  - Used for version control, storage and deployment.

- GoogleFonts

  - Used to import fonts to the stylesheet.

- VSCode

  - IDE of choice.

- Balsamiq

  - Wireframing program.

- WAVE

  - Used to assist with accessibility checks.

- Techsini

  - Mockup generator.

- Google Dev Tools

  - Used to help with troubleshooting.

- Pixelmator

  - Users for editing and resizing images. 

- Favicon.io

  - Used to generate a Favicon.

- Prettier

  - Used to format files  

# Testing and Validation

## HTML Validation  

[W3Schools HTML Validator](https://validator.w3.org/)
All pages passed with 0 errors. 

<details>
<summary>Index page</summary>
<img src="docs/index-html.png">
</details>

<details>
<summary>Game page</summary>
<img src="docs/game-html.png">
</details>

<details>
<summary>404 page</summary>
<img src="docs/404-html.png">
</details>

## CSS Validation

[W3Schools CSS Validator](https://jigsaw.w3.org/css-validator/)
Some errors were present when checking the game.html. This is due to falling back on Bootstraps grid system to assist in layout and positioning for the cards and some items on the webpage. I am slowly refactoring the site to move away from using Bootstrap, however due to the volume of elements on the game page, this page still uses Bootstrap. 

<details>
<summary>Full site CSS</summary>
<img src="docs/site-css.png">
</details>


## Accessibility

[WAVE](https://wave.webaim.org) was used to check to ensure the site conforms to accessibility standards. 

Issue #1: All pages initially showed an issue where wave testing was detecting the footer links as a possible heading. 
Reason: Footer links were originally created within a single P element with a large font size. Causing Wave to mistake them for a header.
Fix: Moved footer elements into an unordered list and amended CSS to ensure these were displayed horizontally. 

Issue #2: Headings were not conforming to standards
Reason: No page had a single H1 tag present, H2 and H3 tags were used heavily however. 
Fix: Amended how text was rendered and adjusted how headings were used to ensure that these conform to web standards. 

Issue #3: Stats were not initially selectable via tabbing 
Fix: Amended the javascript file to give stats the tabindex of 1 to ensure these were tabbable

Issue #4: While elements were tabbable, these were not usable via keyboard input
Fix: Added a key event using the enter key, so pressing this could action the selected stat. 

<details>
<summary>Index page</summary>
<img src="docs/index-wave.png">
</details>

<details>
<summary>Game Page</summary>
<img src="docs/game-wave.png">
</details>

<details>
<summary>404 Page</summary>
<img src="docs/404-wave.png">
</details>


## User Testing

I reached out to several friends to help assess the colour choices, layouts, usability and readability of the site. 
Comments included that the colours were calming and that after some adjustments had been made to the messages displayed between turns, it was easier to read and understand what was happening. 

Testing and discussions with my mentor also highlighted a few issues with the Javascript which would allow players to queue multiple inputs to the game logic, leading to the game seemingly playing on its own with the player having no idea what was happening. 
Effectively, the stats would allow multiple clicks, which the game queued and processed as though the user had been interacting with the game in the expected manner, where they take a turn and wait for events to occur. This was resolved by adding a new function
that was called at the end of each turn, where the game would check for a boolean being true or not when true this would set CSS to prevent player input as well as adjusting the tabIndex to -1 to prevent keyboard interactivity. 

Beyond this, I also manually tested the site, running through multiple games and testing all aspects of functionality, from form entry through to game play while keeping an eye on the console for any possible errors that may be logged. 

## Performance

Loading times and performance was tested using Googles Lighthouse tool within Chromes Developer Tools. 

Without trying to optimise, both the index page and 4040 page were scoring above 90 in all areas, with some scores reaching 100. 
However the game page was a different story. Scoring as low as 68 over several tests for its performance. The main issue being highlighted by Lighthouse was the card images. 
On investigation these were overly large images - being 745 x 1040px, each clocking in around 400kb. Since at its largest the game page limits these images to 548 x 765px, i resized the images to match this and also lowered the image quality slightly which dropped the file size to 20kb per card. 
This pushed the lowest score to a much more acceptable 89/100. 


This page relies heavily on Javascript for content rendering which I suspect may be the main culprit here.
Since the card images are also all called from the javascript file this can add delays and img.card-image element was highlighted as the main issue.
I had attempted to resolve this using preloads and other methods to try to locally cache the images. However the score did not improve. 

<details>
<summary>Index Page</summary>
<img src="docs/index-lighthouse.png">
</details>

<details>
<summary>Game Page</summary>
<img src="docs/game-lighthouse.png">
</details>

<details>
<summary>404 Page</summary>
<img src="docs/404-lighthouse.png">
</details>

## Javascript Testing
[Esprima](https://esprima.org/demo/validate.html) was used to check and verify the javascript, this caught a few semicolons that were missed or weren't needed which were correct. After this it gave no further warnings. 
[JShint](https://jshint.com/) Was also used - this initially gave warnings for a few undefined variables, which were fixed. It also warns about features used in ES6. 
[BeautifyTools](https://beautifytools.com/javascript-validator.php). Much like JSHint, this gave several warnings around syntax in use which is only available in ES6. 


## Device and Browser Testing

- WIndows Desktop PC
- Apple M1 MacBook Pro
- Apple M2 MacBook Pro Max
- Apple iPad Pro
- iPhone 15 Pro Max
- Samsung Galaxy S24

In Addition, the following browsers have all been used in testing:

- Chrome
- Safari
- Firefox
- Edge

## Responsiveness

Responsiveness testing was performed using Chrome's Developer Tools. Where the option to rotate the device was possible this was also tested. As well testing simulating devices that have folding screens. 
For brevity, the specifics of rotation/screen adjustment testing will only be called out where issues were seen. As it stands, no issues were observed. 

<details>
<summary>Galaxy Z Fold 5</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Galaxy z Fold 5       | Index Page    | Displays as Expected |
| 344 x 882             | Game Page     | Displays as Expected |
| 882 x 344             | 404 Page      | Displays as Expected |

</details>

<details>
<summary>Samsung Galaxy S8+</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Samsung Galaxy S8+    | Index Page    | Displays as Expected |
| 360 x 740             | Game Page     | Displays as Expected |
| 740 x 360             | 404 Page      | Displays as Expected |

</details>

<details>
<summary>iPhone SE</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| iPhone SE             | Index Page    | Displays as Expected |
| 375 x 667             | Game Page     | Displays as Expected |
| 667 x 375                     | 404 Page      | Displays as Expected |

</details>

<details>
<summary>iPhone 12 Pro</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| iPhone 12 Pro         | Index Page    | Displays as Expected |
| 390 x 844             | Club Page     | Displays as Expected |
| 844 x 390             | 404 Page  | Displays as Expected |

</details>

<details>
<summary>Samsung Galaxy A51/71</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Samsung Galaxy A51/71 | Index Page    | Displays as Expected |
| 412 x 914             | Game Page     | Displays as Expected |
| 914 x 412             | 404 Page      | Displays as Expected |

</details>

<details>
<summary>Pixel 7</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Pixel 7	              | Index Page    | Displays as Expected |
| 412 x 915             | Game Page     | Displays as Expected |
| 915 x 412             | 404 Page      | Displays as Expected |

</details>

<details>
<summary>Samsung Galaxy S20 Ultra</summary>

| Device and Resolution    | Page          | Result               |
| ------------------------ | ------------- | -------------------- |
| Samsung Galaxy S20 Ultra | Index Page    | Displays as Expected |
| 412 x 915                | Game Page     | Displays as Expected |
| 915 x 412                | 404 Page      | Displays as Expected |

</details>

<details>
<summary>iPhone XR</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| iPhone XR             | Index Page    | Displays as Expected |
| 414 x 896             | Game Page     | Displays as Expected |
| 896 x 414             | 404 Page      | Displays as Expected |

</details>

<details>
<summary>iPhone 14 Pro Max</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| iPhone 14 Pro Max     | Index Page    | Displays as Expected |
| 430 x 932             | Game Page     | Displays as Expected |
| 932 x 430             | 404 Page      | Displays as Expected |


</details>

<details>
<summary>Surface Duo</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Surface Duo           | Index Page    | Displays as Expected |
| 540 x 720             | Game Page     | Displays as Expected |
| 720 x 540             | 404 Page      | Displays as Expected |

</details>

<details>
<summary>iPad Mini</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| iPad Mini             | Index Page    | Displays as Expected |
| 768 x 1024            | Game Page     | Displays as Expected |
| 1024 x 768            | 404 Page      | Displays as Expected |

</details>

<details>
<summary>iPad Air</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| iPad Air              | Index  Page   | Displays as Expected |
| 820 x 1180            | Club Page     | Displays as Expected |
| 1180 x 820            | 404 Page      | Displays as Expected |

</details>

<details>
<summary>Asus Zenbook Fold</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Asus Zenbook Fold     | Index  Page   | Displays as Expected |
| 853 x 1280            | Club Page     | Displays as Expected |
| 1280 x 853            | 404 Page      | Displays as Expected |

</details>

<details>
<summary>Surface 7 Pro</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Surface 7 Pro         | Index  Page   | Displays as Expected |
| 912 x 1368            | Club Page     | Displays as Expected |
| 1368 x 912            | 404 Page      | Displays as Expected |

</details>

<details>
<summary>Nest Hub</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Nest Hub              | Index  Page   | Displays as Expected |
| 1024 x 600            | Club Page     | Displays as Expected |
|                       | 404 Page      | Displays as Expected |

</details>

<details>
<summary>iPad Pro</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| iPad Pro              | Index  Page   | Displays as Expected |
| 1024 x 1366           | Club Page     | Displays as Expected |
| 1366 x 1024           | 404 Page      | Displays as Expected |

</details>

<details>
<summary>Nest Hub Max</summary>

| Device and Resolution | Page          | Result               |
| --------------------- | ------------- | -------------------- |
| Nest Hub Max          | Index  Page   | Displays as Expected |
| 1280 x 800            | Club Page     | Displays as Expected |
|                       | 404 Page      | Displays as Expected |

</details>

# Version control and Deployment


The site's code is all stored on GitHub, which is used for version control and is currently hosting a deployed copy of the site using Github Pages. 

## Repo Creation

A new repo was created directly on the GitHub website using the below steps: 

1: Navigate to github.com.
2: login to my account.
3: click the repositories tab on the top of the website. 
4: Click the green 'new' button 
5: On the newly loaded page, in the text field enter a name for the repo, in this case, PokeBattle was entered.
6: An optional description can be added in the text box below this. In this instance, this was left blank.
7: Select the visibility as either public or private. Since this needs to be visible for assessment and marking, the default 'Public' option was left checked.
9: Click the Create repository button and wait for a few moments, once this has been cloned into your account the page will reload and you'll be presented with the code space for the repo.


## Cloning locally

Since I chose to work in Visual Studio Code, the contents of the newly created repo needed to be transferred to my computer. To do this I followed the below steps:


1. In VSCode, I opened the Terminal window, by visiting the 'Terminal' menu in VSCode and selecting 'New Terminal'
2. Within this terminal window, I made sure I was in the correct folder for where I wanted to store my work, if this was not correct I would have used the bash command cd to navigate to the correct folder. In this case, ~/Code, which is a folder called 'Code' in my logged-in user Home Folder.
3. In a web browser, I navigated to the GitHub repository for the project and clicked on the green '<> Code' button, this presented me with several options for cloning. I selected the 'HTTPS' option and copied the URL in the text field.
4. In Visual Studio Code’s terminal, I typed git clone https://github.com/monkphin/nlaw.git and pressed enter, which cloned the repo to my local machine as shown by the below output.
 
    ```
    darren@localhost MINGW64 ~/Code (main)
    $ git clone https://github.com/monkphin/PokeBattle.git
    Cloning into 'PokeBattle'...
    remote: Enumerating objects: 12, done.
    remote: Counting objects: 100% (12/12), done.
    remote: Compressing objects: 100% (12/12), done.
    remote: Total 12 (delta 0), reused 8 (delta 0), pack-reused 0
    Receiving objects: 100% (12/12), 5.68 KiB | 830.00 KiB/s, done.
    ```

5. Once this had finished cloning I used cd to navigate into the relevant folder - in this case, cd PokeBattle
   
    ```
    darren@localhost MINGW64 ~/Code (main)
    $ cd PokeBattle/
    darren@localhost MINGW64 ~/Code/PokeBattle (main)
    ```
6. I am now able to work on the project on my local machine.

I used the ability to clone locally to allow me to work on several devices over the course of the creation of the website and its readme file., including using personal development time while at work or using my work provided machine while staying in hotels for office visits. As such the repo will show my work account having committed some changes to this project also. 

## Deployment
As mentioned the site is currently deployed via GitHub Pages.
To deploy the site the following steps were used:


1. Navigate to the specific GitHub Repo for the site - in this case: https://github.com/monkphin/PokeBattle/
2. Click settings in the menu at the top of the project.
3. On the left-hand menu of the settings page, click on the Pages link.
4. Under the 'Build and Deploy heading click the drop-down under 'Branch' and select which branch to deploy from. In this case, it was 'main'.  
5. Check to ensure the correct site root is selected in the drop-down next to the branch drop-down selector that is now visible. In this case, '/(root)'.
6. Click 'save'.
7. Wait a moment for the web page to reload, at which point you will see a notice at the top of the page stating 'GitHub Pages source saved'
8. Once the page has reloaded, you should see a message at the top stating 'Your site is live at https://monkphin.github.io/PokeBattle/' If this is not visible, refresh the page and it should now be visible.

# Credits 
PokeBattler Logo taken from https://www.pokebattler.com/
POkemon images taken from https://pokemondb.net/pokedex/national
card backgrounds taken from https://pokecardmaker.net/creator
Sad Pikachu taken from https://www.deviantart.com/jujumays/art/A-Very-Sad-Pikachu-929558432