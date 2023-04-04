/** @param {NS} ns */
export async function main(ns) {
	
	var queue = [];
	var finish = [];
    //add home as the first server to scan
	queue.push("home");
	while (queue.length > 0){
        //save the index of the current scan
		var v = queue.length-1;
        //save the depth of the parent
		var results = [];
		results = ns.scan(queue[v]);
		if (!(finish.includes(queue[v]) || ns.read("whitelist.txt").includes(queue[v]))){
            //add the scanned server to the output
			finish.push(queue[v]);
		}
		for (var i=0; i < results.length; i++){
			if (!(finish.includes(results[i])||queue.includes(results[i]))&&!(results[i].includes("hacknet-server")||ns.read("whitelist.txt").includes(results[i]))){
				queue.push(results[i]);
			}
		}
        //remove the scanned server from the queue
		queue.splice(v, 1);
	}
	var t="";
	for (var i; i<finish.length; i++){
		t += finish[i]+",";
	}
	ns.clear("serv.txt");
	ns.write("serv.txt", finish.toString(), "w"); //prints to terminal
}