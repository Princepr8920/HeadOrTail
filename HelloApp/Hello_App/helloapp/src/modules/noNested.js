module.exports = function  (nestedObj = {}, limit = [], asObj = []) {
  try {
    if (Object.keys(nestedObj).length > 0) {
      const result = {};

      const open = (obj) => {
        for (let prop in obj) {
          if (typeof obj[prop] !== "object") {
            result[prop] = obj[prop];
          } else if (asObj.length > 0) {
            for (let i = 0, len = asObj.length; i < len; i++) {
              if (obj.hasOwnProperty(asObj[i])) {
                result[asObj[i]] = obj[asObj[i]];
              } else {
                open(obj[prop]);
              }
            }
          } else {
            open(obj[prop]);
          }
        }

        return result;
      };

      if (limit.length > 0) {
        const myobj = open(nestedObj);
        const limited = {};
        for (let i = 0, len = limit.length; i < len; i++) {
          for (let prop in myobj) {
            if (prop === limit[i]) {
              limited[prop] = myobj[prop];
            }
          }
        }
        return limited;
      } else {
        return open(nestedObj);
      }
    } else {
      throw new Error("Object is empty");
    }
  } catch (error) {
    console.error(error);
    return;
  }
}