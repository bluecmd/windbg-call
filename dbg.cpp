#include <stdio.h>
#include <cstdarg>

__declspec(noinline) static void* _callDebugger(char* exec, long magic) {
	__debugbreak();
	// Needed to make the arguments not be optimized away - probably some better way to do this
	exec[2047] = magic & 0xff;
	return exec;
}

__declspec(noinline) void* callDebugger(const char* fmt, ...) {
	va_list args;
	va_start(args, fmt);
	char buf[2048];
	vsnprintf(buf, sizeof(buf), fmt, args);
	va_end(args);
	// fmt[0] == .. needed to make the arguments not be optimized away - probably some better way to do this
	return _callDebugger(buf, fmt[0] == 0 ? 0x0 : 0xbaadc0de);
}

void logDebugger(const char* fmt, ...) {
	va_list args;
	va_start(args, fmt);
	char buf[1024];
	vsnprintf(buf, sizeof(buf), fmt, args);
	va_end(args);
	callDebugger("$log('%s')", buf);
}