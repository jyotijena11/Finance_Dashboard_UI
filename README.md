# Finance Dashboard UI

A modern and responsive *Finance Dashboard UI* built with ReactJS, JavaScript, Recharts, Framer Motion, Lucide React. The project is designed to help users monitor income, expenses, savings, and spending patterns through a clean interface with interactive charts, searchable transaction records, and role-based actions.

This project is ideal as a frontend UI:
- component-based UI design.
- data visualization.
- state management with React hooks.
- responsive layout design.
- local storage persistence.
- form handling.

---

## Live Overview

The dashboard provides a premium 2 Role Based Window:

-# Admin - AS a admin can do any operation(Add transaction, Edit transaction, Delete transaction).
-# Viewer - Viewer users can only view records

The dashboard provides a premium single-page finance experience with three main modules:

- #Overview – high-level financial summary with charts.
- #Transactions – search, filter, sort, add, edit, and delete records.
- #Insights – automated spending and savings highlights.

- *dark/light theme toggle*
- *admin/viewer role simulation*
- *animated UI transitions*
- *persistent transaction data using browser local storage*.

---

## Images:
#Finance_Dashboard_UI(Dark_Mode)![image_alt](https://github.com/jyotijena11/Finance_Dashboard_UI/blob/f8f1141cce02eb1db9a64b266c7992d0c8cb065f/Finance_Dashboard_UI(Dark_Mode).png)

#Finance_Dashboard_UI ![image_alt](https://github.com/jyotijena11/Finance_Dashboard_UI/blob/f8f1141cce02eb1db9a64b266c7992d0c8cb065f/Finance_Dashboard_UI.png)

#Finance_Dashboard_UI(Light Mode) ![image_alt](https://github.com/jyotijena11/Finance_Dashboard_UI/blob/f8f1141cce02eb1db9a64b266c7992d0c8cb065f/Finance_Dashboard_UI(Light%20Mode).png)

#Financial_Overview ![image_alt](https://github.com/jyotijena11/Finance_Dashboard_UI/blob/f8f1141cce02eb1db9a64b266c7992d0c8cb065f/Financial_Overview.png)

#Transactions_Management(Admin_Window) ![image_alt](https://github.com/jyotijena11/Finance_Dashboard_UI/blob/f8f1141cce02eb1db9a64b266c7992d0c8cb065f/Transactions_Management(Admin_Window).png)

#Transactions_Management(Viewer_Window) ![image_alt](https://github.com/jyotijena11/Finance_Dashboard_UI/blob/f8f1141cce02eb1db9a64b266c7992d0c8cb065f/Transactions%20Management(Viewer_Window).png)

#Financial Insights ![image_alt](https://github.com/jyotijena11/Finance_Dashboard_UI/blob/f8f1141cce02eb1db9a64b266c7992d0c8cb065f/Financial%20Insights.png)

## Features

### 1. Executive Dashboard:
- Displays key financial Data:
  - Net Balance.
  - Total Income.
  - Total Expenses.
  - Savings Rate.
- Shows a quick snapshot of recent transactions.
- Includes a preview of financial insights.
- Provides smooth navigation between dashboard modules.

### 2. Financial Overview Module:
- #Area chart - for monthly income vs expense trends.
- #Pie chart - for expense category distribution.
- Helps users quickly understand financial movement over time.

### 3. Transactions Management Module:
- View all transactions in a structured table.
- Search transactions by:
  - title
  - category
  - type
  - status
  - date
- Filter records by transaction type:
  - All
  - Income
  - Expense
- Sort transactions by:
  - Latest
  - Oldest
  - Highest amount
  - Lowest amount
  - Name
- Admin users can:
  - Add transaction
  - Edit transaction
  - Delete transaction
- Viewer users can only view records.

### 4. Insights Module:
Automatically generates useful financial observations from transaction data:
- Highest spending category.
- Monthly savings rate.
- Average expense value.
- Monthly savings comparison chart.

### 5. Theme Support:
- Dark theme
- Light theme
- Theme preference is saved in local storage.

### 6. Role Simulation:
- *Viewer* role: read-only access.
- *Admin* role: full transaction management access.
- Useful for demonstrating role-based UI behavior in frontend applications.

### 7. Data Persistence:
- Transactions are stored in *browser local storage*.
- Theme selection is also persisted.
- User data remains available after page refresh.

### 8. Responsive Design:
- Optimized for desktop and adaptable for smaller screens.
- Includes mobile sidebar behavior and responsive layout sections.

### 9. Animation and UI:
- Smooth page transitions.
- Interactive hover effects on cards and elements.

---

## Tech Stack:

- #React 18
- #Vite 5
- #Recharts for data visualization
- #Framer Motion for animations
- #Lucide React for icons
- #CSS3 for custom styling

---

## Project Structure:

```bash
finance-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── README.md
```

### Main Files:
- `src/App.jsx` – main application logic, state handling, charts, transactions, role switching, and modal logic.
- `src/styles.css` – complete dashboard styling, themes, layout, responsive behavior, and UI components.
- `src/main.jsx` – React app.
- `vite.config.js` – Vite configuration.

---

## How It Works:

### Financial Summary Calculation:
The app calculates:
- total income
- total expenses
- current balance
- savings rate

These values are derived dynamically from the transaction list.

### Expense Breakdown:
Expense transactions are grouped by category and displayed in a pie chart so users can quickly identify where most of their money is going.

### Insights Generation:
The insights section is built from derived transaction data, including:
- the highest spending category.
- average expense size.
- remaining savings after expenses.

### CRUD Flow:
When the role is set to Admin:
- users can open a modal form.
- add a new transaction.
- update existing transaction details.
- remove transactions from the list.

### Search and Filtering:
Users can search across transaction content and combine that with type filters and sorting for faster record analysis.

---

## Installation and Setup:

### 1. Clone the repository:
```bash
git clone https://github.com/jyotijena11/Finance_Dashboard_UI.git
```

### 2. Move into the project folder:
```bash
cd Finance_Dashboard_UI
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Start the development server:
```bash
npm run dev
```

### 5. Build for production:
```bash
npm run build
```

### 6. Preview production build:
```bash
npm run preview:
```

---

## Available Scripts:

```bash
npm run dev      # start local development server
npm run build    # create production build
npm run preview  # preview the production build locally
```

---

## Default Demo Data:

The application comes with preloaded sample transaction data such as:
- salary credit
- stock dividend
- rent payment
- food orders
- utility bills
- travel bookings
- subscription expenses

This makes the dashboard immediately usable for demo and portfolio presentation purposes.

---

## Features

- dark/light UI inspired by modern finance SaaS dashboards
- Left sidebar navigation
- Overview, Transactions, and Insights pages
- Time-based chart using Recharts
- Categorical spending breakdown chart
- Search, filter, and sorting for transactions
- Role-based UI simulation: Viewer and Admin
- Add, edit, and delete transactions for Admin
- Framer Motion animations
- Responsive design
- Local storage persistence
---

## Limitations:

This project is currently a frontend-only application
It does not include:
- backend/database integration.
- authentication system.
- real bank API connections.
- multi-user account management.
- real-time financial syncing.

---

## Future Improvements

Possible upgrades for the project:
- backend integration with Node.js / Express / Firebase.
- user authentication and authorization.
- recurring transaction support.
- date range filters.
- notification system with real alerts.
- API-based real financial data integration.

---

## Author
JP Jena  
GitHub: https://github.com/jyotijena11
```
---



