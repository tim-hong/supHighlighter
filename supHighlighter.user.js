// ==UserScript==
// @name         supHighlighter
// @namespace    http://github.io/tim-hong
// @version      0.1
// @description  Highlighter for suptg qst archive
// @author       tim-hong
// @match        http://suptg.thisisnotatrueending.com/qstarchive/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_listValues
// @grant        GM_log
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    let values = GM_listValues();
    values.forEach(e => {
        GM_log("Deleting:" + e);
        GM_deleteValue(e);
    });

    // //Get list of properties returned (should only be one)
    function initHighlight() {
        let result = GM_listValues();
        //if property never made then create a blank one
        if(result.length === 0) {
            GM_setValue("savedFilter", "hello");
        }
        let savedFilter = GM_getValue("savedFilter");
        GM_log("Value: " + savedFilter);
    }


    function afterGetFilters(savedFilters) {

    }

    function processFilters(savedFilters) {
        //iterate through each postContainer
        //open postInfo
        //open nameBlock
        //if name or postertrip is in list then do the things
    }
    //initHighlight();
})();