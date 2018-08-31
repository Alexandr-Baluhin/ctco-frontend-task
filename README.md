## About
Small business-form constructing library. Use JSON files to build DOM-structures.

The following form controller types with JSON file support:

* input
* currency
* date

and also grouping type:
* section

There are some rules to build JSON structure:
1. First key in structure must be "widgets".
2. The form widgets may contain both sections and elements.
3. Sections must contain only elements (sub-sections are not supported!)

Two correct JSON files and one wrong are located in the folder "examples".
Use them to test library and build own JSON files!

## Start
Run command `npm build` to build production version of the library and then just open file "dist/index.html"
or run command `npm start:prod` to start web-server,
or, alternatively, you can setup nginx or apache to browse dist-files.
