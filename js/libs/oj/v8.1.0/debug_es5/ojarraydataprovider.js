/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojset","ojs/ojmap","ojs/ojdataprovider","ojs/ojeventtarget"],(function(t,e,n,i,r){function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function u(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}var o=function(){function e(t,n){a(this,e),this.data=t,this.options=n,this.Item=function(){return function t(n,i,r){a(this,t),this._parent=n,this.metadata=i,this.data=r,this[e._METADATA]=i,this[e._DATA]=r}}(),this.ItemMetadata=function(){return function t(n,i){a(this,t),this._parent=n,this.key=i,this[e._KEY]=i}}(),this.FetchByKeysResults=function(){return function t(n,i,r){a(this,t),this._parent=n,this.fetchParameters=i,this.results=r,this[e._FETCHPARAMETERS]=i,this[e._RESULTS]=r}}(),this.ContainsKeysResults=function(){return function t(n,i,r){a(this,t),this._parent=n,this.containsParameters=i,this.results=r,this[e._CONTAINSPARAMETERS]=i,this[e._RESULTS]=r}}(),this.FetchByOffsetResults=function(){return function t(n,i,r,s){a(this,t),this._parent=n,this.fetchParameters=i,this.results=r,this.done=s,this[e._FETCHPARAMETERS]=i,this[e._RESULTS]=r,this[e._DONE]=s}}(),this.FetchListParameters=function(){return function t(n,i,r,s,u){a(this,t),this._parent=n,this.size=i,this.sortCriteria=r,this.filterCriterion=s,this.attributes=u,this[e._SIZE]=i,this[e._SORTCRITERIA]=r,this[e._FILTERCRITERION]=s,this[e._ATTRIBUTES]=u}}(),this.FetchListResult=function(){return function t(n,i,r,s){a(this,t),this._parent=n,this.fetchParameters=i,this.data=r,this.metadata=s,this[e._FETCHPARAMETERS]=i,this[e._DATA]=r,this[e._METADATA]=s}}(),this.AsyncIterable=function(){return function t(e,n){a(this,t),this._parent=e,this._asyncIterator=n,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}}(),this.AsyncIterator=function(){function t(n,i,r,s){a(this,t),this._parent=n,this._nextFunc=i,this._params=r,this._offset=s,this._cachedOffset=s,this._cacheObj={},this._cacheObj[e._MUTATIONSEQUENCENUM]=n._mutationSequenceNum}return u(t,[{key:"next",value:function(){var t=this._nextFunc(this._params,this._cachedOffset,this._cacheObj);return this._cachedOffset=t.offset,Promise.resolve(t.result)}}]),t}(),this.AsyncIteratorYieldResult=function(){return function t(n,i){a(this,t),this._parent=n,this.value=i,this[e._VALUE]=i,this[e._DONE]=!1}}(),this.AsyncIteratorReturnResult=function(){return function t(n,i){a(this,t),this._parent=n,this.value=i,this[e._VALUE]=i,this[e._DONE]=!0}}(),this.DataProviderMutationEventDetail=function(){return function t(n,i,r,s){a(this,t),this._parent=n,this.add=i,this.remove=r,this.update=s,this[e._ADD]=i,this[e._REMOVE]=r,this[e._UPDATE]=s}}(),this.DataProviderOperationEventDetail=function(){return function t(n,i,r,s,u){a(this,t),this._parent=n,this.keys=i,this.metadata=r,this.data=s,this.indexes=u,this[e._KEYS]=i,this[e._METADATA]=r,this[e._DATA]=s,this[e._INDEXES]=u}}(),this.DataProviderAddOperationEventDetail=function(){return function t(n,i,r,s,u,o,l){a(this,t),this._parent=n,this.keys=i,this.afterKeys=r,this.addBeforeKeys=s,this.metadata=u,this.data=o,this.indexes=l,this[e._KEYS]=i,this[e._AFTERKEYS]=r,this[e._ADDBEFOREKEYS]=s,this[e._METADATA]=u,this[e._DATA]=o,this[e._INDEXES]=l}}(),this._cachedIndexMap=[],this._sequenceNum=0,this._mutationSequenceNum=0,this._subscribeObservableArray(t),null!=n&&null!=n[e._KEYS]&&(this._keysSpecified=!0,this._keys=n[e._KEYS])}return u(e,[{key:"containsKeys",value:function(t){var i=this;return this.fetchByKeys(t).then((function(r){var a=new n;return t[e._KEYS].forEach((function(t){null!=r[e._RESULTS].get(t)&&a.add(t)})),Promise.resolve(new i.ContainsKeysResults(i,t,a))}))}},{key:"fetchByKeys",value:function(n){var r=this;this._generateKeysIfNeeded();var a,s=new i,u=this._getKeys(),o=null!=n?n[e._ATTRIBUTES]:null,l=0;if(n){var h=r._getRowData();return n[e._KEYS].forEach((function(e){for(a=null,l=0;l<u.length;l++)if(t.Object.compareValues(u[l],e)){a=l;break}if(null!=a&&a>=0){var n=h[a];if(o&&o.length>0){var i={};r._filterRowAttributes(o,n,i),n=i}s.set(e,new r.Item(r,new r.ItemMetadata(r,e),n))}})),Promise.resolve(new r.FetchByKeysResults(r,n,s))}return Promise.reject("Keys are a required parameter")}},{key:"fetchByOffset",value:function(t){var n=this,i=null!=t?t[e._SIZE]:-1,r=null!=t?t[e._SORTCRITERIA]:null,a=null!=t&&t[e._OFFSET]>0?t[e._OFFSET]:0,s=null!=t?t[e._ATTRIBUTES]:null,u=null!=t?t[e._FILTERCRITERION]:null;this._generateKeysIfNeeded();var o=[],l=!0;if(t){var h=new this.FetchListParameters(this,i,r,u,s),f=this._fetchFrom(h,a).result,_=f[e._VALUE];l=f[e._DONE];var c=_[e._DATA],v=_[e._METADATA].map((function(t){return t[e._KEY]}));return o=c.map((function(t,e){return new n.Item(n,new n.ItemMetadata(n,v[e]),t)})),Promise.resolve(new this.FetchByOffsetResults(this,t,o,l))}return Promise.reject("Offset is a required parameter")}},{key:"fetchFirst",value:function(t){return new this.AsyncIterable(this,new this.AsyncIterator(this,this._fetchFrom.bind(this),t,0))}},{key:"getCapability",value:function(t){return e.getCapability(t)}},{key:"getTotalSize",value:function(){return Promise.resolve(this._getRowData().length)}},{key:"isEmpty",value:function(){return this._getRowData().length>0?"no":"yes"}},{key:"createOptimizedKeySet",value:function(t){return new n(t)}},{key:"createOptimizedKeyMap",value:function(t){if(t){var e=new i;return t.forEach((function(t,n){e.set(n,t)})),e}return new i}},{key:"_getRowData",value:function(){return this[e._DATA]instanceof Array?this[e._DATA]:this[e._DATA]()}},{key:"_getKeys",value:function(){return null==this._keys||this._keys instanceof Array?this._keys:this._keys()}},{key:"_indexOfKey",value:function(e){var n,i=this._getKeys(),r=-1;for(n=0;n<i.length;n++)if(t.Object.compareValues(i[n],e)){r=n;break}return r}},{key:"_subscribeObservableArray",value:function(e){if(!(e instanceof Array)){if(!this._isObservableArray(e))throw new Error("Invalid data type. ArrayDataProvider only supports Array or observableArray.");var i=this;e.subscribe((function(e){var r,a,s,u,o,l=[],h=[],f=[],_=[],c=[];i._mutationSequenceNum++;var v=!0,E=!0;e.forEach((function(t){"deleted"===t.status?v=!1:"added"===t.status&&(E=!1)}));var d=[],A=[],y=null,T=null,p=null,m=i._generateKeysIfNeeded();if(!v&&!E){for(r=0;r<e.length;r++){u=e[r].index,o=e[r].status;var R=i._getId(e[r].value);for(a=0;a<e.length;a++)a!=r&&u===e[a].index&&o!==e[a].status&&d.indexOf(r)<0&&A.indexOf(r)<0&&(null==R||t.Object.compareValues(R,i._getId(e[a].value)))&&("deleted"===o?(A.push(r),d.push(a)):(A.push(a),d.push(r)))}for(r=0;r<e.length;r++)if(d.indexOf(r)>=0){var I=i._getKeys()[e[r].index];h.push(I),l.push(e[r].value),f.push(e[r].index)}if(h.length>0){_=h.map((function(t){return new i.ItemMetadata(i,t)}));var g=new n;h.map((function(t){g.add(t)})),y=new i.DataProviderOperationEventDetail(i,g,_,l,f)}}if(l=[],h=[],f=[],!v){for(r=0;r<e.length;r++)"deleted"===e[r].status&&d.indexOf(r)<0&&A.indexOf(r)<0&&(h.push(i._getKeys()[e[r].index]),l.push(e[r].value),f.push(e[r].index));if(h.length>0&&h.map((function(t){var e=i._indexOfKey(t);i._keys.splice(e,1)})),h.length>0){_=h.map((function(t){return new i.ItemMetadata(i,t)}));var S=new n;h.map((function(t){S.add(t)})),p=new i.DataProviderOperationEventDetail(i,S,_,l,f)}}if(l=[],h=[],f=[],!E){var O=null==i._getKeys()||!(i._getKeys().length>0);for(r=0;r<e.length;r++)"added"===e[r].status&&d.indexOf(r)<0&&A.indexOf(r)<0&&(null==(s=i._getId(e[r].value))&&(m||i._keysSpecified)&&(s=i._getKeys()[e[r].index]),null==s?(s=i._sequenceNum++,i._keys.splice(e[r].index,0,s)):(O||-1===i._indexOfKey(s))&&i._keys.splice(e[r].index,0,s),h.push(s),l.push(e[r].value),f.push(e[r].index));for(r=0;r<e.length;r++)if("added"===e[r].status&&d.indexOf(r)<0&&A.indexOf(r)<0){var D=i._getKeys()[e[r].index+1];D=null==D?null:D,c.push(D)}if(h.length>0){_=h.map((function(t){return new i.ItemMetadata(i,t)}));var b=new n;h.map((function(t){b.add(t)}));var w=new n;c.map((function(t){w.add(t)})),T=new i.DataProviderAddOperationEventDetail(i,b,w,c,_,l,f)}}i._fireMutationEvent(T,p,y)}),null,"arrayChange"),e.subscribe((function(e){i._mutationEvent?i.dispatchEvent(i._mutationEvent):i._mutationRemoveEvent||i._mutationAddEvent||i._mutationUpdateEvent?(i._mutationRemoveEvent&&i.dispatchEvent(i._mutationRemoveEvent),i._mutationAddEvent&&i.dispatchEvent(i._mutationAddEvent),i._mutationUpdateEvent&&i.dispatchEvent(i._mutationUpdateEvent)):i.dispatchEvent(new t.DataProviderRefreshEvent),i._mutationEvent=null,i._mutationRemoveEvent=null,i._mutationAddEvent=null,i._mutationUpdateEvent=null}),null,"change")}}},{key:"_fireMutationEvent",value:function(e,n,i){var r=this,a=!1;if(["keys","indexes"].forEach((function(t){a||(a=r._hasSamePropValue(n,e,t)||r._hasSamePropValue(n,i,t)||r._hasSamePropValue(e,i,t))})),a){if(n){var s=new this.DataProviderMutationEventDetail(this,null,n,null);this._mutationRemoveEvent=new t.DataProviderMutationEvent(s)}if(e){var u=new this.DataProviderMutationEventDetail(this,e,null,null);this._mutationAddEvent=new t.DataProviderMutationEvent(u)}if(i){var o=new this.DataProviderMutationEventDetail(this,null,null,i);this._mutationUpdateEvent=new t.DataProviderMutationEvent(o)}}else{var l=new this.DataProviderMutationEventDetail(this,e,n,i);this._mutationEvent=new t.DataProviderMutationEvent(l)}}},{key:"_hasSamePropValue",value:function(e,n,i){var r=!1;return e&&e[i]&&e[i].forEach((function(e){!r&&n&&n[i]&&n[i].forEach((function(n){!r&&t.Object.compareValues(e,n)&&(r=!0)}))})),r}},{key:"_isObservableArray",value:function(t){return"function"==typeof t&&t.subscribe&&!(void 0===t.destroyAll)}},{key:"_generateKeysIfNeeded",value:function(){if(null==this._keys){var t=null!=this.options?this.options[e._KEYATTRIBUTES]||this.options[e._IDATTRIBUTE]:null;this._keys=[];var n,i=this._getRowData(),r=0;for(r=0;r<i.length;r++)null!=(n=this._getId(i[r]))&&"@index"!=t||(n=this._sequenceNum++),this._keys[r]=n;return!0}return!1}},{key:"_getId",value:function(t){var n,i=null!=this.options?this.options[e._KEYATTRIBUTES]||this.options[e._IDATTRIBUTE]:null;if(null!=i){var r;if(Array.isArray(i))for(n=[],r=0;r<i.length;r++)n[r]=this._getVal(t,i[r]);else n="@value"==i?this._getAllVals(t):this._getVal(t,i);return n}return null}},{key:"_getVal",value:function(t,e){return"function"==typeof t[e]?t[e]():t[e]}},{key:"_getAllVals",value:function(t){var e=this;return Object.keys(t).map((function(n){return e._getVal(t,n)}))}},{key:"_fetchFrom",value:function(t,n,i){var a=this,s=null!=t?t[e._ATTRIBUTES]:null;this._generateKeysIfNeeded();var u=null!=t?t[e._SORTCRITERIA]:null,o=this._getCachedIndexMap(u,i),l=this._getRowData(),h=o.map((function(t){return l[t]})),f=o.map((function(t){return a._getKeys()[t]})),_=null!=t?t[e._SIZE]>0?t[e._SIZE]:t[e._SIZE]<0?a._getKeys().length:25:25,c=n+_<h.length,v=this._mergeSortCriteria(u);null!=v&&((t=t||{})[e._SORTCRITERIA]=v);var E,d=[],A=[],y=0;if(null!=t&&t[e._FILTERCRITERION]){var T=null;T=t[e._FILTERCRITERION].filter?t[e._FILTERCRITERION]:r.FilterFactory.getFilter({filterDef:t[e._FILTERCRITERION],filterOptions:this.options});for(var p=0;d.length<_&&p<h.length;)T.filter(h[p])&&(y>=n&&(d.push(h[p]),A.push(f[p])),y++),p++;c=p<h.length}else d=h.slice(n,n+_),A=f.slice(n,n+_);y=n+d.length,E=d.map((function(t){if(s&&s.length>0){var e={};a._filterRowAttributes(s,t,e),t=e}return t}));var m=A.map((function(t){return new a.ItemMetadata(a,t)})),R=new this.FetchListResult(this,t,E,m);return c?{result:new this.AsyncIteratorYieldResult(this,R),offset:y}:{result:new this.AsyncIteratorReturnResult(this,R),offset:y}}},{key:"_getCachedIndexMap",value:function(t,n){if(n&&n.indexMap&&n[e._MUTATIONSEQUENCENUM]===this._mutationSequenceNum)return n.indexMap;var i=this._getRowData().map((function(t,e){return e})),r=this._sortData(i,t);return n&&(n.indexMap=r,n[e._MUTATIONSEQUENCENUM]=this._mutationSequenceNum),r}},{key:"_sortData",value:function(t,e){var n=this._getRowData(),i=t.map((function(t){return{index:t,value:n[t]}}));return null!=e&&i.sort(this._getSortComparator(e)),i.map((function(t){return t.index}))}},{key:"_getSortComparator",value:function(t){var n=this;return function(i,r){var a,s,u,o,l,h,f=null!=n.options?n.options[e._SORTCOMPARATORS]:null;for(a=0;a<t.length;a++)if(s=t[a][e._DIRECTION],u=t[a][e._ATTRIBUTE],o=null,null!=f&&(o=f[e._COMPARATORS].get(u)),l=n._getVal(i.value,u),h=n._getVal(r.value,u),null!=o){var _="descending"==s?-1:1,c=o(l,h)*_;if(0!=c)return c}else{var v=0,E="string"==typeof l?l:new String(l).toString(),d="string"==typeof h?h:new String(h).toString();if(0!=(v="ascending"==s?E.localeCompare(d,void 0,{numeric:!0,sensitivity:"base"}):d.localeCompare(E,void 0,{numeric:!0,sensitivity:"base"})))return v}return 0}}},{key:"_mergeSortCriteria",value:function(t){var n=null!=this.options?this.options[e._IMPLICITSORT]:null;if(null!=n){if(null==t)return n;var i,r,a,s=t.slice(0);for(i=0;i<n.length;i++){for(a=!1,r=0;r<s.length;r++)s[r][e._ATTRIBUTE]==n[i][e._ATTRIBUTE]&&(a=!0);a||s.push(n[i])}return s}return t}},{key:"_filterRowAttributes",value:function(t,n,i){var r=this;if(Array.isArray(t)){var a,s=!1;t.forEach((function(t){t!=e._ATDEFAULT&&t.name!=e._ATDEFAULT||(s=!0)})),Object.keys(n).forEach((function(e){if(s){var u,o=!1,l=e;for(a=0;a<t.length;a++)if((u=t[a]instanceof Object?t[a].name:t[a]).startsWith("!")){if((u=u.substr(1,u.length-1))==e){o=!0;break}}else if(u==e){l=t[a];break}o||r._filterRowAttributes(l,n,i)}else t.forEach((function(t){var a;(a=t instanceof Object?t.name:t).startsWith("!")||a!=e||r._filterRowAttributes(t,n,i)}))}))}else if(t instanceof Object){var u=t.name,o=t.attributes;if(u&&!u.startsWith("!"))if(n[u]instanceof Object&&!Array.isArray(n[u])&&o){var l={};r._filterRowAttributes(o,n[u],l),i[u]=l}else if(Array.isArray(n[u])&&o){var h;i[u]=[],n[u].forEach((function(t,e){h={},r._filterRowAttributes(o,t,h),i[u][e]=h}))}else r._proxyAttribute(i,n,u)}else r._proxyAttribute(i,n,t)}},{key:"_proxyAttribute",value:function(t,e,n){t&&e&&Object.defineProperty(t,n,{get:function(){return e[n]},set:function(t){e[n]=t},enumerable:!0})}}],[{key:"getCapability",value:function(t){if("sort"==t)return{attributes:"multiple"};if("fetchByKeys"==t)return{implementation:"lookup"};if("fetchByOffset"==t)return{implementation:"randomAccess"};if("fetchCapability"==t){var e=new Set;return e.add("exclusion"),{attributeFilter:{expansion:{},ordering:{},defaultShape:{features:e}}}}return"filter"==t?{operators:["$co","$eq","$ew","$pr","$gt","$ge","$lt","$le","$ne","$regex","$sw"],attributeExpression:["*"],textFilter:{}}:null}}]),e}();
/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
return o._KEY="key",o._KEYS="keys",o._AFTERKEYS="afterKeys",o._ADDBEFOREKEYS="addBeforeKeys",o._DIRECTION="direction",o._ATTRIBUTE="attribute",o._ATTRIBUTES="attributes",o._SORT="sort",o._SORTCRITERIA="sortCriteria",o._FILTERCRITERION="filterCriterion",o._DATA="data",o._METADATA="metadata",o._INDEXES="indexes",o._OFFSET="offset",o._SIZE="size",o._IDATTRIBUTE="idAttribute",o._IMPLICITSORT="implicitSort",o._KEYATTRIBUTES="keyAttributes",o._SORTCOMPARATORS="sortComparators",o._COMPARATORS="comparators",o._COMPARATOR="comparator",o._RESULTS="results",o._CONTAINS="contains",o._FETCHPARAMETERS="fetchParameters",o._CONTAINSPARAMETERS="containsParameters",o._VALUE="value",o._DONE="done",o._ADD="add",o._REMOVE="remove",o._UPDATE="update",o._DETAIL="detail",o._FETCHLISTRESULT="fetchListResult",o._ATDEFAULT="@default",o._MUTATIONSEQUENCENUM="mutationSequenceNum",t.ArrayDataProvider=o,t.EventTargetMixin.applyMixin(o),o}));