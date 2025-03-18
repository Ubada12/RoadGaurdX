import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const threeRef = useRef(null);
  
  // Add state for tracking current image indices
  const [imageIndices, setImageIndices] = useState({
    drainage: 0,
    lowLying: 0,
    rainfall: 0
  });

  // Image arrays for each card
  const cardImages = {
    drainage: [
      new URL('../assets/prevent_hazards_and_accidents.jpg', import.meta.url).href,
      new URL('../assets/prevent_hazards_and_accidents(1).webp', import.meta.url).href
    ],
    lowLying: [
      new URL('../assets/identify_high_risk_areass.png', import.meta.url).href,
      new URL('../assets/identify_high_risk_areas.jpg', import.meta.url).href
    ],
    rainfall: [
      new URL('../assets/analyze_traffic_weather.jpg', import.meta.url).href,
      new URL('../assets/analyze_traffic_weather(1).webp', import.meta.url).href
    ]
  };

  // Handler for cycling through images
  const cycleImage = (category) => {
    setImageIndices(prev => ({
      ...prev,
      [category]: (prev[category] + 1) % cardImages[category].length
    }));
  };

  // Optional: Add image dimension validation
  const validateImageDimensions = (img) => {
    return new Promise((resolve) => {
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        // Ideal aspect ratio is around 16:9 or 4:3
        if (aspectRatio < 1 || aspectRatio > 2) {
          console.warn(`Image ${img.src} has non-optimal aspect ratio: ${aspectRatio}`);
        }
        resolve();
      };
    });
  };

  // Optional: Preload and validate images
  useEffect(() => {
    Object.values(cardImages).flat().forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
      validateImageDimensions(img);
    });
  }, []);

  useEffect(() => {
    // Scene Setup
    const scene = new THREE.Scene();
    
    // Make camera aspect ratio match container
    const container = threeRef.current;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    // Make renderer match container size
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement); // Store reference to renderer element
    
    // Add resize handler
    const handleResize = () => {
      const newAspect = container.clientWidth / container.clientHeight;
      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    let videoTexture = null;
    let plane = null;

    // Video setup
    const video = document.createElement("video");
    video.src = new URL('../assets/landing.webm', import.meta.url).href;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    // Initialize video and scene elements
    video.addEventListener('loadedmetadata', () => {
      videoTexture = new THREE.VideoTexture(video);
      videoTexture.format = THREE.RGBAFormat;
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.encoding = THREE.sRGBEncoding;

      // Calculate plane size to maintain video aspect ratio
      const videoAspect = video.videoWidth / video.videoHeight;
      let planeWidth = 8; // Base width
      let planeHeight = planeWidth / videoAspect;

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const material = new THREE.MeshBasicMaterial({
        map: videoTexture,
        transparent: true,
        side: THREE.DoubleSide,
      });

      plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
      
      // Adjust camera position based on plane size
      camera.position.z = planeHeight * 0.7 + 3;
      
      video.play();
    });

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light);

    // Mouse Effect (Parallax Effect)
    window.addEventListener("mousemove", (event) => {
      let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      if (plane) {
        plane.rotation.y = mouseX * 0.1;
        plane.rotation.x = mouseY * 0.1;
      }
    });

    // Camera & Controls
    new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (video.readyState === video.HAVE_ENOUGH_DATA && videoTexture) {
        videoTexture.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Safely remove renderer element
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      
      // Clean up video
      if (video) {
        video.pause();
        video.remove();
      }
      
      // Dispose of Three.js resources
      if (videoTexture) {
        videoTexture.dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Welcome to RoadGuardX</h2>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/2">
              <p className="text-lg mb-4">
                RoadGuardX is an innovative platform designed to transform road safety and traffic analysis. 
                By leveraging advanced AI technology with explainability, XAI-ROADS provides real-time insights 
                into road conditions, traffic violations, and accident risks—helping to create safer 
                and smarter roads for everyone.
              </p>
              <p className="text-lg mb-4">
              Our mission is to enhance road safety by delivering accurate, transparent, and actionable insights 
              that empower drivers, authorities, and decision-makers. XAI-ROADS bridges the gap between technology 
              and trust, ensuring users have a clear understanding of traffic conditions, risks, and preventive measures.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-xl text-blue-700 my-8">
              "Our platform not only detects road hazards but also helps you stay safe with AI-driven real-time alerts and predictive analysis."
              </blockquote>
              <Button 
                onClick={() => navigate('/predictions')}
                className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                Explore Our Platform
              </Button>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-8 block">
              <div 
                ref={threeRef} 
                className="rounded-lg shadow-lg w-full aspect-video overflow-hidden flex items-center justify-center bg-gray-900/10"
              ></div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg">
          At RoadGuardX, our vision is to make roads safer and smarter using AI and Explainable AI to accurately analyze traffic 
          and road conditions. We aim to help authorities and drivers make better decisions, prevent accidents, 
          and improve overall road safety.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Goals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Prevent Road Hazards & Accidents With AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                We aim to identify and mitigate road hazards, such as potholes and unsafe conditions, before they cause accidents. 
                By analyzing real-time data, we help ensure safer and smoother travel. we detect traffic violations, reckless driving, 
                and accident-prone zones to provide real-time alerts and proactive safety measures.
                </p>
                <div 
                  onClick={() => cycleImage('drainage')}
                  className="mt-4 h-72 relative cursor-pointer overflow-hidden rounded-lg group"
                >
                  <img 
                    src={cardImages.drainage[imageIndices.drainage]}
                    alt="Drainage system visualization"
                    className="absolute inset-0 w-full h-full object-contain md:object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Focus on High-Risk Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                Certain roads and intersections pose higher risks. Our platform continuously analyzes 
                and maps these danger zones, helping authorities and drivers take necessary precautions.
                </p>
                <div 
                  onClick={() => cycleImage('lowLying')}
                  className="mt-4 h-72 relative cursor-pointer overflow-hidden rounded-lg group"
                >
                  <img 
                    src={cardImages.lowLying[imageIndices.lowLying]}
                    alt="Low-lying areas visualization"
                    className="absolute inset-0 w-full h-full object-contain md:object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Analyze Traffic & Weather Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                By studying traffic patterns and weather conditions, RoadGaurdX Helps in reducing congestion and improving 
                traffic movement by analyzing patterns, detecting bottlenecks, and optimizing signal timings for better 
                road efficiency. It Also predicts potential risks and ensures timely alerts, improving overall road safety 
                and traffic management.
                </p>
                <div 
                  onClick={() => cycleImage('rainfall')}
                  className="mt-4 h-72 relative cursor-pointer overflow-hidden rounded-lg group"
                >
                  <img 
                    src={cardImages.rainfall[imageIndices.rainfall]}
                    alt="Rainfall trends visualization"
                    className="absolute inset-0 w-full h-full object-contain md:object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">System Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-Driven Road Safety Analysis",
                description:
                  "Powered by advanced AI models, RoadGuardX detects road hazards, traffic violations, and accident-prone areas by analyzing real-time traffic patterns, road conditions, and environmental factors.",
              },
              {
                title: "Real-Time Monitoring",
                description:
                  "Stay informed with live monitoring of traffic flow, road safety risks, and congestion levels. Our system continuously tracks and analyzes road conditions for the most accurate and up-to-date insights.",
              },
              {
                title: "Explainable AI",
                description:
                  "Unlike traditional AI systems, RoadGuardX provides clear, understandable explanations for its predictions, helping users and authorities make informed decisions with confidence.",
              },
              {
                title: "Instant Safety Alerts",
                description:
                  "Receive real-time alerts about road hazards, reckless driving, and accident-prone zones. Our system ensures you stay aware and take preventive actions before risks escalate.",
              },
              {
                title: "User-Friendly Interface",
                description:
                  "Designed for ease of use, RoadGuardX offers an intuitive dashboard accessible to everyone, from traffic authorities to everyday commuters, providing insights into road safety at a glance.",
              },
              {
                title: "Interactive Visualization Tools",
                description:
                  "Explore live traffic heat maps, road risk analysis, and AI-powered insights through interactive tools that help drivers and decision-makers optimize road usage and safety strategies.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home;