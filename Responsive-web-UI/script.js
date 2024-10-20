

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const body = document.querySelector('body');

// Toggle mobile menu on hamburger click
hamburger.addEventListener('click', (e) => {
    mobileMenu.classList.toggle('active');
    e.stopPropagation(); // Prevent body click event from triggering when menu is opened
});

// Close mobile menu on close button click
closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking outside of it
body.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && !e.target.closest('.mobile-menu')) {
        mobileMenu.classList.remove('active');
    }
});

// Prevent menu close when clicking inside the menu
mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});









document.querySelectorAll('.details-btn').forEach(button => {
  button.addEventListener('click', () => {
      const details = button.nextElementSibling;
      const isVisible = details.style.display === 'block';
      details.style.display = isVisible ? 'none' : 'block';
      details.style.transition = 'display 0.5s ease';
      
      // Close others
      document.querySelectorAll('.details').forEach(detail => {
          if (detail !== details) detail.style.display = 'none';
      });
  });
});









function expandCard(card) {
    const allCards = document.querySelectorAll('.timeline-card');
    allCards.forEach(c => {
      // Collapse all other cards
      if (c !== card) {
        c.classList.remove('expanded');
      }
    });
    
    // Toggle the clicked card
    card.classList.toggle('expanded');
  }

  // Close expanded card when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = event.target.closest('.timeline-card');

    if (!isClickInside) {
      const expandedCards = document.querySelectorAll('.timeline-card.expanded');
      expandedCards.forEach(c => {
        c.classList.remove('expanded');
      });
    }
  });







  
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const productContainer = document.querySelector('.category-container');

prevBtn.addEventListener('click', () => {
    productContainer.scrollLeft -= 300; // Adjust the value to scroll as per your card's width
});

nextBtn.addEventListener('click', () => {
    productContainer.scrollLeft += 300; // Adjust the value to scroll as per your card's width
});


       
 // Set up the scene, camera, and renderer
 let scene = new THREE.Scene();
 let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 let renderer = new THREE.WebGLRenderer({ alpha: true });  // Alpha true for transparent background
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.getElementById('globe-container').appendChild(renderer.domElement);

 // Add Orbit Controls
 let controls = new THREE.OrbitControls(camera, renderer.domElement);

 // Create the Earth Globe
 let geometry = new THREE.SphereGeometry(5, 64, 64); // Higher segments for smoother globe
 let texture = new THREE.TextureLoader().load('earth.jpeg'); // Use high-quality Earth texture
 let material = new THREE.MeshStandardMaterial({ map: texture });
 let globe = new THREE.Mesh(geometry, material);
 scene.add(globe);

 // Adjust camera position
 camera.position.z = 15;

 // Add Stars (Particle system as background stars)
 let starGeometry = new THREE.BufferGeometry();
 let starCount = 4000; // Adjust for denser starfield
 let starPositions = new Float32Array(starCount * 3);

 for (let i = 0; i < starCount; i++) {
   starPositions[i * 3] = (Math.random() - 0.5) * 2000; // X position
   starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // Y position
   starPositions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // Z position
 }

 starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

 let starMaterial = new THREE.PointsMaterial({
   color: 0xffffff,
   size: 0.5,
 });

 let starField = new THREE.Points(starGeometry, starMaterial);
 scene.add(starField);

 // Add Lighting
 const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
 directionalLight.position.set(10, 10, 10); // Adjust light position to illuminate the globe
 scene.add(directionalLight);

 const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
 scene.add(ambientLight);

 // Animation loop
 function animate() {
   requestAnimationFrame(animate);

   // Rotate the globe
   globe.rotation.y += 0.002;

   // Slow rotation of the stars for dynamic effect
   starField.rotation.y += 0.0005;

   controls.update();
   renderer.render(scene, camera);
 }

 animate();

 // Resize handling
 window.addEventListener('resize', () => {
   renderer.setSize(window.innerWidth, window.innerHeight);
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
 });