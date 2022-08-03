# USBreweryList

## Introduction
This project utilizes the data from Open Brewery DB to display the information of a list of US breweries. This one-page application provides a search brewery by city feature and a click to check detail page function.

## How to start

**_npm install_**: install necessary dependencies for this project under the clients and server folder.

**_npm start_**: start the front end and back end of this project under the clients and server folder.

The .env file in clients folder should includes a variable REACT_APP_GOOGLE_TOKEN holding the google map API key and the .env file in server folder saves the BreweryURL, which is https://api.openbrewerydb.org/breweries.

## Components

**Main Page**

The left portion of the main page renders a list of breweries by default based on the user's current location. 

1. When a user types in a specific city name in the search bar on top and clicks search, the list will update correspondingly to the city input. 
2. When a user clicks on the name of the brewery or the "Visit Website" icon, there will be a new tab opening the brewery's website. 
3. When a user clicks on the "Details" icon, the page will render the detail page about the specific brewery.

The right portion of the main mage renders a google map, where the red markers represent the breweries listed on the left. When clicking on a specific marker, the list on the left will be updated correspondingly to the nearby breweries based on the location of the marker.

<img width="1513" alt="Screen Shot 2022-08-02 at 21 13 20" src="https://user-images.githubusercontent.com/26387488/182524779-5564b863-0570-4d9a-a6c1-d1f0d32f8eec.png">


**Detail Page**

The top navigation bar of the detail page renders the name and location of the brewery. 

1. The "Back" button on the right will lead the user back to the main page.
2. The "Direction" icon will re-adjust the current brewery to the center of the google map.

The bottom part of the detail page renders the google map with a navigation function, which shows the route between starting address and the brewery, with a distance and duration calculation.

1. The default start of the route will be the user's current location. A user can also type in their desired starting address.
2. The destination is set to the brewery's address.
3. When a user clicks on the "Navigation" icon, the google map will generate the route between starting address and the brewery.
4. The "Cancel" button will stop the navigation route.

<img width="1518" alt="Screen Shot 2022-08-02 at 21 13 02" src="https://user-images.githubusercontent.com/26387488/182525252-ef9fe3c8-877b-4045-ac6a-902a6ac5e82f.png">
