#!/bin/bash

# Closure library settings
CLOSURE_LIBRARY_REVISION="4bbe2636012f81eafc3341539f25bcd3ae1ab09a"
CLOSURE_LIBRARY_PATH="closure/library"

# Closure compiler settings
CLOSURE_COMPILER_REVISION="20130722"
CLOSURE_COMPILER_PATH="closure/compiler"
CLOSURE_COMPILER_SOURCE="http://closure-compiler.googlecode.com/files"

# Closure compiler files
CLOSURE_COMPILER_DIST="$CLOSURE_COMPILER_PATH/dist.tar.gz"
CLOSURE_COMPILER_JAR="$CLOSURE_COMPILER_PATH/compiler.jar"

# Deps writer settings
CLOSURE_DEPS_WRITER="$CLOSURE_LIBRARY_PATH/closure/bin/build/depswriter.py"
CLOSURE_DEPS_ROOT_WITH_PREFIX="src/tatu ../../../../src/tatu"
CLOSURE_DEPS_OUTPUT="src/tatu/deps.js"

# Build settings
CLOSURE_BUILDER="$CLOSURE_LIBRARY_PATH/closure/bin/build/closurebuilder.py"
CLOSURE_ROOT_LIST=("$CLOSURE_LIBRARY_PATH/closure/goog"
                   "$CLOSURE_LIBRARY_PATH/third_party/closure/goog"
                   "src/tatu")
CLOSURE_NAMESPACE_LIST=("tatu.Manager")
CLOSURE_MIN_FLAG="--compilation_level=ADVANCED_OPTIMIZATIONS"
CLOSURE_JS_OUTPUT="build/tatu.js"
CLOSURE_JS_OUTPUT_MIN="build/tatu.min.js"

# Tests
TEST_PHANTOM="phantomjs"
TEST_PATH="./test/"
TEST_FILE="test.js"


get_closure_compiler() {
    url="$CLOSURE_COMPILER_SOURCE/compiler-$CLOSURE_COMPILER_REVISION.tar.gz"

    if [ -z "`ls $CLOSURE_COMPILER_DIST 2> /dev/null`" ]; then
        wget $url -O $CLOSURE_COMPILER_DIST
    fi

    if [ -z "`ls $CLOSURE_COMPILER_JAR 2> /dev/null`" ]; then
        tar xf $CLOSURE_COMPILER_DIST -C $CLOSURE_COMPILER_PATH
    fi
}

get_closure_library() {
    git_dir="--git-dir=$CLOSURE_LIBRARY_PATH/.git"
    git_work_tree="--work-tree=$CLOSURE_LIBRARY_PATH"
    git="git $git_dir $git_work_tree"

    if [ -z "`ls $CLOSURE_LIBRARY_PATH`" ]; then
        git submodule init
        git submodule update
        $git checkout $CLOSURE_LIBRARY_REVISION
    fi
}

get() {
    get_closure_compiler
    get_closure_library
}

configure() {
    command="python $CLOSURE_DEPS_WRITER"
    command="$command --root_with_prefix=\"$CLOSURE_DEPS_ROOT_WITH_PREFIX\""
    command="$command > $CLOSURE_DEPS_OUTPUT"
    eval $command
}

build() {
    command="python $CLOSURE_BUILDER --output_mode=compiled --compiler_jar=\"$CLOSURE_COMPILER_PATH/compiler.jar\""

    for root in ${CLOSURE_ROOT_LIST[*]}; do
        command="$command --root=\"$root\""
    done

    for namespace in ${CLOSURE_NAMESPACE_LIST[*]}; do
        command="$command --namespace=\"$namespace\""
    done

    if [ "$1" == "min" ]; then
        command="$command --compiler_flags=\"$CLOSURE_MIN_FLAG\""
        command="$command > $CLOSURE_JS_OUTPUT_MIN"
    else
        command="$command > $CLOSURE_JS_OUTPUT"
    fi
    eval $command
}

test() {
    cd $TEST_PATH
    $TEST_PHANTOM $TEST_FILE
}

run() {
    if hash http-server 2> /dev/null; then
        echo "http://127.0.0.1:8080/example/"
        http-server
    else
        echo "http://127.0.0.1:8000/example/"
        python -m SimpleHTTPServer
    fi
}

if [ "$1" = "get" ]; then
    get
elif [ "$1" = "configure" ]; then
    configure
elif [ "$1" = "build" ]; then
    build
    build "min"
elif [ "$1" = "test" ]; then
    test
elif [ "$1" = "run" ]; then
    run
else
    get
    configure
    build
    build "min"
    test
fi
