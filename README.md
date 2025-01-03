# ai-demo-app

# Expenses Management Application

This is a web application for managing expenses. It allows users to view, search, filter, and delete expenses, as well as manage categories.

## Technologies Used

- **Frontend:**
  - React
  - React Bootstrap
  - Axios

- **Backend:**
  - ASP.NET Core (C#)

- **Build Tools:**
  - npm

## Getting Started

### Prerequisites

- Node.js
- npm
- .NET SDK

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/patelbinal/ai-demo-app.git
    cd expenses-management-app
    ```

2. Install frontend dependencies:
    ```sh
    cd ClientApp
    npm install
    ```

3. Install backend dependencies:
    ```sh
    cd ..
    dotnet restore
    ```

### Running the Application

1. Start the backend server:
    ```sh
    dotnet run
    ```

2. Start the frontend development server:
    ```sh
    cd ClientApp
    npm start
    ```

3. Open your browser and navigate to `https://localhost:44439/`.

## Project Structure

- `ClientApp/src/components/ExpensesPage.js`: Main component for managing expenses.
- `ClientApp/src/components/CategoriesPage.js`: Component for managing categories.
- `ClientApp/src/axiosInstance.js`: Axios instance for making HTTP requests.
- `Controllers/ExpenseController.cs`: API controller for managing expenses.
- `Controllers/CategoryController.cs`: API controller for managing categories.
- `_ViewImports.cshtml`: Razor view imports.
- `Error.cshtml`: Error page view.

## Features

- Login and Register User.
- View a list of expenses.
- Search expenses by description.
- Delete an expense.

## License

This project is licensed under the MIT License.