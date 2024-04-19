
## Background
This is a library implementing primitives to call into, and return values from, a WinDbg instance while being debugged.

## Why?
This is useful for example when debugging a kernel issue triggered from user-mode, allowing for things like setting breakpoints based on local addresses, logging outside of the context of the target, and building macros.

## Examples

Set a breakpoint when a buffer is read:

```cpp
callDebugger("ba r8 0x%p", &InputBuffer);
```

Alternatively, you can request data that the kernel has access to:

```cpp
void* eprocAddr = *(void**)callDebugger("$retInt64(State.PseudoRegisters.General.proc.address)");
printf("EPROCESS @ 0x%p\n", eprocAddr);
```

You can also log messages to the WinDbg session. This is especially useful if you are relying on console output from inside VMs and/or using snapshots which would otherwise cause you to lose log output.

```cpp
logDebugger("Input buffer @ 0x % 016llx", &InputBuffer);
```

## Usage

Load it inside your WinDbg session like this:

```
.scriptload C:\Shared\callhlp.js
```

Alternatively, if you want to reload the script, do it like this:
```
.scriptunload C:\Shared\callhlp.js; .scriptload C:\Shared\callhlp.js
```

Then instead of doing `g` or pressing "Go", run `dx Debugger.State.Scripts.callhlp.Contents.run()` which will resume the execution until a breakpoint is hit while also catering to any calls into the debugger.
