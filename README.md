node-json-writer
================

It's native and full javascript implementation of JSONWriter class.
The API is complete and flexible.
JSON is still valid.

## Contributors

  * [Nicolas Thouvenin](https://github.com/touv) 
  * [Agostinho Quintela](https://github.com/agoqui)
  * [Stéphane Gully](https://github.com/kerphi)

# Installation

With [npm](http://npmjs.org) do:

    $ npm install json-writer


# Examples

## Basic
```javascript
  var JSONWriter = require('json-writer');
  jw = new JSONWriter;
  jw.setIndent(true);
  jw.startDocument();
  jw.startElement('root');
  jw.writeAttribute('foo', 'value');
  jw.text('Some content');
  jw.endElement();
  jw.endDocument();

  console.log(jw.toString());
```
Output:

```javascript
{
  "version": "1.0",
  "encoding": "utf-8",
  "root": {
    "foo": "value",
    "$t": "Some content"
  }
}
```

## Chaining
```javascript
  var JSONWriter = require('json-writer');
  jw = new JSONWriter;
  jw.startDocument().startElement('root').writeAttribute('foo', 'value').writeElement('tag', 'Some content').endAttribute().endElement().endDocument();

  console.log(jw.toString());
```
Output:
  
```javascript
 {
  "version": "1.0",
  "encoding": "utf-8",
  "root": {
    "foo": "value",
    "tag": {
      "$t": "Some content"
    }
  }
}
```

## Extensible
```javascript
  var JSONWriter = require('json-writer'),
              fs = require('fs');
  var ws = fs.createWriteStream('/tmp/foo.json');
  ws.on('close', function() {
      console.log(fs.readFileSync('/tmp/foo.json', 'UTF-8'));
  });
  jw = new JSONWriter(false, function(string, encoding) { 
      ws.write(string, encoding);
  });
  jw.startDocument('1.0', 'UTF-8').startElement(function() {
    return 'root';
  }).text(function() {
    return 'Some content';
  }).endElement().endDocument();
  ws.end();
```

Output:

```javascript
{
  "version": "1.0",
  "encoding": "UTF-8",
  "root": {
    "$t": "Some content"
  }
}
```  
  
# Tests

Use [nodeunit](https://github.com/caolan/nodeunit) to run the tests.

    $ npm install nodeunit
    $ nodeunit test

# API Documentation

## Generic

### constructor JSONWriter(Boolean indent, Function writer(string, encoding))
Create an new writer

### text(String content)
Write text

## Document
### startDocument(String version = '1.0', String encoding = NULL, Boolean standalone = false) 
Create document tag

### endDocument()
End current document

## Element

### writeElement(String name, String content)
Write full element tag

### writeElementNS
Write full namespaced element tag

### startElementNS
Create start namespaced element tag

### startElement(String name)
Create start element tag

### endElement()
End current element

## Attributes

### writeAttribute(String name, String value)
Write full attribute

### writeAttributeNS
Write full namespaced attribute

### startAttributeNS
Create start namespaced attribute

### startAttribute(String name)
Create start attribute

### endAttribute()
End attribute

## Processing Instruction

### writePI(String name, String content)
Writes a PI

### startPI(String name)
Create start PI tag

### endPI()
End current PI

## CData

### writeCData(String name, String content)
Write full CDATA tag

### startCData(String name)
Create start CDATA tag

### endCData()
End current CDATA

## Comment

### writeComment(String content)
Do nothing (just here for compatibility with XMLWriter)

### startComment()
Do nothing (just here for compatibility with XMLWriter)

### endComment()
Do nothing (just here for compatibility with XMLWriter)

# Also

* https://github.com/lindory-project/node-xml-writer

# License

[MIT/X11](./LICENSE)
