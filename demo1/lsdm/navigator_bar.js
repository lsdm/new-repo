/**
 * Created by Administrator on 2017/11/13.
 */
window.onload=function(){
    var aLi = document.getElementsByTagName('li');

    for(var i=0;i<aLi.length;i++) {
        /*给一级菜单加鼠标移入，移出事件，让二级菜单显示，隐藏*/
        aLi[i].onmouseover = function(){
            this.className = 'active';
            var oSon = this.getElementsByTagName('ul')[0];
            if(oSon){
                oSon.style.display='block';
            }
        };
        aLi[i].onmouseout = function(){
            this.className = '';
            var oSon = this.getElementsByTagName('ul')[0];
            if(oSon){
                oSon.style.display='none';
            }
        };
    }
};