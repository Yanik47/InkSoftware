# AI Conversation Review Dashboard  
  
Frontend coding task built with React and TypeScript.  
  
A single-page dashboard for reviewing AI-generated customer conversations.    
The app includes:  
  
- conversation list sidebar  
- selected conversation details view  
- review panel for status updates  
- internal conversation and message notes  
- validation for empty notes  
- real weather API integration based on `customerCity`  
- loading, error, empty, and selected states  
  
## Tech Stack  
  
- React  
- TypeScript  
- Vite  
- Tailwind CSS v4  
- Open-Meteo API for live weather data  
  
## Features  
  
- Review conversation threads in a chat-like layout  
- Update review status (`pending`, `approved`, `needs_fix`)  
- Add conversation-level notes  
- Add message-level notes for the selected message  
- Display current weather in the conversation details panel  
- Handle weather loading and error states  
- Responsive three-panel layout with mobile pane switching  
- Dark mode UI  
  
## Project Structure  

```text
src/  
  app/  
  components/  
    conversation/  
    review/  
    sidePanel/  
    states/  
  data/  
  lib/  
  types/
```


## Getting Started

### 1. Install dependencies

npm install

### 2. Start the development server

npm run dev

Then open the local URL shown in the terminal.

## Available Scripts

npm run dev  
npm run build  
npm run preview

## Production Build

To create a production build:

npm run build

To preview the production build locally:

npm run preview

## API Integration

This project uses the public Open-Meteo API to display current weather for the customer city shown in each conversation.

The weather widget handles:

- loading state
- not found state
- generic error state
- retry action

All other conversation data is mocked locally.

## Notes on State Management

- Conversations are stored in local React state
- Status updates and reviewer notes are handled locally
- Weather data is fetched asynchronously per selected conversation
- Empty note submission is validated in the review panel

## Deployment

### Vercel

This project can be deployed on Vercel.

#### Option 1: Deploy from GitHub

1. Push this repository to GitHub
2. Import the repository into Vercel
3. Deploy

#### Option 2: Deploy with Vercel CLI

npm i -g vercel  
vercel login  
vercel  
vercel --prod

## Design Notes

The UI follows a dark dashboard layout with:

- sidebar for conversations
- main conversation thread area
- right review panel
- reusable status, card, and message components

## Submission Notes

This project was built to match the task requirements:

- React + TypeScript
- one real public API integration
- required UI states
- reusable components
- clean dashboard layout
- responsive behavior

## Live Demo

Add deployed Vercel URL here.

## Author

Maksym Yankovenko
