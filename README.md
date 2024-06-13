# PDF Hub web app - MERN Stack

This README provides an overview of the project structure of client side and how to get started.

## Getting started

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js (_v18.15.0 or higher_)
- npm ( _9.5.0 or higher_)

### Installation

1. **Clone** this repository to your local machine:
   git clone https://github.com/Kavindya-Dilshani/client.git

2. **Navigate** to the project directory:
   cd client

3. **Install** the project dependencies:
   Using npm:
   npm install

   ## Development

To start the application, run the following command:
npm start

This will launch your React app in development mode, and you can access it at [http://localhost:3000](http://localhost:3000).

## Building for Production

To create a production-ready build of the app, use the following command:
npm run build

The production build will be located in the `build` directory.

To serve the build of the app, use the following commands:
npm install -g serve
serve -s build -p 3000

## Project Structure

The project structure is organized as follows:

- `src/`: Contains the React application source code.
- `public/`: Contains static assets like HTML files and images.
- `dist/`: Output directory for production builds.
- `node_modules/`: Dependencies installed via npm.
- `package.json`: Project configuration and dependencies.

## Customize

You can customize this project by editing the source code in the `src/` directory and updating the configuration in `package.json`. Feel free to add more components, pages, styles, and functionality to suit the project's requirements.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## Acknowledgments

- **Create React App** for providing a solid base for building React applications.
- **React** for building user interfaces efficiently.
