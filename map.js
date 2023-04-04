
export async function main(ns) {

	class server{
		name;
		depth;
		constructor(name, depth){this.name = name; this.depth = depth;}
		getName(){return this.name;}
		getDepth(){return this.depth;}
	}

	const color = {
		black: "[30m",
		red: "[31m",
		green: "[32m",
		yellow: "[33m",
		blue: "[34m",
		magenta: "[35m",
		cyan: "[36m",
		white: "[37m",
		brightBlack: "[30;1m",
		brightRed: "[31;1m",
		brightGreen: "[32;1m",
		brightYellow: "[33;1m",
		brightBlue: "[34;1m",
		brightMagenta: "[35;1m",
		brightCyan: "[36;1m",
		brightWhite: "[37;1m",
		reset: "[0m"
	}
	ns.run("autocrack.js", 1);
	var queue = [];
	var finish = [];
    //add home as the first server to scan
	queue.push(new server("home",0));
	while (queue.length > 0){
            //save the index of the current scan
			var v = queue.length-1;
            //save the depth of the parent
			var d=queue[v].getDepth();
			var results = [];
			results = ns.scan(queue[v].getName());
			if (!has(finish, queue[v].getName())){
                //add the scanned server to the output
				finish.push(queue[v]);
			}
			for (var i=0; i < results.length; i++){
				if (!(has(finish, results[i])||has(queue, results[i]))){
                	//add a server object off the child
					queue.push(new server(results[i], d+1));
				}
			}
            //remove the scanned server from the queue
			queue.splice(v, 1);
		}
    //generates a string with the number of indents we need
	for (var i=0; i<finish.length;i++){
		var s="";
		for (var ii=0; ii<finish[i].getDepth();ii++) s +=("|    ");
		if (finish[i].getName() == "home"){
			ns.tprint(`${color["white"]}`+"home");
		} else if (ns.read("whitelist.txt").split(",").includes(finish[i].getName()) || finish[i].getName().includes("hacknet-server")){
			ns.tprint(`${color["cyan"]}`+s+finish[i].getName());
		} else {
			if (ns.hasRootAccess(finish[i].getName()) && ns.getServerRequiredHackingLevel(finish[i].getName()) <= ns.getHackingLevel()){
				ns.tprint(`${color["green"]}`+s+finish[i].getName());
			} else if (!(ns.hasRootAccess(finish[i].getName())||ns.getServerRequiredHackingLevel(finish[i].getName())<=ns.getHackingLevel())){
				if (hackable(ns.getServerNumPortsRequired(finish[i].getName()))){
					ns.tprint(`${color["yellow"]}`+s+finish[i].getName()+" ("+ns.getHackingLevel()+"/"+ns.getServerRequiredHackingLevel(finish[i].getName())+")");
				} else {
					var p=["brutessh.exe","ftpcrack.exe","relaysmtp.exe","httpworm.exe","sqlinject.exe"];
					var t="";
					for 	(var ii=0; ii<ns.getServerNumPortsRequired(finish[i].getName());ii++){
							t+=(ns.fileExists(p[ii],"home")?"":(t==""?"":", ")+p[ii]);
					}
					ns.tprint(`${color["red"]}`+s+finish[i].getName()+" ("+t+", "+ns.getHackingLevel()+"/"+ns.getServerRequiredHackingLevel(finish[i].getName())+")");
				}
			}else {
				if (ns.getServerRequiredHackingLevel(finish[i].getName()) <= ns.getHackingLevel()){
					ns.tprint(`${color["magenta"]}`+s+finish[i].getName());
				} else {
					ns.tprint(`${color["yellow"]}`+s+finish[i].getName()+" ("+ns.getHackingLevel()+"/"+ns.getServerRequiredHackingLevel(finish[i].getName())+")");
				}
			}
		}
	}

    //checks if the found files contains a server already
	function has(arr, str){
		for (var i=0; i<arr.length; i++){
			if(arr[i].getName() == str){
				return true;
			}
		}
		return false;
	}

	function hackable(ports){
		switch (ports){
			case 1: return ns.fileExists("brutessh.exe");
			case 2: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe");
			case 3: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe") && ns.fileExists("relaysmtp.exe");
			case 4: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe") && ns.fileExists("relaysmtp.exe") && ns.fileExists("httpworm.exe");
			case 5: return ns.fileExists("brutessh.exe") && ns.fileExists("ftpcrack.exe") && ns.fileExists("relaysmtp.exe") && ns.fileExists("httpworm.exe") && ns.fileExists("sqlinject.exe");
		}
	}
}
