// Initialize Lucide icons
lucide.createIcons();

// Plant tree animation
document.getElementById('plant-tree').addEventListener('click', () => {
  const treeContainer = document.querySelector('.tree-container');
  const tree = document.querySelector('.tree');
  
  // Clone the tree
  const newTree = tree.cloneNode(true);
  
  // Random position within container bounds
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 200);
  
  // Create wrapper for new tree
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.left = x + 'px';
  wrapper.style.top = y + 'px';
  wrapper.style.transform = 'scale(0)';
  wrapper.style.transition = 'transform 0.5s ease-out';
  wrapper.appendChild(newTree);
  
  // Add to document
  document.body.appendChild(wrapper);
  
  // Trigger animation
  setTimeout(() => {
    wrapper.style.transform = 'scale(1)';
  }, 50);
  
  // Clean up after max trees
  const trees = document.querySelectorAll('.tree');
  if (trees.length > 10) {
    trees[1].parentElement.remove(); // Remove oldest tree (skip original)
  }
});

// Glitch effect intensifies on hover
const glitch = document.querySelector('.glitch');
glitch.addEventListener('mouseover', () => {
  glitch.style.animation = 'glitch 0.5s infinite';
});

glitch.addEventListener('mouseout', () => {
  glitch.style.animation = 'glitch 2s infinite';
});

// Random coordinate drift
const coordinates = document.querySelectorAll('.coordinate');
setInterval(() => {
  coordinates.forEach(coord => {
    const original = coord.textContent;
    const parts = original.split(/[°'"]/);
    const degrees = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    const seconds = parseFloat(parts[2]);
    
    // Slightly adjust seconds
    const newSeconds = (seconds + (Math.random() * 0.2 - 0.1)).toFixed(1);
    coord.textContent = `${degrees}°${minutes}'${newSeconds}"${parts[3]}`;
  });
}, 2000);