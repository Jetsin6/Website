// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get the saved theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Force particle canvas to redraw with new colors
            const canvas = document.getElementById('particle-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }
});

// Data for each work item
const workItems = {
  "Christmas Cure": {
    title: "Christmas Cure",
    video: "https://www.youtube.com/embed/R5ZHqVZNaTM",
    
    description: 
      `<p>This work was made in Blender a few months before Christmas. The story tells the tale of a father declining from cancer with his son beside him, bearing the burden of a dying father during Christmas.</p>
    
      <p>The moral of this story was to show that not everyone in the world is allowed the privilege and capabilities to spend time with family and friends.
        Many people in the world don’t have the privilege to have gifts during Christmas, colorful Christmas trees, warm fires, or even basic edible food on the table in front of them. 
        Those who do often take these precious things for granted, especially children who may not yet know any better.</p>
      
      <p>Full Chrismas Cure Script: <a href="https://docs.google.com/document/d/17IUKI2T7_i9oVHHYpLo7g62OQKrqKLTUCYjr83RtyEM/edit?usp=sharing" target="_blank">here</a>.</p>
      <p>All models were created by Justin Vachel Myat in a voxel visual aesthetic which was then fully animated in Blender.</p>`,
    image: "images/Show/Models.png"
  },
  


  "Planet Traprino": {
    title: "Planet Traprino",
    video: "https://www.youtube.com/embed/zll2mkOL1Tk",
    description: `<p>The focus for this project was to practice world building and environment building skills in Unity. the reason for unity is because having an explorable environment forces the creation of the scenery to look more intentional all around compared to a static video or static photo of just one enviornment.</p>
    <p>These skills would be: </p> 
    <p> - Learning how to gather large quantities of assets that were required for such a large scale enviornment.</p>
    <p> - Combining assets to make it look like all structures belong together via the use of substance painter. </p>
    <p> - To build a map that users can explore that didn't feel so fake and out of place.</p>
    
    <p>Thus in which a world was born that was rich with history, architecture, life and death. This is the world of Traprino.</p>
    <br>
    <p>
    Traprino is a utopian world where empathy, compassion, and education are the foundation of society. 
    Every child receives an education tailored to their strengths, ensuring they contribute meaningfully to the world. 
    With no military forces and all resources directed towards research, technology, and education, the people of Traprino live in unity, 
    advancing both socially and technologically. Their space exploration program flourishes, 
    even successfully colonizing a small moon that offers a glimpse of their peaceful existence. 
    </p>

    <p>
    However, Traprino's idealistic society is shattered when the Korbans, a brutal and primitive underground civilization, emerge from beneath the planet’s surface. The Korbans, adapted to harsh cave conditions, are physically superior, with strong, muscular bodies and heat-resistant skin. 
    They launch a savage attack, obliterating the surface-dwelling Traprinoseans and leaving only a few survivors who flee to the moon. The Korbans retreat back to the depths of the planet after wiping out the surface population, having lost interest in their conquered world.
    </p>

    <p>
    Fifty years later, the remaining Traprinoseans live peacefully on the moon, enjoying their advanced technology and self-sufficiency.
    Meanwhile, Traprino's surface lies in ruin—a wasteland of overgrown trees, destroyed buildings, and abandoned infrastructure. 
    The once-thriving city is now a shadow of its former self, with crashed vehicles, collapsed skyways, and the remnants of the Traprinoseans' once-flourishing civilization scattered throughout the desolate landscape. 
    The Korbans remain below, having claimed victory but showing no further interest in the surface world.
    </p>
    
    <p>
    The story begins with the player, aboard a rocket on Traprino’s moon, 
    being tasked by Command HQ to investigate the origins of the Korbans. Upon landing on the desolate surface of Traprino, 
    the player discovers skeletal remains of the fallen Traprinoseans and a W.A.I.C.C. device, which holds voice notes describing the Korbans’ 
    rampage. As they explore, the player finds more scattered voice logs offering an audio perspective on the invasion. 
    The investigation leads to a scientist's lab, where the player uncovers research and blood samples revealing the shocking truth: 
    the Korbans and the Traprinoseans are the same species.
    </p>
    
    <p>Here are images of the building which were textured in Substance 3D Painter including images of the environment behind the curtains.</p>
    `,

    image: "images/Show/TrapBoard.png"
  },


  "Camera Modeling": {
    title: "Camera Modeling",
    description: `<p>This was my first ever 3D model that I have created within Maya. It demonstrates my ability to 3D model objects, texturing objects as well as adding lighting in sketchfab during upload</p>
                 <p>This was the full process of 3D modelling including creating the model itself, UV unwrapping and wrapping, materials and texturing and last but not least rendering within ARNOLD</p> 
    <p>The greatest skill acquired throughout this project was the amazing UV unwrapping that was created</p>
    <p>From the start, the visual art style has focused on a painted texture aesthetic, emphasizing visible brush strokes and paint splatters. This style was chosen to create a contrast between the traditional method of capturing images and the modern approach of photography. 
    By blending these two contrasting elements into a diorama—a format that captures a still image in another unique way—It was aimed to evoke both a traditional and contemporary vibe in my work. Plain black would have been too boring so I wanted to go with a cold blue colour to yet again contrast against the naturally warm wood grain of the table that it is sitting on.</p>
    <p>
    <p>The link to the 3D model on SketchFab is <a href="https://docs.google.com/document/d/17IUKI2T7_i9oVHHYpLo7g62OQKrqKLTUCYjr83RtyEM/edit?usp=sharing" target="_blank">here</a>.</p>`,
    image: "images/Show/Camera.png"
  },


  "ACMI Collaboration": {
    title: "ACMI Collaboration",
    video: "https://www.youtube.com/embed/moYfjHNTQZg",
    description: `<p>ACMI's exhibition journey consistently captivates visitors with an array of intriguing exhibits that explore both historical and contemporary themes. 
    However, the conclusion of this otherwise thrilling experience falls flat, with the final exhibit—the Constellation—feeling anticlimactic. 
    Originally designed to provide an overview of the visitor's path through the exhibition and highlight connections to related topics, the Constellation fails to deliver a satisfying end.
    A massive screen displays a sparse pattern of dots, while an interactive table presents bubbles representing the exhibits the visitor tapped. 
    Unfortunately, this conclusion lacks the sense of interactivity or closure expected after such an engaging experience.</p>
    <p>The purpose of this project is to recreate and remaster the constellation conclusion within ACMI. This was a group collaborated effort in which my role was to create all of the 3D models and create the 3D visual animation.</p>
    
    <p>This visualisation is a representation of the visitor's journey in ACMI. The trams are a representation of each individual person that taps their ACMI lens on the console and sends it to the big screen.
    Each tram carriage determines a tap on an exhibit and the length of each tram carriage represents the length of time the visitor had stayed on that particular exhibit.
    the journey of the trams is the journey of the individual within their experience in ACMI this was a data visualisation goal in which we had to easily visualise and determine the data based on the visuals that was occuring on screen.
    </p>
    
    <p>Click <a href="https://miro.com/app/board/uXjVLGmnOuE=/?share_link_id=640208789721" target="_blank">here</a> to view full Anatomy Map and read all of its details.</p>`,
    image: "images/Show/Map.png"

  },

};
function showPopup(workKey) {
  const work = workItems[workKey];
  
  if (work) {
    // Set the popup content dynamically
    document.getElementById("popup-title").innerHTML = work.title;
    document.getElementById("popup-description").innerHTML = work.description;
    document.getElementById("popup-image").src = work.image;

    // Check if a YouTube video exists
    const videoElement = document.getElementById("popup-video");
    if (work.video) {
      // Set the src for the iframe (YouTube embed link)
      videoElement.src = work.video;
      videoElement.style.display = "block"; // Make video visible
    } else {
      videoElement.style.display = "none"; // Hide video if no link is provided
    }

    // Show the popup
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
    
    // Add an event listener to close the popup if clicked outside
    popup.addEventListener("click", function(event) {
      if (event.target === popup) {
        closePopup();
      }
    });
  }
}


  
  function closePopup() {
    const popup = document.getElementById("popup");
    const videoElement = document.getElementById("popup-video");
  
    // Hide the popup
    popup.style.display = "none";
  
    // Pause the video if any
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }
  
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create mailto link with form data
            const mailtoLink = `mailto:justinvachel66@gmail.com?subject=Contact from ${name}&body=${message}%0A%0AFrom: ${name}%0AEmail: ${email}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Clear form
            contactForm.reset();
        });
    }
});
  