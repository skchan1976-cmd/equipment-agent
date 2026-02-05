
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
                        { name: 'Floor Scraper', image: 'https://media.gettyimages.com/id/1312157523/photo/construction-worker-use-a-power-tool-to-remove-old-vinyl-tiles-from-a-subfloor.jpg?s=612x612&w=0&k=20&c=6I43hKz4CCi__53fB3tYV_4aXfNAiX-Jv74AWkX3b2M=' },
                        { name: 'Hand Grinder', image: 'https://media.gettyimages.com/id/1191399384/photo/worker-polishing-concrete-floor.jpg?s=612x612&w=0&k=20&c=zGQSJB05m3oylaA3ea1I2Im_jJgW2252a9i_Tf3tmus=' }
                    ],
                    outdoor: [
                        { name: 'Floor Scraper', image: 'https://media.gettyimages.com/id/1312157523/photo/construction-worker-use-a-power-tool-to-remove-old-vinyl-tiles-from-a-subfloor.jpg?s=612x612&w=0&k=20&c=6I43hKz4CCi__53fB3tYV_4aXfNAiX-Jv74AWkX3b2M=' },
                        { name: 'Hand Grinder', image: 'https://media.gettyimages.com/id/1191399384/photo/worker-polishing-concrete-floor.jpg?s=612x612&w=0&k=20&c=zGQSJB05m3oylaA3ea1I2Im_jJgW2252a9i_Tf3tmus=' }
                    ]
                },
                medium: {
                     indoor: [
                        { name: 'Floor Grinder', image: 'https://media.gettyimages.com/id/1151934989/photo/concrete-polishing-and-grinding-on-the-floor.jpg?s=612x612&w=0&k=20&c=V-dY2YN5nBDgZg6-md9y3JmgtX4hGYSjR-61c3GKWkI=' },
                        { name: 'Shot Blaster', image: 'https://media.gettyimages.com/id/1343232149/photo/shot-blasting-machine-for-concrete-floor-preparation.jpg?s=612x612&w=0&k=20&c=G_T0eanbQg7z3E13h5JStMh2DNILp_s-j3v-x5g-1O8=' },
                        { name: 'Dust Collector', image: 'https://media.gettyimages.com/id/1310419341/photo/vacuum-cleaner-on-a-constuction-site.jpg?s=612x612&w=0&k=20&c=nCS4t5yudqlyIGt5E0D55IVg-xLzBOq2n-i4h40_uUk=' }
                    ],
                    outdoor: [
                        { name: 'Floor Grinder', image: 'https://media.gettyimages.com/id/1151934989/photo/concrete-polishing-and-grinding-on-the-floor.jpg?s=612x612&w=0&k=20&c=V-dY2YN5nBDgZg6-md9y3JmgtX4hGYSjR-61c3GKWkI=' },
                        { name: 'Shot Blaster', image: 'https://media.gettyimages.com/id/1343232149/photo/shot-blasting-machine-for-concrete-floor-preparation.jpg?s=612x612&w=0&k=20&c=G_T0eanbQg7z3E13h5JStMh2DNILp_s-j3v-x5g-1O8=' }
                    ]
                },
                large: {
                    indoor: [
                        { name: 'Ride-on Floor Grinder', image: 'https://media.gettyimages.com/id/1322207817/photo/a-construction-worker-operating-a-ride-on-power-trowel.jpg?s=612x612&w=0&k=20&c=s-G22C-4I1s-7W2UnuX_3D6-zORn_ANh-gY2_4lVTNE=' },
                        { name: 'Ride-on Scraper', image: 'https://media.gettyimages.com/id/1312157523/photo/construction-worker-use-a-power-tool-to-remove-old-vinyl-tiles-from-a-subfloor.jpg?s=612x612&w=0&k=20&c=6I43hKz4CCi__53fB3tYV_4aXfNAiX-Jv74AWkX3b2M=' },
                        { name: 'Large Dust Collector', image: 'https://media.gettyimages.com/id/1406323145/photo/man-sanding-a-wooden-floor.jpg?s=612x612&w=0&k=20&c=NlH0k7e53R9DmXbC2-z4aQXMx-II65c8Xn8n1ko09qY=' }
                    ],
                    outdoor: [
                        { name: 'Ride-on Floor Grinder', image: 'https://media.gettyimages.com/id/1322207817/photo/a-construction-worker-operating-a-ride-on-power-trowel.jpg?s=612x612&w=0&k=20&c=s-G22C-4I1s-7W2UnuX_3D6-zORn_ANh-gY2_4lVTNE=' },
                        { name: 'Ride-on Scraper', image: 'https://media.gettyimages.com/id/1312157523/photo/construction-worker-use-a-power-tool-to-remove-old-vinyl-tiles-from-a-subfloor.jpg?s=612x612&w=0&k=20&c=6I43hKz4CCi__53fB3tYV_4aXfNAiX-Jv74AWkX3b2M=' }
                    ]
                }
            },
            demolition: {
                small: {
                    indoor: [
                        { name: 'Electric Breaker', image: 'https://media.gettyimages.com/id/1297587428/photo/construction-worker-using-a-jackhammer.jpg?s=612x612&w=0&k=20&c=L_1uv2Ekb32VQP35j4-EVJiN-Xb5c2s_4Kdfg82iNqg=' }
                    ],
                    outdoor: [
                        { name: 'Concrete Saw', image: 'https://media.gettyimages.com/id/184947983/photo/a-construction-worker-cutting-a-seam-in-a-concrete-driveway.jpg?s=612x612&w=0&k=20&c=9y-OrCI-2ZESZ-PqAMB3j8E4N8y-iKUSfNl22e83XfU=' }
                    ]
                },
                medium: {
                    indoor: [
                         { name: 'Demolition Robot', image: 'https://media.gettyimages.com/id/1368487959/photo/robotic-demolition-tool.jpg?s=612x612&w=0&k=20&c=N58-mN6M_f5Ua2h2ccg7j-8_vDDBJ-n22yl-eGvS_iI=' }
                    ],
                    outdoor: [
                        { name: 'Mini Excavator', image: 'https://media.gettyimages.com/id/483570621/photo/mini-excavator-on-a-construction-site.jpg?s=612x612&w=0&k=20&c=t1yvj_1k4f3R2Iq7-v4H-t_t_D7Qj-D8GgJgYf_w_zE=' },
                        { name: 'Skid-Steer Loader', image: 'https://media.gettyimages.com/id/175551989/photo/skid-steer-loader.jpg?s=612x612&w=0&k=20&c=h_EaB2oB-d_wO3Kj-A_Kz_l-z_Qj-D8GgJgYf_w_zE=' }
                    ]
                },
                large: {
                     indoor: [
                        { name: 'Demolition Robot', image: 'https://media.gettyimages.com/id/1368487959/photo/robotic-demolition-tool.jpg?s=612x612&w=0&k=20&c=N58-mN6M_f5Ua2h2ccg7j-8_vDDBJ-n22yl-eGvS_iI=' }
                    ],
                    outdoor: [
                        { name: 'Mini Excavator', image: 'https://media.gettyimages.com/id/483570621/photo/mini-excavator-on-a-construction-site.jpg?s=612x612&w=0&k=20&c=t1yvj_1k4f3R2Iq7-v4H-t_t_D7Qj-D8GgJgYf_w_zE=' }
                    ]
                }
            },
            floor_polishing: {
                small: {
                    indoor: [
                        { name: 'Hand Polisher', image: 'https://media.gettyimages.com/id/1297127980/photo/a-construction-worker-polishing-a-concrete-floor.jpg?s=612x612&w=0&k=20&c=Wf-s-u_y_8-f_yJ_y_Z-c_8_w-y_8-f_yJ_y_Z-c=' },
                        { name: 'Burnisher', image: 'https://media.gettyimages.com/id/157341353/photo/a-man-using-a-floor-buffer.jpg?s=612x612&w=0&k=20&c=Q8-Z_y_z_8-f_yJ_y_Z-c_8_w-y_8-f_yJ_y_Z-c=' }
                    ],
                    outdoor: []
                },
                medium: {
                    indoor: [
                        { name: 'Floor Polisher', image: 'https://media.gettyimages.com/id/1151934989/photo/concrete-polishing-and-grinding-on-the-floor.jpg?s=612x612&w=0&k=20&c=V-dY2YN5nBDgZg6-md9y3JmgtX4hGYSjR-61c3GKWkI=' }
                    ],
                    outdoor: []
                },
                large: {
                    indoor: [
                        { name: 'Ride-on Floor Polisher', image: 'https://media.gettyimages.com/id/1322207817/photo/a-construction-worker-operating-a-ride-on-power-trowel.jpg?s=612x612&w=0&k=20&c=s-G22C-4I1s-7W2UnuX_3D6-zORn_ANh-gY2_4lVTNE=' }
                    ],
                    outdoor: []
                }
            },
            material_conveying: {
                small: {
                    indoor: [
                        { name: 'Portable Conveyor Belt', image: 'https://media.gettyimages.com/id/1205423634/photo/conveyor-belt-at-a-construction-site.jpg?s=612x612&w=0&k=20&c=p_l_O-Y_8-f_yJ_y_Z-c_8_w-y_8-f_yJ_y_Z-c=' },
                    ],
                    outdoor: [
                        { name: 'Portable Conveyor Belt', image: 'https://media.gettyimages.com/id/1205423634/photo/conveyor-belt-at-a-construction-site.jpg?s=612x612&w=0&k=20&c=p_l_O-Y_8-f_yJ_y_Z-c_8_w-y_8-f_yJ_y_Z-c=' },
                    ]
                },
                medium: {
                    indoor: [],
                    outdoor: [
                        { name: 'Construction Dumper', image: 'https://media.gettyimages.com/id/173595443/photo/dumper-truck-on-a-building-site.jpg?s=612x612&w=0&k=20&c=S_L_8-f_yJ_y_Z-c_8_w-y_8-f_yJ_y_Z-c_8=' },
                    ]
                },
                large: {
                    indoor: [],
                    outdoor: [
                        { name: 'Telehandler', image: 'https://media.gettyimages.com/id/182820127/photo/a-telehandler-forklift-in-a-construction-site.jpg?s=612x612&w=0&k=20&c=s_j_8-f_yJ_y_Z-c_8_w-y_8-f_yJ_y_Z-c_8=' },
                    ]
                }
            },
            float_and_levelling: {
                small: {
                    indoor: [],
                    outdoor: [
                        { name: 'Power Trowel', image: 'https://media.gettyimages.com/id/1322207817/photo/a-construction-worker-operating-a-ride-on-power-trowel.jpg?s=612x612&w=0&k=20&c=s-G22C-4I1s-7W2UnuX_3D6-zORn_ANh-gY2_4lVTNE=' }
                    ]
                },
                medium: {
                    indoor: [],
                    outdoor: [
                        { name: 'Ride-on Power Trowel', image: 'https://media.gettyimages.com/id/1322207817/photo/a-construction-worker-operating-a-ride-on-power-trowel.jpg?s=612x612&w=0&k=20&c=s-G22C-4I1s-7W2UnuX_3D6-zORn_ANh-gY2_4lVTNE=' }
                    ]
                },
                large: {
                    indoor: [],
                    outdoor: [
                        { name: 'Laser Screed', image: 'https://media.gettyimages.com/id/1152019401/photo/concrete-screed-and-finishing-the-floor.jpg?s=612x612&w=0&k=20&c=7_V-B-J_y_Z-c_8_w-y_8-f_yJ_y_Z-c_8=' }
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