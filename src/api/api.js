import axios from 'axios';

let base = 'https://api.github.com';

export const requestLogin = () => { return axios.get(`${base}/users`).then(res => {
   return {
   	  code: 201,
   	  msg: 'hello',
   	  user: 0
   }
}); };
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const requestLogin => params => {
// 	return new Promise(function(resolve, reject) {
//         resolve({code : 201, msg: 'xxx', user: 0});
// 	});
// };