#  GitHub User Repository Explorer

A React-based web application that allows users to search GitHub profiles and explore their repositories with sorting, filtering, and infinite scrolling support.

---

##  Features

###  Search GitHub Users

* Search any GitHub user using the GitHub Search API
* Debounced input (500ms) to optimize API calls
* Displays list of matching users with avatars

###  User Selection

* Click on any user to view their repositories
* Automatically clears previous selections on new search

###  Repository Listing

* Fetch and display repositories of selected user
* Shows:

  * Repository Name
  * Description
  * Stars 
  * Forks 
  * Direct GitHub Link

###  Infinite Scroll

* Loads repositories dynamically as you scroll
* Uses pagination (`page` + `per_page`) from GitHub API
* Smooth UX without manual pagination

###  Filtering & Sorting

* Filter repositories by language:

  * HTML, CSS, JavaScript, Python, TypeScript
* Sort repositories by:

  * Stars 
  * Forks 

###  Optimized Data Fetching

* Custom reusable hook (`useFetchapi`)
* Handles:

  * Loading states
  * Error handling
  * API abstraction

---

##  Tech Stack

* **Frontend:** React (Hooks)
* **Routing:** React Router
* **HTTP Client:** Axios
* **Styling:** Tailwind CSS
* **API:** GitHub REST API

---

##  Project Structure

```
src/
│
├── Components/
│   ├── Repo.jsx
│   ├── SearchedUsers.jsx
│   └── UserRepos.jsx
│
├── CustomHooks/
│   └── useFetchapi.js
│
├── Pages/
│   └── Home.jsx
│
└── App.jsx
```

---

## Installation & Setup

### 1️ Clone the repository

```bash
git clone https://github.com/your-username/github-repo-explorer.git
```

### 2️ Navigate to project

```bash
cd github-repo-explorer
```

### 3️ Install dependencies

```bash
npm install
```

### 4️ Start development server

```bash
npm run dev
```

---

##  API Endpoints Used

### Search Users

```
https://api.github.com/search/users?q={username}
```

### Get User Repositories (Paginated)

```
https://api.github.com/users/{username}/repos?page={page}&per_page=10
```

---

##  Key Concepts Implemented

* Debouncing with `useEffect`
* Custom hooks for API abstraction
* Conditional rendering
* Infinite scrolling logic
* State management using React Hooks
* Data filtering & sorting
* Clean component architecture

---

##  Author

**Bhargav Sunny**


