/*
 * See https://github.com/bluecmd/windbg-call/
 *
 * Load: scriptunload C:\Shared\callhlp.js; .scriptload C:\Shared\callhlp.js
 * Run:  dx Debugger.State.Scripts.callhlp.Contents.run()
 *
 * Example: see example.cpp
*/

function initializeScript() {
    host.diagnostics.debugLog("***> WinDbg call helper loaded\n");
}

function run() {
    var ctl = host.namespace.Debugger.Utility.Control;
    while (true) {
        out = ctl.ExecuteCommand("g");
        if (host.namespace.Debugger.State.DebuggerVariables.curregisters.User.rdx != 0xbaadc0de) {
            return out;
        }
        host.namespace.Debugger.State.DebuggerVariables.curregisters.User.rdx = 0;
        trap(host.namespace.Debugger.State.DebuggerVariables.curregisters.User.rcx);
    }
}

function trap(Msg) {
    cmd = host.memory.readString(Msg);
    var ctl = host.namespace.Debugger.Utility.Control;
    var State = host.namespace.Debugger.State;
    if (cmd[0] == '$') {
        eval(cmd.substring(1));
    } else {
        host.diagnostics.debugLog("***> Executing: " + cmd + "\n");
        ctl.ExecuteCommand(cmd);
    }
}

function log(msg) {
    host.diagnostics.debugLog("***> Log: " + msg + "\n");
}

function retStr(value) {
    host.namespace.Debugger.Utility.Control.ExecuteCommand("ea @rcx \"" + value + "\"");
}

function ret(value) {
    host.namespace.Debugger.Utility.Control.ExecuteCommand("eq @rcx 0n" + value);
}

function retInt64(value) {
    host.namespace.Debugger.Utility.Control.ExecuteCommand("eq @rcx " + value.toString());
}
