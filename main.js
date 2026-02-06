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

                h3, h4 {
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

                .feedback-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                #feedback-yes, #feedback-no {
                    width: auto;
                    padding: 0.6rem 1.2rem;
                }

                #feedback-no {
                    background-color: #6c757d;
                }
            </style>
            <div class="agent-container">
                <form id="project-form">
                    <div class="form-group">
                        <label for="project-type">Project Type</label>
                        <select id="project-type" name="project-type">
                            <option value="">-- Select Project Type --</option>
                            <option value="surface_preparation">Surface Preparation</option>
                            <option value="demolition">Demolition</option>
                            <option value="floor_polishing">Floor Polishing</option>
                            <option value="material_conveying">Material Conveying</option>
                            <option value="float_and_levelling">Float and Levelling</option>
                        </select>
                    </div>
                    <div class="form-group" id="sub-category-group" style="display: none;">
                        <label for="sub-category">Sub-Category</label>
                        <select id="sub-category" name="sub-category"></select>
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
                    <div id="feedback-section" style="display: none; margin-top: 2rem;">
                        <h4>Was this recommendation helpful?</h4>
                        <div class="feedback-buttons">
                            <button id="feedback-yes">Yes</button>
                            <button id="feedback-no">No</button>
                        </div>
                        <p id="feedback-thanks" style="display: none; margin-top: 1rem;">Thanks for your feedback!</p>
                    </div>
                </div>
            </div>
        `;

        this.subCategories = {
            demolition: [
                { value: 'controlled', text: 'Controlled Demolition' },
                { value: 'destructive', text: 'Destructive Demolition' },
                { value: 'demolish_wall', text: 'Demolish Wall' },
                { value: 'demolish_floor', text: 'Demolish Floor' }
            ],
            surface_preparation: [
                { value: 'grinding', text: 'Grinding & Scarifying' },
                { value: 'stripping', text: 'Coating & Paint Removal' },
                { value: 'cleaning', text: 'Surface Cleaning & Degreasing' },
                { value: 'shot_blasting', text: 'Shot Blasting' }
            ],
            floor_polishing: [
                { value: 'concrete', text: 'Concrete Polishing' },
                { value: 'marble_terrazzo', text: 'Marble/Terrazzo Polishing' },
                { value: 'wood', text: 'Wood Floor Polishing' }
            ],
            material_conveying: [
                { value: 'horizontal', text: 'Horizontal Material Moving' },
                { value: 'vertical', text: 'Vertical Material Moving' },
                { value: 'debris_removal', text: 'Debris & Waste Removal' }
            ],
            float_and_levelling: [
                { value: 'trowelling', text: 'Power Trowelling' },
                { value: 'screeding', text: 'Screeding & Levelling' },
                { value: 'self_levelling', text: 'Applying Self-Levelling Compounds' }
            ]
        };

        this.shadowRoot.getElementById('project-type').addEventListener('change', (e) => {
            const projectType = e.target.value;
            const subCategoryGroup = this.shadowRoot.getElementById('sub-category-group');
            const subCategorySelect = this.shadowRoot.getElementById('sub-category');
            
            subCategorySelect.innerHTML = '<option value="">-- Select Sub-Category --</option>';
            const subCategories = this.subCategories[projectType];

            if (subCategories && subCategories.length > 0) {
                subCategories.forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub.value;
                    option.textContent = sub.text;
                    subCategorySelect.appendChild(option);
                });
                subCategoryGroup.style.display = 'block';
            } else {
                subCategoryGroup.style.display = 'none';
            }
        });

        this.shadowRoot.getElementById('project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const projectType = this.shadowRoot.getElementById('project-type').value;
            const subCategorySelect = this.shadowRoot.getElementById('sub-category');
            const subCategory = subCategorySelect.style.display !== 'none' ? subCategorySelect.value : 'default';
            const projectLocation = this.shadowRoot.getElementById('project-location').value;
            const projectArea = this.shadowRoot.getElementById('project-area').value;
            const projectScale = this.getScaleFromArea(projectArea);
            const recommendations = this.getRecommendations(projectType, subCategory, projectScale, projectLocation);
            this.displayRecommendations(recommendations);
        });

        this.shadowRoot.getElementById('feedback-yes').addEventListener('click', () => this.handleFeedback(true));
        this.shadowRoot.getElementById('feedback-no').addEventListener('click', () => this.handleFeedback(false));
    }

    handleFeedback(isHelpful) {
        console.log(`User feedback: ${isHelpful ? 'Helpful' : 'Not helpful'}`);
        this.shadowRoot.querySelector('.feedback-buttons').style.display = 'none';
        this.shadowRoot.getElementById('feedback-thanks').style.display = 'block';
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

    getRecommendations(type, subType, scale, location) {
        const recommendations = {
            surface_preparation: {
                grinding: { small: { indoor: [{ name: 'Hand Grinder', image: 'images/GRINDER - CTAG-007 .jpg' }], outdoor: [{ name: 'Hand Grinder', image: 'images/GRINDER - CTAG-007 .jpg' }] }, medium: { indoor: [{ name: 'Floor Grinder', image: 'images/FLOOR GRINDER - HTG-550.jpg' }, { name: 'Dust Collector', image: 'images/dust_collector.jpg' }], outdoor: [{ name: 'Floor Grinder', image: 'images/FLOOR GRINDER - HTG-550.jpg' }] }, large: { indoor: [{ name: 'Ride-on Floor Grinder', image: 'images/FLOOR GRINDER- HTG-680-4A.jpg' }, { name: 'Large Dust Collector', image: 'images/large_dust_collector.jpg' }], outdoor: [{ name: 'Ride-on Floor Grinder', image: 'images/FLOOR GRINDER- HTG-680-4A.jpg' }] } },
                stripping: { small: { indoor: [{ name: 'Floor Scraper', image: 'images/SCARIFIER - CES 200D.jpg' }], outdoor: [{ name: 'Floor Scraper', image: 'images/SCARIFIER - CES 200D.jpg' }] }, medium: { indoor: [{ name: 'Ride-on Scraper', image: 'images/SCARIFIER - CS-320E.jpg' }], outdoor: [{ name: 'Ride-on Scraper', image: 'images/SCARIFIER - CS-320E.jpg' }] }, large: { indoor: [{ name: 'Ride-on Scraper', image: 'images/SCARIFIER - CS-320E.jpg' }], outdoor: [{ name: 'Ride-on Scraper', image: 'images/SCARIFIER - CS-320E.jpg' }] } },
                cleaning: { small: { indoor: [{ name: 'Industrial Vacuum Cleaner', image: 'images/industrial_vacuum.jpg' }], outdoor: [{ name: 'Pressure Washer', image: 'images/pressure_washer.jpg' }] }, medium: { indoor: [{ name: 'Industrial Vacuum Cleaner', image: 'images/industrial_vacuum.jpg' }], outdoor: [{ name: 'Pressure Washer', image: 'images/pressure_washer.jpg' }] }, large: { indoor: [{ name: 'Ride-on Sweeper', image: 'images/ride_on_sweeper.jpg' }], outdoor: [{ name: 'Pressure Washer', image: 'images/pressure_washer.jpg' }] } },
                shot_blasting: { small: { indoor: [], outdoor: [] }, medium: { indoor: [{ name: 'Shot Blaster', image: 'images/SHOT BLAST - CB1-10E7.jpg' }, { name: 'Dust Collector', image: 'images/dust_collector.jpg' }], outdoor: [{ name: 'Shot Blaster', image: 'images/SHOT BLAST - CB1-10E7.jpg' }] }, large: { indoor: [{ name: 'Large Shot Blaster', image: 'images/SHOT BLAST - CB1-10E7.jpg' }, { name: 'Large Dust Collector', image: 'images/large_dust_collector.jpg' }], outdoor: [{ name: 'Large Shot Blaster', image: 'images/SHOT BLAST - CB1-10E7.jpg' }] } },
                default: { small: { indoor: [{ name: 'Hand Grinder', image: 'images/GRINDER - CTAG-007 .jpg' }], outdoor: [{ name: 'Hand Grinder', image: 'images/GRINDER - CTAG-007 .jpg' }] }, medium: { indoor: [{ name: 'Floor Grinder', image: 'images/FLOOR GRINDER - HTG-550.jpg' }], outdoor: [{ name: 'Floor Grinder', image: 'images/FLOOR GRINDER - HTG-550.jpg' }] }, large: { indoor: [{ name: 'Ride-on Floor Grinder', image: 'images/FLOOR GRINDER- HTG-680-4A.jpg' }], outdoor: [{ name: 'Ride-on Floor Grinder', image: 'images/FLOOR GRINDER- HTG-680-4A.jpg' }] } }
            },
            demolition: {
                controlled: { small: { indoor: [{ name: 'Electric Breaker', image: 'images/electric_breaker.jpg' }], outdoor: [{ name: 'Electric Breaker', image: 'images/electric_breaker.jpg' }] }, medium: { indoor: [{ name: 'Demolition Robot', image: 'images/demolition_robot.jpg' }], outdoor: [{ name: 'Mini Excavator', image: 'images/mini_excavator.jpg' }] }, large: { indoor: [{ name: 'Demolition Robot', image: 'images/demolition_robot.jpg' }], outdoor: [{ name: 'Mini Excavator', image: 'images/mini_excavator.jpg' }] } },
                destructive: { small: { indoor: [{ name: 'Electric Breaker', image: 'images/electric_breaker.jpg' }], outdoor: [{ name: 'Concrete Saw', image: 'images/concrete_saw.jpg' }] }, medium: { indoor: [{ name: 'Skid-Steer Loader', image: 'images/skid_steer_loader.jpg' }], outdoor: [{ name: 'Mini Excavator', image: 'images/mini_excavator.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Excavator', image: 'images/excavator.jpg' }] } },
                demolish_wall: { small: { indoor: [{ name: 'Wall Chaser', image: 'images/wall_chaser.jpg' }], outdoor: [{ name: 'Concrete Saw', image: 'images/concrete_saw.jpg' }] }, medium: { indoor: [{ name: 'Wall Saw', image: 'images/wall_saw.jpg' }], outdoor: [{ name: 'Wall Saw', image: 'images/wall_saw.jpg' }] }, large: { indoor: [{ name: 'Wall Saw', image: 'images/wall_saw.jpg' }], outdoor: [{ name: 'Wall Saw', image: 'images/wall_saw.jpg' }] } },
                demolish_floor: { small: { indoor: [{ name: 'Floor Scraper', image: 'images/floor_scraper.jpg' }], outdoor: [{ name: 'Concrete Saw', image: 'images/concrete_saw.jpg' }] }, medium: { indoor: [{ name: 'Ride-on Scraper', image: 'images/ride_on_scraper.jpg' }], outdoor: [{ name: 'Skid-Steer Loader', image: 'images/skid_steer_loader.jpg' }] }, large: { indoor: [{ name: 'Ride-on Scraper', image: 'images/ride_on_scraper.jpg' }], outdoor: [{ name: 'Skid-Steer Loader', image: 'images/skid_steer_loader.jpg' }] } },
                default: { small: { indoor: [{ name: 'Electric Breaker', image: 'images/electric_breaker.jpg' }], outdoor: [{ name: 'Concrete Saw', image: 'images/concrete_saw.jpg' }] }, medium: { indoor: [{ name: 'Demolition Robot', image: 'images/demolition_robot.jpg' }], outdoor: [{ name: 'Mini Excavator', image: 'images/mini_excavator.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Excavator', image: 'images/excavator.jpg' }] } }
            },
            floor_polishing: {
                concrete: { small: { indoor: [{ name: 'Hand Polisher', image: 'images/hand_polisher.jpg' }], outdoor: [] }, medium: { indoor: [{ name: 'Floor Polisher', image: 'images/floor_polisher.jpg' }], outdoor: [] }, large: { indoor: [{ name: 'Ride-on Floor Polisher', image: 'images/ride_on_floor_polisher.jpg' }], outdoor: [] } },
                marble_terrazzo: { small: { indoor: [{ name: 'Hand Polisher', image: 'images/hand_polisher.jpg' }], outdoor: [] }, medium: { indoor: [{ name: 'Floor Polisher', image: 'images/floor_polisher.jpg' }], outdoor: [] }, large: { indoor: [{ name: 'Ride-on Floor Polisher', image: 'images/ride_on_floor_polisher.jpg' }], outdoor: [] } },
                wood: { small: { indoor: [{ name: 'Hand Polisher', image: 'images/hand_polisher.jpg' }], outdoor: [] }, medium: { indoor: [{ name: 'Floor Polisher', image: 'images/floor_polisher.jpg' }], outdoor: [] }, large: { indoor: [], outdoor: [] } },
                default: { small: { indoor: [{ name: 'Hand Polisher', image: 'images/hand_polisher.jpg' }], outdoor: [] }, medium: { indoor: [{ name: 'Floor Polisher', image: 'images/floor_polisher.jpg' }], outdoor: [] }, large: { indoor: [{ name: 'Ride-on Floor Polisher', image: 'images/ride_on_floor_polisher.jpg' }], outdoor: [] } }
            },
            material_conveying: {
                horizontal: { small: { indoor: [{ name: 'Portable Conveyor Belt', image: 'images/portable_conveyor_belt.jpg' }], outdoor: [{ name: 'Portable Conveyor Belt', image: 'images/portable_conveyor_belt.jpg' }] }, medium: { indoor: [], outdoor: [{ name: 'Construction Dumper', image: 'images/construction_dumper.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Telehandler', image: 'images/telehandler.jpg' }] } },
                vertical: { small: { indoor: [], outdoor: [{ name: 'Portable Conveyor Belt', image: 'images/portable_conveyor_belt.jpg' }] }, medium: { indoor: [], outdoor: [{ name: 'Telehandler', image: 'images/telehandler.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Crane', image: 'images/crane.jpg' }] } },
                debris_removal: { small: { indoor: [{ name: 'Industrial Vacuum Cleaner', image: 'images/industrial_vacuum.jpg' }], outdoor: [{ name: 'Construction Dumper', image: 'images/construction_dumper.jpg' }] }, medium: { indoor: [{ name: 'Skid-Steer Loader', image: 'images/skid_steer_loader.jpg' }], outdoor: [{ name: 'Skid-Steer Loader', image: 'images/skid_steer_loader.jpg' }] }, large: { indoor: [{ name: 'Skid-Steer Loader', image: 'images/skid_steer_loader.jpg' }], outdoor: [{ name: 'Excavator', image: 'images/excavator.jpg' }] } },
                default: { small: { indoor: [{ name: 'Portable Conveyor Belt', image: 'images/portable_conveyor_belt.jpg' }], outdoor: [{ name: 'Portable Conveyor Belt', image: 'images/portable_conveyor_belt.jpg' }] }, medium: { indoor: [], outdoor: [{ name: 'Construction Dumper', image: 'images/construction_dumper.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Telehandler', image: 'images/telehandler.jpg' }] } }
            },
            float_and_levelling: {
                trowelling: { small: { indoor: [], outdoor: [{ name: 'Power Trowel', image: 'images/power_trowel.jpg' }] }, medium: { indoor: [], outdoor: [{ name: 'Ride-on Power Trowel', image: 'images/ride_on_power_trowel.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Ride-on Power Trowel', image: 'images/ride_on_power_trowel.jpg' }] } },
                screeding: { small: { indoor: [], outdoor: [{ name: 'Laser Screed', image: 'images/laser_screed.jpg' }] }, medium: { indoor: [], outdoor: [{ name: 'Laser Screed', image: 'images/laser_screed.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Laser Screed', image: 'images/laser_screed.jpg' }] } },
                self_levelling: { small: { indoor: [], outdoor: [] }, medium: { indoor: [], outdoor: [] }, large: { indoor: [], outdoor: [] } },
                default: { small: { indoor: [], outdoor: [{ name: 'Power Trowel', image: 'images/power_trowel.jpg' }] }, medium: { indoor: [], outdoor: [{ name: 'Ride-on Power Trowel', image: 'images/ride_on_power_trowel.jpg' }] }, large: { indoor: [], outdoor: [{ name: 'Laser Screed', image: 'images/laser_screed.jpg' }] } }
            }
        };

        if (recommendations[type] && recommendations[type][subType] && recommendations[type][subType][scale]) {
            return recommendations[type][subType][scale][location] || [];
        }
        return [];
    }

    displayRecommendations(recommendations) {
        const recommendationsDiv = this.shadowRoot.getElementById('recommendations');
        const equipmentList = this.shadowRoot.getElementById('equipment-list');
        const feedbackSection = this.shadowRoot.getElementById('feedback-section');

        equipmentList.innerHTML = '';
        if (!recommendations || recommendations.length === 0) {
            recommendationsDiv.style.display = 'block';
            equipmentList.innerHTML = "No equipment recommendations for this combination. Please ensure you have selected a sub-category or contact us for more information.";
            feedbackSection.style.display = 'none';
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
        feedbackSection.style.display = 'block';
        this.shadowRoot.querySelector('.feedback-buttons').style.display = 'flex';
        this.shadowRoot.getElementById('feedback-thanks').style.display = 'none';
    }
}

customElements.define('recommendation-agent', RecommendationAgent);

const feedbackForm = document.getElementById('feedback-form');
const feedbackStatus = document.getElementById('feedback-status');

feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(feedbackForm);
    
    try {
        const response = await fetch(feedbackForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            feedbackStatus.textContent = 'Thanks for your feedback!';
            feedbackStatus.style.color = 'green';
            feedbackForm.reset();
        } else {
            const data = await response.json();
            if (Object.hasOwn(data, 'errors')) {
                feedbackStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
            } else {
                feedbackStatus.textContent = 'Oops! There was a problem submitting your form';
            }
            feedbackStatus.style.color = 'red';
        }
    } catch (error) {
        feedbackStatus.textContent = 'Oops! There was a problem submitting your form';
        feedbackStatus.style.color = 'red';
    }
});

