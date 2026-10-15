app.all('/anything', (req, res) => {

  const clientIp =
      req.headers['true-client-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.socket.remoteAddress;

  res.status(200).json({
      method: req.method,
      path: req.path,
      clientIp,
      host: req.hostname,
      headers: req.headers,
      body: req.body,
      timestamp: new Date().toISOString()
  });

});
