// ==UserScript==
// @name         supHighlighter
// @namespace    http://github.io/tim-hong
// @version      0.1
// @description  Highlighter for suptg qst archive
// @author       tim-hong
// @match        *://suptg.thisisnotatrueending.com/qstarchive/*
// @exclude      *://suptg.thisisnotatrueending.com/qstarchive/*/images/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_listValues
// @grant        GM_log
// @grant        unsafeWindow
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    let css =
    `.supmodal {
        box-sizing: border-box !important;
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        -webkit-animation-name: fadeIn; /* Fade in the background */
        -webkit-animation-duration: 0.4s;
        animation-name: fadeIn;
        animation-duration: 0.4s
    }

    /* Modal Content */
    .supmodal-content {
        background-color: #fefefe;
        width: 50%;
        height: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-animation-name: slideIn;
        -webkit-animation-duration: 0.4s;
        animation-name: slideIn;
        animation-duration: 0.4s
    }

    /* The Close Button */
    .supclose {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .supclose:hover,
    .supclose:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .supmodal-header {
        padding: 2px 16px;
        background-color: #5cb85c;
        color: white;
    }

    .supmodal-body {padding: 2px 16px;}

    .supmodal-footer {
        padding: 2px 16px;
        background-color: #5cb85c;
        color: white;
        position: absolute;
        bottom: 0px;
        width: 100%;
        box-sizing: border-box !important;
    }

    /* Add Animation */
    @-webkit-keyframes slideIn {
        from {bottom: -300px; opacity: 0}
        to {bottom: 0; opacity: 1}
    }

    @keyframes slideIn {
        from {bottom: -300px; opacity: 0}
        to {bottom: 0; opacity: 1}
    }

    @-webkit-keyframes fadeIn {
        from {opacity: 0}
        to {opacity: 1}
    }

    @keyframes fadeIn {
        from {opacity: 0}
        to {opacity: 1}
    }`
    GM_addStyle(css);
    let values = GM_listValues();
    values.forEach(e => {
        GM_log("Deleting:" + e);
        GM_deleteValue(e);
    });
    let modal = "";
    let span = "";
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
        setup();
    }

    function setup() {
        createModal();
        injectMenu();
    }

    function hideModal() {
        modal.style.display = "none";
    }

    function showModal() {
        modal.style.display = "block";
    }

    function createModal() {
       let modalText = `<div id="supmodal" class="supmodal">

            <!-- Modal content -->
            <div class="supmodal-content">
                <div class="supmodal-header">
                <span id="supclose" class="supclose">&times;</span>
                <h2>Modal Header</h2>
                </div>
                <div class="supmodal-body">
                <p>Some text in the Modal Body</p>
                <p>Some other text...</p>
                </div>
                <div class="supmodal-footer">
                <h3>Modal Footer</h3>
                </div>
            </div>

        </div>`
        document.body.innerHTML += modalText;
        modal = document.getElementById('supmodal');
        span  = document.getElementById('supclose');
        span.addEventListener("click", hideModal);
        window.onclick = function(event) {
            if (event.target == modal) {
               hideModal();
            }
        }
    }

    function injectMenu() {
        let menuItem = document.createElement("span");
        menuItem.setAttribute("id","supHighlighterSettings");
        let menuItemA = document.createElement("a");
        menuItemA.innerText = " supHighlighter";
        menuItemA.setAttribute("href","javascript:void(0)");
        menuItem.appendChild(menuItemA);
        menuItem.addEventListener("click",showModal);
        let header = document.getElementById("navtopr");
        header.appendChild(menuItem);
    }

    function processFilters(savedFilters) {
        //iterate through each postContainer
        //open postInfo
        //open nameBlock
        //if name or postertrip is in list then do the things
    }
    //initHighlight();

    setup();
})();