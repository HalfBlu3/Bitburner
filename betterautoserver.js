/** @param {NS} ns */
export async function main(ns) {
	var targetsize = 256;
	//delete existing servers
	while (ns.getPurchasedServers().length > 0) {
		ns.deleteServer(ns.getPurchasedServers()[0]);
	}
	//reset whitelist
	ns.write("whitelist.txt","home,darkweb","w");
	//buy max # of servers @ __gb each
	while (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
		while (ns.getServerMoneyAvailable("home") < ns.getPurchasedServerCost(targetsize)) {
			await ns.sleep(100);
		}
		await purchase(targetsize, ("server" + (ns.getPurchasedServers().length + 1)));
	}
	//begin actual management
	while (true) {
		targetsize = targetsize * 2;
		for (var i = 0; i < ns.getPurchasedServers().length; i++) {
			let servername = ns.getPurchasedServers()[i];
			if (ns.getServerMaxRam(servername) < targetsize) {
				while (ns.getServerMoneyAvailable("home") < ns.getPurchasedServerCost(targetsize)) {
					await ns.sleep(100);
				}
				ns.deleteServer(servername);
				await purchase(targetsize, servername);
			}
		}
		await ns.sleep(100);
	}
	
	async function purchase(size, name) {
		ns.purchaseServer(name, size);
		if (!ns.read("whitelist.txt").includes(name)) {
			ns.write("whitelist.txt",","+name);
		}
		ns.run("sendtoall.js", 1, "whitelist.txt");
		var programs = ["whitelist.txt", "fullscan.js", "serv.txt", "autohack.js", "vh.js", "autocrack.js", "crack.js", "autogrow.js", "autoweaken.js", "runmult.js"];
		for (var i = 0; i < programs.length; i++) {
			ns.run("sendto.js", 1, programs[i], name);
			while (ns.isRunning("sendto.js", ns.getHostname(), programs[i], name)) {
				await ns.sleep(100);
			}
		}
		ns.exec("autocrack.js", name, 1);
		await ns.sleep(100);
		ns.exec("autohack.js", name, 1);
	}
}