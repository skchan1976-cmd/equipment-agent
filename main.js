
const themeSwitcher = document.getElementById('checkbox');

themeSwitcher.addEventListener('change', () => {
    if (themeSwitcher.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});
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

                #equipment-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1.5rem;
                    list-style-type: none;
                    padding: 0;
                }

                .equipment-card {
                    background-color: #f0f0f0;
                    border-radius: 8px;
                    padding: 1rem;
                    text-align: center;
                    box-shadow: 0 4px 6px var(--shadow-color);
                }

                .equipment-card img {
                    max-width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 6px;
                    margin-bottom: 0.5rem;
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
                        <label for="project-location">Project Location</label>
                        <select id="project-location" name="project-location">
                            <option value="indoor">Indoor</option>
                            <option value="outdoor">Outdoor</option>
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
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const projectType = this.shadowRoot.getElementById('project-type').value;
            const projectLocation = this.shadowRoot.getElementById('project-location').value;
            const projectArea = this.shadowRoot.getElementById('project-area').value;
            const projectScale = this.getScaleFromArea(projectArea);
            const recommendations = this.getRecommendations(projectType, projectScale, projectLocation);
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

    getRecommendations(type, scale, location) {
        const recommendations = {
            floor_surface_preparation: {
                small: {
                    indoor: [
                        { name: 'Floor Scraper', image: 'images/floor_scraper.jpg' },
                        { name: 'Hand Grinder', image: 'images/hand_grinder.jpg' }
                    ],
                    outdoor: [
                        { name: 'Floor Scraper', image: 'images/floor_scraper.jpg' },
                        { name: 'Hand Grinder', image: 'images/hand_grinder.jpg' }
                    ]
                },
                medium: {
                     indoor: [
                        { name: 'Floor Grinder', image: 'images/floor_grinder.jpg' },
                        { name: 'Shot Blaster', image: 'images/shot_blaster.jpg' },
                        { name: 'Dust Collector', image: 'images/dust_collector.jpg' }
                    ],
                    outdoor: [
                        { name: 'Floor Grinder', image: 'images/floor_grinder.jpg' },
                        { name: 'Shot Blaster', image: 'images/shot_blaster.jpg' }
                    ]
                },
                large: {
                    indoor: [
                        { name: 'Ride-on Floor Grinder', image: 'images/ride_on_floor_grinder.jpg' },
                        { name: 'Ride-on Scraper', image: 'images/ride_on_scraper.jpg' },
                        { name: 'Large Dust Collector', image: 'images/large_dust_collector.jpg' }
                    ],
                    outdoor: [
                        { name: 'Ride-on Floor Grinder', image: 'images/ride_on_floor_grinder.jpg' },
                        { name: 'Ride-on Scraper', image: 'images/ride_on_scraper.jpg' }
                    ]
                }
            },
            demolition: {
                small: {
                    indoor: [
                        { name: 'Electric Breaker', image: 'images/electric_breaker.jpg' }
                    ],
                    outdoor: [
                        { name: 'Concrete Saw', image: 'images/concrete_saw.jpg' }
                    ]
                },
                medium: {
                    indoor: [
                         { name: 'Demolition Robot', image: 'images/demolition_robot.jpg' }
                    ],
                    outdoor: [
                        { name: 'Mini Excavator', image: 'images/mini_excavator.jpg' },
                        { name: 'Skid-Steer Loader', image: 'images/skid_steer_loader.jpg' }
                    ]
                },
                large: {
                     indoor: [
                        { name: 'Demolition Robot', image: 'images/demolition_robot.jpg' }
                    ],
                    outdoor: [
                        { name: 'Mini Excavator', image: 'images/mini_excavator.jpg' }
                    ]
                }
            },
            floor_polishing: {
                small: {
                    indoor: [
                        { name: 'Hand Polisher', image: 'images/hand_polisher.jpg' },
                        { name: 'Burnisher', image: 'images/burnisher.jpg' }
                    ],
                    outdoor: []
                },
                medium: {
                    indoor: [
                        { name: 'Floor Polisher', image: 'images/floor_polisher.jpg' }
                    ],
                    outdoor: []
                },
                large: {
                    indoor: [
                        { name: 'Ride-on Floor Polisher', image: 'images/ride_on_floor_polisher.jpg' }
                    ],
                    outdoor: []
                }
            },
            material_conveying: {
                small: {
                    indoor: [
                        { name: 'Portable Conveyor Belt', image: 'images/portable_conveyor_belt.jpg' },
                    ],
                    outdoor: [
                        { name: 'Portable Conveyor Belt', image: 'images/portable_conveyor_belt.jpg' },
                    ]
                },
                medium: {
                    indoor: [],
                    outdoor: [
                        { name: 'Construction Dumper', image: 'images/construction_dumper.jpg' },
                    ]
                },
                large: {
                    indoor: [],
                    outdoor: [
                        { name: 'Telehandler', image: 'images/telehandler.jpg' },
                    ]
                }
            },
            float_and_levelling: {
                small: {
                    indoor: [],
                    outdoor: [
                        { name: 'Power Trowel', image: 'images/power_trowel.jpg' }
                    ]
                },
                medium: {
                    indoor: [],
                    outdoor: [
                        { name: 'Ride-on Power Trowel', image: 'images/ride_on_power_trowel.jpg' }
                    ]
                },
                large: {
                    indoor: [],
                    outdoor: [
                        { name: 'Laser Screed', image: 'images/laser_screed.jpg' }
                    ]
                }
            }
        };
        return recommendations[type][scale][location] || [];
    }

    displayRecommendations(recommendations) {
        const recommendationsDiv = this.shadowRoot.getElementById('recommendations');
        const equipmentList = this.shadowRoot.getElementById('equipment-list');

        equipmentList.innerHTML = '';
        if (recommendations.length === 0) {
            recommendationsDiv.style.display = 'block';
            equipmentList.innerHTML = "No equipment recommendations for this combination. Please contact us for more information.";
            return;
        }

        recommendations.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('equipment-card');
            
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;

            const name = document.createElement('p');
            name.textContent = item.name;

            li.appendChild(img);
            li.appendChild(name);
            equipmentList.appendChild(li);
        });

        recommendationsDiv.style.display = 'block';
    }
}

customElements.define('recommendation-agent', RecommendationAgent);
