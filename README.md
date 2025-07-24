# Script File Selector for PolyScope X

This is a simple Script File Selector and editor for PolyScope X. This should only be used until there is an official node implemented in PolyScope X.

## Using the URCapX
### Installing the URCapX
Download the [script-file-selector-1.0.0.urcapx](https://github.com/FLLU-UR/script-file-selector/blob/master/target/script-file-selector-1.0.0.urcapx) from the [target](https://github.com/FLLU-UR/script-file-selector/tree/master/target) folder to an USB drive and install on the Robot.
### Usage
Insert the ProgramNode "Script Code" and then either write new Script Code or import a .script File via the nativ File Explorer. To import a File from USB just navigate to the drive and press the confirm button on the bottom right. *NOTE* This feature is not official and will be replaced by a better file explorer that fits the screen.

### Deinstallation
Just remove the URCapX from the Robot via the URCap menu.

## Using this Project
If you want to change something of the URCap, feel free to use this project to compile your own.
### Installation
To install the contribution type:

`$ npm install`

### Build
To build the contribution type:

`$ npm run build`

### Deploy
To deploy the contribution to the simulator type:

`$ npm run install-urcap`

## Further help

Get more help from the included SDK documentation.
