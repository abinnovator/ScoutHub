
![Logo](https://github.com/abinnovator/ScoutHub/blob/main/public/logo_size.jpg)

ScoutHub

Our app helps athletes and coaches improve performance through AI-powered video feedback. Athletes can upload their training videos, and the app automatically analyzes movement patterns to generate actionable coaching tips in real time.

With a clean interface, athletes can:

Upload practice or game footage.

Receive personalized AI feedback on technique, agility, and form.

View formatted coaching tips that are easy to apply.

Access feedback directly on their video dashboard.

This app bridges the gap between training and professional coaching, making high-quality performance analysis accessible to everyone, whether you’re practicing alone or coaching a team.

## ⚡ Key Features – ScoutHub

### 🏅 AI-Powered Sports Video Analysis
- Upload training or match videos directly to the platform.  
- Automatically generate **AI-driven coaching feedback** with clear, actionable tips.  
- Supports multiple sports categories for tailored insights.  

### 📋 Actionable Feedback
- Receive short, practical coaching points (e.g., posture, footwork, arm movement).  
- Feedback formatted for easy reading with **Markdown support**.  
- Designed to help athletes improve technique quickly.  

### 🎥 Video Management Panel
- Athletes can view all uploaded videos in one place.  
- Feedback history stored per video for long-term progress tracking.  
- Securely powered by **Appwrite Storage & Database**.  

### 🏠 Personalized Dashboard
- Video cards showing **title, category, and owner**.  
- Feedback button for instant AI analysis (only accessible to the video uploader).  
- Direct links to detailed **feedback pages**.  

### 🔐 User Authentication
- Secure login/signup with **Appwrite authentication**.  
- Only video owners can generate or view AI feedback.  

### 📱 Responsive Design
- Clean, modern UI built with **React, Next.js, and Tailwind**.  
- Works seamlessly across **desktop, tablet, and mobile devices**.  

## Documentation


1.  **Clone the repository:**

    ```bash
    git clone https://github.com/abinnovator/scouthub
    cd scouthub
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install
    ```

3.  **Configure appwrite:**

    - Create a new project on the [Appwrite Console](https://appwrite.io).
    
    - Create a `.env.local` file in your project root and add your Appqritw configuration:
      ```
      NEXT_PUBLIC_APPWRITE_PROJECT_ID=[your project id]
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=[project name]
NEXT_PUBLIC_APPWRITE_ENDPOINT=[your endpoint]
      ```

4.  **Configure Gemini:**

    - Sign up for an account on (https://cloud.google.com/).
    - Obtain your GEMINI API key.
    - Add your GEMINI API key to your `.env.local` file:
      ```
      GEMINI_API_KEY=[YOUR_GEMINI_API_KEY]
      ```

5.  **Run the development server:**

    ```bash
    npm run dev  # or yarn dev or pnpm dev
    ```

    Open your browser at `http://localhost:3000`.

## Environment Variables
    NEXT_PUBLIC_APPWRITE_PROJECT_ID=[your project id]
    NEXT_PUBLIC_APPWRITE_PROJECT_NAME=[project name]
    NEXT_PUBLIC_APPWRITE_ENDPOINT=[your endpoint]
    NEXT_PUBLIC_API_KEY=[your appwrite api key]
    NEXT_PUBLIC_GEMINI_API_KEY=[Your gemini api key]

## License
GNU General Public License v3.0


## Badges

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)




## Author

Aadit Bhambri
Portfolio - https://aaditbhambri.com
