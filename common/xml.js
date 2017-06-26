var EasyXml = require('easyxml');
var serializer = new EasyXml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});
module.exports = serializer;
