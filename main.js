
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
                        For more information on equipment, visit <a href="https://www.teesin.com.sg" target="_blank">www.teesin.com.sg</a>.
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
                small: [
                    { name: 'Blastrac BS-50 Floor Scraper', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BS-50-1.jpg' },
                    { name: 'Metabo RFEV 19-125 RT Hand Grinder', image: 'https://www.teesin.com.sg/wp-content/uploads/2023/10/METABO-RFEV-19-125-RT.jpg' }
                ],
                medium: [
                    { name: 'Blastrac BGS-250 Floor Grinder', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BGS-250-MKII-1.jpg' },
                    { name: 'Blastrac 1-8DM Shot Blaster', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/1-8DM-1.jpg' },
                    { name: 'Blastrac BDC-122 Dust Collector', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BDC-122-1.jpg' }
                ],
                large: [
                    { name: 'Blastrac BMG-780PRO Floor Grinder', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BMG-780PRO-MKII-1.jpg' },
                    { name: 'Blastrac BMS-220ADB Ride-on Scraper', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BMS-220ADB-1.jpg' },
                    { name: 'Blastrac BDC-3140LP Dust Collector', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BDC-3140-1.jpg' }
                ]
            },
            demolition: {
                small: [
                    { name: 'Hilti TE 1000-AVR Electric Breaker', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/11/TE-1000-AVR-03.jpg' },
                    { name: 'Hilti DCH 300 Concrete Saw', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/11/DCH-300-02.jpg' }
                ],
                medium: [
                    { name: 'Bobcat E17z Mini Excavator', image: 'https://www.teesin.com.sg/wp-content/uploads/2022/04/E17z.jpeg' },
                    { name: 'Bobcat S70 Skid-Steer Loader', image: 'https://www.teesin.com.sg/wp-content/uploads/2022/04/S70.jpeg' }
                ],
                large: [
                    { name: 'Brokk 110 Demolition Robot', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/Brokk-110-1.jpg' }
                ]
            },
            floor_polishing: {
                small: [
                    { name: 'HTC Greyline 270 Hand Polisher', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/HTC-Greyline-270-1.jpg' },
                    { name: 'Blastrac BDC-1112EU Burnisher', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BDC-1112EU-e1629433698711.jpg' }
                ],
                medium: [
                    { name: 'HTC Greyline 450 Floor Polisher', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/HTC-Greyline-450-1.jpg' }
                ],
                large: [
                    { name: 'Blastrac BMG-2200 Ride-on Floor Polisher', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BMG-2200-1.jpg' }
                ]
            },
            material_conveying: {
                small: [
                    { name: 'Shifta Conveyor Belt', image: 'https://www.teesin.com.sg/wp-content/uploads/2022/01/Shifta-Conveyor-4.4m-5.4m.jpg' },
                ],
                medium: [
                    { name: 'Thwaites 1-Ton Dumper', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/10/1-Ton-Dumper-Hi-Tip-2021-Side-view.jpg' },
                ],
                large: [
                    { name: 'Bobcat T40.180SLP Telehandler', image: 'https://www.teesin.com.sg/wp-content/uploads/2022/04/T40.180SLP.jpeg' },
                ]
            },
            float_and_levelling: {
                small: [
                    { name: 'Bartell B424 Power Trowel', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/B424-1.jpg' }
                ],
                medium: [
                    { name: 'Bartell BR-100 Ride-on Power Trowel', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/BR100-1.jpg' }
                ],
                large: [
                    { name: 'Somero S-485 Laser Screed', image: 'https://www.teesin.com.sg/wp-content/uploads/2021/08/S-485-1.jpg' }
                ]
            }
        };
        return recommendations[type][scale] || [];
    }

    displayRecommendations(recommendations) {
        const recommendationsDiv = this.shadowRoot.getElementById('recommendations');
        const equipmentList = this.shadowRoot.getElementById('equipment-list');

        equipmentList.innerHTML = '';
        if (recommendations.length === 0) {
            recommendationsDiv.style.display = 'none';
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
