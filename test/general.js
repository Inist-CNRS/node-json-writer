'use strict';

var JSONWriter = require('../');

exports['setUp'] = function (callback) {
  this.jw = new JSONWriter();
  callback();
};

exports['construct'] = function (test) {
  test.assert(this.jw instanceof JSONWriter);
}
exports['Document'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['version'], '1.0');
  test.equal(r['encoding'], 'UTF-8');
}
/*
exports['Element1'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.assert(isset(r['Root']));
}
exports['Element2'] = function (test) {
  test.assert(this.jw.setIndent(true));
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startElement('Item'));
  test.assert(this.jw.text('#1'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElement('Item'));
  test.assert(this.jw.text('#2'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.assert(isset(r['Root']));
  test.equal(r['Root']['Item'][0]['$t'], '#1');
  test.equal(r['Root']['Item'][1]['$t'], '#2');
}
exports['Element3'] = function (test) {
  test.assert(this.jw.setIndent(true));
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startElement('Item'));
  test.assert(this.jw.text('#1'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElement('Item'));
  test.assert(this.jw.text('#2'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElement('Item'));
  test.assert(this.jw.text('#3'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.assert(isset(r['Root']));
  test.equal(r['Root']['Item'][0]['$t'], '#1');
  test.equal(r['Root']['Item'][1]['$t'], '#2');
  test.equal(r['Root']['Item'][2]['$t'], '#3');
}
exports['ElementNS'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElementNS('ex', 'Root', 'http://www.example.com'));
  test.assert(this.jw.text('<{.\ô/.}>'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.assert(isset(r['ex$Root']));
}
exports['Comment'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startComment());
  test.assert(this.jw.text('this a comment !'));
  test.assert(this.jw.endComment());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  $this->assertNotContains('this a comment', serialize(r));
}
exports['Attribute'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startAttribute('attr'));
  test.assert(this.jw.text(__METHOD__));
  test.assert(this.jw.endAttribute());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['attr'], __METHOD__);
}
exports['AttributeNS'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startAttributeNS('ex', 'attr', 'http://www.example.com'));
  test.assert(this.jw.text(__METHOD__));
  test.assert(this.jw.endAttribute());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['ex$attr'], __METHOD__);
}
exports['CData'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startCData());
  test.assert(this.jw.text(__METHOD__));
  test.assert(this.jw.endCData());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['$t'], __METHOD__);
}
exports['PI'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startPI('php'));
  test.assert(this.jw.text(__METHOD__));
  test.assert(this.jw.endPI());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['<?php']['$t'], __METHOD__);
}
exports['PI2'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startPI('php'));
  test.assert(this.jw.text(__METHOD__.'#1'));
  test.assert(this.jw.endPI());
  test.assert(this.jw.startPI('php'));
  test.assert(this.jw.text(__METHOD__.'#2'));
  test.assert(this.jw.endPI());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['<?php'][0]['$t'], __METHOD__.'#1');
  test.equal(r['Root']['<?php'][1]['$t'], __METHOD__.'#2');
}
exports['PI3'] = function (test) {
  test.assert(this.jw.startDocument('1.0', 'UTF-8'));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.startPI('php'));
  test.assert(this.jw.text(__METHOD__.'#1'));
  test.assert(this.jw.endPI());
  test.assert(this.jw.startPI('php'));
  test.assert(this.jw.text(__METHOD__.'#2'));
  test.assert(this.jw.endPI());
  test.assert(this.jw.startPI('php'));
  test.assert(this.jw.text(__METHOD__.'#3'));
  test.assert(this.jw.endPI());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['<?php'][0]['$t'], __METHOD__.'#1');
  test.equal(r['Root']['<?php'][1]['$t'], __METHOD__.'#2');
  test.equal(r['Root']['<?php'][2]['$t'], __METHOD__.'#3');
}
exports['full'] = function (test) {
  // from http://www.phpbuilder.com/columns/iceomnia_20090116.php3
  test.assert(this.jw.setIndent(true));

  test.assert(this.jw.startDocument('1.0'));
  test.assert(this.jw.startElement('rss'));
  test.assert(this.jw.writeAttribute('version', '2.0'));
  test.assert(this.jw.startElement('channel'));
  test.assert(this.jw.writeElement('title', 'Latest Products'));
  test.assert(this.jw.writeElement('description', 'This is the latest products from our website.'));
  test.assert(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.assert(this.jw.startElement('image'));
  test.assert(this.jw.writeElement('title', 'Latest Products'));
  test.assert(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.writeElement('url', 'http://www.iab.net/media/image/120x60.gif'));
  test.assert(this.jw.writeElement('width', '120'));
  test.assert(this.jw.writeElement('height', '60'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElement('item'));
  test.assert(this.jw.writeElement('title', 'New Product 8'));
  test.assert(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.writeElement('description', 'Description 8 Yeah!'));
  test.assert(this.jw.writeElement('guid', 'http://www.domain.com/link.htm?tiem=1234'));
  test.assert(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.assert(this.jw.startElement('category'));
  test.assert(this.jw.writeAttribute('domain', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.text('May 2008'));
  test.assert(this.jw.endElement()); // category
  test.assert(this.jw.endElement()); // item
  test.assert(this.jw.startElement('item'));
  test.assert(this.jw.writeElement('title', 'New Product 7'));
  test.assert(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.writeElement('description', 'Description Yeah!'));
  test.assert(this.jw.writeElement('guid', 'http://www.domain.com/link.htm?tiem=1234'));
  test.assert(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.assert(this.jw.startElement('category'));
  test.assert(this.jw.writeAttribute('domain', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.text('May 2008'));
  test.assert(this.jw.endElement()); // category
  test.assert(this.jw.endElement()); // item
  test.assert(this.jw.startElement('item'));
  test.assert(this.jw.writeElement('title', 'New Product 6'));
  test.assert(this.jw.writeElement('link', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.writeElement('description', 'Description 8 Yeah!'));
  test.assert(this.jw.writeElement('guid', 'http://www.domain.com/link.htm?tiem=1234'));
  test.assert(this.jw.writeElement('pubDate', date("D, d M Y H:i:s e")));
  test.assert(this.jw.startElement('category'));
  test.assert(this.jw.writeAttribute('domain', 'http://www.domain.com/link.htm'));
  test.assert(this.jw.text('May 2008'));
  test.assert(this.jw.endElement()); // category
  test.assert(this.jw.endElement()); // item
  test.assert(this.jw.endElement()); // channel
  test.assert(this.jw.endElement()); // rss
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
}

exports['fullbis'] = function (test) {
  test.assert(this.jw.setIndent(true));
  test.assert(this.jw.startDocument('1.0', 'utf-8', true));
  test.assert(this.jw.writePI('xml-stylesheet', 'type="text/xsl" media="screen" href="test.xsl"'));
  for($i=1,$x=''; $i < 512; $i++) $x .= ' ';
  test.assert(this.jw.writeComment($x));
  test.assert(this.jw.startElementNS('rdf', 'RDF', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'));
  test.assert(this.jw.writeAttributeNS('xmlns', 'skos', null, 'http://www.w3.org/2004/02/skos/core#'));
  test.assert(this.jw.startElement('skos:Concept'));
  test.assert(this.jw.writeAttribute('rdf:about', 'truc#'));
  test.assert(this.jw.startElement('skos:prefLabel'));
  test.assert(this.jw.writeAttribute('xml:lang', 'fr'));
  test.assert(this.jw.text('truc'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.flush());
  test.assert(this.jw.startElement('skos:Concept'));
  test.assert(this.jw.writeAttribute('rdf:about', 'bidule#'));
  test.assert(this.jw.startElement('skos:prefLabel'));
  test.assert(this.jw.writeAttribute('xml:lang', 'fr'));
  test.assert(this.jw.text('bidule'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.flush());
  test.assert(this.jw.startElement('skos:Concept'));
  test.assert(this.jw.writeAttribute('rdf:about', 'chouette#'));
  test.assert(this.jw.startElement('skos:prefLabel'));
  test.assert(this.jw.writeAttribute('xml:lang', 'fr'));
  test.assert(this.jw.text('chouette'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.flush());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
}
exports['RAW'] = function (test) {
  test.assert(this.jw.setIndent(true));
  test.assert(this.jw.setIndentString('.'));
  test.assert(this.jw.openMemory());
  test.assert(this.jw.startDocument());
  test.assert(this.jw.startElement('x'));
  test.assert(this.jw.startAttribute('x'));
  test.assert(this.jw.text('x'));
  test.assert(this.jw.endAttribute());
  test.assert(this.jw.startElement('y')); // Doesn't support tag and attr with the same name
  test.assert(this.jw.text('x'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  test.assert(this.jw.flush() !== false);
  var r = this.jw.toString()
  test.equal("{\n.\"version\": \"1.0\",\n.\"encoding\": \"utf-8\",\n.\"x\": {\n..\"x\": \"x\",\n..\"y\": {\n...\"\$t\": \"x\"\n..}\n.}\n}", r);
}

exports['nodocument'] = function (test) {
  test.assert(this.jw.setIndent(true));
  test.assert(this.jw.startElement('Root'));
  test.assert(this.jw.text('toto'));
  test.assert(this.jw.endElement());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['Root']['$t'], 'toto');
}
/* */

exports['notns'] = function (test) {
  test.assert(this.jw.setIndent(true));
  test.assert(this.jw.startDocument('1.0', 'utf-8', true));
  test.assert(this.jw.startElement('rdf:RDF'));
  test.assert(this.jw.writeAttribute('xmlns:skos', 'http://skos'));
  test.assert(this.jw.writeAttribute('xmlns:tps', 'http://tps'));
  test.assert(this.jw.writeAttribute('xmlns:tmf', 'http://tmf'));
  test.assert(this.jw.startElement('skos:Concept'));
  test.assert(this.jw.writeAttribute('rdf:about', '1'));
  test.assert(this.jw.startElement('tps:a'));
  test.assert(this.jw.writeAttribute('xml:lang', 'fr'));
  test.assert(this.jw.text('1a'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElement('tps:b'));
  test.assert(this.jw.writeAttribute('xml:lang', 'fr'));
  test.assert(this.jw.text('1b'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElement('skos:Concept'));
  test.assert(this.jw.writeAttribute('rdf:about', '2'));
  test.assert(this.jw.startElement('tps:a'));
  test.assert(this.jw.writeAttribute('xml:lang', 'fr'));
  test.assert(this.jw.text('2a'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElement('tps:b'));
  test.assert(this.jw.writeAttribute('xml:lang', 'fr'));
  test.assert(this.jw.text('2b'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['rdf:RDF']['skos:Concept'][0]['rdf:about'], 1);
  test.equal(r['rdf:RDF']['skos:Concept'][1]['rdf:about'], 2);


}

exports['nsnull'] = function (test) {
  test.assert(this.jw.setIndent(true));
  test.assert(this.jw.startDocument('1.0', 'utf-8', true));
  test.assert(this.jw.startElementNS('rdf', 'RDF', 'http://rdf'));
  test.assert(this.jw.writeAttributeNS('xmlns', 'skos', null, 'http://skos'));
  test.assert(this.jw.writeAttributeNS('xmlns', 'tps', null, 'http://tps'));
  test.assert(this.jw.writeAttributeNS('xmlns', 'tmf', null, 'http://tmf'));
  test.assert(this.jw.startElementNS('skos', 'Concept', null));
  test.assert(this.jw.writeAttributeNS('rdf', 'about', null, '1'));
  test.assert(this.jw.startElementNS('tps', 'a', null));
  test.assert(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.assert(this.jw.text('1a'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElementNS('tps', 'b', null));
  test.assert(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.assert(this.jw.text('1b'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElementNS('skos', 'Concept', null));
  test.assert(this.jw.writeAttributeNS('rdf', 'about', null, '2'));
  test.assert(this.jw.startElementNS('tps', 'a', null));
  test.assert(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.assert(this.jw.text('2a'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.startElementNS('tps', 'b', null));
  test.assert(this.jw.writeAttributeNS('xml', 'lang', null, 'fr'));
  test.assert(this.jw.text('2b'));
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endElement());
  test.assert(this.jw.endDocument());
  var r = JSON.parse(this.jw.toString())
  test.equal(r['rdf$RDF']['skos$Concept'][0]['rdf$about'], 1);
  test.equal(r['rdfrDF']['skos$Concept'][1]['rdf$about'], 2);

}
/* */





