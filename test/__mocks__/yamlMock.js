module.exports = new Proxy({}, {
  get: (target, prop) => target[prop] || {},
  set: (target, prop, value) => { target[prop] = value; return true; }
});


