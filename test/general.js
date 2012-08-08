'use strict';

var JSONWriter = require('../');

exports['setUp'] = function (callback) {
  this.jw = new JSONWriter;
  callback();
};

exports['construct'] = function (test) {
  test.ok(this.jw instanceof JSONWriter);
  test.done();
}

/*
{ 
  version: '1.0',
  encoding: 'UTF-8'
}
*/
exports['Document'] = function (test) {

  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.endDocument());

  // string should be JSON formated
  try {
    var r = JSON.parse(this.jw.toString());
    test.equal(r['version'], '1.0');
    test.equal(r['encoding'], 'UTF-8');

  } catch(err) {
    test.equal(err, null, 'JSONWriter.toString should return a json string');
  }
  test.done();
}

exports['Element1'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString());
  test.ok(r['Root']);
  test.done();
}
exports['Element2'] = function (test) {
  //test.ok(this.jw.setIndent(true));
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startElement('Item'));
  test.ok(this.jw.text('#1'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.ok(r['Root']);
  test.equal(r['Root']['Item']['$t'], '#1');
  test.done();
}


exports['Element3'] = function (test) {
  //test.ok(this.jw.setIndent(true));
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startElement('Item'));
  test.ok(this.jw.text('#1'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElement('Item'));
  test.ok(this.jw.text('#2'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.ok(r['Root']);
  test.equal(r['Root']['Item'][0]['$t'], '#1');
  test.equal(r['Root']['Item'][1]['$t'], '#2');
  test.done();
}


exports['Element4'] = function (test) {
  //test.ok(this.jw.setIndent(true));
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startElement('Item'));
  test.ok(this.jw.text('#1'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElement('Item'));
  test.ok(this.jw.text('#2'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElement('Item'));
  test.ok(this.jw.text('#3'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.ok(r['Root']);
  test.equal(r['Root']['Item'][0]['$t'], '#1');
  test.equal(r['Root']['Item'][1]['$t'], '#2');
  test.equal(r['Root']['Item'][2]['$t'], '#3');
  test.done();
}

exports['ElementNS1'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElementNS('ex', 'Root', 'http://www.example.com'));
  test.ok(this.jw.text('<{.\ô/.}>'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.ok(r['ex$Root']);
  test.done();
}

exports['ElementNS2'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElementNS('ex', 'Root', 'http://www.example.com'));
  test.ok(this.jw.text('<{.\ô/.}>'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.ok(r['xmlns$ex']);
  test.equal(r['xmlns$ex'], 'http://www.example.com');
  test.done();
}
/*
exports['Comment'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startComment());
  test.ok(this.jw.text('this a comment !'));
  test.ok(this.jw.endComment());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  $this->okNotContains('this a comment', serialize(r));
}
exports['Attribute'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startAttribute('attr'));
  test.ok(this.jw.text(__METHOD__));
  test.ok(this.jw.endAttribute());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['attr'], __METHOD__);
}
exports['AttributeNS'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startAttributeNS('ex', 'attr', 'http://www.example.com'));
  test.ok(this.jw.text(__METHOD__));
  test.ok(this.jw.endAttribute());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['ex$attr'], __METHOD__);
}
exports['CData'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startCData());
  test.ok(this.jw.text(__METHOD__));
  test.ok(this.jw.endCData());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['$t'], __METHOD__);
}
exports['PI'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startPI('php'));
  test.ok(this.jw.text(__METHOD__));
  test.ok(this.jw.endPI());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['<?php']['$t'], __METHOD__);
}
exports['PI2'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startPI('php'));
  test.ok(this.jw.text(__METHOD__.'#1'));
  test.ok(this.jw.endPI());
  test.ok(this.jw.startPI('php'));
  test.ok(this.jw.text(__METHOD__.'#2'));
  test.ok(this.jw.endPI());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['<?php'][0]['$t'], __METHOD__.'#1');
  test.equal(r['Root']['<?php'][1]['$t'], __METHOD__.'#2');
}
exports['PI3'] = function (test) {
  test.ok(this.jw.startDocument('1.0', 'UTF-8'));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.startPI('php'));
  test.ok(this.jw.text(__METHOD__.'#1'));
  test.ok(this.jw.endPI());
  test.ok(this.jw.startPI('php'));
  test.ok(this.jw.text(__METHOD__.'#2'));
  test.ok(this.jw.endPI());
  test.ok(this.jw.startPI('php'));
  test.ok(this.jw.text(__METHOD__.'#3'));
  test.ok(this.jw.endPI());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['<?php'][0]['$t'], __METHOD__.'#1');
  test.equal(r['Root']['<?php'][1]['$t'], __METHOD__.'#2');
  test.equal(r['Root']['<?php'][2]['$t'], __METHOD__.'#3');
}
exports['full'] = function (test) {
  // from http://www.phpbuilder.com/columns/iceomnia_20090116.php3
  test.ok(this.jw.setIndent(true));

  test.ok(this.jw.startDocument('1.0'));
  test.ok(this.jw.startElement('rss'));
  test.ok(this.jw.writeAttribute('version', '2.0'));
  test.ok(this.jw.startElement('channel'));
  test.ok(this.jw.writeElement('title', 'Latest Products'));
  test.ok(this.jw.writeElement('description', 'This is the latest products from our website.'));
  test.ok(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.ok(this.jw.startElement('image'));
  test.ok(this.jw.writeElement('title', 'Latest Products'));
  test.ok(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.writeElement('url', 'http://www.iab.net/media/image/120x60.gif'));
  test.ok(this.jw.writeElement('width', '120'));
  test.ok(this.jw.writeElement('height', '60'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElement('item'));
  test.ok(this.jw.writeElement('title', 'New Product 8'));
  test.ok(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.writeElement('description', 'Description 8 Yeah!'));
  test.ok(this.jw.writeElement('guid', 'http://www.domain.com/link.htm?tiem=1234'));
  test.ok(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.ok(this.jw.startElement('category'));
  test.ok(this.jw.writeAttribute('domain', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.text('May 2008'));
  test.ok(this.jw.endElement()); // category
  test.ok(this.jw.endElement()); // item
  test.ok(this.jw.startElement('item'));
  test.ok(this.jw.writeElement('title', 'New Product 7'));
  test.ok(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.writeElement('description', 'Description Yeah!'));
  test.ok(this.jw.writeElement('guid', 'http://www.domain.com/link.htm?tiem=1234'));
  test.ok(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.ok(this.jw.startElement('category'));
  test.ok(this.jw.writeAttribute('domain', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.text('May 2008'));
  test.ok(this.jw.endElement()); // category
  test.ok(this.jw.endElement()); // item
  test.ok(this.jw.startElement('item'));
  test.ok(this.jw.writeElement('title', 'New Product 6'));
  test.ok(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.writeElement('description', 'Description 8 Yeah!'));
  test.ok(this.jw.writeElement('guid', 'http://www.domain.com/link.htm?tiem=1234'));
  test.ok(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.ok(this.jw.startElement('category'));
  test.ok(this.jw.writeAttribute('domain', 'http://www.domain.com/link.htm'));
  test.ok(this.jw.text('May 2008'));
  test.ok(this.jw.endElement()); // category
  test.ok(this.jw.endElement()); // item
  test.ok(this.jw.endElement()); // channel
  test.ok(this.jw.endElement()); // rss
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
}

exports['fullbis'] = function (test) {
  test.ok(this.jw.setIndent(true));
  test.ok(this.jw.startDocument('1.0', 'utf-8', true));
  test.ok(this.jw.writePI('xml-stylesheet', 'type="text/xsl" media="screen" href="test.xsl"'));
  for($i=1,$x=''; $i < 512; $i++) $x .= ' ';
  test.ok(this.jw.writeComment($x));
  test.ok(this.jw.startElementNS('rdf', 'RDF', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'));
  test.ok(this.jw.writeAttributeNS('xmlns', 'skos', null, 'http://www.w3.org/2004/02/skos/core#'));
  test.ok(this.jw.startElement('skos:Concept'));
  test.ok(this.jw.writeAttribute('rdf:about', 'truc#'));
  test.ok(this.jw.startElement('skos:prefLabel'));
  test.ok(this.jw.writeAttribute('xml:lang', 'fr'));
  test.ok(this.jw.text('truc'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.flush());
  test.ok(this.jw.startElement('skos:Concept'));
  test.ok(this.jw.writeAttribute('rdf:about', 'bidule#'));
  test.ok(this.jw.startElement('skos:prefLabel'));
  test.ok(this.jw.writeAttribute('xml:lang', 'fr'));
  test.ok(this.jw.text('bidule'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.flush());
  test.ok(this.jw.startElement('skos:Concept'));
  test.ok(this.jw.writeAttribute('rdf:about', 'chouette#'));
  test.ok(this.jw.startElement('skos:prefLabel'));
  test.ok(this.jw.writeAttribute('xml:lang', 'fr'));
  test.ok(this.jw.text('chouette'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.flush());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
}
exports['RAW'] = function (test) {
  test.ok(this.jw.setIndent(true));
  test.ok(this.jw.setIndentString('.'));
  test.ok(this.jw.openMemory());
  test.ok(this.jw.startDocument());
  test.ok(this.jw.startElement('x'));
  test.ok(this.jw.startAttribute('x'));
  test.ok(this.jw.text('x'));
  test.ok(this.jw.endAttribute());
  test.ok(this.jw.startElement('y')); // Doesn't support tag and attr with the same name
  test.ok(this.jw.text('x'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  test.ok(this.jw.flush() !== false);
  var r = this.jw.toString()
  test.equal("{\n.\"version\": \"1.0\",\n.\"encoding\": \"utf-8\",\n.\"x\": {\n..\"x\": \"x\",\n..\"y\": {\n...\"\$t\": \"x\"\n..}\n.}\n}", r);
}

exports['nodocument'] = function (test) {
  test.ok(this.jw.setIndent(true));
  test.ok(this.jw.startElement('Root'));
  test.ok(this.jw.text('toto'));
  test.ok(this.jw.endElement());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['$t'], 'toto');
}

exports['notns'] = function (test) {
  test.ok(this.jw.setIndent(true));
  test.ok(this.jw.startDocument('1.0', 'utf-8', true));
  test.ok(this.jw.startElement('rdf:RDF'));
  test.ok(this.jw.writeAttribute('xmlns:skos', 'http://skos'));
  test.ok(this.jw.writeAttribute('xmlns:tps', 'http://tps'));
  test.ok(this.jw.writeAttribute('xmlns:tmf', 'http://tmf'));
  test.ok(this.jw.startElement('skos:Concept'));
  test.ok(this.jw.writeAttribute('rdf:about', '1'));
  test.ok(this.jw.startElement('tps:a'));
  test.ok(this.jw.writeAttribute('xml:lang', 'fr'));
  test.ok(this.jw.text('1a'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElement('tps:b'));
  test.ok(this.jw.writeAttribute('xml:lang', 'fr'));
  test.ok(this.jw.text('1b'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElement('skos:Concept'));
  test.ok(this.jw.writeAttribute('rdf:about', '2'));
  test.ok(this.jw.startElement('tps:a'));
  test.ok(this.jw.writeAttribute('xml:lang', 'fr'));
  test.ok(this.jw.text('2a'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElement('tps:b'));
  test.ok(this.jw.writeAttribute('xml:lang', 'fr'));
  test.ok(this.jw.text('2b'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['rdf:RDF']['skos:Concept'][0]['rdf:about'], 1);
  test.equal(r['rdf:RDF']['skos:Concept'][1]['rdf:about'], 2);
  test.done();

}

exports['nsnull'] = function (test) {
  test.ok(this.jw.setIndent(true));
  test.ok(this.jw.startDocument('1.0', 'utf-8', true));
  test.ok(this.jw.startElementNS('rdf', 'RDF', 'http://rdf'));
  test.ok(this.jw.writeAttributeNS('xmlns', 'skos', null, 'http://skos'));
  test.ok(this.jw.writeAttributeNS('xmlns', 'tps', null, 'http://tps'));
  test.ok(this.jw.writeAttributeNS('xmlns', 'tmf', null, 'http://tmf'));
  test.ok(this.jw.startElementNS('skos', 'Concept', null));
  test.ok(this.jw.writeAttributeNS('rdf', 'about', null, '1'));
  test.ok(this.jw.startElementNS('tps', 'a', null));
  test.ok(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.ok(this.jw.text('1a'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElementNS('tps', 'b', null));
  test.ok(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.ok(this.jw.text('1b'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElementNS('skos', 'Concept', null));
  test.ok(this.jw.writeAttributeNS('rdf', 'about', null, '2'));
  test.ok(this.jw.startElementNS('tps', 'a', null));
  test.ok(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.ok(this.jw.text('2a'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.startElementNS('tps', 'b', null));
  test.ok(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.ok(this.jw.text('2b'));
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endElement());
  test.ok(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['rdf$RDF']['skos$Concept'][0]['rdf$about'], 1);
  test.equal(r['rdfrDF']['skos$Concept'][1]['rdf$about'], 2);
  test.done();
}
*/
/* */





