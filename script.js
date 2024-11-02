// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Set the background color of the scene
renderer.setClearColor(0x26292b); // Example of a light gray background

document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create a 6-sided die (cube)
const geometry = new THREE.BoxGeometry(2.30, 2.30, 2.30); // Increased size
const materials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/image 1.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/image 2.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/image 3.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/image 4.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/image 5.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/image 6.png') })
];
const die = new THREE.Mesh(geometry, materials);
scene.add(die);

// Create dots for each face
const dotGeometry = new THREE.SphereGeometry(0.125, 16, 16); // Small spheres
const dotMaterial = new THREE.MeshBasicMaterial({
    color: 0xbfbfbf // Flat grey color
});


// Positions for the dots at the center of each face
const positions = [
    new THREE.Vector3(0, 0, 1.50),   // Front
    new THREE.Vector3(0, 0, -1.50),  // Back
    new THREE.Vector3(1.50, 0, 0),   // Right
    new THREE.Vector3(-1.50, 0, 0),  // Left
    new THREE.Vector3(0, 1.50, 0),   // Top
    new THREE.Vector3(0, -1.50, 0)   // Bottom
];

const dots = [];

// Create the dots and add them to the scene
positions.forEach((position) => {
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.copy(position);
    scene.add(dot);
    dots.push(dot);
});

camera.position.z = 5; // Adjusted for larger cube

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let momentum = { x: 0, y: 0 }; // Store momentum

// Function to update dot positions based on cube rotation
function updateDotPositions() {
    // Create a quaternion from the cube's rotation
    const rotationQuaternion = new THREE.Quaternion().setFromEuler(die.rotation);

    dots.forEach((dot, index) => {
        // Get the initial position for the dot
        const initialPosition = positions[index].clone();

        // Apply the rotation quaternion to the initial position
        initialPosition.applyQuaternion(rotationQuaternion);

        // Update the dot's position
        dot.position.copy(initialPosition);
    });
}

// Add rotation to the die
function animate() {
    requestAnimationFrame(animate);
    die.rotation.x += momentum.y; // Apply momentum to rotation
    die.rotation.y += momentum.x; // Apply momentum to rotation
    momentum.x *= 0.95; // Dampen momentum
    momentum.y *= 0.95; // Dampen momentum

    updateDotPositions(); // Update dot positions to match the die's rotation

    renderer.render(scene, camera);
}
animate();

// Callback function for showing popups
function showPopup(faceIndex) {
    let title, description, imageSrc;

    switch(faceIndex) {
        case 0:
            title = 'Data Imaginaries: Collaboration with ACMI';
            description = ``;
            imageSrc = 'images/Show/ACMI.png'; // Replace with your image path
            break;
        case 1:
            title = 'Substance 3D Painter';
            description = `I’m skilled in using Substance Painter, which I view as a valuable asset in my 3D modeling and VFX toolkit. I create highly detailed and realistic textures by leveraging features like texture painting, material layering, and smart materials. My proficiency allows me to paint directly onto 3D models, facilitating easier visualization and adjustments. I excel at crafting complex materials through layering and procedural effects, while also ensuring my assets are export-ready for game engines or rendering software. With a solid understanding of UV mapping, I achieve precise texture placement and high-quality results, making me a competitive candidate for roles in texturing and material creation.`;
            imageSrc = 'images/Show/Substance.png'; // Replace with your image path
            break;
        case 2:
            title = 'Blender Animation';
            description = 'This is a detailed description of the visual effects simulation work in Project 3. It focuses on particle simulations, fire, and smoke effects.';
            imageSrc = 'images/Show/Hospital.png'; // Replace with your image path
            break;
        case 3:
            title = 'World Building and Environments';
            description = 'This was a world building and environment project created within Unity. The purpose of this project was to create a world that';
            imageSrc = 'images/Show/World Building.png'; // Replace with your image path
            break;
        case 4:
            title = '3D Modelling in Maya';
            description = 'This is a detailed description of the game asset creation workflow in Project 5. It covers the modeling, UV unwrapping, and texture painting steps.';
            imageSrc = 'images/Show/3D modelling.png'; // Replace with your image path
            break;
        case 5:
            title = 'Lego Animation';
            description = 'This is a detailed description of the architectural visualization work in Project 6. It includes rendering techniques, camera settings, and material creation.';
            imageSrc = 'images/Show/Lego.png'; // Replace with your image path
            break;
        default:
            title = 'ERRORRRRR';
            description = 'This face does not have a specific project associated with it yet.';
            imageSrc = 'images/ACMI.png'; // Replace with your image path
            break;
    }



    // Display the popup with the individualized title and description
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popupDescription').innerText = description;

        // Handle the image display
        const popupImage = document.getElementById('popupImage'); // Ensure you have an <img> element with this ID in your HTML
        popupImage.src = imageSrc; // Set the image source
        popupImage.style.display = 'block'; // Show the image
}

// Add raycasting for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

// Click handler for the dots
function handleClick(event) {
    if (!isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(dots);
        if (intersects.length > 0) {
            // Use the index of the dot to determine which face was clicked
            const dotIndex = dots.indexOf(intersects[0].object);
            showPopup(dotIndex); // Show popup with the corresponding face index
        }
    }
}

// Updated mouse up function
function onMouseUp(event) {
    isDragging = false;
    handleClick(event);
}

// Updated mouse click function
function onMouseClick(event) {
    handleClick(event);
}

// Updated dragging function
function onMouseDrag(event) {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        // Reduce the sensitivity of the rotation
        momentum.x += deltaMove.x * 0.0005; // Apply rotation based on drag
        momentum.y += deltaMove.y * 0.0005; // Apply rotation based on drag
        previousMousePosition = { x: event.clientX, y: event.clientY };
    }
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousemove', onMouseDrag, false);


// Popup close function
document.getElementById('closePopup').addEventListener('click', function () {
    const popup = document.getElementById('popup');
    popup.classList.add('popup-closing'); // Add closing class for animation

    // Wait for the animation to complete before hiding the popup
    setTimeout(function() {
        popup.style.display = 'none'; // Hide popup after animation
        popup.classList.remove('popup-closing'); // Remove closing class for future openings
    }, 500); // Match this duration to the CSS transition duration
});

// Close popup when clicking outside of it
window.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.classList.add('popup-closing'); // Add closing class for animation

        // Wait for the animation to complete before hiding the popup
        setTimeout(function() {
            popup.style.display = 'none'; // Hide popup after animation
            popup.classList.remove('popup-closing'); // Remove closing class for future openings
        }, 500); // Match this duration to the CSS transition duration
    }
});

// Existing mouse functions remain unchanged...
// Touch event functions for dragging and tap detection

window.addEventListener('touchstart', onTouchStart, false);
window.addEventListener('touchmove', onTouchMove, false);
window.addEventListener('touchend', onTouchEnd, false);


function onTouchStart(event) {
    if (event.touches.length === 1) {  // Only consider single-touch interactions
        isDragging = true;
        previousMousePosition = {
            x: event.touches[0].clientX, 
            y: event.touches[0].clientY
        };
    }
    event.preventDefault();  // Prevent default scrolling behavior
}

function onTouchMove(event) {
    if (isDragging && event.touches.length === 1) {
        const deltaMove = {
            x: event.touches[0].clientX - previousMousePosition.x,
            y: event.touches[0].clientY - previousMousePosition.y
        };

        // Apply rotation based on touch movement
        momentum.x += deltaMove.x * 0.0008;  // Sensitivity can be adjusted
        momentum.y += deltaMove.y * 0.0008; 

        previousMousePosition = {
            x: event.touches[0].clientX, 
            y: event.touches[0].clientY
        };
    }
    event.preventDefault();
}

function onTouchEnd(event) {
    isDragging = false;
    handleTouchTap(event);  // Handle taps for popups or menu
    event.preventDefault();
}

function handleTouchTap(event) {
    if (!isDragging) {  // Ensure this is a tap, not a drag
        const touch = event.changedTouches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        
        // Set up raycasting to detect intersections with dots
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(dots);

        if (intersects.length > 0) {
            // Get the dot index to determine which face was tapped
            const dotIndex = dots.indexOf(intersects[0].object);
            showPopup(dotIndex); // Show popup with the corresponding face index
        }
    }
}


// Close all popups function
function closePopups() {
    const popups = document.querySelectorAll('.popup'); // Ensure you have a class for popups
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
}

// Hamburger menu toggle for touch
function toggleMenuTouch(event) {
    const menu = document.getElementById('dropdownMenu');
    // Ensure the menu exists before attempting to toggle
    if (menu) {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    }
    event.preventDefault(); // Prevent default behavior
}

// Add touch event listeners for tap interactions
const hamburgerMenu = document.getElementById('hamburgerMenu');
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('touchend', toggleMenuTouch, false);
}

// Close popup on touch outside
window.addEventListener('touchend', function(event) {
    const popups = document.querySelectorAll('.popup'); // Select all popups
    popups.forEach(popup => {
        if (popup.style.display === 'block' && event.target !== popup) {
            closePopups(); // Close if the touch is outside of any open popup
        }
    });
}, false);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
