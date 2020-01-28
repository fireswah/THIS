# THIS
Tree Hazard Identification Simulation Home Menu at: https://ntdpvr.s3-us-west-2.amazonaws.com/NRTCTHIS/this.html

NRTC's Tree Hazard Identification Simulation is designed as a portal to access
numerous Tree Hazard Identification simulations utilizing Virtual Reality.
This web page will link to various simulation exercises in the form of VR enabled 360
photos, provides basic information and a tutorial for use.

Author: Matt Gibson
		Training Specialist
		Northern Rockies Training Center
		Missoula, MT

# NOTES
-To update the upload version, copy and rename the desktop version html, then:
	
	-upload resources to Amazon S3
	
	-update links in html
	
	-rename html and post to S3

# Learning Portal
In January 2020, testing was completed to see if we could deploy THIS to the NWCG Learning Portal (Learning Management System - Moodle).  By uploading a completed folder structure as a .zip file, THIS works as a "mini-site" in Moodle.

Moodle file pathing is different than pathing on your desktop, particularly if trying to access a file in a different subfolder than the scene, or similar idea.

-For files inside the scene's subfolders, regular relative paths should work: "pics/hazards/h1.png"
-For files above the scene's folder (in a parent folder) : "../../../images/common/hazcircle.png"
	-Using the ../../../ shows Moodle where to find the master folder since the way it handles assets in a .zip isn't the same as folders on the desktop.
