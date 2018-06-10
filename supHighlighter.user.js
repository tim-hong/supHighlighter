// ==UserScript==
// @name         supHighlighter
// @namespace    supHighlighter
// @license      Apache 2.0; https://github.com/tim-hong/supHighlighter/blob/master/LICENSE
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
// @updateURL    https://github.com/tim-hong/supHighlighter/raw/master/supHighlighter.meta.js
// @downloadURL  https://github.com/tim-hong/supHighlighter/raw/master/supHighlighter.user.js
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
        margin-top: 9px;
    }

    .supmodal-body {
        box-sizing: border-box !important;
        padding: 2px 16px;
        width: 900px;
        max-width: 100%;
        overflow: auto;
        margin: auto;
    }
    .supmodal-body code {
        background: #fff !important;
        color: #000 !important;
    }
    .supmodal-body textarea{
        box-sizing: border-box !important;
        font-family: monospace !important;
        min-width: 100%;
        max-width: 100%;
        height: 380px;
        margin: auto;
        padding: 2px 4px 3px;
        background: #373b41 !important;
        border: 1px solid #373b41 !important;
        color: #c5c8c6 !important;
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
        bottom: 9px;
        backface-visibility: hidden;
        margin-top: 10px;
    }

    #supsave-filter span {
        text-align: center;
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
                    <h2>suptg /qst/ Highlighter</h2>
                </div>
                <div class="supmodal-body">
                    <h3>Guide</h3>
                    <p>There are 3 arguments. name: the name or tripcode, type: <code>name</code> or <code>trip</code>, and css: the css class name to apply.<br>
                    One entry per line. Lines starting with a <code>#</code> will be ignored.<br>
                    Entries should be formatted like name;type;css<br>
                    For example <code>softmaza;name;thebest</code> or <code>!exampletrip;trip;thetrip</code><br>
                    Regex search currently unsupported</p>
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
        closer = document.getElementById('supclose');
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
        menuItemA.innerHTML = " &#9881;";
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
            GM_setValue("savedFilter", "#softmaza;name;thebest\n#!exampletrip;trip;thetrip");
        }
        savedFilter = GM_getValue("savedFilter", "#softmaza;name;thebest\n#!exampletrip;trip;thetrip");
        processFilters(savedFilter.split(/\r?\n/));
    }

    function saveHighlight() {
        GM_setValue("savedFilter", textbox.value);
        savedFilter = GM_getValue("savedFilter", "#softmaza;name;thebest\n#!exampletrip;trip;thetrip");
    }

    function deleteValues() {
        let values = GM_listValues();
        values.forEach(e => {
            GM_deleteValue(e);
        });
    }

    function processFilters(savedFilters) {
        let nameFilters = new Map();
        let tripFilters = new Map();
        savedFilters.forEach( filts => {
            filts = filts.trim();
            if(filts.charAt(0) === "#") return;
            let delimiter = GM_getValue("delimiter", ";")
            let args = filts.split(delimiter);
            //should be 3 per line
            if(args.length <= 3) return;
            //args[0] should be name/trip,args[1] should be type,args[2] should be class
            switch(args[1]) {
                case "name":
                    nameFilters.set(args[0],args[2]);
                    break;
                case "trip":
                    tripFilters.set(args[0],args[2]);
            }
        });
        if(nameFilters.size === 0 && tripFilters.size === 0) return;
        //iterate through each postContainer
        let posts = document.getElementsByClassName("postContainer");
        for(let i = 0; i < posts.length; i++) {
            let post = posts.item(i);
            let nbs = post.getElementsByClassName('nameBlock');
            for(let i2 = 0; i2 < nbs.length; i2++) {
                let nb = nbs.item(i2);
                let name = nb.getElementsByClassName('name').item(0).innerText;
                let trip = "";
                if(nb.getElementsByClassName('postertrip').length > 0)
                    trip = nb.getElementsByClassName('postertrip').item(0).innerText;
                if(nameFilters.get(name) || tripFilters.get(trip)) {
                    let cssClass = (tripFilters.get(trip)) ? tripFilters.get(trip) : nameFilters.get(name);
                    post.className += " " + cssClass;
                    break;
                }
            }
        }
    }

    setup();
})();