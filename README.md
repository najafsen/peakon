This is a simple project with React to implement an Autocomplete component in order to search by Manager's Names and select them. You can simply use keyboard `Arrow Up` and `Arrow Down` keys to open and navigate through Autocomplete items. You can also select an Item by pressing `Enter` key and close the menu by pressing `Escape`. You can also close the menu and leave the input by pressing `Tab` key.

The project structure is very simple and straightforward because the app is simple itself. The structure is based on the functionality. Accordingly, all actions are in `actions` folder, all reducers are in `reducers` folder and so on.

If app was larger it would make sence to structure project based on Domain, so, for example, Manager domain would have it's own actions, reducers, etc on it's own directory. But for this example it doesn't make sence to do that.

**UPDATE ON Tuesday:** My solution was working for having 2 visible items (as expected). I cheated today and added one more commit to support having different amount of visible items. To change the visible items change `VISIBLE_ITEMS` in `Autocomplete.js` and `$visible-items` in `Autocomplete.scss`. However, the better implementation would be to pass `visibleItems` with props.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). All of the following instructions and documentations are from the original Readme from CRA.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
