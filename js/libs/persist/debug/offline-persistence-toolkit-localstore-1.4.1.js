define("persist/PersistenceStore",[],(function(){"use strict";var e=function(e){this._name=e};return(e.prototype={}).getName=function(){return this._name},e.prototype.getVersion=function(){return this._version},e.prototype.Init=function(e){return e&&e.version?this._version=e.version:this._version="0",Promise.resolve()},e.prototype.upsert=function(e,t,r,n){throw TypeError("failed in abstract function")},e.prototype.upsertAll=function(e){throw TypeError("failed in abstract function")},e.prototype.find=function(e){throw TypeError("failed in abstract function")},e.prototype.findByKey=function(e){throw TypeError("failed in abstract function")},e.prototype.removeByKey=function(e){throw TypeError("failed in abstract function")},e.prototype.delete=function(e){throw TypeError("failed in abstract function")},e.prototype.keys=function(){throw TypeError("failed in abstract function")},e.prototype.updateKey=function(e,t){throw TypeError("failed in abstract function")},e})),define("persist/impl/storageUtils",["./logger"],(function(e){"use strict";function t(e,t){var r=!1;for(var o in t)if(t.hasOwnProperty(o)){var i=t[o];if(r||!n(o))throw new Error("parsing error "+t);e.operator=o,e.right=i,r=!0}}function r(e){return"$and"===e||"$or"===e}function n(e){return"$lt"===e||"$gt"===e||"$lte"===e||"$gte"===e||"$eq"===e||"$ne"===e||"$regex"===e||"$exists"===e}function o(e){return null!=e&&(e instanceof String||"string"==typeof e)}function i(e,t){return o(e)&&null==t?t="":o(t)&&null==e&&(e=""),[e,t]}function s(e,t){for(var r=e.split("."),n=t,o=0;o<r.length;o++)n=n[r[o]];return n}return{satisfy:function(o,a){return e.log("Offline Persistence Toolkit storageUtils: Processing selector: "+JSON.stringify(o)),!o||function e(t,o){var a=t.operator;if(r(a)){if(!t.left&&t.array instanceof Array){for(var l,u=t.array,c=0;c<u.length;c++){var f=e(u[c],o);if("$or"===a&&!0===f)return!0;if("$and"===a&&!1===f)return!1;l=f}return l}throw new Error("invalid expression tree!"+t)}if(n(a)){var y=s(t.left,o),p=t.right;if("$lt"===a){var h=i(y,p);return y=h[0],p=h[1],y<p}if("$gt"===a){h=i(y,p);return y=h[0],p=h[1],y>p}if("$lte"===a){h=i(y,p);return y=h[0],p=h[1],y<=p}if("$gte"===a){h=i(y,p);return y=h[0],p=h[1],y>=p}if("$eq"===a)return y===p;if("$ne"===a)return y!==p;if("$regex"===a)return null!==y.match(p);if("$exists"===a)return p?null!=y:null==y;throw new Error("not a valid expression! "+t)}throw new Error("not a valid expression!"+t)}(function e(o){var i,s=[];for(var a in o)if(o.hasOwnProperty(a)){var l=o[a];if(0===a.indexOf("$")){if(r(a)){if(!(l instanceof Array))throw new Error("not a valid expression: "+o);i={operator:a,array:[]};for(var u=0;u<l.length;u++){var c=e(l[u]);i.array.push(c)}}else if(n(a))throw new Error("not a valid expression: "+o)}else if("object"!=typeof l)s.push({left:a,right:l,operator:"$eq"});else{var f={left:a};t(f,l),s.push(f)}}s.length>1?i={operator:"$and",array:s}:1===s.length&&(i=s[0]);return i}(o),a)},getValue:s,assembleObject:function(e,t){var r;if(t){r={};for(var n=0;n<t.length;n++)for(var o=r,i=e,s=t[n].split("."),a=0;a<s.length;a++)i=i[s[a]],!o[s[a]]&&a<s.length-1&&(o[s[a]]={}),a===s.length-1?o[s[a]]=i:o=o[s[a]]}else r=e;return r}}})),define("persist/impl/keyValuePersistenceStore",["../PersistenceStore","./storageUtils","./logger"],(function(e,t,r){"use strict";var n=function(t){e.call(this,t)};return(n.prototype=new e).Init=function(e){return this._version=e&&e.version||"0",Promise.resolve()},n.prototype.getItem=function(e){throw TypeError("failed in abstract function")},n.prototype.removeByKey=function(e){throw TypeError("failed in abstract function")},n.prototype.keys=function(){throw TypeError("failed in abstract function")},n.prototype.findByKey=function(e){return r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: findByKey() with key: "+e),this.getItem(e).then((function(e){return e?Promise.resolve(e.value):Promise.resolve()}))},n.prototype.find=function(e){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: find() with expression: "+JSON.stringify(e));var n=this,o=[],i=[];e=e||{};return this.keys().then((function(r){for(var s=[],a=0;a<r.length;a++){var l=r[a];l&&s.push(function(r){return n.getItem(r).then((function(n){n&&t.satisfy(e.selector,n)&&(n.key=r,i.push(n))}))}(l))}return Promise.all(s).then((function(){for(var t=n._sort(i,e.sort),r=0;r<t.length;r++)o.push(n._constructReturnObject(e.fields,t[r]));return Promise.resolve(o)}))}))},n.prototype.updateKey=function(e,t){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: updateKey() with currentKey: "+e+" and new key: "+t);var n=this;return this.getItem(e).then((function(e){return e?n._insert(t,e.metadata,e.value):Promise.reject("No existing key found to update")})).then((function(){return n.removeByKey(e)}))},n.prototype._sort=function(e,t){return e&&e.length&&t&&t.length?e.sort(this._sortFunction(t,this)):e},n.prototype._sortFunction=function(e,r){return function(r,n){for(var o=0;o<e.length;o++){var i,s=e[o],a=!0;if("string"==typeof s)i=s;else{if("object"!=typeof s)throw new Error("invalid sort criteria.");var l=Object.keys(s);if(!l||1!==l.length)throw new Error("invalid sort criteria");a="asc"===s[i=l[0]].toLowerCase()}var u=t.getValue(i,r),c=t.getValue(i,n);if(u!=c)return a?u<c?-1:1:u<c?1:-1}return 0}},n.prototype._constructReturnObject=function(e,r){return e?t.assembleObject(r,e):r.value},n.prototype._removeByKeyMapCallback=function(e){var t=this;return function(r){var n;return n=e?r[e]:r,t.removeByKey(n)}},n.prototype.delete=function(e){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: delete() with expression: "+JSON.stringify(e));var t=this;if(!e)return this.deleteAll();var n=e;return n.fields=["key"],t.find(n).then((function(e){if(e&&e.length){var r=e.map(t._removeByKeyMapCallback("key"),t);return Promise.all(r)}return Promise.resolve()}))},n.prototype.deleteAll=function(){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: deleteAll()");var e,t=this,n=[];return this.keys().then((function(r){for(e=0;e<r.length;e++)n.push(t.removeByKey(r[e]));return Promise.all(n)}))},n.prototype.upsert=function(e,t,n,o){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: upsert() for key: "+e);var i=this;return this.getItem(e).then((function(r){if(r&&o){var s=r.metadata.versionIdentifier;return s!==o?Promise.reject({status:409}):t.versionIdentifier!==s?i._insert(e,t,n):Promise.resolve()}return i._insert(e,t,n)}))},n.prototype.upsertAll=function(e){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: upsertAll()");for(var t=[],n=0;n<e.length;n++){var o=e[n];t.push(this.upsert(o.key,o.metadata,o.value,o.expectedVersionIndentifier))}return Promise.all(t)},n})),define("persist/impl/localPersistenceStore",["./keyValuePersistenceStore","./logger"],(function(e,t){"use strict";var r=function(t){e.call(this,t)};return(r.prototype=new e).Init=function(e){return this._version=e&&e.version||"0",Promise.resolve()},r.prototype._insert=function(e,t,r){var n=this._createRawKey(e),o={metadata:t,value:r},i=JSON.stringify(o);return localStorage.setItem(n,i),Promise.resolve()},r.prototype.removeByKey=function(e){t.log("Offline Persistence Toolkit localPersistenceStore: removeByKey() with key: "+e);var r=this;return this.findByKey(e).then((function(t){if(t){var n=r._createRawKey(e);return localStorage.removeItem(n),Promise.resolve(!0)}return Promise.resolve(!1)}))},r.prototype._createRawKey=function(e){return this._name+this._version+e.toString()},r.prototype._extractKey=function(e){var t=this._name+this._version,r=t.length;return 0===e.indexOf(t)?e.slice(r):null},r.prototype.keys=function(){t.log("Offline Persistence Toolkit localPersistenceStore: keys()");for(var e=Object.keys(localStorage),r=[],n=0;n<e.length;n++){var o=this._extractKey(e[n]);o&&r.push(o)}return Promise.resolve(r)},r.prototype.getItem=function(e){t.log("Offline Persistence Toolkit localPersistenceStore: getItem() with key: "+e);var r=this._createRawKey(e),n=localStorage.getItem(r);if(!n)return Promise.resolve();try{var o=JSON.parse(n);return o.key=e,Promise.resolve(o)}catch(e){return Promise.resolve()}},r})),define("persist/localPersistenceStoreFactory",["./impl/localPersistenceStore"],(function(e){"use strict";return{createPersistenceStore:function(t,r){return function(t,r){var n=new e(t);return n.Init(r).then((function(){return n}))}(t,r)}}})),define("persist/persistenceStoreFactory",[],(function(){"use strict";return{createPersistenceStore:function(e,t){}}}));