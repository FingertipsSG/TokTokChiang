// to hash passwords with 32-bit integer math
module.exports = hashCode = (str) => {
    var hash = 0;
    if (str.length == 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      hash = (hash << 5) - hash + c;
      hash = hash & hash;
   }
    return hash;
  };