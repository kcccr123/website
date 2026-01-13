// Component configuration types
export type ComponentType = 
  | 'tech-stack'
  | 'features'
  | 'demo-link'
  | 'image'
  | 'video'
  | 'wasm'
  | 'wasm-iframe'
  | 'screenshots'
  | 'markdown'
  | 'text-section';

export interface ComponentConfig {
  type: ComponentType;
  props?: Record<string, any>;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  links?: ProjectLink[];
  components?: ComponentConfig[];
}

export const projects: Project[] = [
  {
    id: 9,
    slug: "personal-website-template",
    title: "Personal Website Template",
    description: "A reusable portfolio website template with data-driven projects and experiences that I actively use myself, built so anyone can clone it and update content with modular components.",
    image: "",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/website"
      }
    ],
    components: [
      {
        type: 'tech-stack',
        props: {
          technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Projects and experiences driven by simple data files',
            'Modular component blocks for project detail pages',
            'Timeline-based experience layout with expandable details',
            'Markdown-based writeups for long-form content',
            'Responsive layout with reusable UI components'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About This Template',
          content: `# Personal Website Template

## Why

I wanted a personal website to display personal projects and give people a quick overview of what I've done and do. Alot of my projects, such as MyCraft, were hard to really show off without having the viewer acutally download the executable. 
With this personal website I can deploy the game in browser, allowing anyone access to try it out instantly.

---

## What It Includes

- Projects and experiences pages driven by simple data files
- Modular component blocks (tech stack, features, media, markdown) with flexible props for layout, labels, and embeds
- Timeline-style experience layout with expandable detail cards
- Page transitions and card animations
- Responsive layout with reusable UI components

---

## How to Use

Clone the repo, update the projects and experiences data, and drop your assets into public. Add or reorder detail sections by composing modular components in the project data. The layout updates automatically.

---

## What I Learned

I learned how to keep content and layout separate in a Next.js app and how a modular component system makes content updates fast and safe.`
        }
      }
    ]
  },
  {
    id: 10,
    slug: "memorylab",
    title: "MemoryLab",
    description: "A drag-and-drop web app for teaching Python memory models with guided practice, free-form testing, and automatic grading.",
    image: "/experience-logos/uoftcompsci_logo.jpg",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/jcal13/memory-model-editor"
      }
    ],
    components: [
      {
        type: 'tech-stack',
        props: {
          technologies: ['TypeScript', 'Node.js', 'PostgreSQL'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Scratch-style canvas for building memory diagrams with frames, objects, and values',
            'Practice mode with structured guidance vs test mode for independent checks',
            'Question bank of exercises drawn from UofT course material',
            'Automatic grading with traceable feedback using graph isomorphism',
            'Exports to JSON, SVG, and PNG for reuse and sharing'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About MemoryLab',
          content: `# MemoryLab

## Why

During my first years at UofT, one of the most annoying parts of studying computer science was drawing memory model diagrams by hand, it was always such a slog. I wanted an app that made it easy to practice using a drag-and-drop canvas, removing the repetitive work of constantly drawing and redrawing frames and objects. At the same time, I wanted a way to quickly identify mistakes in my memory models, with clear explanations of why they didn’t match the underlying code.

---

## Interesting Technical Points

### Drag and Drop Sandbox

The core of MemoryLab is a canvas where students drag and drop memory model objects, just like sketching on paper but digital. The canvas supports all the fundamental Python data types: primitives (integers, strings, booleans), collections (lists, tuples, sets, dictionaries), and custom objects. Each element on the canvas can be connected to others via references, creating a visual representation of how Python stores and links data in memory.

The call stack is also part of the canvas. Students can create function frames that represent different scopes in their program, add variables to each frame, and point those variables to values stored elsewhere on the canvas. This mimics how Python's execution model actually works: frames on the call stack hold variable names, and those names reference objects in the heap.

When a student completes their diagram, the entire canvas state is serialized into JSON. Each memory object becomes a node with a unique ID, type, and value. References between objects are captured as ID mappings, creating a directed graph structure. Function frames are serialized with their variable mappings, and the call stack order is preserved. This JSON representation is then sent to the backend API for validation.

The serialization process builds a graph where:
- **Nodes** are memory boxes (integers, lists, objects, etc.) and function frames
- **Edges** are references from variables or container elements to other objects
- **IDs** uniquely identify each object and enable reference tracking

### Validation Algorithm

The validation algorithm treats memory models as graphs and checks for **graph isomorphism**—ensuring there's a one-to-one mapping between the student's canvas drawing and the expected memory state. The expected model is generated by executing the Python code, and the student's job is to accurately draw what the memory looks like at that point in execution.

The algorithm performs several key checks:

1. **Frame Matching**: Compares call stacks to ensure the correct functions exist in the right order
2. **Variable Matching**: Within each frame, checks that all expected variables are present and no unexpected ones exist
3. **Type Checking**: Verifies that each object has the correct type (int vs list vs dict, etc.)
4. **Value Comparison**: For primitives, directly compares values; for containers, recursively validates structure
5. **Bijection Enforcement**: Ensures each ID in the expected model maps to exactly one ID in the student's canvas (no ID reuse or conflicts)
6. **Structural Validation**: For ordered collections (lists/tuples), checks elements in sequence; for unordered collections (sets), finds a valid matching
7. **Orphan Detection**: Identifies objects that exist on the student's canvas but aren't reachable from any frame variable

The algorithm uses a visited map to handle circular references without infinite loops, and maintains bidirectional mappings (expected→student and student→expected) to enforce the bijection property.

#### Example Walkthrough

Given the Python code:

\`\`\`python
a = 1
b = 2
c = a
lst = [a, b]
lst2 = [a, lst, c]
lst[1] = 4
\`\`\`

After running this code, the expected memory state is compared against the student's canvas drawing:

![Memory Model Canvas](/memorylab/image.png)

**How the Validator Checks the Canvas:**

1. **Frame Check**: The expected model has a \`__main__\` frame; the validator confirms the student drew this frame ✓

2. **Variable Check**: The expected model has variables \`a\`, \`b\`, \`c\`, \`lst\`, and \`lst2\`. The validator confirms all are on the student's canvas ✓

3. **Variable \`a\`**: Expected to reference id1 (int with value 1). Validator checks the student's canvas points \`a\` to the same object ✓

4. **Variable \`b\`**: Expected to reference id2 (int with value 2). After the mutation \`lst[1] = 4\`, variable \`b\` still points to 2, but the canvas must show that \`lst\` at index 1 now contains id6 (int with value 4) ✓

5. **Variable \`c\`**: Expected to reference id1, the same object as \`a\` (aliasing). Validator confirms the student drew \`c\` pointing to the same box as \`a\` ✓

6. **Variable \`lst\`**: Expected to point to id4 (a list). The validator recursively checks each element:
   - Index 0 must reference id1 (value 1) ✓
   - Index 1 must reference id6 (value 4, after mutation) ✓

7. **Variable \`lst2\`**: Expected to point to id5 (another list). Validator recursively checks each element:
   - Index 0 must reference id1 (same as \`a\` and \`c\`) ✓
   - Index 1 must reference id4 (the \`lst\` object) ✓
   - Index 2 must reference id1 (same as \`a\`) ✓

8. **Bijection Check**: Ensures the student's ID mappings create a perfect one-to-one correspondence with the expected model (no duplicate IDs or misaligned references) ✓

9. **Orphan Check**: Verifies the student didn't draw extra objects on the canvas that aren't referenced from any variable ✓

The algorithm returns a detailed error report if any check fails, highlighting exactly which object or reference is incorrect on the student's canvas.

### Error Visualization and Feedback System

The validation system doesn't just return a pass/fail result—it provides structured, actionable feedback that helps students understand exactly what's wrong with their canvas. Each error includes:

**Error Structure:**
- **Error Type**: Categorized as TYPE_MISMATCH, VALUE_MISMATCH, MISSING_ELEMENT, UNEXPECTED_ELEMENT, DUPLICATE_ID, ORPHANED_ELEMENT, etc.
- **Element IDs**: Numerical identifiers of the problematic objects on the canvas
- **Path Information**: The chain of references leading to the error (e.g., \`function "__main__" → var "lst" → [1] →\`)
- **Detailed Messages**: Human-readable explanations comparing expected vs. actual state
- **Severity Levels**: Errors, warnings, or info messages to prioritize what needs fixing

**Visual Highlighting:**

The real power of this system is the visual feedback. When an error is detected, the element IDs are used to highlight the incorrect objects directly on the canvas. For example, if a student incorrectly maps variable \`a\` to id3 instead of id1, the system highlights both the variable in the frame and the incorrectly referenced object, making the mistake immediately visible.

For errors involving multiple elements (like missing list elements or aliasing issues), the \`relatedIds\` field ensures all relevant objects are highlighted together, showing the full context of the problem.

**Example Error Messages:**

- **Type Mismatch**: "Type mismatch: function '__main__' → var 'lst' got int, expected list" (Highlights the variable and the incorrectly typed object)
- **Value Mismatch**: "Value mismatch: function '__main__' → var 'a' got 2, expected 1" (Points to the specific primitive value that's wrong)
- **Missing Element**: "Missing element: list[1] id=4" (Highlights the container and indicates which element is missing)
- **Orphaned Element**: "Unmapped box: id=8" (Highlights objects on the canvas that aren't referenced from any variable)
- **Duplicate ID**: "Duplicate ID: 5" (Highlights all objects sharing the same ID, a common student mistake)

All errors are consolidated in a dedicated **Errors Tab**, providing an easy-to-scan list of all problems. This tab acts as a checklist: students can work through each error one by one, fixing issues on the canvas and seeing the highlighted elements update in real-time. The combination of the error list and visual highlighting on the canvas makes debugging intuitive and systematic.

**Iterative Learning:**

This feedback system transforms debugging into a learning opportunity. Instead of trial-and-error guessing, students can:
1. See exactly which objects are problematic on the canvas (visual highlighting)
2. Understand the reference path that led to the error (path information)
3. Compare what they drew vs. what was expected (detailed messages)
4. Fix the specific issue and resubmit immediately

The system handles complex scenarios gracefully: circular references, nested containers, aliasing bugs, and call stack errors all produce clear, localized feedback. Students learn to think about memory models more precisely because the feedback directly reinforces correct mental models.

---

## What I Learned

How to build core interactive experiences in web apps, mainly pages, portals, and tools, building on my previous experience and pushing into more complex UI state and interactions.

Designing and implementing custom algorithms to validate user work. In particular, building a validation system that compares two memory models, checks structural equivalence, and handles tricky cases like shared references and cycles, while keeping results consistent, covering edge cases, and avoiding noisy false positives.

Improved web design and development skills, including layout, spacing, and overall UI clarity, while also working closely with backend systems to keep the experience fast, reliable, and easy to iterate on.

How to write clearer, more actionable feedback so students can understand mistakes and fix them faster, and how to integrate that feedback into a clean, compact UI that stays out of the way and helps them work through issues one problem at a time.`
        }
      }
    ]
  },
  {
    id: 1,
    slug: "ue-reinforcement-learning",
    title: "UE Reinforcement Learning",
    description: "A UE5 plugin and Python toolkit for training and running reinforcement learning agents inside Unreal projects.",
    image: "/ue-reinforcement/reinforcement.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/ue-reinforcement-learning"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://www.youtube.com/watch?v=M2tfriFZwVQ',
          text: 'Watch Overview Video'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Unreal Engine 5', 'C++', 'Python', 'ONNX Runtime', 'Gymnasium', 'Stable-Baselines3'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Unreal Engine plugin with Blueprint-callable training and inference bridges',
            'Single and multi-environment support for reinforcement learning loops',
            'Python training module built on Gymnasium and Stable-Baselines3',
            'ONNX Runtime integration for running models inside the engine'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About UE Reinforcement Learning',
          content: `# UE Reinforcement Learning

## Why

I wanted a streamlined way to train and run reinforcement learning agents inside Unreal Engine while keeping the workflow accessible to both C++ developers and Blueprint users.

## Interesting Technical Points

- Unreal Engine plugin with Blueprint-callable bridge classes for training and inference
- TCP handshake between Unreal and a Python module to exchange observation and action sizes
- Gymnasium wrappers and a Stable-Baselines3 training script with vectorized env support
- ONNX Runtime inference interface for running exported models locally

## What I Learned

I learned how to design a clean UE plugin API, keep a Python training loop synchronized with an engine simulation, and ship an inference path that works in real time.`
        }
      }
    ]
  },
  {
    id: 2,
    slug: "mycraft",
    title: "MyCraft",
    description: "A 3D voxel-based game engine built from scratch with C++ and OpenGL, compiled to WebAssembly for browser-based gameplay. Features procedural terrain generation, dynamic lighting, basic physics, and basic mechanics such as breaking and placing blocks.",
    image: "/mycraft/Mycraft.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/myCraft"
      }
    ],
    components: [
      {
        type: 'wasm-iframe',
        props: {
          embedUrl: '/wasm/MyCraft/mycraft-embed.html',
          title: 'MyCraft',
          caption: 'Click to focus. Use WASD to move, mouse to look around, click to break blocks, right-click to place blocks. Press ESC for options.',
          width: 1200,
          height: 800
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['C++', 'OpenGL', 'GLFW', 'GLM', 'Emscripten', 'WebAssembly', 'ImGui'],
          title: 'Technology'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Procedural terrain generation with Perlin noise',
            'Chunk-based world streaming and LOD system',
            'Real-time lighting with directional and point lights',
            'Physics-based player movement and collision detection',
            'Block placement and destruction mechanics',
            'Frustum culling for optimized rendering',
            'ImGui-based debug UI and controls'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# MyCraft Game Engine

## Why

This is an ongoing personal learning project to understand GPU APIs like OpenGL by building a Minecraft-style voxel sandbox and shipping something playable.

---

## Interesting Technical Points

### Terrain Generation

Terrain generation is refreshingly straightforward: for each chunk, the system samples a 2D simplex noise function across the X-Z plane and uses the result as a height value. Simplex noise produces smooth, continuous random values, perfect for creating natural-looking landscapes without precomputation.

##### **The Simplex Noise Function**

The core terrain generation happens in \`Map::genHeightMap()\`, which runs when a chunk is created:

\`\`\`cpp
GLfloat heightV = glm::simplex(glm::vec2{ 
    (x + (Constants::CHUNK_SIZE * xCord)) / 64.0f, 
    (y + (Constants::CHUNK_SIZE * yCord)) / 64.0f 
});
heightV += 1;      // Shift range from [-1, 1] to [0, 2]
heightV /= 2;      // Normalize to [0, 1]
heightV *= 16;     // Scale to [0, 16] block heights
\`\`\`

The division by 64.0 controls the **frequency** of the noise. This is the scaling factor. Smaller values (like 32) create more variation and rugged terrain, while larger values (like 128) create gentle rolling hills. The current value of 64 is a middle ground that produces interesting, explorable landscapes.

The algorithm:
1. Sample \`glm::simplex()\` at the world coordinates scaled by frequency
2. The function returns values in the range [-1, 1]
3. Shift and scale to [0, 16], giving us integer heights in blocks
4. Fill all blocks up to that height with stone (ID 1)

This means each horizontal position in the world has a deterministic height. Because simplex noise is continuous, adjacent positions produce similar heights, creating smooth terrain rather than random spikes.


---

### Culling/Mesh Generation/Optimizations

Rendering a voxel world naively would bring any GPU to its knees. Imagine trying to draw every face of every block in a world. Even a modest view distance would mean millions of triangles per frame. The solution lies in a combination of smart data structures and aggressive culling techniques that together turn an impossible rendering problem into something that runs smoothly even in a browser.

##### **The Chunk System: Dividing and Conquering**

The world is divided into **chunks** (cubes of 32x32x32 blocks each). This might seem arbitrary, but it's a sweet spot: large enough that we're not managing thousands of tiny regions, but small enough that we can load and unload them quickly as the player moves around.

The engine maintains a **3x3 chunk grid** (9 chunks total) centered on the player. As you walk forward, the chunks behind you unload, and new chunks ahead generate and load in. This creates the illusion of an infinite world while keeping memory usage constant. Each chunk tracks its position (posX, posY) and stores a 3D array of block IDs. Each entry is a simple integer: -1 means "air" (no block).

When the player crosses a chunk boundary, the system detects the change in chunk coordinates and triggers a refresh:

$$
\\text{chunkX} = \\left\\lfloor \\frac{\\text{playerX}}{32} \\right\\rfloor, \\quad \\text{chunkY} = \\left\\lfloor \\frac{\\text{playerZ}}{32} \\right\\rfloor
$$

This simple calculation tells us which chunk the player is standing in, and if it's different from last frame, we shift the chunk window and regenerate meshes.

##### **Face Culling: Don't Draw What You Can't See**

Here's a key insight: if a block is completely surrounded by other blocks, you'll never see any of its faces. Drawing them would be wasted work. **Face culling** solves this by checking each block's six neighbors before adding faces to the mesh.

The \`checkBlockNeighbours()\` method in the Chunk class looks in all six cardinal directions (up, down, left, right, front, back). For each direction, if the adjacent position is either outside the chunk bounds or contains air, that face is exposed and needs to be rendered. Otherwise, we skip it entirely.

This single optimization typically reduces vertex count by 50-80% in a typical terrain. Interior blocks contribute nothing to the final mesh. Only surface blocks matter.

The mesh generation loop looks like this conceptually:

\`\`\`cpp
for each block in chunk:
    if block is not air:
        check six neighbors
        for each exposed face:
            add 4 vertices (quad)
            add 6 indices (two triangles)
\`\`\`

Each face gets exactly 4 vertices and 6 indices (forming two triangles in a quad). We maintain running lists of vertices and indices, only appending when a face is actually visible. The final mesh is uploaded to the GPU as a single Vertex Buffer Object (VBO) and Element Buffer Object (EBO), letting OpenGL batch-render the entire chunk in one draw call.

##### **Frustum Culling: Clipping the Camera's View**

Even with face culling, we'd still be sending geometry for chunks behind the camera or way off to the side. **Frustum culling** fixes this by testing whether blocks are inside the camera's view frustum (the pyramid-shaped volume that represents everything the camera can actually see).

The Player class extracts six frustum planes from the combined projection and view matrices:

$$
\\text{Frustum} = \\{\\text{left, right, top, bottom, near, far}\\}
$$

Each plane is represented as $\\vec{p} = (A, B, C, D)$, where the plane equation is:

$$
Ax + By + Cz + D = 0
$$

To test if a point is inside the frustum, we check its signed distance to each plane:

$$
\\text{distance} = \\vec{p}_{xyz} \\cdot \\vec{point} + D
$$

If the distance is negative for any plane, the point is outside the frustum and gets culled. Only blocks that pass all six plane tests get added to the render list.

In practice, we test block positions before converting them to triangles. The \`getPlayerChunk()\` method in Map iterates through all loaded blocks, tests each one with \`pointInsideFrustum()\`, and only includes visible blocks in the final triangle list sent to the raycasting system and rendering pipeline.

##### **Dynamic Chunk Streaming**

When you place or destroy a block, the affected chunk's mesh is marked dirty and regenerated on the next frame. The \`addBlockToChunk()\` and \`removeBlockFromChunk()\` methods update the internal block array, increment or decrement the block count, and trigger a mesh rebuild via \`createChunkMesh()\`.

This regeneration is expensive (iterating 32,768 positions and checking neighbors), but it only happens when chunks change, not every frame. For typical gameplay with occasional block edits, this works perfectly. Future optimizations could use greedy meshing (merging adjacent faces into larger quads) to further reduce vertex count, but the current system already achieves smooth 60fps even in the browser.

##### **Putting It All Together**

When you move through the world, a cascade of optimizations keeps the frame rate high:

1. **Chunk streaming** loads only the 3×3 grid around you, unloading distant chunks
2. **Face culling** skips interior block faces, reducing mesh size by ~70%
3. **Frustum culling** skips chunks and blocks outside the camera view
4. **Mesh batching** combines all visible faces in a chunk into a single draw call
5. **Distance sorting** orders blocks front-to-back for efficient depth testing

The result is a voxel engine that can handle thousands of blocks without breaking a sweat, all while running in WebAssembly in your browser. What seems like magic is really just careful bookkeeping: knowing what to draw, and more importantly, what not to draw.

---

### Collision System

Movement in a voxel world seems simple (just don't let the player walk through blocks). But implementing collision detection that feels natural, prevents glitches, and runs efficiently is surprisingly complex. The naive approach fails in ways that quickly become apparent, so MyCraft uses a multi-stage collision system that balances accuracy with performance.

##### **The Naive Approach: Static AABB Overlap**

The simplest collision system would be to represent the player as an axis-aligned bounding box (AABB) and check if it overlaps any block every frame. An AABB is just a 3D rectangle defined by minimum and maximum coordinates on each axis:

$$
\\text{AABB} = \\{(x_{\\text{min}}, y_{\\text{min}}, z_{\\text{min}}), (x_{\\text{max}}, y_{\\text{max}}, z_{\\text{max}})\\}
$$

Testing if two AABBs overlap is straightforward. They collide if they overlap on all three axes:

$$
\\text{overlap}_x \\land \\text{overlap}_y \\land \\text{overlap}_z
$$

Each frame, you'd loop through every block and test if the player's box touches it. If so, undo the movement. Simple, right?

##### **Why Naive AABB Fails**

This approach has two critical flaws that make it unusable in practice:

**Problem 1: Tunneling**

At high speeds or low frame rates, the player can move more than one block in a single frame. Static overlap detection only checks the player's position at discrete moments. If you move fast enough, you can teleport through a thin wall. Imagine moving 3 units per frame but checking collision only at the start and end positions. You'd pass right through a 1-unit-thick wall without ever detecting overlap.

**Problem 2: Inefficiency**

A voxel world with a 3x3 chunk grid (9 chunks x 32^3 blocks) contains thousands of blocks. Testing the player against every single block every frame means thousands of AABB overlap tests. Most of them are completely unnecessary because the blocks are nowhere near the player. Even if each test is cheap, doing it thousands of times per frame kills performance.

These aren't just theoretical concerns. Without solving tunneling, players clip through floors when falling. Without solving efficiency, frame rates tank in dense areas. We need a smarter approach.

##### **The Solution: Swept AABB with Multi-Phase Detection**

MyCraft's collision system solves both problems through a combination of **continuous collision detection** (swept AABB) and **spatial culling** (broad/narrow phases). Instead of checking if boxes overlap *right now*, we calculate *when* they'll overlap during movement, and we filter out distant blocks before doing expensive calculations.

##### **Phase 1: Broad Phase – Spatial Filtering**

Before doing any precise collision math, we need to answer a simple question: which blocks could *possibly* collide with the player this frame?

The broad phase expands the player's bounding box by their velocity over the frame, creating a "swept volume" that encompasses their entire path of movement:

$$
\\text{swept}_x = [x_{\\text{min}}, x_{\\text{max}} + (v_x \\cdot \\Delta t)]
$$

Any block that doesn't intersect this swept volume can be safely ignored. If the player's entire movement path doesn't touch it, there's no way they'll collide with it.

\`\`\`cpp
std::vector<glm::vec3> Player::broadSweep(std::vector<glm::vec3> blockCords, float delta)
\`\`\`

This function iterates through all loaded blocks (typically 1,000 to 3,000) and tests each one with six simple comparisons (two per axis). Blocks that pass all three axes get added to a candidate list. This typically filters the set down to 5 to 50 blocks, a **95%+ reduction** in narrow-phase calculations.

The key insight is that this test is **conservative**—it might include blocks that won't actually collide, but it never excludes blocks that will. Better to check a few extra blocks than miss a collision.

##### **Phase 2: Narrow Phase – Swept AABB Intersection**

Now comes the mathematical heart of the system. For each candidate block from the broad phase, we calculate exactly *when* the player will collide and from *which direction*.

The swept AABB algorithm treats collision as a continuous problem. We're not asking "do these boxes overlap?" but rather "at what time $t \\in [0, 1]$ during this frame do they first touch?"

\`\`\`cpp
float Player::sweeptAABB(std::vector<glm::vec3> blockCords, glm::vec3& normalForces, float delta)
\`\`\`

For each axis independently, we calculate the inverse entry and exit distances:

$$
\\text{if } v_x > 0: \\quad x_{\\text{entry}} = \\frac{\\text{block}_x - \\text{player}_{\\text{max}_x}}{v_x \\cdot \\Delta t}
$$

This gives us a time (as a fraction of the frame) when the player enters the block's X-range. We repeat for Y and Z:

$$
t_{\\text{entry}} = \\max(x_{\\text{entry}}, y_{\\text{entry}}, z_{\\text{entry}})
$$

The player only collides if they enter all three axes simultaneously. The collision time is the maximum entry time across all axes. This handles complex geometry like corners and edges naturally. If $t_{\\text{entry}} > 1$, the collision happens after this frame (ignore it). If $t_{\\text{entry}} < 0$, we're already inside (resolve immediately).

The axis with the earliest entry time tells us the collision normal. If Y-entry came first, we hit a horizontal surface (floor or ceiling). This normal is crucial for the next phase.

##### **Phase 3: Movement and Sliding Response**

Once we know when and where the player will collide, we move them up to that point and handle the remaining time with sliding:

\`\`\`cpp
void Player::detectCollison(float delta, std::vector<glm::vec3> blockCords)
\`\`\`

If the collision time is 0.3, we move 30% of the intended distance, then "slide" for the remaining 70% of the frame. Sliding uses vector projection to remove the velocity component perpendicular to the collision surface:

$$
\\vec{v}_{\\text{slide}} = \\vec{v} - (\\vec{v} \\cdot \\hat{n}) \\hat{n}
$$

If you hit a wall while walking diagonally, the component parallel to the wall survives. You slide along it instead of stopping dead. This gives the satisfying "smooth slide" feel that makes movement natural.

\`\`\`cpp
void Player::detectCollisonHelper(float delta, std::vector<glm::vec3> blockCords, 
                                   glm::vec3 normalForces, float remainingtime)
\`\`\`

The system recursively resolves collisions with the new direction. If sliding causes you to hit another block (like sliding down a staircase), it detects and resolves that too. This continues until either there are no more collisions or the remaining time drops below a threshold.

##### **Phase 4: Grounding Detection**

Finally, we need to know if the player is standing on solid ground (for jump validation and gravity logic):

\`\`\`cpp
void Player::grounded(std::vector<glm::vec3> blockCords)
\`\`\`

This checks if the player's bottom bounding box overlaps any block's top surface. It's currently a brute-force O(n) check against all blocks, noted in the code as a candidate for optimization. It could be replaced with a spatial hash or checking only blocks directly beneath the player.

##### **Input to World Update**

When you press a movement key, the entire collision pipeline executes in milliseconds:

1. **Input**: WASD creates a movement vector, gravity affects vertical velocity
2. **Broad Phase**: Filter thousands of blocks to ~20 candidates based on swept volume
3. **Narrow Phase**: Calculate exact collision time and normal for each candidate
4. **Movement**: Move player by displacement × collision time (stopping at the first hit)
5. **Sliding**: Project remaining velocity onto collision plane and recursively resolve
6. **Grounding**: Update jump-enabled state based on floor contact
7. **Output**: Player position updated smoothly, no clipping, no tunneling

This system ensures movement feels natural. You can run along walls, slide down slopes, and jump precisely without ever clipping through geometry. The math prevents tunneling even at high speeds (swept AABB catches collisions along the entire path), and the broad phase keeps it performant (checking only nearby blocks). It's what makes MyCraft feel like a real game instead of a buggy tech demo.

---

### Raycasting System

The raycasting system is the core interaction mechanism for block selection, destruction, and placement. It's what makes clicking on a distant block feel responsive and precise. At its heart is the **Ray class**, a lightweight utility that encapsulates all ray-triangle intersection logic and provides the mathematical foundation for turning a 2D mouse click into meaningful 3D world interaction.

#### Ray Class Architecture

The Ray class is simple but powerful. It holds just the essential data needed to represent an infinite line through 3D space:

**Class Members:**
- **Origin** ($\\vec{o}$): The starting point of the ray, positioned at the player's camera
- **Direction** ($\\hat{d}$): A normalized vector pointing from the camera through the mouse cursor position into the world

**Class Methods:**
- **rayIntersectsBlock(Triangle, float&)**: The workhorse method that implements the Möller-Trumbore algorithm. It tests whether the ray actually hits a given triangle, and if so, calculates the distance to the intersection point and stores it in the reference parameter
- **rayNormalCheck(Triangle)**: A validation method that uses dot products to determine if we're looking at the front face of a triangle. This prevents weird behavior like placing blocks on the back side of a wall

#### Implementation Example: Player Class Integration

The Player class is where the Ray class gets put to work. It orchestrates the raycasting pipeline through a series of methods:

\`\`\`cpp
Ray GetMouseRay(GLFWwindow* window, 
                const glm::mat4& viewMatrix, 
                const glm::mat4& projectionMatrix);
\`\`\`
This method takes your mouse position on screen and converts it into an actual 3D ray pointing into the world.

\`\`\`cpp
bool castRayForBlock(Ray ray, 
                     const glm::vec3& blockPosition, 
                     const std::vector<Triangle>& triangles);
\`\`\`
When you left-click to destroy a block, this method tests the ray against all triangles in a block and returns true on the first hit. We don't need to know which triangle, just that something was hit.

\`\`\`cpp
int castRayForBlockPlace(Ray ray, 
                         const glm::vec3& blockPosition, 
                         std::vector<Triangle> triangles);
\`\`\`
For placement (right-click), we need more precision. This method sorts triangles by distance, tests them, and returns the index of the closest front-facing triangle hit. This lets us calculate exactly where the new block should go.

When a mouse button is pressed, the Player calls \`GetMouseRay()\`, then loops through visible blocks (each made of 12 triangles), calling the appropriate cast function to either destroy or place.

#### From Screen Coordinates to World Space

Imagine looking at your screen: the mouse position is just pixels. But we need to know where in 3D space that pixel points to. This requires transforming coordinates through several spaces, each with its own rules.

We start with mouse coordinates $(m_x, m_y)$ in screen space (just regular pixel positions). First, we normalize these to the range $[-1, 1]$ (called Normalized Device Coordinates, or NDC), which is the standard space OpenGL uses:

$$
x_{ndc} = \\frac{2m_x}{width} - 1, \\quad y_{ndc} = 1 - \\frac{2m_y}{height}
$$

Now we have a point on the near plane of our camera's view frustum: $\\vec{r}_{clip} = (x_{ndc}, y_{ndc}, -1, 1)$. But we need the direction vector, not just a point. To get that, we transform this into eye space (relative to the camera) by applying the inverse of the projection matrix. The projection matrix compresses 3D into 2D for the screen; inverting it does the opposite:

$$
\\vec{r}_{eye} = P^{-1}\\vec{r}_{clip}
$$

We set the depth to $-1$ and the w-component to $0$ (this is a direction, not a position, so the camera doesn't affect it):

$$
\\vec{r}_{eye} = (r_x, r_y, -1, 0)
$$

We're still in camera space though. To get to world space, we apply the inverse view matrix, which transforms relative-to-camera coordinates into world coordinates:

$$
\\vec{r}_{world} = V^{-1}\\vec{r}_{eye}
$$

Finally, we normalize this to get a unit-length direction vector:

$$
\\hat{d} = \\frac{\\vec{r}_{world}}{||\\vec{r}_{world}||}
$$

Combining this with the camera's position as the origin, we get our ray: $R(t) = \\vec{o} + t\\hat{d}$ where $t \\geq 0$ represents the distance along the ray.

#### Testing Intersection with Triangles

Once we have a ray, we need to know if it actually hits anything. Blocks in MyCraft are made of triangles (two per face), and we need a fast algorithm to check if the ray passes through any of them.

Enter the **Möller-Trumbore algorithm**. It's a clever, numerically stable way to compute ray-triangle intersection. Given a ray and triangle vertices ($\\vec{v}_0, \\vec{v}_1, \\vec{v}_2$), we first compute the triangle's edge vectors:

$$
\\vec{e}_1 = \\vec{v}_1 - \\vec{v}_0, \\quad \\vec{e}_2 = \\vec{v}_2 - \\vec{v}_0
$$

The algorithm works by solving for where the ray intersects the infinite plane containing the triangle. We compute a determinant to check if the ray is nearly parallel to the triangle plane:

$$
\\vec{h} = \\hat{d} \\times \\vec{e}_2, \\quad a = \\vec{e}_1 \\cdot \\vec{h}
$$

If $|a|$ is very small (less than some epsilon), the ray is essentially parallel and we bail out early. No intersection.

Assuming there's an intersection with the plane, we now need to check if it's actually within the triangle's bounds. We use barycentric coordinates: a way of expressing any point in the triangle as a weighted combination of the three vertices. If the weights are all between 0 and 1, we're inside:

$$
f = \\frac{1}{a}, \\quad \\vec{s} = \\vec{o} - \\vec{v}_0, \\quad u = f(\\vec{s} \\cdot \\vec{h})
$$

The first barycentric coordinate, $u$, must be in $[0, 1]$:

$$
\\vec{q} = \\vec{s} \\times \\vec{e}_1, \\quad v = f(\\hat{d} \\cdot \\vec{q})
$$

The second coordinate, $v$, must also be in $[0, 1]$, and together $u + v$ must not exceed 1:

If all checks pass, we compute the actual distance to the intersection:

$$
t = f(\\vec{e}_2 \\cdot \\vec{q})
$$

If $t > \\epsilon$ (small positive threshold), we have a valid intersection at position $\\vec{p} = \\vec{o} + t\\hat{d}$ along the ray.

#### Ensuring We Hit What We See

Here's a subtle issue: triangles have two sides. When you're inside a block looking outward, you might accidentally "hit" the back side of a face. To prevent this, and to make placement intuitive (you should only place blocks on faces you're looking at), we validate that the ray is hitting a front-facing surface.

Every triangle has a surface normal (a vector perpendicular to the plane). We compute it from the edge vectors:

$$
\\hat{n} = \\frac{\\vec{e}_1 \\times \\vec{e}_2}{||\\vec{e}_1 \\times \\vec{e}_2||}
$$

If the normal and the ray direction point in roughly the same direction (their dot product is positive), we're hitting the front face:

$$
\\text{dot} = \\hat{n} \\cdot \\hat{d} > 0
$$

For block placement, once we've confirmed we hit a valid triangle, we calculate where the new block should go by moving one unit away from the hit triangle along the inverted normal:

$$
\\vec{p}_{new} = \\vec{p}_{hit} + \\hat{n}
$$

(Note: We also convert between OpenGL's coordinate system and the game's block-space coordinates here, since they use different axis conventions.)

#### From Click to World Change

When you click, a cascade of transformations and checks unfolds in milliseconds. Your mouse position becomes a ray. That ray is tested against dozens of triangles, each check validating intersection distance, barycentric coordinates, and surface orientation. The closest valid hit is identified, and if left-clicking, a DestroyPacket is queued to remove that block and add it to inventory. If right-clicking, an AddPacket places a new block adjacent to the hit. The next frame, the chunk mesh regenerates, and the change appears in your world. All of this happens because of a tiny math pipeline that turns a pixel coordinate into 3D action.

---

### ImGui

Dear ImGui handles in-game UI rendering including an inventory system with 20 slots, a selected item display, an options menu, and instruction overlays. It integrates directly into the render loop via GLFW and OpenGL, letting UI and game state update seamlessly each frame.

---

## What I Learned

I learned how chunking and face culling reduce draw calls, how to make collisions feel smooth with swept AABB and sliding, and how to integrate UI and interaction tools into a real-time render loop.`,
          title: 'About MyCraft'
        }
      }
    ]
  },
  {
    id: 6,
    slug: "figure-aggregator",
    title: "Figure Aggregator",
    description: "A Shopify-style online store for toys and models with automated data aggregation.",
    image: "/figure-aggregator/figurecenter.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/figure-aggregator"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://figure-center.netlify.app/',
          text: 'View Live Demo'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MySQL', 'Kubernetes', 'Docker', 'Google Cloud'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Unified storefront for multiple collectible figure retailers',
            'Browsing, filtering, and search functionality',
            'Featured items displayed on homepage',
            'Automated data aggregation with Puppeteer scraper',
            'Deployed on Google Kubernetes Engine with Cloud SQL'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# Figure Aggregator

## Why

I wanted a single storefront for collectible figures and a project that exercised scraping, storage, and deployment in a full-stack system.

---

## Interesting Technical Points

- Puppeteer scraper running as a Kubernetes CronJob to refresh catalog data
- GKE load balancer and Ingress routing to containerized Express APIs
- Cloud SQL Proxy sidecar for secure MySQL connectivity
- React frontend deployed on Netlify with search and filters

---

## What I Learned

I learned how to keep scraped data fresh, how Kubernetes routing and scaling work in practice, and how to separate frontend, API, and data concerns.`,
          title: 'About Figure Aggregator'
        }
      }
    ]
  },
  {
    id: 3,
    slug: "receipt-scanner",
    title: "Receipt Scanner Mobile App",
    description: "A mobile app that lets users quickly store receipts with a photo and tracks spending for better budgeting.",
    image: "/reciept-scanner/pipeline/non greyscale non fix angle.jpg",
    links: [
      {
        label: "View App Repo",
        url: "https://github.com/kcccr123/receipt-scanner"
      },
      {
        label: "View Backend Repo",
        url: "https://github.com/kcccr123/receipt-scanner-backend"
      }
    ],
    components: [
      {
        type: 'image',
        props: {
          src: '/reciept-scanner/image1.png',
          alt: 'Receipt Scanner app logo',
          width: 1000,
          height: 1000,
          className: 'w-full',
          imageClassName: 'object-contain'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'NodeJS', 'Gunicorn', 'Flask', 'Kubernetes', 'Docker', 'Google Cloud', 'Python', 'PyTorch', 'OpenCV'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Organize receipts into groups for easy tracking and management',
            'Upload existing images or take photos with built-in camera',
            'Machine learning-powered receipt processing with YOLOv8, RCNN, and BART models',
            'Alternative GPT-4o pipeline for receipt inference',
            'Deployed on Google Kubernetes Engine for scalable processing',
            'Local storage with SQLite for offline access'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# Receipt Scanner Mobile App

## Why

I wanted a faster way to capture receipts and track spending while learning how to build an end-to-end ML product.

---

## Interesting Technical Points

### Inference pipeline development journey

**The Naive Approach**

The initial pipeline was straightforward: YOLOv8 for object detection → Custom-trained RCNN for OCR → JSON output. YOLOv8 was trained to detect and bracket three classes of objects on receipts: individual items, subtotals, and totals. Once bounding boxes were established, each cropped region was fed through a custom RCNN model that performed optical character recognition. The RCNN would output text strings, which were then structured into JSON format containing item names, prices, and the receipt total.

![Original receipt capture before preprocessing](/reciept-scanner/pipeline/original.jpg)

**The Problem**

This approach failed in real-world conditions. Receipts are notoriously difficult to photograph consistently—they fold, crumple, get tilted, and have varying lighting conditions. These physical deformations caused YOLOv8 to struggle with accurate bounding box predictions. A receipt photographed at an angle would confuse the model's spatial understanding. Inconsistent lighting and color variations from different stores' thermal printers further degraded detection accuracy. The model was trained on relatively clean, flat receipt images, and couldn't generalize to the messy reality of actual usage.

![Perspective distortion and lighting variation in real-world captures](/reciept-scanner/pipeline/non%20greyscale%20non%20fix%20angle.jpg)

**Geometric Correction and Greyscale Preprocessing**

To address the perspective and lighting issues, I implemented a geometric correction algorithm in \`fix_angle.py\`. This became the crucial first step in the pipeline. Here's how it works mathematically:

\`\`\`python
def wrap_perspective(img, rect):
    (tl, tr, br, bl) = rect  # Top-left, top-right, bottom-right, bottom-left corners
    
    # Calculate the target width using Euclidean distance
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    
    # Calculate the target height
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    
    # Define destination points for a perfect rectangle
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
    
    # Compute perspective transformation matrix
    M = cv2.getPerspectiveTransform(rect, dst)
    
    # Apply the warp
    return cv2.warpPerspective(img, M, (maxWidth, maxHeight))
\`\`\`

The algorithm works in several stages:

1. **Edge Detection**: Apply Gaussian blur to reduce noise, then use Canny edge detection to find strong edges in the image. A morphological dilation operation connects nearby edge fragments.

2. **Contour Extraction**: Use OpenCV's \`findContours\` to identify closed shapes. Filter contours by area (must be > 1000 pixels) and sort by size to find the largest candidate regions.

3. **Rectangle Approximation**: For each contour, calculate the perimeter and use the Ramer-Douglas-Peucker algorithm (\`cv2.approxPolyDP\`) with an epsilon of 3.2% of the perimeter to simplify the contour into a polygon. A receipt should approximate to exactly 4 points—a quadrilateral.

4. **Perspective Transformation**: Once we have the four corner points of the receipt, we calculate the optimal output dimensions by measuring the Euclidean distances between corners. The perspective transform matrix $M$ maps the tilted quadrilateral to a perfect upright rectangle. This matrix satisfies:

$$
\\begin{bmatrix} x' \\\\ y' \\\\ 1 \\end{bmatrix} = M \\cdot \\begin{bmatrix} x \\\\ y \\\\ 1 \\end{bmatrix}
$$

where $(x, y)$ are source coordinates and $(x', y')$ are destination coordinates in the corrected image.

5. **Greyscale Conversion**: After geometric correction, the image is converted to greyscale and then to binary using adaptive thresholding with a Gaussian-weighted sum. This eliminates color variations from different printer types and normalizes the visual information for the downstream models.

\`\`\`python
def bw_scanner(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    T = threshold_local(gray, 21, offset=5, method="gaussian")
    return (gray > T).astype("uint8") * 255
\`\`\`

![Greyscale and adaptive threshold output](/reciept-scanner/pipeline/greyscale.png)

**Updated Pipeline**

Input Image → Geometric Correction (angle fix + perspective warp) → Greyscale + Adaptive Thresholding → YOLOv8 Detection → RCNN OCR → JSON Output

![Preprocessed receipt with model detections](/reciept-scanner/pipeline/greyscale%20plus%20model.png)

This significantly improved YOLOv8's detection accuracy. The model now received consistently oriented, flat, normalized images regardless of how the user photographed the receipt.

**BART-based Error Correction**

Even with geometric preprocessing, the RCNN OCR model still made character-level errors. Thermal receipt paper has inconsistent print quality, ink can smudge, and certain character combinations (like "0" vs "O", "1" vs "l") are inherently ambiguous. The OCR might output "M1LK" instead of "MILK" or "APPIE" instead of "APPLE".

To solve this, I fine-tuned a BART (Bidirectional and Auto-Regressive Transformers) model as a sequence-to-sequence error correction system. BART is a denoising autoencoder—it's trained to reconstruct clean text from corrupted input.

**BART Training Process**

The training data was synthetically generated from a dataset of real product names scraped from Walmart receipts. For each ground-truth product name, I created corrupted versions by:

\`\`\`python
def misspell(word):
    if len(word) > 1:
        op = random.choice(['rmv', 'rpl'])  # Remove or replace
        pos = random.randint(0, len(word) - 1)
        if op == 'rmv':
            return word[:pos] + word[pos+1:]
        elif op == 'rpl':
            return word[:pos] + random.choice(string.ascii_letters) + word[pos+1:]
\`\`\`

- **Character deletion**: Randomly remove characters from words
- **Character replacement**: Swap characters with random letters
- **Word shuffling**: Reorder words in the product name
- **Noise injection**: Append random character sequences to simulate OCR artifacts

For each product name, 13 corrupted variations were generated, creating a dataset where the input is noisy OCR output and the target is the clean product name. The model was trained for 5 epochs with a learning rate of $3 \\times 10^{-5}$, using AdamW optimization.

**BART Architecture in Action**

When the RCNN outputs a string like "WHQLE M1LK 2X GAL", BART tokenizes it, processes it through its encoder-decoder architecture, and outputs the corrected sequence "WHOLE MILK 2% GAL". The model learns contextual patterns—if it sees "M1LK" near "GAL" and "2%", it infers "MILK" based on semantic context.

\`\`\`python
def runBartPrediction(lst):
    result = []
    for item in lst:
        input_text = " ".join(item)
        tokenized_input = tokenizer(input_text, return_tensors="pt", 
                                    padding="max_length", max_length=60, 
                                    truncation=True)
        with torch.no_grad():
            predicted_ids = model.generate(
                input_ids=tokenized_input["input_ids"],
                attention_mask=tokenized_input["attention_mask"],
                max_length=60
            )
        predicted_text = tokenizer.decode(predicted_ids[0], skip_special_tokens=True)
        result.append(predicted_text)
    return result
\`\`\`

**Final Pipeline**

Input Image → Geometric Correction & Greyscale → YOLOv8 Bounding Box Detection → RCNN OCR on each bounding box → BART Error Correction → Structured JSON Output

The final output is a JSON object with the following structure:

\`\`\`json
{
  "0": {"name": "WHOLE MILK 2%", "price": "4.99"},
  "1": {"name": "BREAD WHEAT", "price": "3.49"},
  "2": {"name": "##SUBTOTAL", "price": "8.48"},
  "3": {"name": "##TOTAL", "price": "9.03"}
}
\`\`\`

![Structured extraction examples from the pipeline](/reciept-scanner/pipeline/examples.jpg)

Each receipt item includes its corrected name and extracted price, with special entries for subtotals and totals. This structured data is then consumed by the mobile app to populate the receipt details and calculate spending group totals.

**Alternative: GPT-4o Pipeline**

For comparison and faster development iteration, I also built a GPT-4o-based pipeline that takes a base64-encoded image and directly returns structured JSON. While this approach is simpler and handles edge cases well due to GPT-4o's strong vision and language understanding, it incurs higher per-request costs and latency. The in-house pipeline remains the primary production system, with GPT-4o serving as a fallback and benchmarking tool.

---

### Cloud Deployment

- Deployed inference on GKE with a mobile client sending images to the server
- Containerized services with Docker and Gunicorn for scalable processing

---

### App Features

**Spending Groups**

Spending groups are the primary way you organize and view your expenses. A spending group is a collection of receipts (purchases) from a specific date. When you scan receipts, each one gets added to a group for that date. This structure lets you see spending patterns at different levels: zoom out to see total spending by day, zoom in to see which stores you visited, or drill down to individual item details.

![Spending groups and analytics view](/reciept-scanner/image1.png)

**How It's Organized**

1. **Groups**: A shopping trip or shopping focus on a specific date. "Grocery run Jan 15", "Weekly errands Jan 20". Each has a date, a name, and a total. This is the container for an entire shopping session. When you ask the app how much did I spend on Jan 10, it's looking at groups.

2. **Receipts**: Individual stores visited during that shopping trip. On your grocery run on Jan 15, you hit Whole Foods and Target. That's two receipts in one group. Each receipt represents one checkout at one store, with its own store name and total.

3. **Items**: The actual line items from each receipt. At Whole Foods you bought milk, bread, eggs. At Target you bought shampoo, socks. These come straight from the receipt text recognition.

**Intuitive Spending**

The organization mirrors how you actually remember your spending. At the highest level, you recall the trip itself: "I went shopping on Jan 15" or "my weekly grocery run." Groups are named after what you did, so you can call it "Costco run" or "Target errands" to make each shopping session meaningful and easy to recall. At the next level down, you remember which stores you visited during that trip. On your grocery run, you hit Whole Foods and Target. That's two separate receipts, two separate store totals. Finally, you can drill into each store to see the individual items you bought. At Whole Foods you grabbed milk, bread, and eggs. At Target you picked up shampoo and socks. This three-level hierarchy matches your natural memory: trip, then stores, then items. You can zoom out to see your total spending for a day, or zoom in to remember exactly what you bought and where.

**How the Scanner Fits In**

Scanning a receipt does one thing: it creates a receipt in a group for that date. You point the camera at a receipt. The ML pipeline (YOLOv8 to find the text, RCNN to read it, BART to clean it up) pulls out items and prices. That becomes a new receipt. It gets assigned to today's group automatically. Your totals update. Done.

![Camera capture and receipt intake flow](/reciept-scanner/image2.png)

One tap, a second of processing, and your spending is logged and organized. No typing. No remembering. The app does the grunt work, you just point and shoot. That is the whole point. It is fast enough that you actually do it instead of ignoring receipts like everyone else does.

**Spending Analytics**

Beyond just organizing receipts, the app provides visual analytics to understand your spending patterns. A time-series line graph shows your spending trends across days and weeks, making it easy to spot whether you're on pace with your budget or if certain periods have unusual activity. The graph is grouped by date, so you can see at a glance which days you spent the most and which were quieter. This helps you recognize patterns: maybe you always spend more on Fridays, or you notice certain weeks are consistently higher than others. The analytics aren't just raw numbers either. You can view your spending broken down by store frequency, see which stores you visit most often, and track how much you're spending at each location over time. Combined with the three-level hierarchy of groups, receipts, and items, this gives you both the macro view (am I spending too much?) and the micro view (what am I actually buying?). The data builds up automatically as you scan receipts, so insights emerge naturally without any additional logging or manual tracking.

---

## What I Learned

I learned how data quality and preprocessing drive model accuracy, how to coordinate multiple models in one pipeline, and how to deploy ML services that integrate cleanly with a mobile app.`,
          title: 'Project Details'
        }
      }
    ]
  },
  {
    id: 4,
    slug: "stud-io",
    title: "Stud.io",
    description: "An intelligent flashcard generation app that uses AI and reinforcement learning to create personalized study materials from lecture notes, adapting to each student's learning needs.",
    image: "/stud.io/hackathon thing.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/stud-io-nsbehacks-2025"
      },
      {
        label: "View on Devpost",
        url: "https://devpost.com/software/stud-io"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: "https://www.youtube.com/watch?v=-O3PqlDuvXU",
          text: "View Demo Video"
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Next.js', 'React', 'Node.js', 'Python', 'Flask', 'OpenAI', 'MongoDB'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'AI-powered flashcard generation from lecture notes',
            'Reinforcement learning (Q-learning) for personalized learning',
            'Vector search for rapid retrieval of similar questions',
            'Multiple question types: multiple choice, fill in the blanks',
            'Study Mode focusing on weak areas',
            'Review Mode for general concept building',
            'Real-time performance tracking and notifications'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          content: `# Stud.io

## Why

We wanted to build a study tool that adapts to each student instead of giving everyone the same flashcards.

---

## Interesting Technical Points

- Q-learning loop that prioritizes weak topics based on performance
- Vector search in MongoDB Atlas for fast retrieval of similar prompts
- LLM-driven generation and grading for instant feedback
- Next.js frontend with a Flask backend handling study sessions

---

## What I Learned

I learned how to connect reinforcement learning signals to a user-facing loop, how embeddings change content retrieval, and how to manage latency when LLMs are in the critical path.`,
          title: 'About Stud.io'
        }
      }
    ]
  },
  {
    id: 5,
    slug: "ue-flight-tracker",
    title: "UE Flight Tracker",
    description: "An Unreal Engine app that visualizes active commercial flights on a world-scale map with live flight data and interactive camera controls.",
    image: "/ue-flightsim/ue-flightsim-image-projectcard.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/ue-flight-tracker"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://drive.google.com/drive/folders/1m73Ae3LnU7konZcTfJIdXvsenJ6avuYU?usp=sharing',
          text: 'Download Executable'
        }
      },
      {
        type: 'image',
        props: {
          src: '/ue-flightsim/ue-flightsim-image.png',
          alt: 'UE Flight Tracker visualization'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Unreal Engine', 'C++', 'C#', 'Python', 'SQLite', 'Cesium', 'Flight Radar API'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'World-scale visualization of active commercial flights using Cesium',
            'Flight data ingestion with Flight Radar API and local SQLite caching',
            'Search and filter flights by ICAO code or geographic coordinates',
            'Interactive camera controls for tracking and inspecting aircraft'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About UE Flight Tracker',
          content: `# UE Flight Tracker

## Why

I wanted to combine real-world flight data with a 3D engine to make global air traffic feel tangible and explorable.

---

## Interesting Technical Points

- Flight Radar API ingestion paired with a Cesium globe for world-scale positioning
- SQLite database updated at launch for quick browsing and filtering
- Unreal Engine UI flow for ICAO search and coordinate lookup
- Python tooling for data access and preprocessing

---

## What I Learned

I learned how to synchronize live data with a real-time rendering pipeline and how to handle coordinate systems and scale in a 3D globe environment.`
        }
      }
    ]
  },
  {
    id: 7,
    slug: "cat-detector",
    title: "Cat Detector",
    description: "A personal learning project exploring image classification with scikit-learn SVMs and a simple GUI for cat detection.",
    image: "/cat-detector/cat card.jpg",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/cat-detector"
      }
    ],
    components: [
      {
        type: 'image',
        props: {
          src: '/cat-detector/cute images.jpg',
          alt: 'Cute cat photos',
          caption: 'Bonus images of my cat.'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Python', 'Scikit-learn', 'SVM', 'Image Processing'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'First foray into ML and classical classifiers',
            'SVM-based model for binary cat image classification',
            'Lightweight GUI that prompts for image upload and runs inference'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About Cat Detector',
          content: `# Cat Detector

## Why

This was my first focused project in ML classifiers, and I wanted to start with a classic SVM before moving into deep learning.

## Interesting Technical Points

- Scikit-learn pipeline using a Support Vector Machine for image classification
- Basic preprocessing to normalize images into consistent model inputs
- Simple GUI that prompts for an upload and runs inference locally

## What I Learned

I learned how preprocessing affects classifier performance and how to structure a small ML workflow end-to-end.`
        }
      }
    ]
  },
  {
    id: 8,
    slug: "2d-collision-simulation",
    title: "2D Collision Simulation",
    description: "A high school physics project that simulates 2D collisions between two point masses using conservation of momentum.",
    image: "/2dcollision/day1.png",
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/kcccr123/2d-collision-simulation"
      }
    ],
    components: [
      {
        type: 'demo-link',
        props: {
          url: 'https://py3.codeskulptor.org/index.html#user310_usvH3PnnvR_22.py',
          text: 'Run in CodeSkulptor3'
        }
      },
      {
        type: 'tech-stack',
        props: {
          technologies: ['Python', 'tkinter', 'CodeSkulptor3'],
          title: 'Technology Stack'
        }
      },
      {
        type: 'features',
        props: {
          title: 'Key Features',
          items: [
            'Interactive setup for two point masses in 2D',
            'Direction, velocity, and mass controls for each object',
            'Collision response based on conservation of momentum',
            'Ported from CodeSkulptor simplegui to tkinter'
          ]
        }
      },
      {
        type: 'markdown',
        props: {
          title: 'About 2D Collision Simulation',
          content: `# 2D Collision Simulation

## Why

This physics final project was built to make conservation of momentum interactive instead of purely theoretical.

---

## Interesting Technical Points

- Two-point-mass collision simulation with user-defined mass and velocity
- Interactive setup for direction vectors and starting positions
- Ported from CodeSkulptor simplegui to a standalone tkinter app

---

## What I Learned

I learned how to translate physics equations into a working simulation and how small UI decisions make a math-heavy project more approachable.`
        }
      }
    ]
  },
];
