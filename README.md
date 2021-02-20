## System Information Discord Rich Prescence Tool
A discord RPC that uses the NPM package SystemInformation to give out useful information about your PC onto your Discord Rich Prescence

### Usage & Installation:
1. Download the code
2. Make sure you have NPM(preferably NPM over yarn) and NodeJS installed
3. Look over the dependencies part and use NPM to install them
4. If you want, you can hook up an application ID at: https://discord.com/developers/applications/
-This means you can use images now
5. Load up the code with `node .` in the console/terminal
6. Terminate the task
7. Reload the code with `node app.js {mode_name}`

# Switching Modes:
Just kill the current task, then rerun the task with `node app.js {mode_name}`
You can find a list of avaliable modes here:
1. `ramcpu` Displays the Ram Usage along with CPU load
2. `cpuonly` Display the CPU speed and CPU build
3. `ram` Display information on the voltage of the RAM, usage, and speed
4. `output` Display display info, like how many monitors is used
5. `gpuinfo` Display info on the GPU build
6. `diskinfo` Display disk build

### Dependencies
**Use either `npm` or `yarn` to install the following packages:**

systeminformation
discord-rich-prescence

**Download the following necessary runtime environments & applications (required):**

NodeJS: https://nodejs.org/en/download/
Discord: https://discord.com/download

### Supported OS
Windows
macOS (Not tested)
Linux (Certain Ones if configured correctly)

# Notes
The status will be updated every 15~20 seconds. Changing this can effect Discord behaviour and other behaviours such as how others will be able to see your prescence.
