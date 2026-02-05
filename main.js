class RecommendationAgent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .agent-container {
                    background-color: var(--card-background-color);
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 10px 20px var(--shadow-color);
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                input, select, button {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 1rem;
                    box-sizing: border-box;
                }

                button {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: 700;
                    box-shadow: 0 4px 6px var(--glow-color);
                    transition: transform 0.2s;
                }

                button:hover {
                    transform: translateY(-2px);
                }

                .recommendations {
                    margin-top: 2rem;
                    border-top: 1px solid #eee;
                    padding-top: 2rem;
                }

                h3 {
                    margin-top: 0;
                    color: var(--primary-color);
                }

                ul {
                    list-style-type: none;
                    padding: 0;
                }

                li {
                    background-color: #f0f0f0;
                    padding: 0.8rem;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                }
                .source-link {
                    margin-top: 1rem; 
                    font-size: 0.9rem; 
                    text-align: center;
                    color: #6c757d;
                }
                .source-link a {
                    color: var(--primary-color);
                    text-decoration: none;
                }
                .source-link a:hover {
                    text-decoration: underline;
                }
            </style>
            <div class="agent-container">
                <form id="project-form">
                    <div class="form-group">
                        <label for="project-type">Project Type</label>
                        <select id="project-type" name="project-type">
                            <option value="floor_surface_preparation">Floor Surface Preparation</option>
                            <option value="demolition">Demolition</option>
                            <option value="floor_polishing">Floor Polishing</option>
                            <option value="material_conveying">Material Conveying</option>
                            <option value="float_and_levelling">Float and Levelling</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="project-area">Project Area (in square meters)</label>
                        <input type="number" id="project-area" name="project-area" placeholder="e.g., 50" required>
                    </div>
                    <button type="submit">Get Recommendation</button>
                </form>
                <div id="recommendations" class="recommendations" style="display: none;">
                    <h3>Recommended Equipment</h3>
                    <ul id="equipment-list"></ul>
                    <p class="source-link">
                        For more information on equipment, visit <a href="http://www.teesin.com.sg" target="_blank">www.teesin.com.sg</a>.
                    </p>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const projectType = this.shadowRoot.getElementById('project-type').value;
            const projectArea = this.shadowRoot.getElementById('project-area').value;
            const projectScale = this.getScaleFromArea(projectArea);
            const recommendations = this.getRecommendations(projectType, projectScale);
            this.displayRecommendations(recommendations);
        });
    }

    getScaleFromArea(area) {
        if (area <= 100) {
            return 'small';
        } else if (area <= 500) {
            return 'medium';
        } else {
            return 'large';
        }
    }

    getRecommendations(type, scale) {
        const recommendations = {
            floor_surface_preparation: {
                small: ['Floor Scraper', 'Hand Grinder'],
                medium: ['Floor Grinder (Single Head)', 'Shot Blaster', 'Dust Collector'],
                large: ['Floor Grinder (Planetary)', 'Ride-on Scraper', 'Large Dust Collector']
            },
            demolition: {
                small: ['Electric Breaker (Jackhammer)', 'Handheld Concrete Saw', 'Personal Protective Equipment (PPE)'],
                medium: ['1.7-Ton Mini Excavator with Hydraulic Breaker', 'Skid-Steer Loader with Demolition Grapple', 'Air Compressor'],
                large: ['20-Ton Excavator with Hydraulic Breaker & Crusher', 'Remote-Controlled Demolition Robot', 'Water Spray System for Dust Control']
            },
            floor_polishing: {
                small: ['Hand Polisher', 'Burnisher'],
                medium: ['Walk-behind Floor Polisher', 'Diamond Pads', 'Industrial Vacuum'],
                large: ['Ride-on Floor Polisher', 'Large Burnisher', 'Auto Scrubber']
            },
            material_conveying: {
                small: ['Wheelbarrow', 'Material Hoist'],
                medium: ['Conveyor Belt', 'Skid-Steer Loader', 'Mini Dumper'],
                large: ['Telehandler', 'Crane', 'Dump Truck']
            },
            float_and_levelling: {
                small: ['Hand Float', 'Power Trowel (Walk-behind)'],
                medium: ['Laser Screed', 'Ride-on Power Trowel'],
                large: ['Large Ride-on Power Trowel', 'Concrete Laser Screed']
            }
        };
        return recommendations[type][scale] || ['No specific recommendations for this combination.'];
    }

    displayRecommendations(recommendations) {
        const recommendationsDiv = this.shadowRoot.getElementById('recommendations');
        const equipmentList = this.shadowRoot.getElementById('equipment-list');

        equipmentList.innerHTML = '';
        recommendations.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            equipmentList.appendChild(li);
        });

        recommendationsDiv.style.display = 'block';
    }
}

customElements.define('recommendation-agent', RecommendationAgent);