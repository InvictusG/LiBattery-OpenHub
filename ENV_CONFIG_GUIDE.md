# Environment Variable Configuration Guide

This guide explains how to set up the necessary environment variables for the LiBattery OpenHub project.

## Quick Setup

1.  **Copy the Example File**: In the root of the project, make a copy of `env.example` and rename it to `.env.local`.
    
    ```bash
    cp env.example .env.local
    ```

2.  **Fill in the Variables**: Open the new `.env.local` file and add the required values as explained below.

---

## Required Variables

### `GITHUB_TOKEN`

This token is **essential** for the application to function. It is used to make authenticated requests to the GitHub API to fetch real-time repository data.

-   **Purpose**: Increases the API request rate limit from 60 requests/hour (for unauthenticated requests) to 5,000 requests/hour.
-   **Where to get it**:
    1.  Navigate to your GitHub **Settings**.
    2.  Go to **Developer settings** at the bottom of the left sidebar.
    3.  Click on **Personal access tokens** -> **Tokens (classic)**.
    4.  Click **Generate new token** and select **Generate new token (classic)**.
    5.  **Note**: Give your token a descriptive name, like `LiBattery-OpenHub-Dev`.
    6.  **Expiration**: Choose an appropriate expiration period.
    7.  **Scopes**: Select the `public_repo` scope. This is the only permission needed to read data from public repositories.
    8.  Click **Generate token**.
-   **Important**: Copy the generated token immediately. You will not be able to see it again.
-   **Example**:
    
    ```
    GITHUB_TOKEN=ghp_YourSecretTokenGoesHere...
    ```

---

## Optional Variables

### `MONGODB_URI`

This variable is **optional** and is currently not used in the main data-fetching logic, as the application now fetches data directly from GitHub in real-time. You can leave this empty.

-   **Purpose**: If you decide to implement database caching or store additional metadata in the future, you would put your MongoDB connection string here.
-   **Example**:
    
    ```
    MONGODB_URI=mongodb+srv://user:<password>@cluster0.mongodb.net/yourDatabase?retryWrites=true&w=majority
    ``` 