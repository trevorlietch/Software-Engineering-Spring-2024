COMPILER = clang 
LIBS = -Ilib/
OSX_OPT = -Llib/ -framework CoreVideo -framework IOKit -framework Cocoa -framework GLUT -framework OpenGL lib/libraylib.a
OSX_OUT = -o "bin/build_osx"
CFILES = src/*.c

all: build_osx run

build_osx: 
	$(COMPILER) $(CFILES) $(LIBS) $(OSX_OUT) $(OSX_OPT)

run: 
	./bin/build_osx 
