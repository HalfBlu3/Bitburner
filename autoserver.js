/** @param {NS} ns */
export async function main(ns) {

	while (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
		while (ns.getServerMoneyAvailable("home") < ns.getPurchasedServerCost(32768)) {
			await ns.sleep(100);
		}
		var mode = "hack";
		ns.run("autocrack.js", 1)
		while (ns.scriptRunning("autocrack.js", ns.getHostname())) {
			await ns.sleep(100);
		}
		ns.run("fullscan.js", 1)
		while (ns.scriptRunning("fullscan.js", ns.getHostname())) {
			await ns.sleep(100);
		}
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(32768)) {
			let servername = "server" + (ns.getPurchasedServers().length + 1);
			ns.purchaseServer(servername, 32768);
			if (!ns.read("whitelist.txt").includes(servername)) {
				ns.write("whitelist.txt", "," + servername);
			}
			ns.run("sendtoall.js", 1, "whitelist.txt");
			var programs = ["whitelist.txt", "fullscan.js", "serv.txt", "autohack.js", "vh.js", "autocrack.js", "crack.js", "autogrow.js", "autoweaken.js", "runmult.js"];
			for (var i = 0; i < programs.length; i++) {
				ns.run("sendto.js", 1, programs[i], servername);
				while (ns.isRunning("sendto.js", ns.getHostname(), programs[i], servername)) {
					await ns.sleep(100);
				}
			}
			ns.exec("autocrack.js", servername, 1);
			if (mode == "hack") {
				ns.exec("autohack.js", servername, 1);
			} /* else if (mode == "grow") {
				ns.exec("runmult.js", servername, 1, "autogrow.js", 20);
			} else if (mode == "weaken") {
				ns.exec("runmult.js", servername, 1, "autoweaken.js", 20);
			}*/
		}
	}
}