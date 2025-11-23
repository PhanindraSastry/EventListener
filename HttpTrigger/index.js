module.exports = async function (context, req) {
  context.log('HTTP trigger function processed a request.');
  try {
    const method = (req && req.method) ? req.method.toUpperCase() : 'GET';

    if (method === 'GET') {
      // support ?name= query or { name } in body
      const name = (req.query && req.query.name) || (req.body && req.body.name) || 'World';
      context.res = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { message: `Hello, ${name}` }
      };
      return;
    }

    if (method === 'POST') {
      const body = req.body || {};
      context.res = {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
        body: { received: body }
      };
      return;
    }

    context.res = {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Method not allowed' }
    };
  } catch (err) {
    context.log.error('Unhandled error in function', err);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Internal Server Error' }
    };
  }
};
