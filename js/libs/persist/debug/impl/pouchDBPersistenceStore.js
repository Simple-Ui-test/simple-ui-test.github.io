define(["../PersistenceStore","../impl/storageUtils","pouchdb","./logger"],(function(e,t,r,n){"use strict";var i=function(t){e.call(this,t)};(i.prototype=new e).Init=function(e){this._version=e&&e.version||"0";var t=this._name+this._version,i=e?e.adapter:null,o=this._extractDBOptions(e);if(i)try{i.plugin&&r.plugin(i.plugin),(o=o||{}).adapter=i.name,this._db=new r(t,o)}catch(e){return n.log("Error creating PouchDB instance with adapter "+i+": ",e.message),n.log("Please make sure the needed plugin and adapter are installed."),Promise.reject(e)}else this._db=o?new r(t,o):new r(t);return this._index=e&&e.index?e.index:null,this._createIndex()},i.prototype._extractDBOptions=function(e){var t=null;if(e){var r=this;Object.keys(e).forEach((function(n){r._isPersistenceStoreKey(n)||(t||(t={}),t[n]=e[n])}))}return t},i.prototype._isPersistenceStoreKey=function(e){return"version"===e||"adapter"===e||"index"===e},i.prototype._createIndex=function(){if(this._index&&this._db.createIndex){var e=this._name+this._index.toString().replace(",","").replace(".",""),t={index:{fields:this._index,name:e}};return this._db.createIndex(t)}return Promise.resolve()},i.prototype.upsert=function(e,t,r,i){n.log("Offline Persistence Toolkit pouchDBPersistenceStore: upsert() for key: "+e);var s=this,u=e.toString(),a=[];return this._prepareUpsert(r,a),s._db.get(u).then((function(e){return o(i,e)?e:Promise.reject({status:409})})).catch((function(e){return 404===e.status&&"missing"===e.message?Promise.resolve():Promise.reject(e)})).then((function(e){return s._put(u,t,r,i,a,e)})).then((function(){return Promise.resolve()}))},i.prototype._put=function(e,t,r,n,i,s){var u={_id:e,metadata:t,value:r};s&&(u._rev=s._rev);var a=this;return a._db.put(u).then((function(e){return Promise.resolve(e)})).catch((function(t){return 409===t.status?a._db.get(e).then((function(e){return n?o(n,e)?Promise.resolve(e):Promise.reject({status:409}):Promise.resolve(e)})):Promise.reject(t)})).then((function(e){return a._addAttachments(e,i)})).then((function(){return Promise.resolve()}))};var o=function(e,t){return!e||t.metadata.versionIdentifier===e};return i.prototype._addAttachments=function(e,t){if(t&&t.length){var r=t.map((function(t){var r;return r=t.value instanceof Blob?t.value:new Blob([t.value]),this._db.putAttachment(e.id,t.path,e.rev,r,"binary")}),this);return Promise.all(r)}return Promise.resolve()},i.prototype.upsertAll=function(e){if(n.log("Offline Persistence Toolkit pouchDBPersistenceStore: upsertAll()"),e&&e.length){var t=e.map((function(e){return this.upsert(e.key,e.metadata,e.value,e.expectedVersionIdentifier)}),this);return Promise.all(t)}return Promise.resolve()},i.prototype.find=function(e){n.log("Offline Persistence Toolkit pouchDBPersistenceStore: find() for expression: "+JSON.stringify(e));var r=this;if(e=e||{},r._db.find){var i=r._prepareFind(e);return r._db.find(i).then((function(e){if(e&&e.docs&&e.docs.length){var t=e.docs.map(r._findResultCallback(i.fields),r);return Promise.all(t)}return[]})).catch((function(e){if(404===e.status&&"missing"===e.message)return[];throw e}))}return r._db.allDocs({include_docs:!0}).then((function(n){if(n&&n.rows&&n.rows.length){var i=n.rows.filter((function(n){var i=n.doc;return r._fixKey(i),!!t.satisfy(e.selector,i)}));if(i.length){var o=i.map((function(n){return r._fixBinaryValue(n.doc).then((function(r){return e.fields?t.assembleObject(r,e.fields):r.value}))}));return Promise.all(o)}return[]}return[]})).catch((function(e){return n.log("error retrieving all documents from pouch db, returns empty list as find operation.",e),[]}))},i.prototype._findResultCallback=function(e){return function(t){return this._fixValue(t).then((function(t){return e?t:t.value}))}},i.prototype._fixValue=function(e){return this._fixKey(e),this._fixBinaryValue(e)},i.prototype._fixBinaryValue=function(e){var t=e._id||e.id||e.key,r=e._attachments;if(r){var n=Object.keys(r)[0];return this._db.getAttachment(t,n).then((function(t){for(var r=n.split("."),i=e.value,o=0;o<r.length-1;o++)i=i[r[o]];return i[r[r.length-1]]=t,e}))}return Promise.resolve(e)},i.prototype._fixKey=function(e){var t=e._id||e.id||e.key;t&&(e.key=t)},i.prototype.findByKey=function(e){n.log("Offline Persistence Toolkit pouchDBPersistenceStore: findByKey() for key: "+e);var t=e.toString();return this._db.get(t).then((function(e){return e.value})).catch((function(e){return 404===e.status&&"missing"===e.message?Promise.resolve():Promise.reject(e)}))},i.prototype.removeByKey=function(e){n.log("Offline Persistence Toolkit pouchDBPersistenceStore: removeByKey() for key: "+e);var t=this,r=e.toString();return t._db.get(r).then((function(e){return t._db.remove(e)})).then((function(){return!0})).catch((function(e){return 404===e.status&&"missing"===e.message?Promise.resolve(!1):Promise.reject(e)}))},i.prototype.delete=function(e){n.log("Offline Persistence Toolkit pouchDBPersistenceStore: delete() for expression: "+JSON.stringify(e));var t=this;if(e){var i=e;return i.fields=["_id","_rev"],t.find(i).then((function(e){if(e&&e.length){var r=e.map((function(e){return this._db.remove(e._id,e._rev)}),t);return Promise.all(r)}return Promise.resolve()})).then((function(){return Promise.resolve()}))}return t._db.destroy().then((function(){var e=t._name+t._version;return t._db=new r(e),t._createIndex()}))},i.prototype.keys=function(){n.log("Offline Persistence Toolkit pouchDBPersistenceStore: keys()");return this._db.allDocs().then((function(e){var t=e.rows,r=[];return t&&t.length&&(r=t.map((function(e){return e.id}))),r}))},i.prototype._prepareFind=function(e){var t={},r=e.selector;t.selector=r||{_id:{$gt:null}};var n=e.fields;if(n&&n.length){var i=n.map((function(e){return"key"===e?"_id":e}));t.fields=i}return t},i.prototype._prepareUpsert=function(e,t){this._inspectValue("",e,t)},i.prototype._inspectValue=function(e,t,r){for(var n in t)if(t.hasOwnProperty(n)){var i=t[n];if(i&&"object"==typeof i)if(i instanceof Blob||i instanceof ArrayBuffer){var o=e;o.length>0&&(o+=".");var s={path:o+n,value:i};r.push(s),t.key=null}else if(void 0===i.length){var u=e;e.length>0&&(e+="."),e+=n,this._inspectValue(e,i,r),e=u}}},i.prototype.updateKey=function(e,t){n.log("Offline Persistence Toolkit PouchDBPersistenceStore: updateKey() with currentKey: "+e+" and new key: "+t);var r=this;return r._db.get(e).then((function(e){return e?r.upsert(t,e.metadata,e.value):Promise.reject("No existing key found to update")})).then((function(){return r.removeByKey(e)}))},i}));