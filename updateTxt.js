/** @param {NS} ns */
export async function main(ns) {
	//for (var i=0; i<ns.getPurchasedServers().length; i++){
	//}
	for (file of ns.ls(ns.getHostname())){
		if (file.includes(".txt")){
			for (victim of ns.getPurchasedServers()){
				if (victim != ns.getHostname()){
					ns.scp(file, victim, ns.getHostname());
				}
			}
		}
	}
}