# suptg /qst/ Highlighter User Script

## Description
A userscript for [suptg /qst/ board](http://suptg.thisisnotatrueending.com/qstarchive.html)
Allows users to apply custom css to posts that are created by users with specified names or tripcodes.
Meant to be used with:
* [TamperMonkey](http://tampermonkey.net/)
* Stylish [(chrome)](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe) [(firefox)](https://addons.mozilla.org/en-US/firefox/addon/stylish/)
Currently only supports plaintext comparison
## Guide

There are 3 arguments. name: the name or tripcode, type: `name` or `trip`, and css: the css class name to apply.
One entry per line. Lines starting with a `#` will be ignored.
Entries should be formatted like `name;type;css`
For example `softmaza;name;thebest` or `!exampletrip;trip;thetrip`

## Todo
* Add regex support
* Add settings tab to allow changing delimiter and adding of custom css