/** @param {NS} ns */
export async function main(ns) {
	look("home", "");

	function look(server, parent) {
		let list = ns.scan(server);
		var string = parent.split(",");
		var output = "home;";
		string += "," + server;
		for (var i = 0; i < list.length; i++) {
			if (list[i] == ns.args[0]) {
				string += "," + list[i];
				var final = string.split(",");
				for (var ii = 0; ii < final.length; ii++) {
					if (final[ii].length > 0 && final[ii] != "home") {
						output += "  connect " + final[ii] + ";"	;
					}
				}
				ns.tprint(output);
				ns.scriptKill("find.js", ns.getHostname());
			}
			if (!parent.includes(list[i])) {
				look(list[i], string);
			}
		}
	}
}