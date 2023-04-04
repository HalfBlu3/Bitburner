/** @param {NS} ns */
//import * as namespace from "storage.js"; //Import all functions from script
//import {getHackList, sendToAll, etc} from "storage.js"; //Import specific functions from script
//var = storage.getHackList(); //how to reference a function. MAKE SURE TO INCLUDE NAMESPACE


export function sendToAll(program, ns) {
	let list = getWhiteList();
	var bar = new loadingBar(getWhiteList.length()-1);
	var i = 0;
	for (i = 0; i < list.length; i++) {
		if (list[i] != "darkweb") {
			if (!ns.scp(program, list[i])) {
				ns.tprint("Failed to move " + program + " to " + list[i]);
			}
			bar.incrementAndPrint();
		}
	}
	bar.end();
}

export function ram (server, ns){
	return(ns.getServerMaxRam(server)-ns.getServerUsedRam(server));
}
	
export function getHackList(ns) {
	return ns.read("serv.txt").split(",");
}
	
export function getWhiteList(ns) {
	return ns.read("whitelist.txt").split(",");
}

export function servMap() {
	/*I did not write this, I just looked up a map  of server names and corresponding stock symbols because I have better things to do*/
	var symbolMap = [
		["AERO","AeroCorp","aerocorp"],
		["APHE","Alpha Enterprises","alpha-ent"],
		["BLD","Blade Industries","blade"],
		["CLRK","Clarke Incorporated","clarkinc"],
		["CTK","CompuTek","computek"],
		["CTYS","Catalyst Ventures","catalyst"],
		["DCOMM","DefComm","defcomm"],
		["ECP","ECorp","ecorp"],
		["FLCM","Fulcrum Technologies","fulcrumassets"],
		["FNS","FoodNStuff","foodnstuff"],
		["FSIG","Four Sigma","4sigma"],
		["GPH","Global Pharmaceuticals","global-pharm"],
		["HLS","Helios Labs","helios"],
		["ICRS","Icarus Microsystems","icarus"],
		["JGN","Joe's Guns","joesguns"],
		["KGI","KuaiGong International","kuai-gong"],
		["LXO","LexoCorp","lexo-corp"],
		["MDYN","Microdyne Technologies","microdyne"],
		["MGCP","MegaCorp","megacorp"],
		["NTLK","NetLink Technologies","netlink"],
		["NVMD","Nova Medical","nova-med"],
		["OMGA","Omega Software","omega-net"],
		["OMN","Omnia Cybersystems","omnia"],
		["OMTK","OmniTek Incorporated","omnitek"],
		["RHOC","Rho Contruction","rho-construction"],
		["SGC","Sigma Cosmetics","sigma-cosmetics"],
		["SLRS","Solaris Space Systems","solaris"],
		["STM","Storm Technologies","stormtech"],
		["SYSC","SysCore Securities","syscore"],
		["TITN","Titan Laboratories","titan-labs"],
		["UNV","Universal Energy","univ-energy"],
		["VITA","VitaLife","vitalife"],
		["WDS","Watchdog Security",""]
	];
	return symbolMap;
}

export function getServList(){
	return servMap;
}

export function getSym(name){
	for (var i=0; i < getServList().length ; i++) {
		if (getServList()[i][2] == name) {
			return (getServList()[i][0]);
		}
	}
	return ("");
}

export function getCost(sym, amt, type, ns){
	return (ns.stock.getPrice(sym, amt, type));
}

export function getSell(sym) {
	return (getCost(sym, 1, "Long") + 1000);
}

export function getShortSell(sym) {
	return (getCost(sym, 1, "Short") - 1000);
}

export class loadingBar {
	progress=0; total=1; open=true; legnth=0;
	_ns;

	constructor(total, ns_){this.total=total; this._ns=ns_; this.length=total; this.output();}

	setScale(length){this.length = length; this.output();}
	
	increment(){if (this.open) this.progress++;}

	setProgress(value){this.progress = value;}

	getProgress(){return this.progress;}

	output(){if (this.progress != this.total && this.open) ti = document.getElementById("terminal-input"); ti.value = this.build(); else this.end()}

	incrementAndPrint(){if (this.open){this.progress++; this.output();}}

	end(){if (this.open){this._ns.toast("Done!"); this.open = false;}}

	build(){
		var scale = this.total / this.length;
		var text="[";
		for (var i=0; i<Math.floor(this.progress * scale);i++)text += "|";
		for (var i=1; i<Math.floor(this.total * scale)-Math.floor(this.progress * scale);i++)text += ".";
		text +="]"; return text;
		}
}

export const color = {
	black: "\u001b[30m",
	red: "\u001b[31m",
	green: "\u001b[32m",
	yellow: "\u001b[33m",
	blue: "\u001b[34m",
	magenta: "\u001b[35m",
	cyan: "\u001b[36m",
	white: "\u001b[37m",
	brightBlack: "\u001b[30;1m",
	brightRed: "\u001b[31;1m",
	brightGreen: "\u001b[32;1m",
	brightYellow: "\u001b[33;1m",
	brightBlue: "\u001b[34;1m",
	brightMagenta: "\u001b[35;1m",
	brightCyan: "\u001b[36;1m",
	brightWhite: "\u001b[37;1m",
	reset: "\u001b[0m"
}