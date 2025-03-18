<<<<<<< HEAD:DevApps/devApp_v1/resources/views/google.com/import.js
import {
    J as O,
    K as C,
    O as L,
    Z as x,
    ia as U,
    j as l,
    k as v,
    l as k,
    n as b,
    o as I,
    p as P,
    q as w,
    r as S,
    s as B,
    v as D,
    x as M
} from "https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/chunk-CXHELKMX.mjs";
import {
    J as f,
    h as u,
    k as R,
    l as h,
    m as g,
    o as y,
    t as _,
    u as F,
    w as E
} from "https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/chunk-XGPVRHVG.mjs";
import "https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/chunk-JR5VT52U.mjs";
import {
    c as r
} from "https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/chunk-Y5FTINFI.mjs";
var J = "default" in f ? E : f,
    m = {},
    A = J;
m.createRoot = A.createRoot;
m.hydrateRoot = A.hydrateRoot;
var H = m.createRoot,
    N = m.hydrateRoot;
var p = {
        I8xeuWUsR: {
            elements: {
                Co9MMoEOi: "scroll-trigger-01",
                iFv3tQ3ZU: "solution",
                nBImjSGIf: "reputation",
                NOS5Xijrv: "scroll",
                OBptwnLCy: "solution-1",
                TktPHKo4E: "onchain-trust",
                tYY_SiAyI: "scroll-trigger-02",
                x54koJaPE: "products"
            },
            page: l(() => import("https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/NiyaW1Hze5U60_pYbRKvYPG9CEz-aZOGSx_uosxJ7-M.O5BK2ARB.mjs")),
            path: "/"
        },
        augiA20Il: {
            elements: {
                fE4wuu_4S: "solution",
                JHA0M_c6o: "products",
                KrPzks0K8: "onchain-trust",
                NbZJDrRuj: "reputation",
                oeQ0aRctZ: "scroll-trigger-01",
                pf4uSf4Ai: "scroll-trigger-02",
                UDL5AtOBW: "scroll"
            },
            page: l(() => import("https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/P6G-gdeadfgjDo-WFzR50sppL7kvgKTPU9j_xbeFS7k.F4HGMMT5.mjs")),
            path: "/old-home"
        }
    },
    W = [{
        code: "en",
        id: "default",
        name: "English",
        slug: ""
    }];
async function K({
    routeId: a,
    pathVariables: s,
    localeId: i
}) {
    await p[a].page.preload();
    let e = u(L, {
            isWebsite: !0,
            routeId: a,
            pathVariables: s,
            routes: p,
            collectionUtils: {},
            framerSiteId: "8bcb893e15045720538841295ff840d8a1961a3734cf62a172fce0defe4de7a5",
            notFoundPage: l(() => import("https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/SitesNotFoundPage.js@1.1-LGEAPCPM.mjs")),
            isReducedMotion: void 0,
            localeId: i,
            locales: W,
            preserveQueryParams: void 0,
            EditorBar: typeof r > "u" ? void 0 : l(async () => {
                let [{
                    createPortal: d
                }, {
                    createEditorBar: t
                }] = await Promise.all([import("https://framerusercontent.com/sites/2tjyZAfpWEeHIoTuvL3Zb4/npm_react-dom@18.2-4FS53VJ6.mjs"), import("https://edit.framer.com/init.mjs")]);
                return {
                    default: t({
                        dependencies: {
                            __version: 1,
                            framer: {
                                useCurrentRoute: k,
                                useLocaleInfo: I,
                                useRouter: v
                            },
                            react: {
                                createElement: u,
                                memo: R,
                                useCallback: g,
                                useEffect: y,
                                useRef: _,
                                useState: F
                            },
                            "react-dom": {
                                createPortal: d
                            }
                        }
                    })
                }
            })
        }),
        c = u(O, {
            children: e,
            value: {
                codeBoundaries: !0,
                editorBarCloseAfterLogin: !1,
                editorBarMenu: !0,
                enableAsyncURLUpdates: !0,
                replaceNestedLinks: !0,
                useGranularSuspense: !0,
                wrapUpdatesInTransitions: !0
            }
        }),
        o = u(C, {
            children: c
        });
    return u(b, {
        children: o,
        value: {
            routes: {}
        }
    })
}
var z = typeof document < "u";
if (z) {
    r.__framer_importFromPackage = (s, i) => () => u(D, {
        error: 'Package component not supported: "' + i + '" in "' + s + '"'
    }), r.process = {
        ...r.process,
        env: {
            ...r.process ? r.process.env : void 0,
            NODE_ENV: "production"
        }
    }, r.__framer_events = r.__framer_events || [], M();
    let a = document.getElementById("main");
    "framerHydrateV2" in a.dataset ? V(!0, a) : V(!1, a)
}

function Q() {
    z && r.__framer_events.push(arguments)
}
async function V(a, s) {
    function i(e, c, o = !0) {
        if (e.caught || r.__framer_hadFatalError) return;
        let n = c?.componentStack;
        if (o) {
            if (console.warn(`Recoverable error during hydration. Please check any custom code or code overrides to fix server/client mismatches:
`, e, n), Math.random() > .01) return
        } else console.error("Fatal crash during hydration. If you are the author of this website, please report this issue to the Framer team via https://www.framer.community/");
        Q(o ? "published_site_load_recoverable_error" : "published_site_load_error", {
            message: String(e),
            componentStack: n,
            stack: n ? void 0 : e instanceof Error && typeof e.stack == "string" ? e.stack : null
        })
    }
    try {
        let e, c, o, n;
        if (a) {
            let t = JSON.parse(s.dataset.framerHydrateV2);
            e = t.routeId, c = t.localeId, o = t.pathVariables, n = t.breakpoints
        } else {
            let t = B(p, decodeURIComponent(location.pathname), !0, W);
            e = t.routeId, c = t.localeId, o = t.pathVariables
        }
        let d = await K({
            routeId: e,
            localeId: c,
            pathVariables: o
        });
        a ? (U("framer-rewrite-breakpoints", () => {
            x(n), r.__framer_onRewriteBreakpoints?.(n)
        }), h(() => {
            S(), w(), P(), N(s, d, {
                onRecoverableError: i
            })
        })) : H(s, {
            onRecoverableError: i
        }).render(d)
    } catch (e) {
        throw i(e, void 0, !1), e
    }
}
export {
    K as getPageRoot
};
//# sourceMappingURL=script_main.G22DXUGC.mjs.map
=======
import{J as O,K as C,O as L,Z as x,ia as U,j as l,k as v,l as k,n as b,o as I,p as P,q as w,r as S,s as B,v as D,x as M}from"./chunk-CXHELKMX.mjs";import{J as f,h as u,k as R,l as h,m as g,o as y,t as _,u as F,w as E}from"./chunk-XGPVRHVG.mjs";import"./chunk-JR5VT52U.mjs";import{c as r}from"./chunk-Y5FTINFI.mjs";var J="default"in f?E:f,m={},A=J;m.createRoot=A.createRoot;m.hydrateRoot=A.hydrateRoot;var H=m.createRoot,N=m.hydrateRoot;var p={I8xeuWUsR:{elements:{Co9MMoEOi:"scroll-trigger-01",iFv3tQ3ZU:"solution",nBImjSGIf:"reputation",NOS5Xijrv:"scroll",OBptwnLCy:"solution-1",TktPHKo4E:"onchain-trust",tYY_SiAyI:"scroll-trigger-02",x54koJaPE:"products"},page:l(()=>import("./NiyaW1Hze5U60_pYbRKvYPG9CEz-aZOGSx_uosxJ7-M.O5BK2ARB.mjs")),path:"/"},augiA20Il:{elements:{fE4wuu_4S:"solution",JHA0M_c6o:"products",KrPzks0K8:"onchain-trust",NbZJDrRuj:"reputation",oeQ0aRctZ:"scroll-trigger-01",pf4uSf4Ai:"scroll-trigger-02",UDL5AtOBW:"scroll"},page:l(()=>import("./P6G-gdeadfgjDo-WFzR50sppL7kvgKTPU9j_xbeFS7k.F4HGMMT5.mjs")),path:"/old-home"}},W=[{code:"en",id:"default",name:"English",slug:""}];async function K({routeId:a,pathVariables:s,localeId:i}){await p[a].page.preload();let e=u(L,{isWebsite:!0,routeId:a,pathVariables:s,routes:p,collectionUtils:{},framerSiteId:"8bcb893e15045720538841295ff840d8a1961a3734cf62a172fce0defe4de7a5",notFoundPage:l(()=>import("./SitesNotFoundPage.js@1.1-LGEAPCPM.mjs")),isReducedMotion:void 0,localeId:i,locales:W,preserveQueryParams:void 0,EditorBar:typeof r>"u"?void 0:l(async()=>{let[{createPortal:d},{createEditorBar:t}]=await Promise.all([import("./npm_react-dom@18.2-4FS53VJ6.mjs"),import("https://edit.framer.com/init.mjs")]);return{default:t({dependencies:{__version:1,framer:{useCurrentRoute:k,useLocaleInfo:I,useRouter:v},react:{createElement:u,memo:R,useCallback:g,useEffect:y,useRef:_,useState:F},"react-dom":{createPortal:d}}})}})}),c=u(O,{children:e,value:{codeBoundaries:!0,editorBarCloseAfterLogin:!1,editorBarMenu:!0,enableAsyncURLUpdates:!0,replaceNestedLinks:!0,useGranularSuspense:!0,wrapUpdatesInTransitions:!0}}),o=u(C,{children:c});return u(b,{children:o,value:{routes:{}}})}var z=typeof document<"u";if(z){r.__framer_importFromPackage=(s,i)=>()=>u(D,{error:'Package component not supported: "'+i+'" in "'+s+'"'}),r.process={...r.process,env:{...r.process?r.process.env:void 0,NODE_ENV:"production"}},r.__framer_events=r.__framer_events||[],M();let a=document.getElementById("main");"framerHydrateV2"in a.dataset?V(!0,a):V(!1,a)}function Q(){z&&r.__framer_events.push(arguments)}async function V(a,s){function i(e,c,o=!0){if(e.caught||r.__framer_hadFatalError)return;let n=c?.componentStack;if(o){if(console.warn(`Recoverable error during hydration. Please check any custom code or code overrides to fix server/client mismatches:
`,e,n),Math.random()>.01)return}else console.error("Fatal crash during hydration. If you are the author of this website, please report this issue to the Framer team via https://www.framer.community/");Q(o?"published_site_load_recoverable_error":"published_site_load_error",{message:String(e),componentStack:n,stack:n?void 0:e instanceof Error&&typeof e.stack=="string"?e.stack:null})}try{let e,c,o,n;if(a){let t=JSON.parse(s.dataset.framerHydrateV2);e=t.routeId,c=t.localeId,o=t.pathVariables,n=t.breakpoints}else{let t=B(p,decodeURIComponent(location.pathname),!0,W);e=t.routeId,c=t.localeId,o=t.pathVariables}let d=await K({routeId:e,localeId:c,pathVariables:o});a?(U("framer-rewrite-breakpoints",()=>{x(n),r.__framer_onRewriteBreakpoints?.(n)}),h(()=>{S(),w(),P(),N(s,d,{onRecoverableError:i})})):H(s,{onRecoverableError:i}).render(d)}catch(e){throw i(e,void 0,!1),e}}export{K as getPageRoot};
//# sourceMappingURL=script_main.G22DXUGC.mjs.map
>>>>>>> e49afce3f5dcec95f6a040b5910266c593830cbf:DevApps/devApp_v1/resources/views/google.com/script_main.mjs
