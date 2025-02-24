/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * wiki-interface
 * Interface com Gitlab Wiki
 * Details: HTML content
 * 
 * Author: Marcelo Parisi (parisim@google.com)
 */

const fs = require('node:fs');
const configFile = require('../../lib/config/file');

/* build an HTML list for User Stories */
function getHtmlUsOptions(wikiList) {

    let options = "";

    /* Sorting Data */
    wikiList = wikiList.sort(function(a,b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if(x>y){return 1;}
        if(x<y){return -1;}
        return 0;
    });

    for(let thisWiki of wikiList) {
        if(!thisWiki.title.includes(configFile.getGeneratorsufix()) && !thisWiki.title.includes(configFile.getCypresssufix()) && 
           !thisWiki.title.includes(configFile.getPlaywrightsufix()) && !thisWiki.title.includes(configFile.getEvaluatorsufix())) {
            options += "<option value=\"" + thisWiki.slug + "\">" + thisWiki.title + "</option>\n";
        }
    }
    return options;
}

/* build an HTML list for User Stories */
function getHtmlTcOptions(wikiList) {

    let options = "";

    /* Sorting Data */
    wikiList = wikiList.sort(function(a,b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if(x>y){return 1;}
        if(x<y){return -1;}
        return 0;
    });

    for(let thisWiki of wikiList) {
        if(!thisWiki.title.includes(configFile.getGeneratorsufix()) && !thisWiki.title.includes(configFile.getCypresssufix()) && 
           !thisWiki.title.includes(configFile.getPlaywrightsufix()) && !thisWiki.title.includes(configFile.getEvaluatorsufix())) {
            options += "<option value=\"" + thisWiki.slug + "\">" + thisWiki.title + "</option>\n";
        }
    }
    return options;
}

/* build an HTML list for Test Cases */
function getHtmlTsOptions(wikiList) {

    let options = "";

    /* Sorting Data */
    wikiList = wikiList.sort(function(a,b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if(x>y){return 1;}
        if(x<y){return -1;}
        return 0;
    });

    for(let thisWiki of wikiList) {
        if(thisWiki.title.includes(configFile.getGeneratorsufix())) {
            options += "<option value=\"" + thisWiki.slug + "\">" + thisWiki.title + "</option>\n";
        }
    }
    return options;
}

/* build HTML form */
function generateHtmlForm(projectId, wikiList) {
    let usOptions = getHtmlUsOptions(wikiList);
    let tcOptions = getHtmlTcOptions(wikiList);
    let tsOptions = getHtmlTsOptions(wikiList);

    let filename  = "templates/mainform_" + configFile.getLanguage() + ".html";
    let mycontent = fs.readFileSync(filename, 'utf8');

    mycontent = mycontent.replaceAll("__PROJECT-ID__", projectId);
    mycontent = mycontent.replaceAll("__US-INPUT-DOCS__", usOptions);
    mycontent = mycontent.replaceAll("__TC-INPUT-DOCS__", tcOptions);
    mycontent = mycontent.replaceAll("__TS-INPUT-DOCS__", tsOptions);

    return mycontent;
}

/* build rating page */
function generateRatingPage(id, content, projectId, document) {
    let filename  = "templates/ratingform_" + configFile.getLanguage() + ".html";
    let mycontent = fs.readFileSync(filename, 'utf8');

    mycontent = mycontent.replaceAll("__PROJECT-ID__", projectId);
    mycontent = mycontent.replaceAll("__DOCUMENT__", document);
    mycontent = mycontent.replaceAll("__TRANSACTION-ID__", id);

    if(document != "test-data") {
        content = "<md-block>\n" + content + "</md-block>\n";
    } else {
        content = "<textarea rows=20 cols=150>\n" + content + "</textarea>\n";
    }

    mycontent = mycontent.replaceAll("__DOC-CONTENTS__", content);

    return mycontent;
}

module.exports.generateHtmlForm = generateHtmlForm;
module.exports.generateRatingPage = generateRatingPage;