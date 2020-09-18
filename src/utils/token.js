import storageUtils from './storge';
import axios from 'axios';

const getNewToken = () => {
  console.log(234);
  const username = storageUtils.getUser().username;
  const password = storageUtils.getUser().password;
  let obj = {
    username:username,
    password:password,
  };
  let url = 'https://os.ncuos.com/api/user/token';
  axios.post(url,JSON.stringify(obj),{
    headers: {
      'Content-Type':'application/json',
      'Accept':'*/*',
    }
  }).then(res => {
    if(res.data.status === 1) {
      storageUtils.saveToken('passport '+res.data.token);
    }
    else {
      this.props.history.push('/login');
    }
  })
}

export default {
  judgeToken() {
    console.log(123);
    const old_token = storageUtils.getToken();
    if(JSON.stringify(old_token) == "{}")  {
      getNewToken();
    }
  }
}