"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[545],{8545:(Z,p,a)=>{a.r(p),a.d(p,{HttpStatusModule:()=>b});var u=a(8583),i=a(9577),c=a(4330),l=a(9976),t=a(7716);new t.OlP("REQUEST");const d=new t.OlP("RESPONSE");let m=(()=>{class e{constructor(o){this.res=o}setStatus(o){this.res&&this.res.status(o)}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(d,8))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function g(e,s){if(1&e&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Oqu(o.description)}}function S(e,s){if(1&e){const o=t.EpF();t.TgZ(0,"button",9),t.NdJ("click",function(){return t.CHM(o),t.oxw().goBack()}),t._UZ(1,"fa-icon",10),t._uU(2," Back "),t.qZA()}}const h=[{path:"",component:(()=>{class e{constructor(o,n,r,v){this.httpStatus=o,this.route=n,this.location=r,this.code=500,this.message="Internal Server Error",this.description="",this.isBackAvailable=!0,v.addIcons(l.acZ,l.J9Y)}ngOnInit(){this.httpStatus.setStatus(this.code),this.route.data.subscribe(o=>{var n,r;this.code=null!==(n=o.code)&&void 0!==n?n:this.code,this.message=null!==(r=o.message)&&void 0!==r?r:this.message,this.httpStatus.setStatus(this.code)})}goBack(){this.location.back()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(m),t.Y36(c.gz),t.Y36(u.Ye),t.Y36(i.by))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-http-status"]],decls:14,vars:6,consts:[[1,"bg-light"],[1,"container","py-5"],[1,"p-5","rounded-3","text-center","error-bg-gray"],[1,"display-1","fw-bold","text-muted","mb-0","error-code"],[1,"fs-3"],[4,"ngIf"],["type","button","class","btn btn-primary me-2",3,"click",4,"ngIf"],["routerLink","/","role","button"],["icon","home"],["type","button",1,"btn","btn-primary","me-2",3,"click"],["icon","arrow-left"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h1",3),t._uU(4),t.qZA(),t.TgZ(5,"p",4),t._uU(6),t.qZA(),t.YNc(7,g,2,1,"p",5),t._UZ(8,"hr"),t.TgZ(9,"nav"),t.YNc(10,S,3,0,"button",6),t.TgZ(11,"a",7),t._UZ(12,"fa-icon",8),t._uU(13," Homepage "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(4),t.Oqu(n.code||500),t.xp6(2),t.Oqu(n.message||"Internal Server Error"),t.xp6(1),t.Q6J("ngIf",n.description),t.xp6(3),t.Q6J("ngIf",n.isBackAvailable),t.xp6(1),t.Tol("btn btn-"+(n.isBackAvailable?"secondary":"primary")))},directives:[u.O5,c.yS,i.BN],styles:[".error-bg-gray[_ngcontent-%COMP%]{background-color:#e9ecef}.error-code[_ngcontent-%COMP%]{font-size:10rem;line-height:.9}"]}),e})(),data:{code:404,message:"Not Found"}}];let f=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[c.Bz.forChild(h)],c.Bz]}),e})(),b=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[u.ez,i.uH,f]]}),e})()}}]);