let scene, camera, renderer;
let uniforms;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.Camera();
    camera.position.z = 1;

    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        time: { type: 'f', value: 1.0 },
        resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: 'void main() { gl_Position = vec4(position, 1.0); }',
        fragmentShader: `
            precision lowp float;

            uniform vec2 resolution;
            uniform float time;

            const int complexity = 11; // More complexity leads to more "waves" and calculations
            const float wavelength = 4.0; // Wavelength affects the "speed" of the waves

            void main() {
                vec2 p = (10.0 * gl_FragCoord.xy - resolution) / max(resolution.x, resolution.y);
                for (int i = 1; i <= complexity; i++) {
                    float phase = time / wavelength;
                    float fi = float(i);
                    p = vec2(
                        p.x + fi * sin(fi * p.y + phase),
                        p.y + fi * sin(fi * p.x + phase)
                    );
                }
                float baseColor = 3.0 / 10.0;
                float variation = 0.05 * sin(p.x * p.y); // subtle animation effect
                gl_FragColor = vec4(baseColor + variation, baseColor + variation, baseColor + variation * 0.98, 1.0);
            }
        `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    updateRendererSize(); // Set the renderer size to match the borders
    document.getElementById('Background').appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function updateRendererSize() {
    const borderElement = document.querySelector('.border'); // Get the border element
    const rect = borderElement.getBoundingClientRect(); // Get its dimensions
    renderer.setSize(rect.width, rect.height); // Set the renderer size to match the border dimensions
    uniforms.resolution.value.set(rect.width, rect.height); // Update the resolution uniform
}

function onWindowResize() {
    updateRendererSize(); // Update the renderer size on window resize
}

function animate() {
    uniforms.time.value += 0.01; // Change this value for faster or slower animation
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
