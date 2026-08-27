# Visualizer PoC image prompt set

Mode: built-in image generation tool

Use case: `product-mockup`

Catalogue: 3 cabinets × 2 motherboards × 2 GPUs × 2 AIO coolers × 2 memory kits = 48 generated configurations

## Shared references

- Assembly Line build photograph: photography style, red-orange backdrop, desk, monitor and foreground peripherals
- TAG Gamerz Supernova: white panoramic cabinet identity
- Colorful iGame GeForce RTX 5080 Ultra: horizontal black triple-fan GPU identity
- Gigabyte B650M Aorus Pro AX: black motherboard identity
- Dawg L360 AIO: white 360 mm radiator, white tubes and rectangular pump display identity
- Acer Predator Hera RGB: two silver-black RGB memory sticks, described in the prompt

## Primary view

Create one photorealistic 4:3 landscape photograph of the fully assembled PC. Match the Assembly Line in-house photo-shoot style: dark wooden desk, saturated red-to-orange seamless background, cropped dark monitor at the left edge, and soft out-of-focus keyboard and mouse in the foreground. Use the referenced white panoramic cabinet, black motherboard, horizontal black triple-fan GPU, white top-mounted 360 mm AIO, white braided tubes, two silver-black RGB RAM sticks, tidy cabling and matching white ARGB case fans. Frame a three-quarter front-right view with the PC occupying roughly 70 percent of the image. Use neutral key light with restrained pale-lavender and warm-white internal RGB. Keep the arrangement physically plausible and preserve real glass, steel, PCB, fan, cable and radiator textures.

## Catalogue generation template

For each supported configuration, Image 1 is the approved primary view and controls only the photography, composition, lighting and realism. Images 2-5 identify the selected cabinet, motherboard, GPU and AIO. Describe the selected memory kit explicitly in the prompt. Generate one separate 4:3 landscape photograph per configuration. Keep the cabinet fully inside frame in a three-quarter front-right view, preserve the selected component colors and shapes, install exactly one horizontal GPU, two RAM sticks and one top-mounted 360 mm AIO, and match the shared red-orange Assembly Line shoot.

Save each result using this canonical key:

`{cabinet}__{motherboard}__{gpu}__{cooler}__{ram}-1600.webp`

## Wide view

Photograph the exact same completed PC as the primary view from a wider, slightly lower three-quarter front-right angle. Keep every component, cable route, RGB color and physical position unchanged. Show the entire cabinet and feet, more desk context, more of the monitor at left, and the foreground keyboard and mouse. The PC should occupy roughly 62 percent of the 4:3 landscape frame. Match the same red-orange background, neutral key light and pale-lavender internal lighting.

## Interior view

Photograph the exact same completed PC as a near straight-on side-interior detail view. Keep the cabinet frame visible on all four sides. Make the motherboard, two RAM sticks, pump block, tubing and horizontal triple-fan GPU easy to inspect. Keep every component, cable route and RGB color unchanged. Use the same dark wooden desk, red-orange background, neutral key light and pale-lavender internal lighting in a 4:3 landscape frame.

## Avoid for every view

No floating parts, duplicate GPU, duplicate pump, extra RAM, impossible tubing, changed case geometry, changed component colors, new components, fisheye distortion, warped edges, excessive neon, large gibberish logos, watermark, illustration or obvious CGI appearance.
