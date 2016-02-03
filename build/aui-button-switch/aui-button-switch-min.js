YUI.add("aui-button-switch",function(e,t){var n=e.getClassName("button","switch"),r=e.getClassName("button","switch","left"),i=e.getClassName("button","switch","right"),s=e.getClassName("button","switch","inner","circle"),o=e.getClassName("button","switch","inner","label","left"),u=e.getClassName("button","switch","inner","label","right"),a=2,f='<div class="'+n+'" tabindex="0">'+'<label class="'+o+'"></label>'+'<label class="'+u+'"></label></div>',l='<span class="'+s+'"></span>';e.ButtonSwitch=e.Base.create("button-switch",e.Widget,[],{bindUI:function(){var e=this.get("content");e.on("click",this._onButtonSwitchClick,this),e.on("key",this._onButtonSwitchKey,"enter,space",this),this.after("activatedChange",this._afterActivatedChange,this),this.after("innerLabelLeftChange",this._afterInnerLabelLeftChange,this),this.after("innerLabelRightChange",this._afterInnerLabelRightChange,this)},renderUI:function(){var e=this.get("content");this.get("contentBox").append(e),this._uiSetActivate(this.get("activated")),this._uiSetInnerLabelLeft(this.get("innerLabelLeft")),this._uiSetInnerLabelRight(this.get("innerLabelRight"))},_afterActivatedChange:function(){this._uiSetActivate(this.get("activated"))},_afterInnerLabelLeftChange:function(e){this._uiSetInnerLabelLeft(e.newVal)},_afterInnerLabelRightChange:function(e){this._uiSetInnerLabelRight(e.newVal)},_getInnerCircle:function(){return this._innerCircle||(this._innerCircle=e.Node.create(l),this.get("content").append(this._innerCircle)),this._innerCircle},_onButtonSwitchClick:function(){this._onButtonSwitchInteraction()},_onButtonSwitchInteraction:function(){this.set("activated",!this.get("activated"))},_onButtonSwitchKey:function(){this._onButtonSwitchInteraction()},_uiSetActivate:function(e){var t=this.get("content"),n=t.get("offsetWidth"),s=this._getInnerCircle(),f=s.get("offsetWidth");t.one("."+u).toggleClass("hide",e),t.one("."+o).toggleClass("hide",!e),t.toggleClass("activated",e),f?(s.removeClass(r),s.removeClass(i),e?(s.setStyle("left",a+"px"),s.transition({duration:.6,left:n-f-a+"px"})):(s.setStyle("left",n-f-a+"px"),s.transition({duration:.6,left:a+"px"}))):this._setInnerCirclePosition(e)},_setInnerCirclePosition:function(e){var t=this._getInnerCircle();t.setStyle("left",""),e?(t.removeClass(r),t.addClass(i)):(t.removeClass(i),t.addClass(r))},_uiSetInnerLabelLeft:function(e){return this.get("content").one("."+o).set("text",e)},_uiSetInnerLabelRight:function(e){return this.get("content").one("."+u).set("text",e)}},{ATTRS:{activated:{value:!1},content:{validator:function(t){return e.instanceOf(t,e.Node)},valueFn:function(){return e.Node.create(f)},writeOnce:"initOnly"},innerLabelLeft:{value:"",validator:e.Lang.isString},innerLabelRight:{value:"",validator:e.Lang.isString}}})},"3.0.3-deprecated.11",{requires:["aui-node-base","base-build","event-key","transition","widget"],skinnable:!0});
