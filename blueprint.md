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

## Plan for Current Request

1.  **Update `index.html`**:
    *   Added an `<img>` tag to the header for the Teesin logo.
2.  **Update `style.css`**:
    *   Added styles to display the logo and align it with the header title.
3.  **Update `blueprint.md`**:
    *   Updated the project documentation to include the addition of the header logo.
