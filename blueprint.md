# Teesin Equipment Recommendation Agent

## Overview

This application is a web-based tool that acts as a "Teesin Equipment Recommendation Agent". It allows users to input details about their construction project, and in a conversational manner, the agent will recommend the necessary tools and machinery from Tee Sin, a major equipment supplier.

## Style, Design, and Features

### Implemented

*   **Initial Structure:** Basic HTML, CSS, and JavaScript files.
*   **Modern UI:** A visually appealing interface with a conversational flow, using a custom color palette, modern typography, and responsive layout.
*   **Background Image:** A background image of a construction equipment firm with a dark overlay to ensure text readability.
*   **Header Logo:** The Teesin logo is displayed in the header.
*   **Web Components:** The main application is built as a `<recommendation-agent>` custom element.
*   **Modular JavaScript:** The code is organized into ES Modules.
    *   `main.js`: Contains the core application logic and the `RecommendationAgent` web component.
    *   `recommendations.js`: Exports the equipment recommendation data, separating data from logic for better maintainability.
*   **Functionality:**
    *   A form to collect project details.
    *   Users input the project type from a dropdown menu.
    *   **Dynamic Sub-Categories:** For more detailed recommendations, a "Sub-Category" dropdown appears based on the selected "Project Type".
    *   Users input the project area in square meters.
    *   The agent determines the project scale (small, medium, or large) based on the area.
    *   **Populated Recommendation Engine:** The recommendation engine is populated with equipment data for all sub-categories.
    *   A display area for the agent's recommendations.
    *   **Image-Based Recommendations:** The recommended equipment is displayed in a grid of cards, with each card showing a picture of the equipment and its name.
    *   **User Feedback:** After a recommendation is displayed, the user is asked for feedback on the usability of the recommendation. The feedback is currently logged to the console for future analysis.
*   **Feedback Form:** A feedback form is added to the page, allowing users to submit feedback via formspree.io.
*   **Deployment:** Deployed the application to Firebase Hosting.

## Plan for Current Request

### Refactor Recommendation Data

1.  **Create `recommendations.js`:** Created a new file named `recommendations.js` to store the recommendation data separately as an ES module.
2.  **Update `main.js`:** Modified `main.js` to import the recommendation data from `recommendations.js` and removed the hardcoded data.
3.  **Update `index.html`:** Updated `index.html` to load `main.js` as a `type="module"` script to enable ES module imports.
4.  **Update `blueprint.md`:** Updated the project documentation to reflect the refactored code structure.