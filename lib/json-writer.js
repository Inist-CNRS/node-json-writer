'use strict';
var assert = require('assert')

function strval(s) {
  if (typeof s == 'string') {
    return s;
  } 
  else if (typeof s == 'function') {
    return s();
  } 
  else if (s instanceof XMLWriter) {
    return s.toString();
  }
  else throw Error('Bad Parameter');
}




function JSONWriter(indent, callback) {

  if (!(this instanceof JSONWriter)) {
    return new JSONLWriter();
  }

  this.n = null;
  this.r = [];
  this.h = null;
  this.b = '';
  this.i = indent;
  this.is = "\t";

  this.name_regex = /[_:A-Za-z][-._:A-Za-z0-9]*/;
  this.stack = [];
  this.document = {};

  //this.indent = indent ? true : false;
  //this.output = '';
  
}

/**
*  — Termine un bloc CDATA
*/
JSONWriter.prototype.endCData = function () {
  return true;
}
/**
*  — Termine un commentaire
*/
JSONWriter.prototype.endComment = function () {
  return this
}
/**
*  — Termine un attribut
*/
JSONWriter.prototype.endAttribute = function () {
  return this
}

/**
*  — Termine le PI courant
*/
JSONWriter.prototype.endPI = function () {
  return this
}
/**
*  — Affiche le buffer courant
*/
JSONWriter.prototype.flush = function (clear) {
  return this
}
/**
*  — Crée une balise CDATA
*/
JSONWriter.prototype.startCData = function() {
  return this
}
/**
*  — Crée un commentaire
*/
JSONWriter.prototype.startComment = function() {
  return this
}
/**
 *  — Crée un document
 */
JSONWriter.prototype.startDocument = function(version,  encoding, standalone) {
  this.version    = (version === undefined) ? '1.0' : version;
  this.encoding   = (encoding === undefined) ? 'utf-8' : encoding;
  this.standalone = (standalone === undefined) ? true: standalone;

  assert.equal(typeof version, 'string');
  assert.equal(typeof encoding, 'string');

  // document root is the first element in the stack
  var elt = { version: version,
              encoding: encoding, };
  this.stack.push(elt);

  return this;
}
/**
 *  — Termine un document
 */
JSONWriter.prototype.endDocument = function () {
  return this;
}

/**
 *  — Text version of the doc
 */
JSONWriter.prototype.toString = function () {
  
  // dont allow to stringify before document is finished
  if (this.stack.length != 1) {
    throw Error('toString must be called after endDocument');
  }

  // last stack item is the document
  var doc = this.stack.pop();

  return JSON.stringify(doc);
}

/**
*  — Crée un élément
*/
JSONWriter.prototype.startElement = function(name) {
  if (this.stack.length == 0) {
    throw Error('startElement must be called after startDocument');
  }

  // control parameter syntax
  name = strval(name);
  if (!name.match(this.name_regex)) throw Error('Invalid Parameter');

  // create the element
  var elt = {};
  elt[name] = {};
  this.stack.push(elt);

  return this;
}

/**
*  — Termine l'élément courant
*/
JSONWriter.prototype.endElement = function () {

  // extract element from the stack
  var elt2 = this.stack.pop();
  var elt1 = this.stack.pop();
  
  var elt1_name = Object.keys(elt1)[0];
  var elt2_name = Object.keys(elt2)[0];
  elt1[elt2_name] = elt2[elt2_name];
  this.stack.push(elt1);
  return this;
}

/**
*  — Crée un élément NS
*/
JSONWriter.prototype.startElementNS = function(prefix, name, uri) {
  assert.equal(typeof prefix, 'string')
  assert.equal(typeof name, 'string')
  if (uri !== undefined) {
    assert.equal(typeof uri, 'string')
  }
  return this
}
/**
*  — Crée un attribut
*/
JSONWriter.prototype.startAttribute = function(name) {
  assert.equal(typeof name, 'string')
  return this
}
/**
*  — Crée un attribut pour l'espace de noms
*/
JSONWriter.prototype.startAttributeNS = function(prefix,  name,  uri) {
  assert.equal(typeof prefix, 'string')
  assert.equal(typeof name, 'string')
  if (uri !== undefined) {
    assert.equal(typeof uri, 'string')
  }
  return this
}
/**
*  — Crée une balise PI
*/
JSONWriter.prototype.startPI = function(target) {
  assert.equal(typeof target, 'string')
  return this
}
/**
*  — Écrit du texte
*/
JSONWriter.prototype.text = function(content) {
  assert.equal(typeof content, 'string')

  return this
}
/**
*  — Écrit un attribut d'un espace de noms
*/
JSONWriter.prototype.writeAttributeNS = function(prefix, name, uri, content) {
  assert.equal(typeof prefix, 'string')
  assert.equal(typeof name, 'string')
  if (uri !== undefined) {
    assert.equal(typeof uri, 'string')
  }
  assert.equal(typeof content, 'string')

  return this.startAttributeNS(prefix, name, uri).text(content).endAttribute()
}
/**
*  — Écrit un attribut
*/
JSONWriter.prototype.writeAttribute = function(name, content) {
  assert.equal(typeof name, 'string')
  assert.equal(typeof content, 'string')

  return this.startAttribute(name).text(content).endAttribute()
}
/**
*  — Écrit un bloc CDATA
*/
JSONWriter.prototype.writeCData = function(content) {
  assert.equal(typeof content, 'string')
  return this.startCData().text(content).endCData()
}
/**
*  — Écrit un commentaire
*/
JSONWriter.prototype.writeComment = function(content) {
  assert.equal(typeof content, 'string')
  return this.startComment().text(content).endComment()
}
/**
*  — Écrit un élément d'un espace de noms
*/
JSONWriter.prototype.writeElementNS = function(prefix, name, uri, content) {
  assert.equal(typeof prefix, 'string')
  assert.equal(typeof name, 'string')
  if (uri !== undefined) {
    assert.equal(typeof uri, 'string')
  }
  assert.equal(typeof content, 'string')

  return this.startElementNS(prefix, name, uri).text(content).endElement()
}
/**
*  — Écrit un élément
*/
JSONWriter.prototype.writeElement = function(name, content) {
  assert.equal(typeof name, 'string')
  if(content !== undefined) {
    assert.equal(typeof content, 'string')
  }
  return this.startElement(name).text(content).endElement()
}
/**
*  — Écrit la balise PI
*/
JSONWriter.prototype.writePI = function(target, content) {
  assert.equal(typeof target, 'string')
  assert.equal(typeof content, 'string')
  return this.startPI(target).text(content).endPI()
}
/**
*  — Écrit un texte XML brut
*/
JSONWriter.prototype.writeRaw = function(content, isjson) {
  assert.equal(typeof content, 'string')

  return this
}

module.exports = JSONWriter;