import router from "./index";
import { getToken }  from '@u/cookies';
router.beforeEach((to, from, next) => {
   if(!getToken()){
    if(to.name!=='Login'){
      next('Login')
    }else{
        next()
    }
   }else{
    next()
   }
})