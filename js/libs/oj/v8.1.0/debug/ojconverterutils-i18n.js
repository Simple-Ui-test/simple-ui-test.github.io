/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojtranslation","ojs/ojmessaging","ojs/ojlocaledata","ojs/ojlogger","ojs/ojconverter","ojs/ojconverterutils","ojs/ojvalidation-error","ojs/ojvalidator","ojs/ojvalidator-async"],(function(e,r,t,n,o,a,i,s){"use strict";var u={isoToDate:function(e){return l.isoToDate(e)},isoToLocalDate:function(e){return l.isoToLocalDate(e)},dateToLocalIso:function(e){return l.dateToLocalIso(e)},getLocalTimeZoneOffset:function(){return l.getLocalTimeZoneOffset()},getConverterInstance:function(e){return s.getConverterInstance(e)},_minMaxIsoString:function(e,r){if(e){var t=(r=r||this.dateToLocalIso(new Date)).indexOf("T");0===e.indexOf("T")&&t>0&&(e=r.substring(0,t)+e)}return e},__getConverterOptionError:function(r,n){e.Assert.assertObject(n);var o,a="",i="",s=n.propertyName;if("optionTypesMismatch"===r){var l=n.requiredPropertyName;o=n.requiredPropertyValueValid,a=t.getTranslatedString("oj-converter.optionTypesMismatch.summary",{propertyName:s,propertyValue:n.propertyValue,requiredPropertyName:l}),i=u._getOptionValueDetailMessage(l,o)}else"optionTypeInvalid"===r?(s=n.propertyName,o=n.propertyValueValid,a=t.getTranslatedString("oj-converter.optionTypeInvalid.summary",{propertyName:s}),i=u._getOptionValueDetailMessage(s,o)):"optionOutOfRange"===r?(a=t.getTranslatedString("oj-converter.optionOutOfRange.summary",{propertyName:s,propertyValue:n.propertyValue}),o=n.propertyValueValid,i=u._getOptionValueDetailMessage(s,o)):"optionValueInvalid"===r&&(a=t.getTranslatedString("oj-converter.optionValueInvalid.summary",{propertyName:s,propertyValue:n.propertyValue}),o=n.propertyValueHint,i=u._getOptionValueDetailMessage(s,o));return new e.ConverterError(a,i)},_getOptionValueDetailMessage:function(e,r){var n;return r?("string"==typeof r?n="oj-converter.optionHint.detail":(n="oj-converter.optionHint.detail-plural",r=r.join(t.getTranslatedString("oj-converter.plural-separator"))),t.getTranslatedString(n,{propertyName:e,propertyValueValid:r})):""},_copyTimeOver:function(e,r){return l._copyTimeOver(e,r)},_clearTime:function(e){return l._clearTime(e)},_dateTime:function(e,r,t){return l._dateTime(e,r,t)},_normalizeIsoString:function(e){return l._normalizeIsoString(e)},getInitials:function(e,r){return l.getInitials(e,r)}},l={numeringSystems:{latn:"0123456789",arab:"٠١٢٣٤٥٦٧٨٩",thai:"๐๑๒๓๔๕๖๗๘๙"},regexTrim:/^\s+|\s+$|\u200f|\u200e/g,regexTrimNumber:/\s+|\u200f|\u200e/g,regexTrimRightZeros:/0+$/g,zeros:["0","00","000"],_ISO_DATE_REGEXP:/^[+-]?\d{4}(?:-\d{2}(?:-\d{2})?)?(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(Z|[+-]\d{2}(?::?\d{2})?)?)?$|^T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(Z|[+-]\d{2}(?::?\d{2})?)?$/,getLocalTimeZoneOffset:function(){var e=(new Date).getTimezoneOffset();return l.getTimeStringFromOffset("Etc/GMT",e,!1,!1)},dateToLocalIso:function(e){var r=e;"number"==typeof r&&(r=new Date(r));var t=l.padZeros(r.getFullYear(),4)+"-"+l.padZeros(r.getMonth()+1,2)+"-"+l.padZeros(r.getDate(),2)+"T"+l.padZeros(r.getHours(),2)+":"+l.padZeros(r.getMinutes(),2)+":"+l.padZeros(r.getSeconds(),2);return r.getMilliseconds()>0&&(t+="."+l.trimRightZeros(l.padZeros(r.getMilliseconds(),3))),t},partsToIsoString:function(e){var r=l.padZeros(e[0],4)+"-"+l.padZeros(e[1],2)+"-"+l.padZeros(e[2],2)+"T"+l.padZeros(e[3],2)+":"+l.padZeros(e[4],2)+":"+l.padZeros(e[5],2);return e[6]>0&&(r+="."+l.trimRightZeros(l.padZeros(e[6],3))),r},isoToLocalDate:function(e){return e&&"string"==typeof e?this._isoToLocalDateIgnoreTimezone(e):null},_isoToLocalDateIgnoreTimezone:function(e){var r=l._IsoStrParts(e);return new Date(r[0],r[1]-1,r[2],r[3],r[4],r[5],r[6])},_IsoStrParts:function(e){!1===l._ISO_DATE_REGEXP.test(e)&&l._throwInvalidISOStringSyntax(e);var r,t=e.split("T"),n=e.indexOf("T"),o=new Date,a=!1,i=[o.getFullYear(),o.getMonth()+1,o.getDate(),0,0,0,0];if(""!==t[0]){l.startsWith(t[0],"-")&&(t[0]=t[0].substr(1),a=!0);var s=t[0].split("-");for(r=0;r<s.length;r++){var u=parseInt(s[r],10);if(1===r&&(u<1||u>12)&&l._throwInvalidISOStringRange(e,"month",u,1,12),2===r){var g=l._getDaysInMonth(i[0],i[1]-1);(u<1||u>g)&&l._throwInvalidISOStringRange(e,"day",u,1,g)}i[r]=u}a&&(i[0]=-i[0])}if(-1!==n){var d=t[1].split("."),p=d[0].split(":");for(r=0;r<p.length;r++){var c=parseInt(p[r],10);0===r&&(c<0||c>24)&&l._throwInvalidISOStringRange(e,"hour",c,0,24),1===r&&(c<0||c>59)&&l._throwInvalidISOStringRange(e,"minute",c,0,59),2===r&&(c<0||c>59)&&l._throwInvalidISOStringRange(e,"second",c,0,59),i[3+r]=c}2===d.length&&d[1]&&(i[6]=parseInt(l.zeroPad(d[1],3,!1),10))}return i},getISOStrFormatInfo:function(e){var r={format:null,dateTime:null,timeZone:"",isoStrParts:null},t=l._ISO_DATE_REGEXP.exec(e);if(null===t&&l._throwInvalidISOStringSyntax(e),void 0===t[1]&&void 0===t[2])return r.format="local",r.dateTime=e,r.isoStrParts=l._IsoStrParts(r.dateTime),r;r.timeZone=void 0!==t[1]?t[1]:t[2],"Z"===r.timeZone?r.format="zulu":r.format="offset";var n=e.length,o=r.timeZone.length;return r.dateTime=e.substring(0,n-o),r.isoStrParts=l._IsoStrParts(r.dateTime),r},_isLeapYear:function(e){return e%400==0||e%100!=0&&e%4==0},_getDaysInMonth:function(e,r){switch(r){case 0:case 2:case 4:case 6:case 7:case 9:case 11:return 31;case 1:return l._isLeapYear(e)?29:28;default:return 30}},_throwInvalidISOStringRange:function(e,r,t,n,o){var a=new RangeError("The string "+e+" is not a valid ISO 8601 string: "+t+" is out of range.  Enter a value between "+n+" and "+o+" for "+r),i={errorCode:"isoStringOutOfRange",parameterMap:{isoString:e,value:t,minValue:n,maxValue:o,propertyName:r}};throw a.errorInfo=i,a},_throwInvalidISOStringSyntax:function(e){var r=new Error("The string "+e+" is not a valid ISO 8601 string syntax."),t={errorCode:"invalidISOString",parameterMap:{isoStr:e}};throw r.errorInfo=t,r},trim:function(e){return(e+"").replace(l.regexTrim,"")},trimRightZeros:function(e){return(e+"").replace(l.regexTrimRightZeros,"")},trimNumber:function(e){return(e+"").replace(l.regexTrimNumber,"")},startsWith:function(e,r){return 0===e.indexOf(r)},toUpper:function(e){return e.split(" ").join(" ").toUpperCase()},padZeros:function(e,r){var t=e+"",n=!1;return e<0&&(t=t.substr(1),n=!0),r>1&&t.length<r&&(t=(t=l.zeros[r-2]+t).substr(t.length-r,r)),n&&(t="-"+t),t},zeroPad:function(e,r,t){for(var n=""+e,o=n.length;o<r;o+=1)n=t?"0"+n:n+"0";return n},getTimeStringFromOffset:function(e,r,t,n){var o=t?r>=0:r<0,a=Math.abs(r),i=Math.floor(a/60),s=a%60,u=o?"-":"+";n&&(i=l.zeroPad(i,2,!0));var g=e+u+i;return(s>0||n)&&(g+=":"+l.zeroPad(s,2,!0)),g},getNumberingSystemKey:function(e,r){if(void 0===r)return"latn";var t=l.getNumberingExtension(r),n="symbols-numberSystem-"+t;return void 0===e.numbers[n]&&(t="latn"),t},getBCP47Lang:function(e){return e.split("-")[0]},getBCP47Region:function(e){var r=e.split("-");return 3===r.length?r[2]:2===r.length&&2===r[1].length?r[1]:"001"},getNumberingExtension:function(e){var r=e||"en-US",t=r.indexOf("-u-nu-"),n="latn";return-1!==t&&(n=r.substr(t+6,4)),n},haveSamePropertiesLength:function(e){return Object.keys(e).length},getLocaleElementsMainNode:function(e){var r=e.main;return r[Object.keys(r)[0]]},getLocaleElementsMainNodeKey:function(e){var r=e.main;return Object.keys(r)[0]},_toBoolean:function(e){if("string"==typeof e)switch(e.toLowerCase().trim()){case"true":case"1":return!0;case"false":case"0":return!1;default:return e}return e},getGetOption:function(e,r){if(void 0===e)throw new Error("Internal "+r+" error. Default options missing.");return function(t,n,o,a){if(void 0!==e[t]){var i=e[t];switch(n){case"boolean":i=l._toBoolean(i);break;case"string":i=String(i);break;case"number":i=Number(i);break;default:throw new Error("Internal error. Wrong value type.")}if(void 0!==o&&-1===o.indexOf(i)){for(var s=[],u=0;u<o.length;u++)s.push(o[u]);var g="The value '"+e[t]+"' is out of range for '"+r+"' options property '"+t+"'. Valid values: "+s,d=new RangeError(g),p={errorCode:"optionOutOfRange",parameterMap:{propertyName:t,propertyValue:e[t],propertyValueValid:s,caller:r}};throw d.errorInfo=p,d}return i}return a}},matchString:function(e,r,t,n){void 0===n&&(n={sensitivity:"base",usage:"sort"});var o=l.getGetOption(n,"OraI18nUtils.matchString");n.usage=o("usage","string",["sort","search"],"sort"),n.sensitivity=o("sensitivity","string",["base","accent","case","variant"],"base");for(var a=e.length,i=r.length-1,s=0;s<a;s++)for(var u=0;u<3;u++){var g=a-s;if(g=Math.min(g,i+u),0===e.substr(s,g).localeCompare(r,t,n))return[s,s+(g-1)]}return null}},g={fullYear:{pos:0,pad:4},month:{pos:1,pad:2},date:{pos:2,pad:2},hours:{pos:3,pad:2},minutes:{pos:4,pad:2},seconds:{pos:5,pad:2},milliseconds:{pos:6,pad:3},timeZone:{pos:7}};l.isoToDate=function(e){return new Date(this._normalizeIsoString(e))},l._copyTimeOver=function(e,r){if(!e||!r)throw new Error("Provided invalid arguments");var t=this._normalizeIsoString(r),n=e.indexOf("T"),o=t.indexOf("T");return t.substring(0,o)+(-1!==n?e.substring(n):"T00:00:00.000")},l._clearTime=function(e){return this._dateTime(e,{hours:0,minutes:0,seconds:0,milliseconds:0})},l._dateTime=function(e,t,n){if(!e||!t)throw new Error("Invalid argument invocation");var o,a,i=null,s=g,u=this.padZeros,l=this._normalizeIsoString(e),d=/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):?(\d{2})?\.?(\d{3})?(.*)?/.exec(l);if(!d)throw new Error("Unable to capture anything");if(d=d.slice(1),Array.isArray(t)){i={};for(var p=0,c=t.length;p<c;p++){var f=t[p];if(f in s){if(a=d[o=s[f].pos],n&&"timeZone"===f)throw new Error("Dude you tried to ask timezone to be parsed");if(n){var m=parseInt(a,10);i[f]=1===o?m-1:m}else i[f]=a}}}else if(r.isPlainObject(t)){for(var v=Object.keys(t),h=0;h<v.length;h++){var T=v[h],I=s[T];o=I.pos,a=t[T],1===o&&"number"==typeof a&&(a+=1),d[o]=I.pad?u(a,I.pad):a}i=d[0]+"-"+d[1]+"-"+d[2]+"T"+d[3]+":"+d[4]+":"+d[5]+(d.length>6&&d[6]?"."+d[6]+(8===d.length&&d[7]?d[7]:""):"")}return i},l._normalizeIsoString=function(e){if(!e)throw new Error("Provided invalid arguments");var r,t=(new Date).toISOString(),n=t.substring(0,t.indexOf("T")),o=e.indexOf("T"),a=-1===o?e:e.substring(0,o);return(a=a||n)+(-1!==o?(r=e.substring(o)).split(":").length>1?r:r+":00":"T00:00:00.000")},l.formatString=function(e,r){for(var t=r.length,n=e,o=0;o<t;o++){var a="{"+o+"}";n=n.replace(a,r[o])}return n},l.getInitials=function(e,r){var t,n=0,o=0;if(void 0!==e&&e.length>0&&(n=e.charCodeAt(0)),n>=1536&&n<=1791)return"";if(n>=2304&&n<=2431)return e.charAt(0);if(n>=3584&&n<=3711)return e.charAt(0);if(n>=4352&&n<=4607||n>=12592&&n<=12687||n>=43360&&n<=43391||n>=44032&&n<=55295)return e;if(void 0!==r&&r.length>0&&(n=r.charCodeAt(0)),n>=11904&&n<=12255||n>=12288&&n<=12591||n>=12688&&n<=12799||n>=13056&&n<=19903||n>=19968&&n<=40959||n>=63744&&n<=64255)return r;if(n>=55296&&n<=56319){if(r.length<2)return"";if((o=r.charCodeAt(1))<56320||o>57343)return"";if((t=1024*(n-55296)+(o-56320)+65536)>=110592&&t<=110847||t>=127488&&t<=127743||t>=131072&&t<=173791||t>=173824&&t<=177983||t>=177984&&t<=178207||t>=178208&&t<=183983||t>=194560&&t<=195103)return r}return n="",o="",void 0!==e&&e.length>0&&(n=e.charAt(0).toUpperCase()),void 0!==r&&r.length>0&&(o=r.charAt(0).toUpperCase()),n+o};var d={};return d.IntlConverterUtils=u,d.OraI18nUtils=l,d}));