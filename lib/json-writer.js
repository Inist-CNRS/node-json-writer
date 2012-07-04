'use strict';
var assert = require('assert')




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
JSONWriter.prototype.endComment()
{
  return this
}
/**
*  — Termine un document
*/
JSONWriter.prototype.endDocument()
{
    return this
}
/**
*  — Termine l'élément courant
*/
JSONWriter.prototype.endElement()
{
  return this
}
/**
*  — Termine un attribut
*/
JSONWriter.prototype.endAttribute()
{
  return this
}

/**
*  — Termine le PI courant
*/
JSONWriter.prototype.endPI()
{
  return this
}
/**
*  — Affiche le buffer courant
*/
JSONWriter.prototype.flush(clear = true)
{
  return this
}
/**
*  — Crée une balise CDATA
*/
JSONWriter.prototype.startCData = function()
{
  return this
}
/**
*  — Crée un commentaire
*/
JSONWriter.prototype.startComment = function()
{
  return this
}
/**
*  — Crée un document
*/
JSONWriter.prototype.startDocument = function(version,  encoding, standalone)
{
  if (version === undefined) {
    version = '1.0'
  }
  if (encoding === undefined) {
    version = 'utf-8'
  }
  if (standalone === undefined) {
    standalone = true
  }
  assert.equal(typeof version, 'string')
  assert.equal(typeof encoding, 'string')

  return this
}
/**
*  — Crée un élément
*/
JSONWriter.prototype.startElementNS = function(prefix, name, uri)
{
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
JSONWriter.prototype.startAttribute = function(name)
{
  assert.equal(typeof name, 'string')
  return this
}
/**
*  — Crée un attribut pour l'espace de noms
*/
JSONWriter.prototype.startAttributeNS = function(prefix,  name,  uri)
{
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
JSONWriter.prototype.startPI = function(target)
{
  assert.equal(typeof target, 'string')
  return this
}
/**
*  — Écrit du texte
*/
JSONWriter.prototype.text = function(content)
{
  assert.equal(typeof content, 'string')

  return this
}
/**
*  — Écrit un attribut d'un espace de noms
*/
JSONWriter.prototype.writeAttributeNS = function(prefix, name, uri, content)
{
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
JSONWriter.prototype.writeAttribute = function(name, content)
{
  assert.equal(typeof name, 'string')
  assert.equal(typeof content, 'string')

  return this.startAttribute(name).text(content).endAttribute()
}
/**
*  — Écrit un bloc CDATA
*/
JSONWriter.prototype.writeCData = function(content)
{
  assert.equal(typeof content, 'string')
  return this.startCData().text(content).endCData()
}
/**
*  — Écrit un commentaire
*/
JSONWriter.prototype.writeComment = function(content)
{
  assert.equal(typeof content, 'string')
  return this.startComment().text(content).endComment()
}
/**
*  — Écrit un élément d'un espace de noms
*/
JSONWriter.prototype.writeElementNS = function(prefix, name, uri, content)
{
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
JSONWriter.prototype.writeElement = function(name, content)
{
  assert.equal(typeof name, 'string')
  if(content !== undefined) {
    assert.equal(typeof content, 'string')
  }
  return this.startElement(name).text(content).endElement()
}
/**
*  — Écrit la balise PI
*/
JSONWriter.prototype.writePI = function(target, content)
{
  assert.equal(typeof target, 'string')
  assert.equal(typeof content, 'string')
  return this.startPI(target).text(content).endPI()
}
/**
*  — Écrit un texte XML brut
*/
JSONWriter.prototype.writeRaw = function(content, isjson = false)
{
  assert.equal(typeof content, 'string')

  return this
}

