# WhatInTheWorld?!

Discover information about countries around the world with this simple React application. Search for a country, view its details, and explore its flag. Check out the live project [here](https://countries-rest-api-37e00.web.app)!

![image of website](/docs/app_screenshot.png)

## Features

- **Search for Countries**: Simply type the name of a country and press enter.
- **Search Filter**: Select a region from the dropdown to filter the search based on geographic region.
- **Random Country Details**: Click on the random country button to get information about a random country.
- **Country Details**: Click on a country card to view more detailed information about the country.
- **Country Weather**: Weather for the country is displayed in the country details panel.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Search Result Pagination**: Results from searching and filtering are paginated to inprove user experience.

## Setup

### From Git

1. **Clone the Repository**

```bash
git clone https://github.com/ConnaaaaR/countries-api-react.git
cd countries-api-react
```

2. **Install Dependencies**

```bash
npm install
```

3. **Setup Environment Variables**

Copy the `.env.template` file provided in the frontend directory. Rename the copy file to `.env` or use the bash command provided to copy the file. Make sure to set the `VITE_WEATHER_KEY` variable to your OpenWeather API key. This is available from `https://openweathermap.org/current`.


```bash
cp .env.template .env
```

1. **Run the Application**

```bash
npm start
```

### From a ZIP File

1. **Extract the ZIP File**

Unzip the downloaded file to a directory of your choice.

2. **Navigate to the Directory**

Open your terminal or command prompt and navigate to the directory.

```bash
cd <PATH TO EXTRACTED PROJECT>
```

3. **Install Dependencies**
```bash
npm install
```
4. **Setup Environment Variables**
   
Edit the `.env` file provided in the frontend directory of the project. Set the `VITE_BACKEND_URL` to the backend server URL. This is typically `http://localhost:8000/` and this is set as default. The port can be seen in the server.js output log if the server is running on a different port.

5. **Run the Application**
   
Run each of the following commands in a separate terminal: 

```bash
npm run dev
```

```bash
npm run backend
```

6. **Open the Application**

Command/CTRL-Click the link in the terminal that `npm run dev` was ran in to see the site on localhost.
![link to app](/docs/link_image.png)

## Using the `.env` File

The `.env` file contains the `VITE_WEATHER_KEY`. This variable defines the API key for the weather information within the application. Without the correct setup of this variable the application will be unable to retrieve data from the API.


