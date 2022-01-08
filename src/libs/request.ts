import jsonp from 'jsonp';

export const requestStaticConfig = async (docPath, opts = {}): Promise<any> => {
  const numMatch = docPath.match(/\/(\d+)\/config(\d+)/);
  const url = `//imgcache.qq.com/qzone/qzactStatics/qcloud/data${docPath}`;
  return new Promise((resolve, reject) => {
    console.log(url);
    jsonp(url, {
      name: `callback_${numMatch[1]}_config${numMatch[2]}`,
    }, (err, data) => {
      if (data) {
        resolve(data);
      }
    });
  });
};
