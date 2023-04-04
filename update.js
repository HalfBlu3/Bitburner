/** @param {NS} ns */
export async function main(ns) {
	let p = ["autohack.js","vh.js","fullscan.js","crack.js","autocrack.js","serv.txt","whitelist.txt"];
	for (var i=0;i<p.length;i++){
		if (ns.fileExists(p[i], "home")){
			ns.scp(p[i], ns.getHostname(), "home");
		}
	}
}