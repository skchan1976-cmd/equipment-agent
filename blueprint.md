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
    *   **Dynamic Sub-Categories:** For more detailed recommendations, a "Sub-Category" dropdown appears based on the selected "Project Type". This is now implemented for all project types:
        *   **Surface Preparation:** Grinding & Scarifying, Coating & Paint Removal, Surface Cleaning & Degreasing, Shot Blasting
        *   **Demolition:** Controlled Demolition, Destructive Demolition, Demolish Wall, Demolish Floor
        *   **Floor Polishing:** Concrete Polishing, Marble/Terrazzo Polishing, Wood Floor Polishing
        *   **Material Conveying:** Horizontal Material Moving, Vertical Material Moving, Debris & Waste Removal
        *   **Float and Levelling:** Power Trowelling, Screeding & Levelling, Applying Self-Levelling Compounds
    *   Users input the project area in square meters.
    *   The agent determines the project scale (small, medium, or large) based on the area:
        *   **Small:** Up to 100 sq. meters.
        *   **Medium:** 101 to 500 sq. meters.
        *   **Large:** Over 500 sq. meters.
    *   A recommendation engine with equipment lists based on real-world examples from **www.teesin.com.sg**. The source is being updated.
    *   A display area for the agent's recommendations, including a source link.
    *   **Image-Based Recommendations:** The recommended equipment is now displayed in a grid of cards, with each card showing a picture of the equipment and its name.
    *   **Specific Models and Real Images:** The recommendations now feature specific equipment models and their corresponding images, which are stored locally in the `images` directory.
*   **Deployment:** Deployed the application to Firebase Hosting.

## Plan for Current Request

1.  **Add Granular Sub-Categories:**
    *   The user pointed out that the project types are too general.
    *   Added a new "Sub-Category" dropdown to the UI.
    *   Implemented the logic to dynamically show and populate the sub-category dropdown based on the selected project type.
    *   Proactively defined and added sub-categories for all project types.
2.  **Awaiting More Information:**
    *   Waiting for the user to provide the equipment recommendation data for all the new sub-categories.
3.  **Update `blueprint.md`:**
    *   The project documentation has been updated to reflect the new sub-category feature for all project types.
