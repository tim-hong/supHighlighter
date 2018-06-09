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
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
        -webkit-animation-name: fadeIn;
        -webkit-animation-duration: 0.3s;
        animation-name: fadeIn;
        animation-duration: 0.3s
        backface-visibility: hidden;
    }

    /* Modal Content */
    .supmodal-content {
        background: #373b41 !important;
        color: #c5c8c6 !important;
        height: 600px;
        max-height: 100%;
        width: 900px;
        max-width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: auto;
    }

    /* The Close Button */
    .supclose {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
        line-height: 22px;
    }

    .supclose:hover,
    .supclose:focus {
        color: #cc6666;
        text-decoration: none;
        cursor: pointer;
    }

    .supmodal-header {
        padding: 2px 16px;
        background-color: #373b41;
        color: #c5c8c6;
    }

    .supmodal-body {
        box-sizing: border-box !important;
        padding: 2px 16px;
        width: 900px;
        max-width: 100%;
        overflow: auto;
        margin: auto;
    }

    .supmodal-body textarea{
        box-sizing: border-box !important;
        font-family: monospace;
        min-width: 100%;
        max-width: 100%;
        height: 460px;
        margin: auto;
        padding: 2px 4px 3px;
        background: #373b41 !important;
        border: 1px solid #373b41 !important;
        color: #c5c8c6;
    }

    textarea:hover {
        background: #464c53 !important;
    }

    #supsave-filter {
        width: 60px;
        height: 25px;
        background: #c5c8c6;
        border: solid #c5c8c6;
        border-radius: 4px;
        color: #373b41;
        box-sizing: border-box !important;
        position: absolute;
        right: 16px;
        backface-visibility: hidden;
    }

    #supsave-filter span {
        text-align: center;
        line-height: 10px;
        display: block;
        transform: translateY(-1px);
    }

    #supsave-filter:hover {
        background: #6e7782;
        border-color: #6e7782;
    }

    #supsave-filter:active {
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
    }

    input:focus, textarea:focus, textarea:active {
        border: 1px solid #81a2be !important;
        background: #464c53 !important;
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

    let modal = "";
    let closer = "";
    let savedFilter = "";
    let saver = "";
    let textbox = "";

    function setup() {
        initHighlight();
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
                    <div>
                        <textarea id="supfilter" class="field" spellcheck="false"></textarea>
                    </div>
                    <div>
                        <button id="supsave-filter"><span>Save</span></button>
                    </div>
                </div>
            </div>

        </div>`
        document.body.innerHTML += modalText;
        modal = document.getElementById('supmodal');
        closer  = document.getElementById('supclose');
        closer.addEventListener("click", hideModal);
        window.onclick = function(event) {
            if (event.target == modal) {
               hideModal();
            }
        }
        textbox = document.getElementById('supfilter');
        textbox.value = savedFilter;
        saver = document.getElementById('supsave-filter');
        saver.addEventListener("click", saveHighlight);
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

        // //Get list of properties returned (should only be one)
    function initHighlight() {
        //deleteValues();
        let result = GM_listValues();
        //if property never made then create a blank one
        if(result.length === 0) {
            GM_setValue("savedFilter", "");
        }
        savedFilter = GM_getValue("savedFilter", "");
        processFilters(savedFilter.split(/\r?\n/));
    }

    function saveHighlight() {
        GM_setValue("savedFilter", textbox.value);
        savedFilter = GM_getValue("savedFilter", "");
        GM_log("Value of saved: " + savedFilter);
    }

    function deleteValues() {
        let values = GM_listValues();
        values.forEach(e => {
            GM_log("Deleting:" + e);
            GM_deleteValue(e);
        });
    }

    function processFilters(savedFilters) {
        GM_log(savedFilters);
        //iterate through each postContainer
        //open postInfo
        //open nameBlock
        //if name or postertrip is in list then do the things
    }

    setup();
})();