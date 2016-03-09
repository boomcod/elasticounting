'use strict';

if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
};

if (!Object.prototype.deepCopy) {
    Object.prototype.deepCopy = function() {
        return angular.copy(this);
    };
};

if (!Object.prototype.copyTo) {
    Object.prototype.copyTo = function(destination) {
        angular.copy(this, destination);
    };
};

if (!String.prototype.contains) {
    String.prototype.contains = function(str) {
        return this.indexOf(str) >= 0;
    };
};

if (!String.prototype.getHashCode) {
    String.prototype.getHashCode = function() {
        var hash = 0,
            i, chr, len;
        if (this.length === 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
}
