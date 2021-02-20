const si = require("systeminformation");

const id = process.argv[3] || "701098492000469012";
const modeavg = process.argv[2] || "cycle";
let mode = modeavg;
let modenumber = 0;
/*
Things to do:
Change the image key to your application ID
*/
let modes = ["ramcpu", "cpuonly", "ram", "output", "gpuonly", "disks"];

const user = require("discord-rich-presence")(id);

async function refresh() {
  //choice 1 of ramcpu
    if (mode.toLowerCase() == "ramcpu") {
        //define variables
        let cpuCurrentspeed;
        let cpuMaxspeed;
        await si.cpuCurrentspeed().then(cpu => {
            cpuCurrentspeed = cpu.avg;
            cpuMaxspeed = cpu.max;
        });
        let freeMemory;
        let totalMemory;
        await si.mem().then(poll => {
            freeMemory = poll.used / 1048576;
            totalMemory = poll.total / 1048576;
        });
        let cpuUsage;
        await si.currentLoad().then(poll => {
            cpuUsage = poll.currentload;
        });
        user.updatePresence({
            details: "CPU Speed: " + cpuCurrentspeed + " ghz / " + cpuMaxspeed + " GHz Usage: " + "(" + cpuUsage.toFixed(0) + "%)",
            state: "RAM: " + (freeMemory / 1000).toFixed(1) + " GB / " + (totalMemory / 1000).toFixed(0) + " GB",
            largeImageKey: "image_key",
            largeImageText: "Monitoring CPU & RAM",
            startTimestamp: Date.now(),
            instance: false,

        });
        return;
    }
    if (mode.toLowerCase() == "cpuonly") {
        let cpumodel;
        let cpubrand;
        let threads;
        let cores;
        let cpucount;
        await si.cpu().then(pool => {
            cpumodel = pool.manufacturer;
            cpubrand = pool.brand;
            threads = pool.cores;
            cores = pool.physicalCores;
        });
        await si.currentLoad(pool => {
            cpucount = pool.cpus.length;
        });
        user.updatePresence({
            details: "CPU: " + cpumodel + " " + cpubrand,
            state: "Thread count: " + threads + " / Cores: " + cores,
            largeImageKey: "image_key",
            largeImageText: "Monitoring CPU",
            startTimestamp: Date.now(),
            instance: false,
        });
        return;
    }
    if (mode.toLowerCase() == "ram") {
        let ramcount;
        let ramtype;
        let ramspeed;
        await si.memLayout().then(pool => {
            ramcount = pool.length;
            ramtype = pool[0].type;
            ramspeed = pool[0].clockSpeed;
            ramvoltage = pool[0].voltageConfigured;
        });
        user.updatePresence({
            details: "RAM: " + ramcount + " / Type: " + ramtype,
            state: "Ram speed: " + ramspeed + "MHz",
            startTimestamp: Date.now(),
            largeImageKey: "image_key",
            largeImageText: "Monitoring RAM",
            instance: false,
        });
        return;
    }
    if (mode.toLowerCase() == "output") {
        let displaycount;
        await si.graphics().then(pool => {
            displaycount = pool.displays.length;
        });
        user.updatePresence({
            details: "Display outputs: " + displaycount,
            state: "  ",
            startTimestamp: Date.now(),
            largeImageKey: "image_key",
            largeImageText: "Monitoring Display",
            instance: false,
        });
        return;
    }
    if (mode.toLowerCase() == "gpuinfo") {
        let gpucount;
        let gpumodel;
        let displaycount;
        await si.graphics().then(pool => {
            gpucount = pool.controllers.length;
            gpumodel = pool.controllers[0].model;
            displaycount = pool.displays.length;
        });
        user.updatePresence({
            details: "GPU(s): " + gpucount + "x " + gpumodel,
            state: "Outputs: " + displaycount + " Displays",
            startTimestamp: Date.now(),
            largeImageText: "Monitoring GPU",
            instance: false,
        });
        return;
    }
    if (mode.toLowerCase() == "disksinfo") {
        let disks;
        let diskscount
        let totalSpace = 0;
        await si.diskLayout().then(pool => {
            disks = pool;
            diskscount = pool.length;
        });

        let HDD = 0;
        let SSD = 0;
        let NVMe = 0;

        for (let disk of disks) {
            totalSpace += disk.size;
            if (disk.type == "HD") HDD += 1;
            if (disk.type == "SSD" && disk.interfaceType == "SATA") SSD += 1;
            if (disk.type == "NVMe" || disk.interfaceType == "PCIe" || disk.interfaceType == "SCSI") NVMe += 1;
        }

        user.updatePresence({
            details: NVMe.toString() + "x NVMe(s) | " + SSD.toString() + "x SSD(s) | " + HDD.toString() + "x HDD(s)",
            state: "Total Size: " + (totalSpace / 1e+12).toFixed(1) + " Terabytes",
            largeImageKey: "image_key",
            largeImageText: "Monitoring Disk",
            startTimestamp: Date.now(),
            instance: false,
        });
        return;
    }
}

try {
    console.log("Running in the mode: " + modeavg);
    if (modeavg == "cycle") {
        cycle();
        //time calculated for each refresh
        setInterval(cycle, 15000);
    } else {
        refresh();
        setInterval(refresh, 20000);
    }
} catch (e) {
    console.info("Something went wrong:"+e.stack);
}

async function cycle() {
    if (modenumber >= modes.length) modenumber = 0;
    mode = modes[modenumber];
    modenumber += 1;
    refresh();
}
