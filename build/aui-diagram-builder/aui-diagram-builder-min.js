AUI.add("aui-diagram-builder-base",function(ad){var T=ad.Lang,d=T.isArray,ap=T.isBoolean,M=T.isNumber,B=T.isObject,at=T.isString,I=function(A){return(A instanceof ad.ArrayList);},R=function(A){return(A instanceof ad.Node);},D=function(A){return(A instanceof ad.AvailableField);},aD=ad.Array,V="add",k="addNode",aC="auto",N="availableField",Q="availableFields",az="availableFieldsDragConfig",am="base",s="boundingBox",aw="builder",Z="cancel",aq="clearfix",a="container",ab="content",u="contentBox",J="viewport",P="contentNode",E="createDocumentFragment",z="diagram",F="diagram-builder-base",aa="disk",o="draggable",ay="drop",ak="dropConfig",X="dropContainer",ao="field",t="fields",n="fieldsContainer",an="height",p="helper",W="icon",v="iconClass",aj="id",af="label",ai="list",r="node",y="nodeSettings",ac="propertyList",ax="rendered",al="save",q="settings",O="tab",b="tabs",e="tabview",G="tabView",L="toolbar",j="toolbarContainer",w=ad.getClassName,aB=" ",g=".",H="$",h="#",aE=w(z,aw,am,ay,a),x=w(z,aw,am,J),C=w(z,aw,am,ao),f=w(z,aw,am,t,a),ag=w(z,aw,am,ao,o),c=w(z,aw,am,ao,W),U=w(z,aw,am,ao,af),m=w(z,aw,am,b,a),Y=w(z,aw,am,b,a,ab),ah=w(z,aw,am,O,V),K=w(z,aw,am,O,q),au=w(z,aw,am,L,a),ae=w(p,aq),l=w(W),av=w(e,ab),aA=w(e,ai);var i=ad.Component.create({NAME:N,ATTRS:{draggable:{value:true,validator:ap},label:{validator:at},iconClass:{validator:at},id:{value:ad.guid(),setter:"_setId",validator:at},node:{valueFn:function(aF){var A=this;if(!R(aF)){aF=ad.Node.create(ad.Lang.sub(A.FIELD_ITEM_TEMPLATE,{iconClass:A.get(v)}));aF.setData(N,A);}return aF;},validator:R,writeOnce:true},type:{value:r,validator:at}},EXTENDS:ad.Base,buildNodeId:function(A){return Q+H+ao+H+A;},getAvailableFieldByNode:function(A){return ad.one(A).getData(N);},getAvailableFieldById:function(A){return ad.AvailableField.getAvailableFieldByNode(h+ad.AvailableField.buildNodeId(A));},prototype:{FIELD_ITEM_TEMPLATE:'<li class="'+C+'">'+'<span class="'+[l,c].join(aB)+' {iconClass}"></span>'+'<span class="'+U+'"></span>'+"</li>",initializer:function(){var A=this;var aF=A.get(r);A.after({draggableChange:A._afterDraggableChange,idChange:A._afterIdChange,labelChange:A._afterLabelChange});A.labelNode=aF.one(g+U);A._uiSetDraggable(A.get(o));A._uiSetId(A.get(aj));A._uiSetLabel(A.get(af));},_afterDraggableChange:function(aF){var A=this;A._uiSetDraggable(aF.newVal);},_afterIdChange:function(aF){var A=this;A._uiSetId(aF.newVal);},_afterLabelChange:function(aF){var A=this;A._uiSetLabel(aF.newVal);},_setId:function(A){return ad.AvailableField.buildNodeId(A);},_uiSetDraggable:function(aF){var A=this;A.get(r).toggleClass(ag,aF);},_uiSetLabel:function(aF){var A=this;A.labelNode.setContent(aF);},_uiSetId:function(aF){var A=this;A.get(r).set(aj,aF);}}});ad.AvailableField=i;var S=function(){};S.ATTRS={fields:{value:[],setter:"_setFields",validator:function(A){return d(A)||I(A);}}};ad.mix(S.prototype,{createFields:function(aG){var aF=this;var A=[];aD.each(aG,function(aH){A.push(aF.createField(aH));});return new ad.ArrayList(A);},addField:function(aF){var A=this;var aG=A.createField(aF);A._updateFields(A.get(t).add(aG));return aG;},removeField:function(aF){var A=this;A._updateFields(A.get(t).remove(aF));},_updateFields:function(aF){var A=this;A.set(t,aF);},_setFields:function(aF){var A=this;if(I(aF)){return aF;}else{return A.createFields(aF);}},createField:function(A){return A;}});ad.FieldSupport=S;var ar=ad.Component.create({NAME:F,ATTRS:{availableFields:{setter:"_setAvailableFields",validator:d},viewport:{valueFn:function(){return ad.Node.create(this.VIEWPORT_TEMPLATE);}},dropContainer:{valueFn:function(){return ad.Node.create(this.DROP_CONTAINER_TEMPLATE);}},dropConfig:{value:null,setter:"_setDropConfig",validator:B},availableFieldsDragConfig:{value:null,setter:"_setAvailableFieldsDragConfig",validator:B},fieldsContainer:{valueFn:function(){return ad.Node.create(this.FIELDS_CONTAINER_TEMPLATE);}},propertyList:{setter:"_setPropertyList",validator:B,value:null},strings:{value:{addNode:"Add node",cancel:"Cancel",nodeSettings:"Node settings",propertyName:"Property Name",save:"Save",value:"Value"}},tabView:{setter:"_setTabView",validator:B,value:null,writeOnce:true},toolbar:{setter:"_setToolbar",validator:B,value:null},toolbarContainer:{valueFn:function(){return ad.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);}}},HTML_PARSER:{dropContainer:g+aE,fieldsContainer:g+f,toolbarContainer:g+au,viewport:g+x},UI_ATTRS:[Q,t],AUGMENTS:[ad.FieldSupport],prototype:{DROP_CONTAINER_TEMPLATE:'<div class="'+aE+'"></div>',TOOLBAR_CONTAINER_TEMPLATE:'<div class="'+au+'"></div>',FIELDS_CONTAINER_TEMPLATE:'<ul class="'+f+'"></ul>',VIEWPORT_TEMPLATE:'<div tabindex="1" class="'+x+'"></div>',fieldsNode:null,propertyList:null,settingsNode:null,tabView:null,toolbar:null,initializer:function(){var A=this;A.publish({cancel:{defaultFn:A._defCancelFn}});A.after({render:A._afterRender});A.after(A._afterUiSetHeight,A,"_uiSetHeight");A.viewport=A.get(J);A.dropContainer=A.get(X);A.fieldsContainer=A.get(n);A.toolbarContainer=A.get(j);},isAvailableFieldsDrag:function(aG){var A=this;var aF=A.availableFieldsDrag;return(aG===aF.dd);},plotFields:function(){var aF=this;var A=aF.get(t);A.each(function(aG){aF.plotField(aG);});},renderUI:function(){var A=this;A._renderTabs();A._renderViewport();A._uiSetAvailableFields(A.get(Q));},syncUI:function(){var A=this;var aF=A.get(u);A._setupDrop();A._setupAvailableFieldsDrag();aF.addClass(ae);},_afterActiveTabChange:function(aG){var A=this;var aF=aG.newVal.get(P);if(A.get(ax)&&(aF===A.settingsNode)){A._renderSettings();}},_afterRender:function(aF){var A=this;A.plotFields();},_afterUiSetHeight:function(aF){var A=this;A.dropContainer.setStyle(an,M(aF)?aF+A.DEF_UNIT:aF);},_defCancelFn:function(aF){var A=this;A.tabView.selectTab(0);},_handleCancelEvent:function(){var A=this;A.fire(Z);},_handleSaveEvent:function(){var A=this;A.fire(al);},_renderViewport:function(){var aF=this;var aG=aF.get(u);var A=aF.viewport;A.appendChild(aF.dropContainer);aG.appendChild(A);},_renderPropertyList:function(){var A=this;
if(!A.propertyList){A.propertyList=new ad.PropertyList(A.get(ac)).render(A.settingsNode);A.propertyList.get(s).unselectable();}},_renderSettings:function(){var A=this;A._renderPropertyList();A._renderToolbar();},_renderTabs:function(){var A=this;if(!A.tabView){var aF=new ad.TabView(A.get(G));A.tabView=aF;A.fieldsNode=aF.getTab(0).get(P);A.settingsNode=aF.getTab(1).get(P);}},_renderToolbar:function(){var A=this;if(!A.toolbar){A.toolbar=new ad.Toolbar(A.get(L)).render(A.settingsNode);}},_setupDrop:function(){var A=this;A.drop=new ad.DD.Drop(A.get(ak));},_setupAvailableFieldsDrag:function(){var A=this;A.availableFieldsDrag=new ad.DD.Delegate(A.get(az));},_setAvailableFields:function(aG){var aF=this;var A=[];aD.each(aG,function(aI,aH){A.push(D(aI)?aI:new ad.AvailableField(aI));});return A;},_setDropConfig:function(aF){var A=this;return ad.merge({bubbleTargets:A,groups:[Q],node:A.dropContainer},aF||{});},_setAvailableFieldsDragConfig:function(aF){var A=this;return ad.merge({bubbleTargets:A,container:A.get(s),dragConfig:{groups:[Q],plugins:[{cfg:{moveOnEnd:false},fn:ad.Plugin.DDProxy}]},nodes:g+ag},aF||{});},_setPropertyList:function(aF){var A=this;return ad.merge({bubbleTargets:A,width:250,scroll:{height:400,width:aC}},aF);},_setTabView:function(aI){var aF=this;var aH=aF.get(s);var aJ=aH.one(g+aA);var aG={after:{activeTabChange:ad.bind(aF._afterActiveTabChange,aF)},boundingBox:aH.one(g+m),contentBox:aH.one(g+Y),bubbleTargets:aF,contentNode:aH.one(g+av),cssClass:m,listNode:aJ,render:aF.get(u)};if(!aJ){var A=aF.getStrings();aG.items=[{cssClass:ah,label:A[k]},{cssClass:K,label:A[y]}];}return ad.merge(aG,aI);},_setToolbar:function(aG){var aF=this;var A=aF.getStrings();return ad.merge({activeState:false,bubbleTargets:aF,children:[{handler:ad.bind(aF._handleSaveEvent,aF),label:A[al],icon:aa},{handler:ad.bind(aF._handleCancelEvent,aF),label:A[Z]}]},aG);},_uiSetAvailableFields:function(aH){var A=this;var aG=A.fieldsNode;if(aG){var aF=ad.getDoc().invoke(E);aD.each(aH,function(aI){aF.appendChild(aI.get(r));});aG.setContent(A.fieldsContainer.setContent(aF));}},_uiSetFields:function(aF){var A=this;if(A.get(ax)){A.plotFields();}}}});ad.DiagramBuilderBase=ar;},"@VERSION@",{requires:["aui-tabs","aui-property-list","collection","dd"],skinnable:true});AUI.add("aui-diagram-builder-impl",function(W){var L=W.Lang,c=L.isArray,w=L.isObject,ar=L.isString,ao=L.isBoolean,ay=W.Array,J=function(A){return(A instanceof W.DiagramBuilderBase);},ap=function(A){return(A instanceof W.DiagramNode);},S=function(A){return(A instanceof W.Anchor);},ab=function(A,aB){var aA=c(aB)?aB:aB.getXY();var aC=c(A)?A:A.getXY();return ay.map(aC,function(aE,aD){return Math.max(0,aE-aA[aD]);});},ad="anchor",X="anchors",R="anchorsDragConfig",F="availableField",k="boundingBox",au="builder",P="cancel",ai="click",U="content",y="controls",ah="controlsToolbar",ag="data",Q="dblclick",I="delete",Y="deleteMessage",al="description",v="diagram",T="diagram-builder",ac="diagramNode",s="diagram-node",am="dragNode",D="editing",a="esc",an="field",m="fields",aa="fieldsDragConfig",l="hover",E="keydown",V="link",n="mouseenter",K="mouseleave",i="name",j="node",af="p1",ae="p2",d="parentNode",O="records",h="recordset",g="region",av="rendered",aq="selected",x="shuffle",t="task",B="tmpConnector",e="type",C="viewport",at="wrapper",q="xy",f=".",z="$",G="",ax="-",p=W.getClassName,Z=p(v,au,ad,l),aj=p(v,au,ad,j),u=p(v,au,ad,j,at),o=p(v,au,y),M=p(v,j),b=p(v,j,U),ak=p(v,j,D),aw=p(v,j,aq);var N=function(){var aA="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",A="<br/>";W.all(".aui-diagram-node").each(function(aG){var aB=G,aD=W.Widget.getByNode(aG),aC=aD.get("name"),aF=aD.get("boundingBox"),aE=aF.one(".log")||W.Node.create("<div class=log />").appendTo(aF);aB+=aC+A;aD.get(m).each(function(aH){aB+=aA+"a: "+aH.get("id")+A;aH.get("targets").each(function(aI){var aJ=aI.get(ac);aI.get("node").setContent(aI.get("id"));aB+=aA+aA+"t: "+aJ.get("name")+" (s: "+aI.get("id")+")"+A;});aH.get("sources").each(function(aJ){var aI=aJ.get(ac);aJ.get("node").setContent(aJ.get("id"));aB+=aA+aA+"s: "+aI.get("name")+" (t: "+aJ.get("id")+")"+A;});});aE.setContent(aB);});};var r=W.Component.create({NAME:T,ATTRS:{fieldsDragConfig:{value:null,setter:"_setFieldsDragConfig",validator:w},tmpConnector:{setter:"_setTmpConnector",value:{},validator:w}},EXTENDS:W.DiagramBuilderBase,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{editNode:null,initializer:function(){var A=this;A.on({cancel:A._onCancel,"drag:drag":A._onDrag,"drag:end":A._onDragEnd,"drop:hit":A._onDropHit,save:A._onSave});A.handlerKeyDown=W.getDoc().on(E,W.bind(A._afterKeyEvent,A));A.dropContainer.delegate(ai,W.bind(A._onNodeClick,A),f+M);A.dropContainer.delegate(Q,W.bind(A._onNodeEdit,A),f+M);A.dropContainer.delegate(n,W.bind(A._onMouseenterAnchors,A),f+aj);A.dropContainer.delegate(K,W.bind(A._onMouseleaveAnchors,A),f+aj);},syncUI:function(){var A=this;W.DiagramBuilder.superclass.syncUI.apply(this,arguments);A._setupFieldsDrag();A.tmpConnector=new W.Connector(A.get(B));},createField:function(aA){var A=this;if(!ap(aA)){aA.builder=A;aA.viewport=A.get(C);aA=new (A.getFieldClass(aA.type||j))(aA);}aA.set(au,A);return aA;},getFieldClass:function(aB){var A=this;var aA=W.DiagramBuilder.types[aB];if(aA){return aA;}else{W.log("The field type: ["+aB+"] couldn't be found.");return null;}},isFieldsDrag:function(aB){var A=this;var aA=A.fieldsDrag;return(aB===aA.dd);},plotField:function(aA){var A=this;if(!aA.get(av)){aA.render(A.dropContainer);}},unselectAll:function(){var A=this;var aA=A.selectedNode;if(aA){aA.set(aq,false);}A.selectedNode=null;},select:function(aA){var A=this;A.unselectAll();A.stopEditingNode();A.selectedNode=aA.set(aq,true).focus();},startEditingNode:function(aA){var A=this;if(aA){A.stopEditingNode();A.tabView.selectTab(W.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(h,aA.getProperties());aA.get(k).addClass(ak);A.editNode=aA;}},stopEditingNode:function(aB){var A=this;var aA=aB||A.editNode;if(aA){A.tabView.selectTab(W.DiagramBuilder.FIELDS_TAB);
aA.get(k).removeClass(ak);A.editNode=null;}},_afterKeyEvent:function(aA){var A=this;if(!A.selectedNode||aA.hasModifier()||!aA.isKeyInSet(a,I)){return;}if(aA.isKey(a)){A._onEscKey(aA);}else{if(aA.isKey(I)){A._onDeleteKey(aA);}}aA.halt();},_onCancel:function(aA){var A=this;A.stopEditingNode();},_onDrag:function(aB){var A=this;var aA=aB.target;if(A.isFieldsDrag(aA)){var aC=W.Widget.getByNode(aA.get(am));aC.get(m).each(function(aD){aD.alignConnectors();});}},_onDragEnd:function(aB){var A=this;var aA=aB.target;if(A.isFieldsDrag(aA)){var aC=W.Widget.getByNode(aA.get(am));aC.set(q,aC.getLeftTop());}},_onDropHit:function(aB){var A=this;var aA=aB.drag;if(A.isAvailableFieldsDrag(aA)){var aD=aA.get(j).getData(F);var aC=A.addField({xy:ab(aA.lastXY,A.dropContainer),type:aD.get(e),fields:[{}]});A.select(aC);}},_onDeleteKey:function(aA){var A=this;A.selectedNode.close();},_onEscKey:function(aA){var A=this;A.unselectAll();A.stopEditingNode();},_onMouseenterAnchors:function(aA){var A=this;aA.currentTarget.addClass(Z);},_onMouseleaveAnchors:function(aA){var A=this;aA.currentTarget.removeClass(Z);},_onNodeClick:function(aA){var A=this;var aB=W.Widget.getByNode(aA.currentTarget);A.select(aB);},_onNodeEdit:function(aA){var A=this;if(!aA.target.ancestor(f+b,true)){return;}var aB=W.Widget.getByNode(aA.currentTarget);if(aB){A.startEditingNode(aB);}},_onSave:function(aB){var A=this;var aA=A.editNode;var aC=A.propertyList.get(h);if(aA){ay.each(aC.get(O),function(aD){var aE=aD.get(ag);aA.set(aE.attributeName,aE.value);});A.stopEditingNode(aA);}},_setTmpConnector:function(aA){var A=this;return W.merge({lazyDraw:true,viewport:A.viewport},aA);},_setFieldsDragConfig:function(aB){var A=this;var aA=A.dropContainer;return W.merge({bubbleTargets:A,container:aA,dragConfig:{plugins:[{cfg:{constrain:aA},fn:W.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:W.Plugin.DDWinScroll}]},nodes:f+M},aB||{});},_setupFieldsDrag:function(){var A=this;A.fieldsDrag=new W.DD.Delegate(A.get(aa));}}});W.DiagramBuilder=r;W.DiagramBuilder.types={};var H=W.Component.create({NAME:s,EXTENDS:W.Overlay,AUGMENTS:[W.FieldSupport]});var az=W.Component.create({NAME:s,UI_ATTRS:[m,i,aq],ATTRS:{anchorsDragConfig:{value:null,setter:"_setAnchorsDragConfig",validator:w},builder:{setter:"_setBuilder",validator:J},description:{value:G,validator:ar},height:{value:90},name:{valueFn:function(){var A=this;return A.get(e)+(++W.Env._uidx);},validator:ar},selected:{value:false,validator:ao},strings:{value:{deleteMessage:"Are you sure you want to delete?",description:"Description",name:"Name",type:"Type"}},type:{value:j,validator:ar},controlsToolbar:{setter:"_setControlsToolbar",validator:w,value:null},width:{value:90},zIndex:{value:100},tabIndex:{value:1}},EXTENDS:H,buildNodeId:function(A){return s+z+an+z+A;},prototype:{ANCHOR_WRAPPER_TEMPLATE:'<div class="'+u+'"></div>',CONTROLS_TEMPLATE:'<div class="'+o+'"></div>',initializer:function(){var A=this;A._renderNodes();A._setupAnchorsDrag();A.after({render:A._afterRender});A.on({"drag:drag":A._onAnchorDrag,"drag:end":A._onAnchorDragEnd,"drag:start":A._onAnchorDragStart,"drop:hit":A._onAnchorDropHit});A.get(k).addClass(M+ax+A.get(e));A.set("bodyContent",A.get(i));},alignAnchors:function(){var aA=this;var aE=aA.get(m);var aC=aA.get(k).get(g),aD=Math.floor(360/aE.size()),aB=aC.width/2,A=aC.height/2,aG=aC.left+aC.width/2,aF=aC.top+aC.height/2;aE.each(function(aK,aJ){var aI=aK.get(j);var aL=aI.get(g);var aH=aA._getEllipseXY(aB,A,aG,aF,aJ*aD);aI.setXY([aH[0]-aL.width/2,aH[1]-aL.height/2]);aK.alignConnectors();});return aA;},close:function(){var aA=this;var A=aA.getStrings();if(confirm(A[Y])){aA.get(m).each(function(aB){aB.destroy();});aA.destroy();}N();return aA;},createField:function(aB){var A=this;if(!S(aB)){var aA=A.get(au);aB.diagramNode=A;aB.viewport=(aA?aA.get(C):null);aB=new W.Anchor(aB);}return aB;},getLeftTop:function(){var A=this;return ab(A.get(k),A._getContainer());},getProperties:function(){var A=this;var aA=A.getPropertyModel();ay.each(aA,function(aB){aB.value=A.get(aB.attributeName);});return aA;},getPropertyModel:function(){var aA=this;var A=aA.getStrings();return[{attributeName:al,editor:new W.TextAreaCellEditor(),name:A[al]},{attributeName:i,editor:new W.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[i]},{attributeName:e,editor:false,name:A[e]}];},_afterRender:function(aA){var A=this;A.alignAnchors();A._renderControls();},_getContainer:function(){var A=this;return(A.get(au).dropContainer||A.get(k).get(d));},_getEllipseXY:function(aA,A,aD,aC,aE){var aB=aE*Math.PI/180;return[aD+aA*Math.cos(aB),aC-A*Math.sin(aB)];},_handleAddAnchorEvent:function(aA){var A=this;A.addField({});},_handleAddTaskEvent:function(aB){var A=this;var aA=A.get(au);var aE=new W.DiagramNode({type:j,xy:[100,100]});aA.addField(aE);var aC=A.addField({});var aD=aE.addField({});aC.connect(aD);},_handleCloseEvent:function(aA){var A=this;A.close();},_onAnchorDrag:function(aB){var A=this;var aA=A.get(au);aA.tmpConnector.set(ae,aB.target.get(am).getCenterXY());},_onAnchorDragEnd:function(aB){var A=this;var aA=A.get(au).tmpConnector.shape;aA.clear();aA.end();},_onAnchorDragStart:function(aB){var A=this;var aA=A.get(au);aA.tmpConnector.set(af,aB.target.get(j).getCenterXY());},_onAnchorDropHit:function(aA){var A=this;var aB=W.Anchor.getAnchorByNode(aA.drag.get(j));var aC=W.Anchor.getAnchorByNode(aA.drop.get(j));aB.connect(aC);N();},_renderControls:function(){var A=this;var aA=A.get(k);A.controlsNode=W.Node.create(A.CONTROLS_TEMPLATE).appendTo(aA);},_renderNodes:function(){var A=this;var aA=A.get(k);A.anchorWrapper=W.Node.create(A.ANCHOR_WRAPPER_TEMPLATE).appendTo(aA);},_renderControlsToolbar:function(aA){var A=this;A.controlsToolbar=new W.Toolbar(A.get(ah)).render(A.controlsNode);},_setBuilder:function(aA){var A=this;A.get(m).each(function(aB){aB.set(C,aA.get(C));});return aA;},_setAnchorsDragConfig:function(aB){var A=this;var aA=A.get(au);return W.merge({bubbleTargets:A,container:A.anchorWrapper,dragConfig:{groups:[X],plugins:[{cfg:{constrain:(aA?aA.get(C):null)},fn:W.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:W.Plugin.DDWinScroll},{cfg:{moveOnEnd:false},fn:W.Plugin.DDProxy}]},nodes:f+aj,target:true},aB||{});
},_setupAnchorsDrag:function(){var A=this;A.anchorsDrag=new W.DD.Delegate(A.get(R));},_setControlsToolbar:function(aA){var A=this;return W.merge({activeState:false,children:[{handler:W.bind(A._handleAddAnchorEvent,A),icon:V},{handler:W.bind(A._handleAddTaskEvent,A),icon:x},{handler:W.bind(A._handleCloseEvent,A),icon:P}]},aA);},_uiSetFields:function(aA){var A=this;if(A.get(av)){A.alignAnchors();setTimeout(function(){A.anchorsDrag.syncTargets();},50);}},_uiSetName:function(aB){var A=this;var aA=A.get(k);aA.setAttribute(i,W.DiagramNode.buildNodeId(aB));},_uiSetSelected:function(aA){var A=this;A.get(k).toggleClass(aw,aA);if(aA&&!A.controlsToolbar){A._renderControlsToolbar();}},_uiSetXY:function(aB){var A=this;var aA=A._getContainer().getXY();this._posNode.setXY([aB[0]+aA[0],aB[1]+aA[1]]);}}});W.DiagramNode=az;W.DiagramBuilder.types[j]=W.DiagramNode;W.DiagramNodeTask=W.Component.create({NAME:s,ATTRS:{type:{value:t}},EXTENDS:W.DiagramNode});W.DiagramBuilder.types[t]=W.DiagramNodeTask;},"@VERSION@",{requires:["aui-diagram-builder-base","overlay"],skinnable:true});AUI.add("aui-diagram-builder-connector",function(k){var M=k.Lang,r=M.isArray,v=M.isBoolean,L=M.isNumber,z=M.isObject,h=M.isString,D=k.Array,b=function(A){return(A instanceof k.Anchor);},E=function(A){return(A instanceof k.ArrayList);},y="anchor",F="arrowPoints",C="body",G="boundingBox",N="builder",w="color",n="connector",a="dataAnchor",x="diagram",s="diagramNode",u="height",p="id",I="lazyDraw",j="maxSources",i="maxTargets",J="node",m="p1",l="p2",e="path",q="shape",g="sources",f="targets",B="viewport",c="width",K="wrapper",o=".",t=k.getClassName,d=t(x,N,y,J,K),H=t(x,N,y,J);k.PolygonUtil={ARROW_POINTS:[[-12,-6],[-8,0],[-12,6],[6,0]],drawLineArrow:function(T,O,V,A,U,R){var W=this;T.moveTo(O,V);T.lineTo(A,U);var P=Math.atan2(U-V,A-O),S=(A+O)/2,Q=(U+V)/2;W.drawPolygon(T,W.translatePoints(W.rotatePoints(R||W.ARROW_POINTS,P),S,Q));},drawPolygon:function(O,P){var A=this;O.moveTo(P[0][0],P[0][1]);D.each(P,function(R,Q){if(Q>0){O.lineTo(P[Q][0],P[Q][1]);}});O.lineTo(P[0][0],P[0][1]);O.end();},translatePoints:function(P,O,R){var A=this;var Q=[];D.each(P,function(T,S){Q.push([P[S][0]+O,P[S][1]+R]);});return Q;},rotatePoints:function(O,Q){var A=this;var P=[];D.each(O,function(S,R){P.push(A.rotatePoint(Q,O[R][0],O[R][1]));});return P;},rotatePoint:function(O,A,P){return[(A*Math.cos(O))-(P*Math.sin(O)),(A*Math.sin(O))+(P*Math.cos(O))];}};k.Connector=k.Base.create("line",k.Base,[],{graphics:null,shape:null,initializer:function(O){var A=this;A.after({p1Change:A.draw,p2Change:A.draw});A._initGraphics();A._initShapes();if(!A.get(I)){A.draw();}},destroy:function(){var A=this;A.graphics.destroy();},draw:function(){var A=this;var O=A.shape;var Q=A.getCoordinate(A.get(m));var P=A.getCoordinate(A.get(l));O.clear();k.PolygonUtil.drawLineArrow(O,Q[0],Q[1],P[0],P[1],A.get(F));},getCoordinate:function(P){var A=this;var O=A.get(B).getXY();return[P[0]-O[0],P[1]-O[1]];},_initGraphics:function(){var A=this;var O=new k.Graphic({width:A.get(c),height:A.get(u),render:A.get(B)});A.graphics=O;},_initShapes:function(){var A=this;A.shape=A.graphics.getShape(A.get(q));},_setShape:function(O){var A=this;return k.merge({type:e,stroke:{color:A.get(w),weight:2},fill:{color:A.get(w)}},O);}},{ATTRS:{color:{value:"#666",validator:h},lazyDraw:{value:false,validator:v},viewport:{setter:k.one,value:C},shape:{value:null,setter:"_setShape"},arrowPoints:{value:k.PolygonUtil.ARROW_POINTS},p1:{value:[0,0],validator:r},p2:{value:[0,0],validator:r}}});k.Anchor=k.Base.create("anchor",k.Base,[],{ANCHOR_WRAPPER_TEMPLATE:'<div class="'+d+'"></div>',NODE_TEMPLATE:'<div class="'+H+'"></div>',connectors:null,initializer:function(){var A=this;A.connectors={};A._renderNode();A.connectTargets();A.after({targetsChange:A._afterTargetsChange});},addSource:function(O){var A=this;return A.updateSources(A.get(g).remove(O).add(O));},addTarget:function(O){var A=this;return A.updateTargets(A.get(f).remove(O).add(O));},alignConnectors:function(){var A=this;A.get(f).each(function(O){var P=A.getConnector(O);if(P){P.set(m,A.getCenterXY());P.set(l,O.getCenterXY());}});A.get(g).each(function(O){var P=O.getConnector(A);if(P){P.set(m,O.getCenterXY());P.set(l,A.getCenterXY());}});return A;},destroy:function(){var A=this;A.disconnectTargets();A.disconnectSources();A.get(J).remove();},connect:function(O){var A=this;A.addTarget(O);if(!A.isConnected(O)){var P=O.get(n);P.p1=A.getCenterXY();P.p2=O.getCenterXY();A.connectors[O.get(p)]=new k.Connector(P);}return A;},connectTargets:function(){var A=this;A.get(f).each(k.bind(A.connect,A));return A;},disconnect:function(O){var A=this;A.getConnector(O).destroy();A.removeTarget(O);O.removeSource(A);},disconnectTargets:function(){var A=this;A.get(f).each(function(O){A.disconnect(O);});return A;},disconnectSources:function(){var A=this;A.get(g).each(function(O){O.disconnect(A);});return A;},getCenterXY:function(){var A=this;return A.get(J).getCenterXY();},getConnector:function(O){var A=this;return A.connectors[O.get(p)];},isConnected:function(O){var A=this;return A.connectors.hasOwnProperty(O.get(p));},updateSources:function(O){var A=this;A.set(g,O);return A;},updateTargets:function(O){var A=this;A.set(f,O);return A;},removeSource:function(O){var A=this;return A.updateSources(A.get(g).remove(O));},removeTarget:function(O){var A=this;return A.updateTargets(A.get(f).remove(O));},_afterActiveChange:function(O){var A=this;A._uiSetActive(O.newVal);},_afterTargetsChange:function(O){var A=this;O.prevVal.each(function(P){P.removeSource(A);});O.newVal.each(function(P){P.addSource(A);});},_renderNode:function(){var A=this;var P=A.get(s);var O=P.get(G);A.wrapper=O.one(o+d)||k.Node.create(A.ANCHOR_WRAPPER_TEMPLATE);A.wrapper.appendTo(O).appendChild(A.get(J));},_setConnector:function(O){var A=this;return k.merge({viewport:A.get(B)},O);},_setSources:function(O){var A=this;return A._setAnchors(O);},_setTargets:function(O){var A=this;O=A._setAnchors(O);O.each(function(P){P.addSource(A);});return O;},_setAnchors:function(P){var A=this;
if(!E(P)){var O=[];k.Array.each(P,function(Q){if(h(Q)){Q=k.Anchor.getAnchorByNode(Q);}O.push(b(Q)?Q:new k.Anchor(Q));});P=new k.ArrayList(O);}return P;},_setNode:function(O){var A=this;var P=A.get(p);return k.one(O).set(p,P).setData(a,A);}},{ATTRS:{diagramNode:{},connector:{setter:"_setConnector",value:{},validator:z},id:{readOnly:true,valueFn:function(){return k.guid();}},maxSources:{value:Infinity,validator:L},maxTargets:{value:Infinity,validator:L},node:{setter:"_setNode",valueFn:function(){var A=this;return k.Node.create(A.NODE_TEMPLATE);}},sources:{value:[],setter:"_setSources",validator:function(A){return r(A)||E(A);}},targets:{value:[],setter:"_setTargets",validator:function(A){return r(A)||E(A);}},viewport:{setter:k.one,value:C}},getAnchorByNode:function(A){return k.one(A).getData(a);}});},"@VERSION@",{requires:["aui-base","arraylist-add","arraylist-filter","json","graphics","dd"],skinnable:true});AUI.add("aui-diagram-builder",function(a){},"@VERSION@",{use:["aui-diagram-builder-base","aui-diagram-builder-impl","aui-diagram-builder-connector"],skinnable:true});