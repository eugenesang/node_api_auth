const logsMIddleware = (req, res, next) => {
    const start = new Date();
    next();
    res.on('finish', () => {
        const end = new Date();
        const responseTime = end - start;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.get('User-Agent');
        const os = userAgent ? userAgent.match(/\b(Windows|iOS|Android|Mac OS|Linux)\b/) : null;
        const device = userAgent ? userAgent.match(/\b(Samsung|Apple|Huawei|Google|Sony)\b/) : null;
        const client = userAgent ? userAgent.match(/(Firefox|Chrome|Safari|Samsung Internet|Opera|Edge)/) : null;

        const log = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            responseTime,
            ip,
            os: os ? os[0] : null,
            device: device ? device[0] : null,
            client: client ? client[0] : null,
            date: start,
            headers: req.headers,
            body: req.body
        };

        console.log(log);
    });
};

module.exports  = logsMIddleware;