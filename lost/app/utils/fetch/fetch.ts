import config from 'config';
const publicApiURI = config.publicApiURI;

const publicApiHost = `${publicApiURI.protocol}://${publicApiURI.domain}`

const TIMEOUT = 60 * 1e3;
const PATH_HOST_MAP: {
  [idx: string]: string
} = {
  'npl-public': publicApiHost
}

function onError(result: any) {

}
function onTimeout(result: any) {

}

function parseUrl(path: string): string {
  if(path && path.indexOf('http') === 0) {
    return path;
  }
  const paths: string[] = path.split('/');
  const host: string = PATH_HOST_MAP[paths[0]];
  if (!host) {
    throw new Error('can\'t find host for path ' + paths[0])
  }
  paths.shift();
  let url = host + '/' + paths.join('/');
  return url;
}
function attachParamsToUrl(url: string, params: {
  [idx: string]: string
}) {
  let strings = []
  for (let p in params) {
    strings.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
  }
  return url + '?' + strings.join('&')
}
function _fetch<T>(url: string, params?: any, method?: string, headers?: Headers) :Promise<T|string>{
  if (typeof params == 'string') {
    method = params;
    params = null;
  }
  headers = headers || new Headers();

  const requestParams = applyMiddlewares({
    url,
    params,
    method,
    headers
  })
  url = parseUrl(requestParams.url);
  params = requestParams.params;
  headers = requestParams.headers;
  method = requestParams.method || 'post'
  let requestInit: RequestInit = {
    mode: 'cors',
    credentials: 'include',
    body: null,
    method: method,
    headers
  }
  if (requestInit.method === 'post') {
    requestInit.body = params ? attachParamsToUrl('',params).slice(1) : null;
    headers.append('content-type', 'application/x-www-form-urlencoded');
  }
  if (params instanceof FormData) {
    requestInit.mode = 'FormData';
    //formdata强制用post
    requestInit.method = 'post';
    requestInit.body = params;
  }
  if (requestInit.method === 'get' && params) {
    url = attachParamsToUrl(url, params);
  }
  const request = new Request(url, requestInit);

  return new Promise((resolve, reject) => {
    console.log('请求开始=======', url, params)
    fetch(request).then(response => {
      response.text().then(data => {
        console.log('请求成功=======', url, data)
        try{
          resolve(JSON.parse(data));
        }catch(e) {
          resolve(data);
        }
      })
      clearTimeout(timeout)
    }, (response) => {
      console.log('请求失败=======', url, response)
      clearTimeout(timeout)
      onError(response);
      reject(response);
    })
    const timeout = setTimeout(() => {
      const result = { message: 'timeout', code: '500' };
      console.log('请求失败=======', url, result)
      reject(result);
      onTimeout(result)
    }, TIMEOUT)
  })
}

interface middlewareParam {
  url: string,
  params?: any,
  method?: string,
  headers?: Headers
}
type middlewareType = (params: middlewareParam) => middlewareParam
const middlewares: middlewareType[] = [];
function addMiddleware(middleware: middlewareType) {
  middlewares.push(middleware);
}

function applyMiddlewares(params: middlewareParam): middlewareParam {
  if (middlewares.length <= 0) {
    return params;
  }
  return middlewares.reduce((pre, cur) => {
    return cur(pre)
  }, params)
}
function createFetch(_module: string, version?: string) {
  return function (path: string, data?: any, method?: string, headers?: Headers) {
    return _fetch(_module + path, data, method, headers)
  }
}
export {
  createFetch,
  _fetch as fetch,
  addMiddleware
}