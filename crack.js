/** @param {NS} ns */
export async function main(ns) {
	switch (ns.getServerNumPortsRequired(ns.args[0])) {
		case 5: if (ns.fileExists("sqlinject.exe")) ns.sqlinject(ns.args[0]); else break;
		case 4: if (ns.fileExists("httpworm.exe")) ns.httpworm(ns.args[0]); else break;
		case 3: if (ns.fileExists("relaysmtp.exe")) ns.relaysmtp(ns.args[0]); else break;
		case 2: if (ns.fileExists("ftpcrack.exe")) ns.ftpcrack(ns.args[0]); else break;
		case 1: if (ns.fileExists("brutessh.exe")) ns.brutessh(ns.args[0]); else break;
		case 0: if (ns.fileExists("nuke.exe")){
			ns.nuke(ns.args[0]);
			ns.tprint("Cracked "+ns.args[0]);
		} else break;
	}
}