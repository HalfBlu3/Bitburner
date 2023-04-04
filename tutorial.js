/** @param {NS} ns */
export async function main(ns){
	if (await ns.prompt("Would you like to create an alias so you can access this later?", {type:"boolean"})){
		tRun("alias "+await ns.prompt("Enter the text alias you would like here:", {type:"text"})+"=\"run tutorial.js\"");
        ns.toast("Created alias", "info");
	}
    ns.tprint("Welcome to bitburner! I can't wait to show you this game that I love!");
    ns.tprint("The first thing you will be doing in bitburner is hacking servers for money.");
    ns.tprint("Only problem is, we don't know what we're supposed to hack.");
    ns.tprint("That's where the \'scan\' command comes in!");
    ns.tprint("This is automated. Please do not press anything until you are told to do so or you risk breaking the tutorial.");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("scan");
    }
    pressEnter();
    ns.tprint("Now we have a list of all the servers connected to our home server. Some servers are connected to each other. You can use \'run map.js\' to see the full server layout after the tutorial ends");
    ns.tprint("We'll start by hacking n00dles since it's the easiest server to hack");
    ns.tprint("Let's try to hack n00dles.")
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("hack n00dles");
    }
    pressEnter();
    ns.tprint("We got an error because you can only call hack alone as 'hack'. It will hack whatever server we are already connected to.");
    ns.tprint("To hack n00dles, we have to connect to it first using \'connect n00dles\'");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("connect n00dles");
    }
    pressEnter();
    ns.tprint("Now that we are connected to n00dles, we can try to hack it.");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("hack");
    }
    pressEnter();
    ns.tprint("Oh, right. We need to gain access to n00dles first.");
    ns.tprint("We can use \'analyze\' to see more info about the server.");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("analyze");
    }
    pressEnter();
    ns.tprint("There are multiple programs we can use to gain access, but the one that you start with is brutessh.exe");
    ns.tprint("We'll use it to open a port on n00dles so we can hack it");
    ns.tprint("Because we only need to open one port to hack n00dles, we only need to use brutessh.exe to gain access");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("hack");
    }
    pressEnter();
    ns.tprint("Now we have gained money!");
    ns.tprint("See how it says security increased? Every time you tamper with a server, the security on that server will increase.");
    ns.tprint("The higher the security on a server is, the longer it takes to hack, weaken, or grow that server.");
    ns.tprint("We can use \'weaken\' to decrease the security on a server.");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("weaken");
    }
    pressEnter();
    ns.tprint("Now the security is lowered again. There is a minimum security level, so we dont want to waste time weakening forever.");
    ns.tprint("Now we can hack again. It's good to weaken a server every so often to make sure that you can hack it as efficiently as possible.");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("hack");
    }
    pressEnter();
    ns.tprint("See how we got less money that time? That is because a server only has so much money on it.");
    ns.tprint("To replenish the money on a server, we can use \'grow'\. This will increase security on the server just like hacking.");
    for (var i=0;i<100;i++){
        await ns.sleep(20);
        tSet("grow");
    }
    ns.tprint("Because hacking gives us a percentage of the money on a server, it's important to grow every so often so you can make consistent money from hacking.");
    ns.tprint("Ideally, you will be using a combination of hacking, weakening, and growing to make money as efficiently as possible.");
    ns.tprint("I'll try to make a scripting tutorial later. For now this is just the manual gameplay");
    
    if (await ns.prompt("Do you want copies of some utility scripts.\n\None of these will driectly impact gameplay, they are merely quality of life improvements.", {type:"boolean"})){
        tRun("wget https://raw.githubusercontent.com/HalfBlu3/Bitburner/main/branch.js map.js");
        ns.toast("Downloaded Map", "success");
        tRun("wget https://raw.githubusercontent.com/HalfBlu3/Bitburner/main/find.js find.js");
        ns.toast("Downloaded Find", "success");
        ns.tprint("\"Run map.js\" can be used to show a map of all servers and your access to them");
        ns.tprint("\"Run find.js [server name]\" can be used to get the connection path to a specific server. It is much faster than doing it manually");
    }
    
}

//enters a command into the terminal
export function tSet(command){
    //creates a reference to the terminal text field
    const terminalInput = eval("document").getElementById("terminal-input");
    //sets the text in the terminal
    terminalInput.value = command;   
}

export function tRead(){
    return eval("document").getElementById("terminal-input").value;
}

//enters a command into the terminal and simulates an enter press to run it
export async function tRun(command){
    tSet(command);
    await pressEnter();
}

export async function pressEnter(){
    //create a reference to the key event handler
    const handler = Object.keys(eval("document").getElementById("terminal-input"))[1];
    //uses an onChange to change some values we need to simulate a key press
    //I don't know what specifically it is doing
    eval("document").getElementById("terminal-input")[handler].onChange({ target: eval("document").getElementById("terminal-input") });
    //simulates the player pressing enter by calling the Enter key event
    eval("document").getElementById("terminal-input")[handler].onKeyDown({ key: 'Enter', preventDefault: () => null });
}

//runs code without using ram
export function runFree(ns, method) {
    //creates a function that evals on our code
    //eval runs a string as code an returns any value it gives
    const call = () => eval(method);
    try {
        return call();
    } catch {
        return call();
    }
}