const fs = require("fs");
const path = require("path");

// Paths
const sourceDir = path.join(__dirname, "node_modules/three-globe/example/img");
const targetDir = path.join(__dirname, "public/textures");

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Files to copy
const files = [
  { source: "earth-blue-marble.jpg", target: "earth-blue-marble.jpg" },
  { source: "earth-topology.png", target: "earth-topology.png" },
  { source: "earth-water.png", target: "earth-water.png" },
];

// Copy each file
files.forEach((file) => {
  try {
    const sourceFile = path.join(sourceDir, file.source);
    const targetFile = path.join(targetDir, file.target);

    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`✓ Copied ${file.source} to ${targetFile}`);
    } else {
      console.error(`× File not found: ${sourceFile}`);
    }
  } catch (error) {
    console.error(`Error copying ${file.source}: ${error.message}`);
  }
});

console.log("Texture copying complete!");
