# Teesin Equipment Recommendation Agent

## Overview

This application is a web-based tool that acts as a "Teesin Equipment Recommendation Agent". It allows users to input details about their construction project, and in a conversational manner, the agent will recommend the necessary tools and machinery from Tee Sin, a major equipment supplier.

## Style, Design, and Features

### Implemented

*   **Initial Structure:** Basic HTML, CSS, and JavaScript files.
*   **Modern UI:** A visually appealing interface with a conversational flow, using a custom color palette, modern typography, and responsive layout.
*   **Header Logo:** The Teesin logo is displayed in the header.
*   **Web Components:** The main application is built as a `<recommendation-agent>` custom element.
*   **Functionality:**
    *   A form to collect project details.
    *   Users input the project type from a dropdown menu ("Floor Surface Preparation", "Demolition", "Floor Polishing", "Material Conveying", and "Float and Levelling").
    *   Users input the project area in square meters.
    *   The agent determines the project scale (small, medium, or large) based on the area:
        *   **Small:** Up to 100 sq. meters.
        *   **Medium:** 101 to 500 sq. meters.
        *   **Large:** Over 500 sq. meters.
    *   A recommendation engine with equipment lists based on real-world examples from **www.teesin.com.sg**.
    *   A display area for the agent's recommendations, including a source link.
    *   **Image-Based Recommendations:** The recommended equipment is now displayed in a grid of cards, with each card showing a picture of the equipment and its name.
    *   **Specific Models and Real Images:** The recommendations now feature specific equipment models and their corresponding images, which are stored locally in the `images` directory.

## Plan for Current Request

1.  **Update `main.js`**:
    *   Replaced the placeholder recommendation data with real data scraped from `www.teesin.com.sg`. This includes specific model names and direct image URLs for each piece of equipment.
2.  **Download and Store Images Locally**:
    *   Created an `images` directory to store all the equipment images.
    *   Downloaded each image from the Teesin website and saved it to the `images` directory.
3.  **Update `main.js` to Use Local Images**:
    *   Modified the `main.js` file to reference the locally stored images in the `images` directory instead of hotlinking from the Teesin website. This improves performance and reliability.
4.  **Update `blueprint.md`**:
    *   Updated the project documentation to describe the new feature of using real data and locally stored images for recommendations.
