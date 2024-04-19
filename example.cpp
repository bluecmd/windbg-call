extern void *callDebugger(const char* fmt, ...);
extern void logDebugger(const char* fmt, ...);

int main(int argc, char * argv[]) {
	logDebugger("Hello world! I am %s", argv[0]);

	void* eprocAddr = *(void**)callDebugger("$retInt64(State.PseudoRegisters.General.proc.address)");
	printf("EPROCESS @ 0x%p\n", eprocAddr);

	return 0;
}
