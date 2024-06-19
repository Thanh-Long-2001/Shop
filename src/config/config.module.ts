import { config } from 'dotenv'
config();
console.log("runkkkkkkkk");

if(process.env.NODE_ENV){
  config({ path: (process.cwd(), `.env.${process.env.NODE_ENV}`) });
}else{
//   config({ path: (process.cwd(), 'configs/env/develop.env') });
}

