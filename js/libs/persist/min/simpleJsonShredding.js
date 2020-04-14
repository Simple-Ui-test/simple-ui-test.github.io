define(["./persistenceUtils","./impl/logger"],function(a,b){"use strict";function c(a){var b=a[0].data;return b&&1===b.length&&"single"===a[0].resourceType?b[0]:b}var d=function(c,d,e){return function(f){b.log("Offline Persistence Toolkit simpleJsonShredding: Shredding Response");var g=f.clone(),h=g.headers.get("Etag");return g.text().then(function(f){var g=[],i=[],j="collection";if(f&&f.length>0)try{var k=JSON.parse(f);if(Array.isArray(k))g=k.map(function(a){if(d instanceof Array){var b=[];return d.forEach(function(c){b.push(a[c])}),b}return a[d]}),i=k;else{if(d instanceof Array){var l=[];d.forEach(function(a){l.push(k[a])}),g[0]=l}else g[0]=k[d];i[0]=k,j="single"}}catch(a){b.log("Offline Persistence Toolkit simpleRestJsonShredding: Error during shredding: "+a)}var m=a._mapData(g,i,e);return[{name:c,resourceIdentifier:h,keys:m.keys,data:m.data,resourceType:j}]})}},e=function(d){return function(e,f){return b.log("Offline Persistence Toolkit simpleJsonShredding: Unshredding Response"),Promise.resolve().then(function(){if(!e||1!==e.length)throw new Error({message:"shredded data is not in the correct format."});var b=a._unmapData(e[0].keys,e[0].data,d),g=c([{keys:b.keys,data:b.data,resourceType:e[0].resourceType}]);return a.setResponsePayload(f,g)}).then(function(a){return a.headers.set("x-oracle-jscpt-cache-expiration-date",""),Promise.resolve(a)})}};return{getShredder:d,getUnshredder:e}});