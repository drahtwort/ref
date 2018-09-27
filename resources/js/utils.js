const bibl = './data/material-no-comment.bib';
var bib_data = null;
var bib_keys = [];

function initRemoteContent(url, func) {
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          data = func(xhttp.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function showBib(){
  initRemoteContent(bibl, parseBibliography);
  console.log(bib_data)
}

function parseBibliography(raw_data) {
    let rns = document.getElementById('bib');
    let btx_parser = new BibtexParser();
    btx_parser.setInput(raw_data);
    btx_parser.bibtex();
    bib_data = btx_parser.getEntries();
    for (var k in bib_data) {
        bib_keys.push(k)
    }
    bib_keys.sort()
    let btx_display = new BibtexDisplay();
    for (let k in bib_keys) {
        let key = bib_keys[k];
        let ref = btx_display.fixValue(bib_data[key].AUTHOR).split(',')[0] + ', ' + btx_display.fixValue(bib_data[key].TITLE) + ' ('+bib_data[key].YEAR+')';
        createReferSection(rns,key,ref);
    }
}

function createReferSection(root,name=null,value) {
    name = name.toLowerCase();
    let id = name
    let e = createNode('div',id);
    let e_index = createNode('pre',id+'-index');
    e_index.innerHTML = value;
    e.appendChild(e_index);
    root.appendChild(e);
}

function createNode(tag,id=null,className=null,type=null) {
    let elem = document.createElement(tag);
    if(id!==null){
        elem.setAttribute('id',id);
    } else {
       // console.log(tag, 'node created without id!')
    }
    if (type !==null){
        elem.setAttribute('type',type);
    }
    if (className!==null) {
        elem.className=className;
    }
    return elem
}
