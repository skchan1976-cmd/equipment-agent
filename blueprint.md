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
*   **Functionality:**
    *   A form to collect project details.
    *   Users input the project type from a dropdown menu.
    *   **Dynamic Sub-Categories:** For more detailed recommendations, a "Sub-Category" dropdown appears based on the selected "Project Type".
    *   Users input the project area in square meters.
    *   The agent determines the project scale (small, medium, or large) based on the area.
    *   **Populated Recommendation Engine:** The recommendation engine is populated with equipment data extracted from **www.teesin.com.sg** for all sub-categories.
    *   A display area for the agent's recommendations.
    *   **Image-Based Recommendations:** The recommended equipment is displayed in a grid of cards, with each card showing a picture of the equipment and its name.
    *   **User Feedback:** After a recommendation is displayed, the user is asked for feedback on the usability of the recommendation. The feedback is currently logged to the console for future analysis.
*   **Feedback Form:** A feedback form is added to the page, allowing users to submit feedback via formspree.io.
*   **Deployment:** Deployed the application to Firebase Hosting.

## Plan for Current Request

### Add Feedback Form

1.  **Add Feedback Form to HTML:** Create a feedback form in `index.html` that `POST`s to `https://formspree.io/f/mpqjadpe`. The form will include fields for name, email, and message.
2.  **Style the Form:** Add CSS rules to `style.css` to make the form visually consistent with the rest of the application.
3.  **Handle Form Submission:** Add JavaScript code to `main.js` to handle the form submission. This will include showing a success or error message to the user after the form is submitted.
4.  **Update `blueprint.md`:** The project documentation will be updated to reflect the new feedback form.