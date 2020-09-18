const defaultState = {
  judge:{
    1:false,
    2:false,
    3:false,
    4:false,
    5:false,
    6:false,
    7:false,
    8:false,
  },
  list:[
    { id:1, name:'红扇子', getOline:false, getOffline:false },
    { id:2, name:'咖啡墙', getOline:false, getOffline:false },
    { id:3, name:'太阳花', getOline:false, getOffline:false },
    { id:4, name:'蓝色箱子', getOline:false, getOffline:false },
    { id:5, name:'毯子玩偶', getOline:false, getOffline:false },
    { id:6, name:'显示屏', getOline:false, getOffline:false },
    { id:7, name:'水果零食', getOline:false, getOffline:false },
    { id:8, name:'遥控器', getOline:false, getOffline:false },
  ],
  number:0,
  token:'',
  username:'',
  imgs:[],
}

export default (state = defaultState,action) => {
  if(action.type === 'get_token') {
    const newstate = JSON.parse(JSON.stringify(state)); 
    newstate.token = action.token;
    return newstate;
  }
  if(action.type === 'get_name') {
    const newstate = JSON.parse(JSON.stringify(state)); 
    newstate.username = action.username
    return newstate;
  }
  if(action.type === "get_thing") {
    const newstate = JSON.parse(JSON.stringify(state)); 
    let obj;
    let ans;
    //修改list，导出收集情况列表
    let res = (newstate.list)[action.id-1];
    ans = Object.assign({},res,{getOline:true});
    (newstate.list)[action.id-1] = ans;
    //判断收集物品数量
    newstate.number++;
    switch(action.id) {
      case 1:
        //修改judge，判断是否点亮
        obj = Object.assign({}, newstate.judge, {1:true});
        newstate.judge = obj;
        break;
      case 2:
        obj = Object.assign({}, newstate.judge, {2:true});
        newstate.judge = obj;
        break;
      case 3:
        obj = Object.assign({}, newstate.judge, {3:true});
        newstate.judge = obj;
        break;
      case 4:
        obj = Object.assign({}, newstate.judge, {4:true});
        newstate.judge = obj;
        break;
      case 5:
        obj = Object.assign({}, newstate.judge, {5:true});
        newstate.judge = obj;
        break;
      case 6:
        obj = Object.assign({}, newstate.judge, {6:true});
        newstate.judge = obj;
        break;
      case 7:
        obj = Object.assign({}, newstate.judge, {7:true});
        newstate.judge = obj;
        break;
      case 8:
        obj = Object.assign({}, newstate.judge, {8:true});
        newstate.judge = obj;
        break;
    }
    return newstate;
  }
  if(action.type === 'check_list') {
    const newstate = JSON.parse(JSON.stringify(state));
    newstate.list = action.list;
    return newstate;
  }
  return state;
}