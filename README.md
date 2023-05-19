# THIS
Tree Hazard Identification Simulation (THIS) Proof of Concept

## Project Description
This Virtual Reality enabled training simulation utilizes AFrame and custom AFrame components to display 360 imagery to assess a tree for hazard identification practice, and includes a 3D modeled "landing page" and expandable library system.

## Introduction
THIS is a collaborative proof of concept project seeking to improve hazard identification while reducing exposure to hazardous trees during training. Design began shortly after the Wildland Fire Lessons Learned Center posted the Tree Felling Accident Analysis, and builds off prior discussions during the Crandall Felling Accident APA 2010. __Links currently down at LLC__

## Partnerships
THIS was originally designed at Northern Rockies Training Center with partners at the National Technology and Development Center under the Virtual Reality Pilot Project with the USFS National Saw Technical Advisory Group. Rocky Mountain Research Station provided valuable assistance in original cloud hosting, and the Northern Rockies Interagency Hotshot Programs have assisted in all aspects of this project. W.O. Research, Innovation and Organizational Learning is now moving the code base to a long term storage/update system in Git.

## System Description
THIS utilizes AFrame and custom AFrame components written in javascript for a web-based, virtual reality (VR) experience of 360 degree imagery (still photos in this project).

A 3D "landing page" is the primary access point to an expandable library of "scenes"
Each scene contains four 360 images of a single hazard tree or cutting scenario.
Photos are taken from cardinal directions from the tree/item to be cut
The user cycles through each of the photos to "walk" around the tree
Users can compare their identified hazards against a "hazard key" developed by qualified sawyers, that identifies the hazard and discussion points.
All in-scene interactions utilize a "gaze based cursor" system. Interaction with buttons occurs by looking at the button for 2 seconds.

## Training Design Requirements
A lot of effort went into the thought of how to get a product like THIS into the hands of our field going personnel. At a basic level, a crewmember in the back of an engine riding down the highway should be able to use the system. The limiting factor remains internet connection broad enough to load the simulation models and imagery. Here's where we landed for now:

* Lowest denominator for VR headsets is a smartphone with basic lens device like Google Cardboard.
* Based on headset, interactions should require minimal input methods. The gaze based cursor raycast system meets this need, however, Apple devices and particularly the Safari browser's requirements can prove frustrating to implement in every case.
* Front end 3D menu is very basic, with limited animations planned, but still gives a sense/example of what a 3D menu can look like.
* All 3D models used are low poly and small in size and number to improve load and render performance. See Road Map for more details on optimization.
* Imagery was tested at varying resolutions and with multiple low and high-end cameras. This boils down to the choice of download data size for high resolution, with the trade-off that small hazards, like bug hit bark, may not be as easy to spot in lower resolution, smaller size photos. The Ambrose Saddle scene is an example with higher resolution photos.

## Roadmap
### Optimization
Systematically work through all aspects of project and implement programmatic buttons/menus/etc. to replace existing image graphics where possible. this will reduce hosting needs as well as improving user download times.
Reformat all models to .glb (GLTF did not officially exist when project started)
### Important
setimage.js - Consider adding heading schema to component to more easily assist in initial bearing of image display in development. Would also solve having to have a separate setimage script for each scene.
this-popup.js - Remove graphic icon and build programmatic 3D icon. This is needed for both optimization and starting to improve workflow for placement of hazard icons during scene building
### Intermediate
credits.js - remove hard-coding of array by adding an array schema
credits.js - auto calculate placement, start scroll position based on text array length
### Minor
Logo - Replace FS logo with an official version
Home Scene - Improve 3D trees
### Simulation
Explore - The Tree Felling Analysis (p.15) states: "21% of the reports recommend enhancing training related to tree conditions (like rot) and species specific traits"
Explore - voice activated translation of size-up, and systems to send transcribed hazard list to document answers.
### Other
Consider meta-data for each scene that includes lat/lon, photographer, camera and settings used.
Assuming someone takes on this project long term, consider stickers with logo that says, "Thank you for THIS help!" to hand to any SME's providing answer keys.
