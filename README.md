# Placemaster
## Scheduling Optimization Front-End
This application provides a GUI to interact with response data from a scheduling optimization model. It is developed with [GatsbyJS](https://www.gatsbyjs.org/), a framework for building static React applications, and Redux.

## General Usage
User can upload [two .csv files](/example_files/) (survey response data and groups) on the index page. When the application is live, optimized scheduling data will be returned. The user can then view the response data in browser. At this time, they can manually place any unplaced members into the desired group.

To download a .csv of the results, click "Generate Attendance File" at the top right.

## Upload File Structure
In order to get a response from the server, files must be formatted correctly. See `example_files` for the necessary structure.

[Sign Up Response Example](/example_files/SignUp_Responses.csv)

[Group Data Example](/example_files/Groups_Example.csv)

## Pages
All files in `src/pages` will create a page with a route of the same name.
Thus, this application has two pages (excluding 404).

### `index.jsx` -> `/`

Provides form for uploading .csv files, navigates to `/placement` when data is received.

### `placement.jsx` -> `/placement`

View scheduling data and make manual placements. Provides option to download .csv of scheduling data.

`/placement` is not available via any DOM links, and will be navigated to automatically upon receiving scheduling data.

## State Management
Response data is kept in a Redux store, and passed to relevant container components, stored in `src/components/containers`. If a container has specific reducers and actions, those are stored within the relevant container folder. These reducers are combined into a single application reducer in `src/appReducer.js`.

`/wrap-with-provider.js` uses Gatsby-specific semantics to create a Redux store and provide it to the application. You can find more information about this on [Edward Beezer's blog post](https://www.edwardbeazer.com/setting-up-redux-with-gatsbyjs-v2/), which deserves credit for this implementation.

All UI-based state is stored locally within the respective components.

### Credits
The underlying optimization model was developed by [Evan Jonokuchi](https://github.com/ejonokuchi).

Providing store to Gatsby application done following tutorial on [Edward Beezer's blog post](https://www.edwardbeazer.com/setting-up-redux-with-gatsbyjs-v2/).