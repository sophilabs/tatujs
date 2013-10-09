var page = require('webpage').create();

// Messages regex
var REGEX_MESSAGE = /(\d{2}:\d{2}:\d{2}.\d{3}) : ((.|\n)*)/;
var REGEX_COMPLETED = /Tests complete/;
var REGEX_RESULT = /(\d+) passed, (\d+) failed..*/;

// Test counts
var tests_passed = 0;
var tests_failed = 0;

// Current test
var test = 0;

/**
 * Tests to run.
 */
var TESTS = [
    '../src/tatu/conf/test.html',
    '../src/tatu/queue/test.html',
    '../src/tatu/loaders/dummy/test.html',
    '../src/tatu/loaders/html/test.html',
];

/**
 * Run next test.
 */
var next = function() {
    if (test == TESTS.length) {
        console.info(tests_passed + ' tests passed.');
        console.info(tests_failed + ' tests failed.');
        phantom.exit();
    }

    console.info('Running test ' + (test + 1) + '...');

    page.open(TESTS[test], function() {
        page.evaluate(function() {
            G_testRunner.setStrict(false);
        });
    });
};

next();

/**
 * Parse message.
 */
page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.info(msg);

    var matches = msg.match(REGEX_MESSAGE);

    var time = matches[1];
    var message = matches[2];

    var result = message.match(REGEX_RESULT);
    if (result != null) {
        var passed = result[1];
        var failed = result[2];

        tests_passed += parseInt(passed);
        tests_failed += parseInt(failed);
    }

    var completed = message.match(REGEX_COMPLETED);
    if (completed != null) {
        test++;
        next();
    }
};
