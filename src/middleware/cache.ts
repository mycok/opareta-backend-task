import { Request, NextFunction } from 'express';

const cache = require('memory-cache');

const memCache = new cache.Cache();

export const reqCache = (duration: number) => (req: Request, res: any, next: NextFunction) => {
  const key = `__opareta__${req.originalUrl}` || req.url;
  const cachedContent = memCache.get(key);

  if (cachedContent) {
    res.send(cachedContent);
  } else {
    res.sendResponse = res.send;
    res.send = (body: any) => {
      memCache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};
