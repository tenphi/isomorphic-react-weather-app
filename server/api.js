import Controller from './controllers/controller';
import WeatherController from './controllers/weather.ctrl';

const API_PREFIX = '/api/';

/**
 * @type {Controller[]}
 */
const controllers = [
  WeatherController
];

/**
 * @param {string} str
 * @returns {string}
 */
function fromCamelToKebabCase(str) {
  if (!str.length) return '';

  return str.charAt(0).toLowerCase()
    + str.slice(1).replace(
      /[A-Z]/g,
      s => `-${s.toLowerCase()}`
    );
}

/**
 * @param {Controller} Controller
 * @returns {string}
 */
function getControllerName(Controller) {
  const rawName = Controller.name;

  return rawName.replace(/(Controller|Ctrl)/, '');
};

/**
 * @param {Controller} Controller
 * @param {string} methodName - Controller's method name
 * @param app - Express App
 */
function bindMethod(Controller, methodName, app) {

  const shortMethodName = methodName.replace('get', '');
  const ctrlName = getControllerName(Controller);
  const ctrlPath = fromCamelToKebabCase(ctrlName);
  const methodPath = fromCamelToKebabCase(shortMethodName);
  const httpMethod = 'get'; // @TODO implement other HTTP methods
  const routePath = `${API_PREFIX}${ctrlPath}/${methodPath}`;

  app[httpMethod](routePath, async (req, res) => {

    const controller = new Controller(req, res);
    let data;

    Object.keys(req.query)
      .forEach(key => {
        const num = Number(req.query[key]);
        if (num === req.query[key]) {
          req.query[key] = num;
        }
      });

    console.log('request received', `${ctrlName}.${methodName}(${JSON.stringify(req.query)})`);

    try {
      data = await controller[methodName](req.query);
    } catch(err) {
      console.error(err);
      res.status(500).send(JSON.stringify({
        success: false, error: 'internal error'
      }));

      return;
    }

    const response = { success: true, data };

    res
      .status(200)
      .header('Content-Type', 'application/json')
      .send(JSON.stringify(response, null, 2));
  });

  console.log('route created', `${httpMethod}:${routePath} -> ${ctrlName}.${methodName}()`);
}

/**
 * @param app - Express App
 * @param {Controller} Controller
 */
function bindController(app, Controller) {

  const methods = Object.getOwnPropertyNames(Controller.prototype)
    .filter(method => typeof Controller.prototype[method] === 'function'
      && method !== 'constructor');

  methods.forEach(methodName => {
    bindMethod(Controller, methodName, app);
  });
};

export default function(app) {
  controllers.forEach(Controller => bindController(app, Controller));

  app.use(API_PREFIX, function(req, res) {
    res.status(404);
    res.end('method not found');
  });
}
