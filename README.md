# Juanificate

This repository contains the juanificate jQuery plugin and assets. A small QUnit test suite is provided under the `tests/` directory.

## Running the tests

Because the plugin relies on the browser environment, the tests must be run in a browser. You can serve the repository with any local web server. One simple approach is to use Python:

```bash
python3 -m http.server
```

Then open `http://localhost:8000/tests/` in your browser to execute the QUnit test suite.
